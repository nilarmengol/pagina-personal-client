import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "antd";
import "./CoursesList.scss";
import { getImageApi } from "../../../../api/course";

export default function CoursesList({ courses }) {
  return (
    <div className="courses-list">
      <Row>
        {courses.map(course => (
          <Col key={course._id} md={8} className="courses-list__course">
            <Course course={course} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function Course({ course }) {
  const [image, setImage] = useState(null);
  const { Meta } = Card;
  useEffect(() => {
    if (course.image) {
      getImageApi(course.image).then(response => {
        setImage(response);
      });
    } else {
      setImage(null);
    }
  }, [course]);
  return (
    <a href={course.link} target="_blank" rel="noopener noreferrer">
      <Card cover={<img src={image} alt={course.title} />}>
        <Meta title={course.title} description={course.description} />
        <Button>Acceder al proyecto</Button>
      </Card>
    </a>
  );
}
