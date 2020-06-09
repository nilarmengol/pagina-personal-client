import React, { useState, useEffect } from "react";
import { Row, Col, Card, Avatar } from "antd";
import { Link } from "react-router-dom";
import AvatarPersona from "../../../assets/img/png/avatar.png";

import "./ReviewCourses.scss";

export default function ReviewCourses() {
  return (
    <Row className="reviews-courses">
      <Col lg={4} />
      <Col lg={16} className="reviews-courses__title">
        <h2>
          FORMA PARTE DE LOS +35 MIL ESTUDIANTES QUE ESTÁN APRENDIENDO CON MIS
          CURSOS
        </h2>
      </Col>
      <Col lg={4} />

      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <Row className="row-cards">
            <Col md={8}>
              <CardReview
                name="Maria Mas"
                subtitle="Especializada en Química"
                avatar={AvatarPersona}
                review="Un curso excelente, el profesor explica detalladamente como funciona react native y también como hacer componente por componente, he buscado muchos cursos de react native pero ninguno me ha enseñado tanto como este, ahora estoy desarrollando mi propia aplicación sin ningún tipo de problema gracias al curso."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Merce Monge"
                subtitle="Estudiante de Química"
                avatar={AvatarPersona}
                review="Si te gustan los cursos que profundizan en la materia, te lo recomiendo. El profesor explica de forma completa todos los conceptos necesarios para trabajar con grid. Un gran curso."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Xavi Sancha"
                subtitle="Compliance"
                avatar={AvatarPersona}
                review="El contenido del curso es muy completo y de necesitar cualquier dato adicional el profesor está super pendiente para responderlo. Ya tengo creado mi E-commerce con WordPress y gran parte de la información necesaria la obtuve del curso."
              />
            </Col>
          </Row>
          <Row className="row-cards">
            <Col md={8}>
              <CardReview
                name="Jesus del Pozo"
                subtitle="Profesor"
                avatar={AvatarPersona}
                review="Empecé el curso sin saber nada de React Native y creo que lo finalizo teniendo un nivel de conocimiento como para embarcarme en realizar mi primera aplicación."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Luis Romero"
                subtitle="GNSS"
                avatar={AvatarPersona}
                review="Me ha parecido un buen curso, las explicaciones muy claras y lo que enseña me ha sido muy útil para la aplicación que me habían encargado."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Marta Hernandez"
                subtitle="Controladora aérea"
                avatar={AvatarPersona}
                review="Aprendes todo lo que promete el video de inicio y te da la capacidad para después crear tus propias apps. Gracias Agus por crear este curso, tenes mucho talento para explica"
              />
            </Col>
          </Row>
        </Col>
        <Col lg={4} />
      </Row>
    </Row>
  );
}

function CardReview({ name, subtitle, avatar, review }) {
  const { Meta } = Card;

  return (
    <Card className="reviews-courses__card">
      <p>{review}</p>
      <Meta
        avatar={<Avatar src={avatar} />}
        title={name}
        description={subtitle}
      />
    </Card>
  );
}
