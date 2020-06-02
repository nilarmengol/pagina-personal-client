import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import noAvatar from "../../../../assets/img/png/user.png";
import { Avatar, Select, Form, Col, Row, Input, Button } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import "./EditUserForm.scss";

export default function EditUserForm({ user }) {
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = (e) => {
    console.log(userData);
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        user={user}
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

function UploadAvatar({ avatar, setAvatar }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={noAvatar} />
      ) : (
        <Avatar size={150} src={avatar ? avatar.preview : noAvatar} />
      )}
    </div>
  );
}

function EditForm({ user, userData, setUserData, updateUser }) {
  const { Option } = Select;
  return (
    <Form className="form-edit" onFinish={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre"
              defaultValue={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Apellidos"
              defaultValue={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Correo electrónico"
              defaultValue={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selección de rol"
              onChange={(e) => setUserData({ ...userData, role: e })}
              defaultValue={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewer">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Repetir contraseña"
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
