import React from "react";
import { Button, Card, Flex, Input } from "antd";
import styles from "./login-form.module.scss";

const LoginForm = ({ handleLogin, handleRegister, error }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [mode, setMode] = React.useState("login");

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  const onSubmit = () => {
    if (mode === "login") {
      handleLogin(email, password);
    } else {
      handleRegister(email, password, name);
    }
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <Card
      title={mode === "login" ? "Login" : "Register"}
      className={styles.wrapper}
    >
      <Flex justify="center" vertical gap={10}>
        {mode === "register" && (
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        )}
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
        <Button type={"primary"} onClick={onSubmit}>
          {mode === "login" ? "Login" : "Register"}
        </Button>
        <div onClick={toggleMode} className={styles.toggle}>
          {mode === "login"
            ? "Don't have an account? Create account"
            : "Already have an account? Login"}
        </div>
      </Flex>
    </Card>
  );
};

export default LoginForm;
