import { render, screen } from "~/utils/test-utils";
import SearchLabelItem from "../SearchLabelItem";

const label = {
  id: "1",
  labelName: "label 1",
};

const note = {
  id: "1",
  noteName: "note 1",
  noteText: "note 1",
  labelIds: [],
};

describe("SearchLabelItem", () => {
  it("should render label name", () => {
    render(<SearchLabelItem label={label} note={note} />);

    expect(screen.getByText(label.labelName)).toBeInTheDocument();
  });
});
