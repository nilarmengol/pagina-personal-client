import React, { useState } from "react";
import { Switch, List, Button, Item, Avatar } from "antd";
import NoAvatar from "../../../../assets/img/png/user.png";
import {
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import "./ListUsers.scss";

export default function ListUsers({ usersActive, usersInactive }) {
  const [viewUsersActives, setViewUsersActives] = useState(true);

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
        <UsersActive usersActive={usersActive} />
      ) : (
        <UsersInactive usersInactive={usersInactive} />
      )}
    </div>
  );
}

function UsersActive({ usersActive }) {
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => console.log("Editar Usuario")}
            >
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
