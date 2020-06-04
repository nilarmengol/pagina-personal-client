import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Button,
  Item,
  Avatar,
  notification,
  Modal as ModalAntd
} from "antd";
import NoAvatar from "../../../../assets/img/png/user.png";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import {
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined
} from "@ant-design/icons";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";

import "./ListUsers.scss";

const { confirm } = ModalAntd;

export default function ListUsers({
  usersActive,
  usersInactive,
  setReloadUsers
}) {
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const showDeleteConfirm = user => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "eliminando el usuario",
      content: `¿Estás seguro que quieres eliminar a ${user.email}`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "cancelar",
      onOk() {
        deleteUserApi(accessToken, user._id)
          .then(response => {
            notification["success"]({ message: response });

            setReloadUsers(true);
          })
          .catch(err => {
            notification["error"]({ message: err });
          });
      }
    });
  };

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
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        />
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
  setReloadUsers,
  showDeleteConfirm
}) {
  const editUser = user => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={user => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        />
      )}
    />
  );
}

function UserActive({ user, editUser, setReloadUsers, showDeleteConfirm }) {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactivateUser = () => {
    const accessToken = getAccessTokenApi();

    activateUserApi(accessToken, user._id, false)
      .then(response => {
        notification["success"]({
          message: response
        });
        setReloadUsers(true);
      })
      .catch(err => {
        notification["error"]({
          message: err
        });
      });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={desactivateUser}>
          <StopOutlined />
        </Button>,
        <Button type="danger" onClick={() => showDeleteConfirm(user)}>
          <DeleteOutlined />
        </Button>
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.name ? user.name : "..."}${
          user.lastname ? user.lastname : "..."
        }`}
        description={user.email}
      ></List.Item.Meta>
    </List.Item>
  );
}

function UsersInactive({ usersInactive, setReloadUsers, showDeleteConfirm }) {
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={user => (
        <UserInactive
          user={user}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        />
      )}
    />
  );
}

function UserInactive({ user, setReloadUsers, showDeleteConfirm }) {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUser = () => {
    const accessToken = getAccessTokenApi();

    activateUserApi(accessToken, user._id, true)
      .then(response => {
        notification["success"]({
          message: response
        });
        setReloadUsers(true);
      })
      .catch(err => {
        notification["error"]({
          message: err
        });
      });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={activateUser}>
          <CheckOutlined />
        </Button>,

        <Button
          type="danger"
          onClick={() => {
            showDeleteConfirm(user);
          }}
        >
          <DeleteOutlined />
        </Button>
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.name ? user.name : "..."}${
          user.lastname ? user.lastname : "..."
        }`}
        description={user.email}
      ></List.Item.Meta>
    </List.Item>
  );
}
