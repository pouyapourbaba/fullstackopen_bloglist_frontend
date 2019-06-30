import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import login from "./services/login";
import { getAll, setToken, createBlog } from "./services/blogs";
import BlogFrom from "./components/BlogForm";
import Notification from "./components/Notification";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({});

  const handleLogin = async e => {
    e.preventDefault();
    const user = await login(username, password);

    setToken(user.token);
    setUser(user);
    window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogListUser");
    setUser(null);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };
  const handleAuthorChange = e => {
    setAuthor(e.target.value);
  };
  const handleUrlChange = e => {
    setUrl(e.target.value);
  };

  const handleCreateBlog = async e => {
    e.preventDefault();
    const blog = {
      title,
      author,
      url
    };
    try {
      const response = await createBlog(blog);
      setBlogs([...blogs, response]);
      setNotification({
        message: `a new blog You're NOT gonna need it! by ${blog.author} added`,
        type: "success"
      });

      setTimeout(() => {
        setNotification({});
      }, 5000);
    } catch (error) {
      setNotification({
        message: "the blog not added",
        type: "danger"
      });
      setTimeout(() => {
        setNotification({});
      }, 5000);
    }
    // }
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogListUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const asyncFetch = async () => {
      const blogs = await getAll();
      setBlogs(blogs);
    };

    asyncFetch();
  }, []);

  const loginForm = () => {
    return (
      <div>
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>username</label>
            <input onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <label>password</label>
            <input onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const userInfoAndBlogs = () => {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification notification={notification} />
        {user.name} logged in <button onClick={handleLogout}>logout</button>
        <div>
          <h2>create new</h2>
          <BlogFrom
            handleCreateBlog={handleCreateBlog}
            handleAuthorChange={handleAuthorChange}
            handleTitleChange={handleTitleChange}
            handleUrlChange={handleUrlChange}
          />
        </div>
        <div>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    );
  };

  return <div className="App">{!user ? loginForm() : userInfoAndBlogs()}</div>;
}

export default App;
