import { Note } from "~/types";

export function searchNotes(notes: Note[], query: string) {
  return Array.from(
    new Set([
      ...notes.filter((note) => note.noteName.includes(query)),
      ...notes.filter((note) => note.noteText.includes(query)),
    ])
  );
}
