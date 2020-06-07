import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { addMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddMenuWebForm.scss";

export default function AddMenuWebForm({
  setIsVisibleModal,
  setReloadMenuWeb
}) {
  const [menuWebData, setMenuWebData] = useState({});

  const addMenu = event => {
    let finalData = {
      title: menuWebData.title,
      url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url
    };
    if (!finalData.title || !finalData.url || !menuWebData.url) {
      notification["error"]({ message: "Todos los campos son obligatorios" });
    } else {
      const accessToken = getAccessTokenApi();
      finalData.active = false;
      finalData.order = 1000;
      addMenuApi(accessToken, finalData)
        .then(response => {
          notification["success"]({ message: response });
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
          setMenuWebData({});
          finalData = {};
        })
        .catch(() => {
          notification["error"]({ message: "Error en el servidor" });
        });
    }
  };

  return (
    <div className="add-menu-web-form">
      <AddForm
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
        addMenu={addMenu}
      />
    </div>
  );
}

function AddForm({ menuWebData, setMenuWebData, addMenu }) {
  const { Option } = Select;
  const selectBefore = (
    <Select
      defaultValue="http://"
      style={{ width: 90 }}
      onChange={e => setMenuWebData({ ...menuWebData, http: e })}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <Form className="form-add" onFinish={addMenu}>
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
          placeholder="URL"
          addonBefore={selectBefore}
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
          Crear Menu
        </Button>
      </Form.Item>
    </Form>
  );
}
