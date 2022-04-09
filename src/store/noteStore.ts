import create from "zustand";
import { persist } from "zustand/middleware";
import { Note } from "../types";

interface StoreState {
  notes: Note[] | [];
  createNote: (newNote: Note) => void;
  updateNote: (updateNote: Note) => void;
  deleteNote: (id: string) => void;
  addLabel: (labelId: string, noteId: string) => void;
  removeLabel: (labelId: string, noteId: string) => void;
}

export const useNoteStore = create<StoreState>(
  persist(
    (set, get) => ({
      notes: [],
      createNote(newNote) {
        set({ notes: [newNote, ...get().notes] });
      },
      updateNote(updateNote) {
        const { notes } = get();
        const noteIndex = notes.findIndex((note) => note.id === updateNote.id);

        if (noteIndex > -1) {
          const oldNote = notes[noteIndex];
          notes[noteIndex] = { ...oldNote, ...updateNote };

          set({ notes: [...notes] });
        }
      },
      deleteNote(id) {
        const { notes } = get();

        set({ notes: notes.filter((note) => note.id !== id) });
      },
      addLabel(labelId, noteId) {
        const { notes } = get();
        const noteIndex = notes.findIndex((note) => note.id === noteId);

        if (noteIndex > -1) {
          notes[noteIndex].labelIds?.push(labelId);
          set({ notes });
        }
      },
      removeLabel(labelId, noteId) {
        const { notes } = get();
        const noteIndex = notes.findIndex((note) => note.id === noteId);

        if (noteIndex > -1) {
          notes[noteIndex].labelIds = notes[noteIndex].labelIds?.filter(
            (id) => id !== labelId
          );
          set({ notes: [...notes] });
        }
      },
    }),
    { name: "note" }
  )
);
