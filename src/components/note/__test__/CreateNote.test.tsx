import "@testing-library/jest-dom";
import { render, screen, userEvent } from "~/utils/test-utils";
import CreateNote from "../CreateNote";

describe("CreateNote", () => {
  it("should show title input when text input clicked", () => {
    render(<CreateNote />);

    expect(screen.queryByPlaceholderText("Title")).not.toBeInTheDocument();

    userEvent.click(screen.getByPlaceholderText("Take a note..."));

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
  });

  it("should show Close button when text input clicked", () => {
    render(<CreateNote />);

    expect(
      screen.queryByRole("button", {
        name: /Close/i,
      })
    ).not.toBeInTheDocument();

    userEvent.click(screen.getByPlaceholderText("Take a note..."));

    expect(
      screen.getByRole("button", {
        name: /Close/i,
      })
    ).toBeInTheDocument();
  });
});
