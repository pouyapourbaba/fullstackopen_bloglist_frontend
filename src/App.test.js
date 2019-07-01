import React from "react";
import { render, waitForElement } from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  it("if no user logged, notes are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("login"));

    expect(component.container).toHaveTextContent("login");
    expect(component.container).toHaveTextContent("log in to application");
  });

  it("should render the blogs when the user is logged in", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Donald Tester"
    };

    localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("Blogs"));

    expect(component.container).toHaveTextContent("Blog");
  });
});
