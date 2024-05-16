import React from "react";
import { Layout as AntdLayout } from "antd";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const { Header, Footer, Content } = AntdLayout;

const Layout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(() => {
      console.log("logged out");
    });
  };
  return (
    <AntdLayout>
      <Header>
        {" "}
        <button onClick={handleLogout}>logout</button>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </AntdLayout>
  );
};

export default Layout;
