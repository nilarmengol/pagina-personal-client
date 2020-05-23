import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import "./LayoutAdmin.scss";

export default function LayoutAdmin({ routes }) {
  console.log(routes);

  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      <Layout>
        <Header>Header...</Header>
        <Content>
          <LoadRoutes routes={routes} />
        </Content>
        <Footer>Nil Armengol</Footer>
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
