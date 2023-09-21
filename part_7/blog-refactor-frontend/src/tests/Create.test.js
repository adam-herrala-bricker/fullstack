import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Create from "../components/Create";

const blog = {
  title: "test title",
  author: "test author",
  url: "test.com/url",
  likes: 17,
  user: {
    username: "t.ester",
    name: "Tester Randy",
    id: "tttttttttttttttttttttttt",
  },
};

const user0 = {
  username: "t.ester",
  name: "Tester Randy",
};

test("create new EH passes expect props", async () => {
  const createNew = jest.fn();

  const user = userEvent.setup();

  //create a container w the rendered component inside
  const { container } = render(<Create handleCreateNew={createNew} />);

  //finding input based on their css selector
  const titleInput = container.querySelector("input[name='title']");
  const authorInput = container.querySelector("input[name='author']");
  const urlInput = container.querySelector("input[name='url']");

  await user.type(titleInput, "new title");
  await user.type(authorInput, "new author");
  await user.type(urlInput, "new url");

  const createButton = screen.getByText("create");
  await user.click(createButton);

  //screen.debug() //prints the component's html to the console

  expect(createNew.mock.calls).toHaveLength(1);
  expect(createNew.mock.calls[0][0].title).toBe("new title");
  expect(createNew.mock.calls[0][0].author).toBe("new author");
  expect(createNew.mock.calls[0][0].url).toBe("new url");
});
