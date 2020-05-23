import React from "react";
import "./MenuTop.scss";
import { Button } from "antd";
import { HomeOutlined, PoweroffOutlined } from "@ant-design/icons";
import NilLogo from "../../../assets/img/png/logo.png";

export default function MenuTop() {
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={NilLogo}
          alt="Nil-Edmon Armengol Tous"
        />
        <Button type="link" onClick={() => console.log("Click.")}>
          <HomeOutlined />
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={() => console.log("Click.")}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
