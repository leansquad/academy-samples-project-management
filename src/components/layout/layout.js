import React from "react";
import { Button, Layout as AntdLayout } from "antd";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from "./layout.module.scss";

const { Header, Footer, Content } = AntdLayout;

const Layout = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout(() => {
      console.log("logged out");
    });
  };
  return (
    <AntdLayout className={styles.wrapper}>
      <Header className={styles.header}>
        {user && (
          <>
            Hello {user?.displayName}
            <Button type={"primary"} onClick={handleLogout}>
              logout
            </Button>
          </>
        )}
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>Leansquad 2024</Footer>
    </AntdLayout>
  );
};

export default Layout;
