import React, { useState, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import useAuth from "../hooks/useAuth";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn/SignIn";

import "./LayoutAdmin.scss";

export default function LayoutAdmin({ routes }) {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  const { user, isLoading } = useAuth();
  console.log(user);
  if (!user && !isLoading) {
    return (
      <Fragment>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </Fragment>
    );
  }
  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Header className="layout-admin__header">
          <MenuTop
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
          />
        </Header>
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Content className="layout-admin__content">
            <LoadRoutes routes={routes} />
          </Content>
          <Footer className="layout-footer">Nil Armengol</Footer>
        </Layout>
      </Layout>
    );
  }
  return null;
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
