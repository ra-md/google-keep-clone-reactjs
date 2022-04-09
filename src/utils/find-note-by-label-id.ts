import { Note } from "~/types";

export function findNoteByLabelId(notes: Note[], labelId: string) {
  return notes.filter((note) => {
    return note.labelIds.find((id) => id === labelId);
  });
}
