import React, { useState, useEffect } from "react";
import { useField, useResource } from "./hooks/index";
import Blog from "./components/Blog";
import login from "./services/login";
import BlogFrom from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

function App() {
  const username = useField("text");
  const password = useField("text");
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const [blogs, blogService] = useResource("/api/blogs");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({});
  const blogFormRef = React.createRef();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await login(username.value, password.value);
      blogService.setToken(user.token);

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
      await blogService.create(blog);

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

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogListUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
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
              handleLike={blogService.likeResource}
              handleDelete={blogService.deleteRecource}
            />
          ))}
        </div>
      </div>
    );
  };

  return <div className="App">{!user ? loginForm() : userInfoAndBlogs()}</div>;
}

export default App;
