const blogs = [
  {
    title: "title1",
    author: "author1",
    url: "url1",
    likes: 0,
    user: {
      username: "pouya_username",
      name: "pouya",
      id: "5d1933077c21f6ce80531f46"
    },
    id: "5d19a387aed8e9e24084ae57"
  },
  {
    title: "title_hamid",
    author: "someone_hamid",
    url: "url_hamid",
    likes: 0,
    user: {
      username: "hamid_username",
      name: "hamid",
      id: "5d19a3a9aed8e9e24084ae58"
    },
    id: "5d19a60623c9df27f8af4224"
  }
];

// eslint-disable-next-line no-unused-vars
let token = null;

export const getAll = () => {
  return Promise.resolve(blogs);
};

export const setToken = newToken => {
  token = `bearer ${newToken}`;
};
