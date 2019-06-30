import React from "react";

const BLogFrom = ({
  handleCreateBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        <label>title:</label>
        <input onChange={handleTitleChange} />
      </div>
      <div>
        <label>author:</label>
        <input onChange={handleAuthorChange} />
      </div>
      <div>
        <label>url:</label>
        <input onChange={handleUrlChange} />
      </div>
      <button onClick={handleCreateBlog}>create</button>
    </form>
  );
};

export default BLogFrom;
