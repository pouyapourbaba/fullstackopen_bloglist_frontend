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

export const createBlog = async blog => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

export const likeBlog = async blog => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

export default { getAll, setToken };
