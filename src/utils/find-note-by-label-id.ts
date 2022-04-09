import { Note } from "~/types";

export function findNoteByLabelId(notes: Note[], id: string) {
  return notes.filter((note) => {
    return note.labelIds.find((id) => id === id);
  });
}
