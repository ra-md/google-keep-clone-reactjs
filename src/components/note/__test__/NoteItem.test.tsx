import { render, screen, userEvent } from "~/utils/test-utils";
import NoteItem from "../NoteItem";

const note = {
  noteName: "note 1 name",
  noteText: "note 1 text",
  id: "1",
  labelIds: [],
};

const longNoteName =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis, massa a venenatis egestas, ante justo faucibus ligula";
const longNoteText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis, massa a venenatis egestas, ante justo faucibus ligula, non ultricies turpis lorem vitae mi. Duis imperdiet cursus enim in sollicitudin. Nam in tincidunt tortor. Quisque pellentesque ultrices orci sed semper. Nullam tortor placerat. ";

describe("NoteItem", () => {
  it("should render note correctly", () => {
    render(<NoteItem note={note} />);

    expect(screen.getByText(note.noteName)).toBeInTheDocument();
    expect(screen.getByText(note.noteText)).toBeInTheDocument();
  });

  it("should slice the note title if the title's length more than 100", () => {
    render(<NoteItem note={{ ...note, noteName: longNoteName }} />);

    const sliced = `${longNoteName.slice(0, 100)}...`;

    expect(screen.getByText(sliced)).toBeInTheDocument();
  });

  it("should slice the note text if the text's length more than 300", () => {
    render(<NoteItem note={{ ...note, noteText: longNoteText }} />);

    const sliced = `${longNoteText.slice(0, 300)}...`;

    expect(screen.getByText(sliced)).toBeInTheDocument();
  });

  it("should display delete note and add label button when note hovered", () => {
    render(<NoteItem note={note} />);

    userEvent.hover(screen.getByTestId("note-item-btn-wrapper"));

    expect(screen.getByRole("button", { name: /delete note/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /add label/i })).toBeVisible();
  });
});
