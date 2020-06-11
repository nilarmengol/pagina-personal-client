import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";
import { KeyOutlined, LockOutlined } from "@ant-design/icons";
import { addCourseApi, updateCourseApi } from "../../../../api/course";

import "./AddEditCourseForm.scss";

export default function AddEditCourseForm({
  setIsVisibleModal,
  setReloadCourses,
  course
}) {
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    course && setCourseData(course);
  }, [course]);

  const addCourse = () => {
    if (!courseData.title || !courseData.description || !courseData.link) {
      notification["warning"]({
        message: "Los campos del curso son obligatorios"
      });
    } else {
      const accessToken = getAccessTokenApi();

      addCourseApi(accessToken, courseData)
        .then(response => {
          const typeNotification =
            response.code === 200 ? "success" : "warning";
          notification[typeNotification]({ message: response.message });
          setIsVisibleModal(false);
          setReloadCourses(true);
          setCourseData({});
        })
        .catch(err => {
          notification["error"]({
            message: "Error en el servidor, inténtelo más tarde"
          });
        });
    }
  };

  const updateCourse = e => {
    if (!courseData.title || !courseData.description || !courseData.link) {
      notification["warning"]({
        message: "Los campos del curso son obligatorios"
      });
    } else {
      const accessToken = getAccessTokenApi();

      updateCourseApi(accessToken, courseData._id, courseData)
        .then(response => {
          const typeNotification =
            response.code === 200 ? "success" : "warning";
          notification[typeNotification]({ message: response.message });
          setIsVisibleModal(false);
          setReloadCourses(true);
          setCourseData({});
        })
        .catch(err => {
          notification["error"]({
            message: "Error en el servidor, inténtelo más tarde"
          });
        });
    }
  };

  return (
    <div className="add-edit-course-form">
      <AddEditForm
        course={course}
        addCourse={addCourse}
        updateCourse={updateCourse}
        courseData={courseData}
        setCourseData={setCourseData}
      />
    </div>
  );
}

function AddEditForm({
  addCourse,
  updateCourse,
  courseData,
  setCourseData,
  course
}) {
  return (
    <Form
      className="form-add-edit"
      onFinish={course ? updateCourse : addCourse}
    >
      <Form.Item>
        <Input
          prefix={<KeyOutlined />}
          placeholder="Título"
          value={courseData.title}
          onChange={e =>
            setCourseData({ ...courseData, title: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Descripción"
          value={courseData.description}
          onChange={e =>
            setCourseData({ ...courseData, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Link"
          value={courseData.link}
          onChange={e => setCourseData({ ...courseData, link: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {course ? "Actualizar curso" : "Crear curso"}
        </Button>
      </Form.Item>
    </Form>
  );
}
