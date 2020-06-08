import React from "react";
import { Route, Switch } from "react-router-dom";
import MenuTop from "../components/Web/MenuTop";
import { Layout, Row, Col } from "antd";

import "./LayoutAdmin.scss";

export default function LayoutBasic({ routes }) {
  const { Content, Footer } = Layout;

  return (
    <>
      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <MenuTop />
        </Col>
        <Col lg={4} />
      </Row>
      <LoadRoutes routes={routes} />
      <Footer>Nil-Edmon Armengol Tous</Footer>
    </>
  );
  // return (
  //   <Layout>
  //     <h2>Menu...</h2>
  //
  //     <Layout>
  //       <Content>
  //         <LoadRoutes routes={routes} />{" "}
  //       </Content>
  //       <Footer>Nil Armengol</Footer>
  //     </Layout>
  //   </Layout>
  // );
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
