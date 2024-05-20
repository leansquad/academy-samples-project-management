import AuthProvider from "./providers/auth-provider";
import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/require-auth/require-auth";
import Layout from "./components/layout/layout";
import Login from "./pages/login/login";
import Projects from "./pages/projects/projects";
import Project from "./pages/project/project";

export const routes = {
  login: "/login",
  main: "/",
  projects: "/projects",
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={routes.login} element={<Login />} />
        <Route element={<Layout />}>
          <Route element={<RequireAuth />}>
            <Route path={routes.main} element={<Projects />} />
            <Route path={"/projects/:projectId"} element={<Project />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={routes.login} replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
