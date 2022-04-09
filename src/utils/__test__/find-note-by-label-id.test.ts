import { findNoteByLabelId } from "../find-note-by-label-id";
import { fakeNotes } from "./search-notes.test";

describe("find note by label id", () => {
  it("should return correct note", () => {
    const notes = findNoteByLabelId(fakeNotes, "2");

    expect(notes).toEqual([fakeNotes[0], fakeNotes[1]]);
  });

  it("should return empty array when the notes is not containing given id", () => {
    const notes = findNoteByLabelId(fakeNotes, "0");
    expect(notes).toEqual([]);
  });
});
