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
  };

  useEffect(async () => {
    const blogs = await getAll();
    console.log("blogs ", blogs);
    setBlogs(blogs);
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
        {user.name} logged in <button>logout</button>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  console.log(user);

  return <div className="App">{!user ? loginForm() : userInfoAndBlogs()}</div>;
}

export default App;
