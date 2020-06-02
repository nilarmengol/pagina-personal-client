import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import noAvatar from "../../../../assets/img/png/user.png";
import { Avatar } from "antd";
import "./EditUserForm.scss";

export default function EditUserForm({ user }) {
  const [avatar, setAvatar] = useState(null);
  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <h2>{user.email}</h2>
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
