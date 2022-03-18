import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "~/types";

export interface NoteState {
  notes: Note[];
}

const initialState: NoteState = {
  notes: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    createNote: (state, action: PayloadAction<Note>) => {
      state.notes = [action.payload, ...state.notes];
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const notes = state.notes;
      const noteIndex = notes.findIndex(
        (note) => note.id === action.payload.id
      );

      if (noteIndex > -1) {
        const oldNote = notes[noteIndex];
        notes[noteIndex] = { ...oldNote, ...action.payload };

        state.notes = [...notes];
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    addLabel: (
      state,
      action: PayloadAction<{ noteId: string; labelId: string }>
    ) => {
      const notes = state.notes;
      const noteIndex = notes.findIndex(
        (note) => note.id === action.payload.noteId
      );

      if (noteIndex > -1) {
        notes[noteIndex].labelIds.push(action.payload.labelId);
        state.notes = notes;
      }
    },
    removeLabel: (
      state,
      action: PayloadAction<{ noteId: string; labelId: string }>
    ) => {
      const notes = state.notes;
      const noteIndex = notes.findIndex(
        (note) => note.id === action.payload.noteId
      );

      if (noteIndex > -1) {
        notes[noteIndex].labelIds = notes[noteIndex].labelIds?.filter(
          (id) => id !== action.payload.labelId
        );
        state.notes = [...notes];
      }
    },
  },
});

export const { createNote, updateNote, deleteNote, addLabel, removeLabel } =
  noteSlice.actions;

export default noteSlice.reducer;
