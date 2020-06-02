import React, { useState } from "react";
import { Switch, List, Button, Item, Avatar } from "antd";
import NoAvatar from "../../../../assets/img/png/user.png";
import {
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";

import "./ListUsers.scss";

export default function ListUsers({ usersActive, usersInactive }) {
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActives(!viewUsersActives)}
        ></Switch>
        <span>
          {viewUsersActives ? "Usuarios Activos" : "Usuarios Inactivos"}
        </span>
      </div>
      {viewUsersActives ? (
        <UsersActive
          usersActive={usersActive}
          title={modalTitle}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
        />
      ) : (
        <UsersInactive usersInactive={usersInactive} />
      )}
      <Modal
        title={modalTitle}
        setIsVisible={setIsVisibleModal}
        isVisible={isVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function UsersActive({
  usersActive,
  setIsVisibleModal,
  setModalTitle,
  setModalContent,
}) {
  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );
    setModalContent(<EditUserForm user={user} />);
  };
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button type="primary" onClick={() => editUser(user)}>
              <EditOutlined />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Desactivar Usuario")}
            >
              <StopOutlined />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Desactivar Usuario")}
            >
              <DeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`${user.name ? user.name : "..."}${
              user.lastname ? user.lastname : "..."
            }`}
            description={user.email}
          ></List.Item.Meta>
        </List.Item>
      )}
    ></List>
  );
}

function UsersInactive({ usersInactive }) {
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => console.log("Editar Usuario")}
            >
              <CheckOutlined />
            </Button>,

            <Button
              type="danger"
              onClick={() => console.log("Desactivar Usuario")}
            >
              <DeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`${user.name ? user.name : "..."}${
              user.lastname ? user.lastname : "..."
            }`}
            description={user.email}
          ></List.Item.Meta>
        </List.Item>
      )}
    ></List>
  );
}
