import { render, screen, userEvent } from "~/utils/test-utils";
import UpdateNote from "../UpdateNote";

const note = {
  noteName: "note 1 name",
  noteText: "note 1 text",
  id: "1",
  labelIds: [],
};

describe("UpdateNote", () => {
  beforeEach(() => {
    render(
      <UpdateNote note={note} openUpdateNote={true} onOpenChange={() => null} />
    );
  });

  it("should disable update button if title input and text input have not changed", () => {
    expect(screen.getByRole("button", { name: "update note" })).toBeDisabled();
  });

  it("should disable update button if title input and text input are empty", () => {
    userEvent.clear(screen.getByDisplayValue(note.noteName));
    userEvent.clear(screen.getByDisplayValue(note.noteText));

    expect(screen.getByRole("button", { name: "update note" })).toBeDisabled();
  });

  it("should enable update button if title input has changed", () => {
    userEvent.type(screen.getByDisplayValue(note.noteName), "update");

    expect(
      screen.getByRole("button", { name: "update note" })
    ).not.toBeDisabled();
  });

  it("should enable update button if text input has changed", () => {
    userEvent.type(screen.getByDisplayValue(note.noteText), "update");

    expect(
      screen.getByRole("button", { name: "update note" })
    ).not.toBeDisabled();
  });
});
