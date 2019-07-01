import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

export const setToken = newToken => {
  token = `bearer ${newToken}`;
};

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createBlog = async newObject => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export const likeBlog = async newObject => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config);
  return response.data;
};

export const deleteBlog = async newObject => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  await axios.delete(`${baseUrl}/${newObject.id}`, config);
};
