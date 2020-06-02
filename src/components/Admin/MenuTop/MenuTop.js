import React from "react";
import "./MenuTop.scss";
import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined
} from "@ant-design/icons";
import NilLogo from "../../../assets/img/png/logo.png";
import { logout } from "../../../api/auth";

export default function MenuTop({ setMenuCollapsed, menuCollapsed }) {
  const logOutUser = () => {
    logout();
    window.location.reload();
  };
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <Link to={"/"}>
          <img
            className="menu-top__left-logo"
            src={NilLogo}
            alt="Nil-Edmon Armengol Tous"
          />
        </Link>
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={logOutUser}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
