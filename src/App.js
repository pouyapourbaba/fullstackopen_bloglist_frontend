import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import login from "./services/login";
import getAll from "./services/blogs";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const handleLogin = async e => {
    e.preventDefault();
    const user = await login(username, password);
    setUser(user);
    window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogListUser");
    setUser(null);
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogListUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
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
        {user.name} logged in <button onClick={handleLogout}>logout</button>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return <div className="App">{!user ? loginForm() : userInfoAndBlogs()}</div>;
}

export default App;
