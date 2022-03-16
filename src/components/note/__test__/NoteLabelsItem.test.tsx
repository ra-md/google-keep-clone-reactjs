import { render, screen, userEvent } from "~/utils/test-utils";
import NoteLabelsItem from "../NoteLabelsItem";

const label = {
  id: "1",
  labelName: "label 1",
};

describe("NoteLabelsItem", () => {
  beforeEach(() => {
    render(<NoteLabelsItem label={label} noteId="1" />);
  });

  it("should render label name correctly", () => {
    expect(screen.getByText(label.labelName)).toBeInTheDocument();
  });

  it("should render Remove label button when label hovered", async () => {
    userEvent.hover(screen.getByTestId("remove-label-wrapper"));
    expect(screen.getByRole("button", { name: /remove label/i })).toBeVisible();
  });
});
