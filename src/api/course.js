import { basePath, apiVersion } from "./config";

export function getCoursesApi() {
  const url = `${basePath}/${apiVersion}/get-courses`;

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function updateCourseApi(token, courseId, data) {
  const url = `${basePath}/${apiVersion}/update-course/${courseId}`;

  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function addCourseApi(token, course) {
  const url = `${basePath}/${apiVersion}/add-course`;

  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(course)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
    });
}

export function deleteCourseApi(token, courseId) {
  const url = `${basePath}/${apiVersion}/delete-course/${courseId}`;

  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: token }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
    });
}

export function uploadImageApi(token, image, courseId) {
  const url = `${basePath}/${apiVersion}/upload-image-course/${courseId}`;

  const formData = new FormData();
  formData.append("image", image, image.name);
  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token
    }
  };
  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

export function getImageApi(imageName) {
  const url = `${basePath}/${apiVersion}/get-image/${imageName}`;

  return fetch(url)
    .then(response => {
      return response.url;
    })
    .catch(err => {
      return err.message;
    });
}
