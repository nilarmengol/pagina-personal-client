import React, { useState, useEffect } from "react";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";
import { Row, Col, Form, Input, Button, DatePicker, notification } from "antd";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { addPostApi, updatePostApi } from "../../../../api/post";
import { getAccessTokenApi } from "../../../../api/auth";
import "./AddEditPostForm.scss";

export default function AddEditPostForm({
  post,
  setReloadPosts,
  setIsVisibleModal
}) {
  const [postData, setPostData] = useState({});

  useEffect(() => {
    if (post) {
      setPostData(post);
    } else {
      setPostData({});
    }
  }, [post]);

  const processPost = e => {
    const { title, url, description, date } = postData;

    if (!title || !url || !description || !date) {
      notification["error"]({ message: "Todos los campos son obligatorios" });
    } else if (!post) {
      addPost();
    } else {
      updatePost();
    }
  };

  const addPost = () => {
    const token = getAccessTokenApi();

    addPostApi(token, postData)
      .then(response => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({ message: response.message });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch(() => {
        notification["error"]({ message: "Error del servidor" });
      });
  };

  const updatePost = () => {
    const token = getAccessTokenApi();

    updatePostApi(token, post._id, postData)
      .then(response => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({ message: response.message });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch(() => {
        notification["error"]({ message: "Error del servidor" });
      });
  };

  return (
    <h1>
      <div className="add-edit-post-form">
        <AddEditForm
          postData={postData}
          setPostData={setPostData}
          post={post}
          processPost={processPost}
        />
      </div>
    </h1>
  );
}

function AddEditForm({ postData, setPostData, post, processPost }) {
  return (
    <Form className="add-edit-post-form" layout="inline" onFinish={processPost}>
      <Row gutter={24} style={{ width: "100%" }}>
        <Col span={8}>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Título"
            value={postData.title}
            onChange={e =>
              setPostData({
                ...postData,
                title: transformTextToUrl(e.target.value)
              })
            }
          />
        </Col>
        <Col span={8}>
          <Input
            prefix={<LinkOutlined />}
            placeholder="url"
            value={postData.url}
            onChange={e =>
              setPostData({
                ...postData,
                url: transformTextToUrl(e.target.value)
              })
            }
          />
        </Col>
        <Col span={8}>
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY HH:mm"
            placeholder="Fecha de publicación"
            value={postData.date && moment(postData.date)}
            onChange={(e, value) =>
              setPostData({
                ...postData,
                date: moment(value, "DD/MM/YYYY HH:mm").toISOString()
              })
            }
          />
        </Col>
      </Row>
      <div style={{ width: "100%" }}>
        {" "}
        <Editor
          value={postData.description ? postData.description : ""}
          init={{
            height: 400,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
						alignleft aligncenter alignright alignjustify | \
						bullist numlist outdent indent | removeformat | help"
          }}
          onBlur={e =>
            setPostData({ ...postData, description: e.target.getContent() })
          }
        />
      </div>

      <Button type="primary" htmlType="submit" className="btn-submit">
        {post ? "Actualizar post" : "Editar post"}
      </Button>
    </Form>
  );
}

function transformTextToUrl(text) {
  const url = text.replace(" ", "-");
  return url.toLowerCase();
}
