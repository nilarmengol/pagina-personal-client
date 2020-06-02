import React, { useState } from "react";
import { Switch, List, Button, Item } from "antd";
import NoAvatar from "../../../../assets/img/png/user.png";

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
      {viewUsersActives ? <UsersActive /> : <UsersInactive />}
    </div>
  );
}

function UsersActive() {
  return <h3>Lista de usuarios activos</h3>;
}

function UsersInactive() {
  return <h3>Lista de usuarios Inactivos</h3>;
}
