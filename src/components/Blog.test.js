import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  let mockHandlerLike;
  let mockHandlerDelete;

  beforeEach(() => {
    const blog = {
      title: "The best blog",
      author: "pouya",
      likes: 10,
      user: {
        name: "blog owner"
      }
    };

    const user = {
      name: "pouya",
      username: "pouya_username"
    };

    mockHandlerLike = jest.fn();
    mockHandlerDelete = jest.fn();
    component = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={mockHandlerLike}
        handleDelete={mockHandlerDelete}
      />
    );
  });

  it("should render name and author of the blog by default", () => {
    expect(component.container).toHaveTextContent("The best blog");
    expect(component.container).toHaveTextContent("pouya");
  });

  it("shoould render the info of the blog when clicked on its name", () => {
    const name = component.getByText("The best blog");
    fireEvent.click(name);

    const div = component.container.querySelector(".infoWhenClicked");
    expect(div).not.toHaveStyle("display: none");
  });
});
