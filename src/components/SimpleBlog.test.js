import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

describe("Simple Blog", () => {
  let component;
  let mockHandler;

  beforeEach(() => {
    const blog = {
      title: "The best blog",
      author: "pouya",
      likes: 10
    };

    mockHandler = jest.fn();
    component = render(<SimpleBlog blog={blog} onClick={mockHandler} />);
  });

  test("renders the title, author, and likes", () => {
    expect(component.container).toHaveTextContent("The best blog");
    expect(component.container).toHaveTextContent("pouya");
    expect(component.container).toHaveTextContent("10");
  });

  test("the like button is clicked twice", () => {
    const button = component.getByText("like");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
