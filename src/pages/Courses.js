import React, { useState, useEffect } from "react";
import { Row, Col, Spin, notification } from "antd";
import { getCoursesApi } from "../api/course";
import PresentationCourses from "../components/Web/Courses/PresentationCourses";
import CoursesList from "../components/Web/Courses/CoursesList";

export default function Courses() {
  const [courses, setCourses] = useState({});

  useEffect(() => {
    getCoursesApi()
      .then(response => {
        console.log("hi", response);
        if (response?.code !== 200) {
          notification["warning"]({ message: response.message });
        } else {
          setCourses(response.message);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor, inténtelo más tarde"
        });
      });
  }, []);

  return (
    <Row>
      <Col md="4" />
      <Col md="16">
        <PresentationCourses />
        {!courses ? (
          <Spin
            tip="Cargando proyectos"
            style={{ textAlign: "center", width: "100%", padding: "20px" }}
          />
        ) : (
          <CoursesList courses={courses} />
        )}
      </Col>

      <Col md="4" />
    </Row>
  );
}
