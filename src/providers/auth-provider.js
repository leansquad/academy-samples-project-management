import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
let AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
      }
      setIsLoading(false);
    });

    return () => unsub();
  }, []);

  let signIn = async (user, callback) => {
    return signInWithEmailAndPassword(auth, user.email, user.password).then(
      () => {
        setUser(user);
        callback();
      },
    );
  };

  let createUser = async (newUser, callback) => {
    return createUserWithEmailAndPassword(
      auth,
      newUser.email,
      newUser.password,
    ).then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, { displayName: newUser.name }).then(() => {
        setUser({ ...user, displayName: newUser.name });
        callback();
      });
    });
  };

  let logout = (callback) => {
    return signOut(auth).then(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signIn, logout, isLoading, createUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export { AuthContext };
export default AuthProvider;
