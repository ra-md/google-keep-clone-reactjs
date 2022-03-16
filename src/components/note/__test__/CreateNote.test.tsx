import "@testing-library/jest-dom";
import { render, screen, userEvent } from "~/utils/test-utils";
import CreateNote from "../CreateNote";

describe("CreateNote", () => {
  beforeEach(() => {
    render(<CreateNote />);
  })

  it("should show title input when text input clicked", () => {
    expect(screen.queryByPlaceholderText("Title")).not.toBeInTheDocument();

    userEvent.click(screen.getByPlaceholderText("Take a note..."));

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
  });

  it("should show Close button when text input clicked", () => {
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
