import React, { useState, useEffect } from "react";
import { Row, Col, Layout } from "antd";
import { Link } from "react-router-dom";
import MyInfo from "./MyInfo";
import NavigationFooter from "./NavigationFooter";
import Newsletter from "../Newsletter";

import "./Footer.scss";

export default function HomeCourses() {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      <Row>
        <Col md={4} />
        <Col md={16}>
          <Row>
            <Col md={8}>
              <MyInfo />
            </Col>
            <Col md={8}>
              <NavigationFooter />
            </Col>
            <Col md={8}>
              <Newsletter />
            </Col>
          </Row>
          <Row className="footer__copyright">
            <Col md={12}>© 2019 ALL RIGHTS RESERVED​</Col>
            <Col md={12}>NIL ARMENGOL TOUS | DESARROLLADOR WEB</Col>
          </Row>
        </Col>
        <Col md={4} />
      </Row>
    </Footer>
  );
}
