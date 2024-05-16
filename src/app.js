import AuthProvider from "./providers/auth-provider";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/require-auth/require-auth";
import Layout from "./components/layout/layout";
import Login from "./pages/login/login";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <div>prot</div>
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
