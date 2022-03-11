import "@testing-library/jest-dom";
import { render, screen, userEvent } from "~/utils/test-utils";
import EditLabelItem from "../EditLabelItem";

const label = {
  id: "1",
  labelName: "label 1",
};

describe("EditLabelItem", () => {
  it("should render label name", () => {
    render(<EditLabelItem label={label} />);

    expect(screen.getByText(label.labelName)).toBeInTheDocument();
  });

  it("should render input field if rename button clicked", () => {
    render(<EditLabelItem label={label} />);

    userEvent.click(
      screen.getByRole("button", {
        name: /Rename label/i,
      })
    );

    expect(screen.getByDisplayValue(label.labelName)).toBeInTheDocument();
  });

  it("should not close the input field if the value is empty", () => {
    render(<EditLabelItem label={label} />);

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
