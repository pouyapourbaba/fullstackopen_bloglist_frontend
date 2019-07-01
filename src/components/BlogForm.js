import React from "react";

const BLogFrom = ({ handleCreateBlog, title, author, url }) => {
  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        <label>title:</label>
        <input {...title} />
      </div>
      <div>
        <label>author:</label>
        <input {...author} />
      </div>
      <div>
        <label>url:</label>
        <input {...url} />
      </div>
      <button onClick={handleCreateBlog}>create</button>
    </form>
  );
};

export default BLogFrom;
