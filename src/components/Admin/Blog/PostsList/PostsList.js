import React from "react";
import { List, Button, Modal, notification } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./PostsList.scss";
import { Link } from "react-router-dom";
import { getAccessTokenApi } from "../../../../api/auth";
import { deletePostApi } from "../../../../api/post";

const { confirm } = Modal;

export default function PostsList({ posts, setReloadPosts, editPost }) {
  const deletePost = post => {
    const accessToken = getAccessTokenApi();
    deletePostApi(accessToken, post);

    confirm({
      title: "Eliminar",
      content: `¿Estás seguro de eliminar el post ${post.title}`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deletePostApi(accessToken, post._id)
          .then(response => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({ message: response.message });
            setReloadPosts(true);
          })
          .catch(() => {
            notification["error"]({ message: "Error del servidor" });
          });
      }
    });
  };

  return (
    <div className="posts-list">
      <List
        dataSource={posts.docs}
        renderItem={post => (
          <Post post={post} deletePost={deletePost} editPost={editPost} />
        )}
      />
    </div>
  );
}

function Post({ post, deletePost, editPost }) {
  return (
    <List.Item
      actions={[
        <Link to={`/blog/${post.url}`} target="_blank">
          <Button type="primary">
            <EyeOutlined />
          </Button>
        </Link>,
        <Button type="primary" target="_blank">
          <EditOutlined onClick={() => editPost(post)} />
        </Button>,
        <Button type="danger" target="_blank">
          <DeleteOutlined onClick={() => deletePost(post)} />
        </Button>
      ]}
    >
      <List.Item.Meta title={post.title} />
    </List.Item>
  );
}
