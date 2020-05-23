import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import MenuTop from "../components/Admin/MenuTop";

import "./LayoutAdmin.scss";

export default function LayoutAdmin({ routes }) {
  console.log(routes);

  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      <Layout className="layout-admin">
        <Header className="layout-admin__header">
          <MenuTop />
        </Header>
        <Content className="layout-admin__content">
          <LoadRoutes routes={routes} />
        </Content>
        <Footer className="layout-footer">Nil Armengol</Footer>
      </Layout>
    </Layout>
  );
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
