import axios from "axios";

const baseUrl = "/api/login";

const login = async (username, password) => {
  const data = { username, password };
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default login;
