import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import logoWhite from "../../../assets/img/png/logo-white.png";
import { getMenuApi } from "../../../api/menu";
import SocialLinks from "../SocialLinks";

import "./MenuTop.scss";

export default function MenuTop() {
  const [menuData, setMenuData] = useState([]);
  console.log(menuData);
  useEffect(() => {
    getMenuApi().then(response => {
      let arrayMenu = [];
      response.menu.forEach(item => {
        if (item.active) {
          arrayMenu.push(item);
        }
      });
      setMenuData(arrayMenu);
    });
  }, []);

  return (
    <Menu className="menu-top-web" mode="horizontal">
      <Menu.Item className="menu-top-web__logo">
        <img src={logoWhite} alt="Nil Armengol" />
      </Menu.Item>
      {menuData.map(item => {
        const external = item.url.indexOf("http") > -1 ? true : false;

        if (external) {
          return (
            <Menu.Item key={item._id} className="menu-top-web__item">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </Menu.Item>
          );
        } else {
          return (
            <Menu.Item key={item._id} className="menu-top-web__item">
              <a href={item.url}>{item.title}</a>
            </Menu.Item>
          );
        }
      })}

      <SocialLinks />
    </Menu>
  );
}
