import React from "react";
import styles from "./login.module.scss";
import LoginForm from "../../components/login-form/login-form";
import useAuth from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { user, signIn, createUser } = useAuth();
  const [error, setError] = React.useState(null);

  const redirectToHome = () => {
    navigate("/", { replace: true });
  };

  const handleLogin = (email, password) => {
    signIn({ email, password }, () => {
      redirectToHome();
    }).catch((e) => {
      setError(e.message);
    });
  };

  const handleRegister = (email, password, name) => {
    createUser({ email, password, name }, () => {
      redirectToHome();
    }).catch((e) => {
      setError(e.message);
    });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.wrapper}>
      <LoginForm
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        error={error}
      ></LoginForm>
    </div>
  );
};

export default Login;
