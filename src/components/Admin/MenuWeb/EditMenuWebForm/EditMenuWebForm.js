import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { UserOutlined, LinkOutlined } from "@ant-design/icons";
import { updateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

import "./EditMenuWebForm.scss";

export default function AddMenuWebForm({
  setIsVisibleModal,
  setReloadMenuWeb,
  menu
}) {
  const [menuWebData, setMenuWebData] = useState({});

  useEffect(() => {
    setMenuWebData(menu);
  }, [menu]);

  const editMenu = event => {
    if (!menuWebData.title || !menuWebData.url) {
      notification["error"]({ message: "Todos los campos son obligatorios" });
    } else {
      const accessToken = getAccessTokenApi();

      updateMenuApi(accessToken, menuWebData._id, menuWebData).then(
        response => {
          notification["success"]({ message: response });
        }
      );
      setIsVisibleModal(false);
      setReloadMenuWeb(true);
    }
  };

  return (
    <div className="edit-menu-web-form">
      <EditForm
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
        editMenu={editMenu}
      />
    </div>
  );
}

function EditForm({ menuWebData, setMenuWebData, editMenu }) {
  return (
    <Form className="form-edit" onFinish={editMenu}>
      <Form.Item>
        <Input
          prefix={<UserOutlined type="font-size" />}
          placeholder="Título"
          value={menuWebData.title}
          onChange={e =>
            setMenuWebData({ ...menuWebData, title: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined type="font-size" />}
          placeholder="URL"
          value={menuWebData.url}
          onChange={e =>
            setMenuWebData({ ...menuWebData, url: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          prefix={<UserOutlined />}
          type="primary"
          htmlType="submit"
          className="btn-submit"
        >
          Actualizar menú
        </Button>
      </Form.Item>
    </Form>
  );
}
