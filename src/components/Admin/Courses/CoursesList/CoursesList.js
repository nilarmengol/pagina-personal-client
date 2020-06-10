import React, { useState, useEffect } from "react";
import { getCoursesApi } from "../../../../api/course";
import { Switch, List, Button, Modal as ModalAntd, notification } from "antd";
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";
import { getAccessTokenApi } from "../../../../api/auth";
import reactJsHooks from "../../../../assets/img/jpg/react-js-hooks.jpg";
import reactNative from "../../../../assets/img/jpg/react-native.jpg";
import javaScript from "../../../../assets/img/jpg/javascript-es6.jpg";
import wordpress from "../../../../assets/img/jpg/wordpress.jpg";
import prestaShop from "../../../../assets/img/jpg/prestashop-1-7.jpg";
import cssGrid from "../../../../assets/img/jpg/css-grid.jpg";
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
        content: <Course course={course} />
      });
      setListCourses(listCoursesArray);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessTokenApi();

    sortedList.forEach(item => {
      const { _id } = item.content.props.item;
      const order = item.rank;
    });
  };

  return (
    <div className="courses-list">
      <div className="courses-list__header">
        <Button type="primary" onClick={() => console.log("s")}>
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
    </div>
  );
}

function Course({ course }) {
  console.log("courses", course.image);
  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => console.log("edit")}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => console.log("delete")}>
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
