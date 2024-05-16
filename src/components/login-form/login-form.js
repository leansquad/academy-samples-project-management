import React from "react";
import { Button, Input } from "antd";
import styles from "./login-form.module.scss";

const LoginForm = ({ handleLogin, handleRegister, error }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mode, setMode] = React.useState("login");

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  const onSubmit = () => {
    if (mode === "login") {
      handleLogin(email, password);
    } else {
      handleRegister(email, password);
    }
  };

  return (
    <form className={styles.wrapper}>
      <h1 className={styles.title}>
        {mode === "login" ? "Login" : "Register"}
      </h1>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      {error && <div className={styles.error}>{error}</div>}
      <Button onClick={onSubmit}>Login</Button>
      <div onClick={toggleMode} className={styles.toggle}>
        {mode === "login"
          ? "Don't have an account? Create account"
          : "Already have an account? Login"}
      </div>
    </form>
  );
};

export default LoginForm;
