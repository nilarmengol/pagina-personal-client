import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import noAvatar from "../../../../assets/img/png/user.png";
import {
  Avatar,
  Select,
  Form,
  Col,
  Row,
  Input,
  Button,
  notification
} from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import "./EditUserForm.scss";
import {
  getAvatarApi,
  uploadAvatarApi,
  updateUserApi
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

export default function EditUserForm({
  user,
  setIsVisibleModal,
  setReloadUsers
}) {
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    console.log("hi");
    setUserData({
      ...userData,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      password: "",
      repeatPassword: ""
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log(userData);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = e => {
    const token = getAccessTokenApi();
    let userUpdate = userData;

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales"
        });
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }

    if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
      notification["error"]({
        message: "El nombre, apellidosy email son obligatorios"
      });

      return;
    }

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then(response => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then(result => {
          notification["success"]({
            message: result.message
          });
        });
      });
    } else {
      updateUserApi(token, userUpdate, user._id).then(result => {
        notification["success"]({
          message: result.message
        });
      });
    }
    setIsVisibleModal(false);
    setReloadUsers(true);
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
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={noAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : noAvatar} />
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
              value={userData.name}
              onChange={e => setUserData({ ...userData, name: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Apellidos"
              value={userData.lastname}
              onChange={e =>
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
              value={userData.email}
              onChange={e =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selección de rol"
              onChange={e => setUserData({ ...userData, role: e })}
              value={userData.role}
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
              value={userData.password}
              onChange={e =>
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
              value={userData.repeatPassword}
              onChange={e =>
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
