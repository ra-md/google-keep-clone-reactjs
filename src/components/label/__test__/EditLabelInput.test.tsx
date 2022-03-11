import "@testing-library/jest-dom";
import { render, screen, userEvent } from "~/utils/test-utils";
import EditLabelInput from "../EditLabelInput";

describe("EditLabelInput", () => {
  it("should clear the input field if the clear button clicked", () => {
    render(<EditLabelInput />);

    const input = screen.getByPlaceholderText("Create new label");

    userEvent.type(input, "test");

    expect(input).toHaveValue("test");

    userEvent.click(
      screen.getByRole("button", { name: /Clear edit label input/i })
    );

    expect(input).toHaveValue("");
  });
});
