import React, { useState, useEffect } from "react";
import { useField } from "./hooks/index";
import Blog from "./components/Blog";
import login from "./services/login";
import {
  getAll,
  setToken,
  createBlog,
  likeBlog,
  deleteBlog
} from "./services/blogs";
import BlogFrom from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

function App() {
  const username = useField("text");
  const password = useField("text");
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({});
  const blogFormRef = React.createRef();
  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await login(username.value, password.value);
      setToken(user.token);
      setUser(user);
      username.onReset();
      password.onReset();
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
    } catch (error) {
      setNotification("Invalid credentials", "danger");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogListUser");
    setUser(null);
  };

  const handleCreateBlog = async e => {
    e.preventDefault();
    blogFormRef.current.toggleVisibility();

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    };
    try {
      const response = await createBlog(blog);
      setBlogs([...blogs, response]);

      title.onReset();
      author.onReset();
      url.onReset();

      setNotification({
        message: `a new blog ${blog.title} by ${blog.author} added`,
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
  };

  const handleLikeBlog = async blog => {
    const likedBlog = { ...blog, likes: (blog.likes += 1), user: blog.user.id };
    const respone = await likeBlog(likedBlog);
    setBlogs(blogs.map(b => (b.id === blog.id ? respone : b)));
  };

  const handleDeleteBlog = async blog => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      await deleteBlog(blog);
      setBlogs(blogs.filter(b => b.id !== blog.id));
    }
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
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
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
            <input {...username} />
          </div>
          <div>
            <label>password</label>
            <input {...password} />
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
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <div>
            <h2>create new</h2>
            <BlogFrom
              handleCreateBlog={handleCreateBlog}
              author={author}
              title={title}
              url={url}
            />
          </div>
        </Togglable>
        <div>
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLike={handleLikeBlog}
              handleDelete={handleDeleteBlog}
            />
          ))}
        </div>
      </div>
    );
  };

  return <div className="App">{!user ? loginForm() : userInfoAndBlogs()}</div>;
}

export default App;
