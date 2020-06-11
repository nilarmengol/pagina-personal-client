import React, { useState, useEffect } from "react";
import {
  getCoursesApi,
  updateCourseApi,
  deleteCourseApi
} from "../../../../api/course";
import { Switch, List, Button, Modal as ModalAntd, notification } from "antd";
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";
import AddEditCourseForm from "../AddEditCourseForm";
import { getAccessTokenApi } from "../../../../api/auth";
import reactNative from "../../../../assets/img/jpg/react-native.jpg";
import javaScript from "../../../../assets/img/jpg/javascript-es6.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./CoursesList.scss";

const { confirm } = ModalAntd;

export default function CoursesList({ courses, setReloadCourses }) {
  const [listCourses, setListCourses] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  useEffect(() => {
    const listCoursesArray = [];
    courses.forEach(course => {
      listCoursesArray.push({
        content: (
          <Course
            course={course}
            deleteCourseModal={deleteCourseModal}
            editCourseModal={editCourseModal}
          />
        )
      });
      setListCourses(listCoursesArray);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessTokenApi();
    console.log("sortedList", sortedList);
    sortedList.forEach(item => {
      const { _id } = item.content.props.course;
      const order = item.rank;
      updateCourseApi(accessToken, _id, { order });
    });
  };

  const addCourseModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevos curso");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
      />
    );
  };

  const editCourseModal = course => {
    setIsVisibleModal(true);
    setModalTitle("Actualizando curso");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
        course={course}
      />
    );
  };

  const deleteCourseModal = course => {
    console.log(course._id);
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando curso",
      content: `¿Estás seguro de que quieres eliminar el curso ${course.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteCourseApi(accessToken, course._id)
          .then(response => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message
            });
            setReloadCourses(true);
          })
          .catch(response => {
            notification["error"]({
              message: "Error del servidor, inténtelo más tarde"
            });
          });
      }
    });
  };

  return (
    <div className="courses-list">
      <div className="courses-list__header">
        <Button type="primary" onClick={addCourseModal}>
          Nuevo curso
        </Button>
      </div>
      <div className="courses-list__items">
        {listCourses.length === 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No tienes cursos creados
          </h2>
        )}
        <DragSortableList items={listCourses} onSort={onSort} type="vertical" />
      </div>
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function Course({ course, deleteCourseModal, editCourseModal }) {
  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editCourseModal(course)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => deleteCourseModal(course)}>
          <DeleteOutlined />
        </Button>
      ]}
    >
      <img
        src={javaScript}
        alt="test"
        style={{ width: "100px", marginRight: "20px" }}
      />
      <List.Item.Meta title={course.title} description={course.description} />
    </List.Item>
  );
}
