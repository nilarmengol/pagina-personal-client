import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import "./HowMyCoursesWork.scss";
import {
  ClockCircleOutlined,
  KeyOutlined,
  MessageOutlined,
  UserOutlined,
  DollarOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";

export default function HowMyCoursesWork() {
  return (
    <Row className="how-my-courses-work">
      <Col lg={24} className="how-my-courses-work__title">
        <h2>¿Cómo funcionan mis cursos?</h2>
        <h3>
          Cada curso cuenta con contenido bajo la web de Udemy, activa 24/7
        </h3>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              icon={<ClockCircleOutlined />}
              title={"Cursos y clases"}
              subtitle="Cursos de entre 10 y 30 horas y cada clase del curso con duración máxima de 20 minutos"
            />
          </Col>
          <Col md={8} className="row-cards">
            <CardInfo
              icon={<KeyOutlined />}
              title={"Acceso 24/7"}
              subtitle="Accede a los cursos en cualquier momento, desde cualquier lugar sin importar día y hora"
            />
          </Col>
          <Col md={8} className="row-cards">
            <CardInfo
              icon={<MessageOutlined />}
              title={"Aprendizaje colaborativo"}
              subtitle="Aprende de los demás dejando tus dudas para que profesores y compañeros te ayuden"
            />
          </Col>
        </Row>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              icon={<UserOutlined />}
              title={"Mejora tu perfil"}
              subtitle="Aprende y mejora tu perfil para mantenerte informado de actualizaciones"
            />
          </Col>
          <Col md={8} className="row-cards">
            <CardInfo
              icon={<DollarOutlined />}
              title={"Precios bajos"}
              subtitle="Obtén el curso que necesitas por solo 9.99 y ten acceso a el por tiempo ilimitado y soporte ilimitado"
            />
          </Col>
          <Col md={8} className="row-cards">
            <CardInfo
              icon={<CheckCircleOutlined />}
              title={"Certificado de finalización"}
              subtitle="Al completar tu un curso recibirás una certificación que te expedirá Udemy en PDF"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

function CardInfo({ icon, title, subtitle }) {
  const { Meta } = Card;

  return (
    <Card className="how-my-courses-work__card">
      {icon}
      <Meta title={title} description={subtitle} />
    </Card>
  );
}
