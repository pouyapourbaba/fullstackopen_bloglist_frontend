import React, { useState } from "react";
import { likeBlog } from "../services/blogs";

const Blog = ({ blog, handleLike }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  

  return (
    <div style={blogStyle}>
      {!detailsVisible ? (
        <div>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setDetailsVisible(!detailsVisible)}
          >
            {blog.title}
          </span>{" "}
          {blog.author}
        </div>
      ) : (
        <div>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setDetailsVisible(!detailsVisible)}
          >
            {blog.title}
          </span>
          <br />
          <span>
            <a href={blog.url}>{blog.url}</a>
          </span>
          <br />
          <span>
            {blog.likes} likes{" "}
            <button onClick={() => handleLike(blog)}>like</button>
          </span>
          <br />
          <span>added by {blog.user.name}</span>
        </div>
      )}
    </div>
  );
};

export default Blog;
