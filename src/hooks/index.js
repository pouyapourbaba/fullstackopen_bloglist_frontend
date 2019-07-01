import { useState, useEffect } from "react";
import axios from "axios";

export const useField = type => {
  const [value, setVlaue] = useState("");

  const onChange = e => {
    setVlaue(e.target.value);
  };

  const onReset = () => {
    setVlaue("");
  };

  return { type, value, onChange, onReset };
};

let token = null;

export const useResource = baseUrl => {
  const [resources, setResources] = useState([]);

  const setToken = newToken => {
    token = `bearer ${newToken}`;
  };

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data.sort((a, b) => b.likes - a.likes));
    };

    getAll();
  }, []);

  const create = async resource => {
    const config = {
      headers: {
        Authorization: token
      }
    };

    const response = await axios.post(baseUrl, resource, config);
    setResources([...resources, response.data]);
  };

  const likeResource = async resource => {
    const config = {
      headers: {
        Authorization: token
      }
    };

    const likedRecource = {
      ...resource,
      likes: (resource.likes += 1),
      user: resource.user.id
    };

    const response = await axios.put(
      `${baseUrl}/${resource.id}`,
      likedRecource,
      config
    );
    setResources(
      resources.map(b => (b.id === resource.id ? response.data : b))
    );
  };

  const deleteRecource = async resource => {
    const config = {
      headers: {
        Authorization: token
      }
    };

    await axios.delete(`${baseUrl}/${resource.id}`, config);
    setResources(resources.filter(b => b.id !== resource.id));
  };

  const service = {
    create,
    setToken,
    likeResource,
    deleteRecource
  };

  return [resources, service];
};
