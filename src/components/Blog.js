import React, { useState } from "react";
const Blog = ({ blog }) => {
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
            {blog.likes} likes <button>like</button>
          </span>
          <br />
          <span>added by {blog.author}</span>
        </div>
      )}
    </div>
  );
};

export default Blog;
