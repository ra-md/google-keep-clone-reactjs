import "@testing-library/jest-dom";
import { render, screen, userEvent } from "~/utils/test-utils";
import EditLabelItem from "../EditLabelItem";

const label = {
  id: "1",
  labelName: "label 1",
};

describe("EditLabelItem", () => {
  beforeEach(() => {
    render(<EditLabelItem label={label} />);
  })

  it("should render label name", () => {
    expect(screen.getByText(label.labelName)).toBeInTheDocument();
  });

  it("should render input field if rename button clicked", () => {
    userEvent.click(
      screen.getByRole("button", {
        name: /Rename label/i,
      })
    );

    expect(screen.getByDisplayValue(label.labelName)).toBeInTheDocument();
  });

  it("should not close the input field if the value is empty", () => {
    userEvent.click(
      screen.getByRole("button", {
        name: /Rename label/i,
      })
    );

    userEvent.clear(screen.getByDisplayValue(label.labelName));

    userEvent.click(
      screen.getByRole("button", {
        name: /Save label/i,
      })
    );

    expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });
});
