import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./AddMenuWebForm.scss";

export default function AddMenuWebForm() {
  return (
    <div className="add-menu-web-form">
      <AddForm />
    </div>
  );
}

function AddForm({}) {
  const { Option } = Select;
  const selectBefore = (
    <Select defaultValue="http://" style={{ width: 90 }}>
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <Form className="form-add">
      <Form.Item>
        <Input
          prefix={<UserOutlined type="font-size" />}
          placeholder="Título"
        />
      </Form.Item>
      <Form.Item>
        <Input placeholder="URL" addonBefore={selectBefore} />
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
