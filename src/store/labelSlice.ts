import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Label } from "~/types";

export interface LabelState {
  labels: Label[];
}

const initialState: LabelState = {
  labels: [],
};

export const labelSlice = createSlice({
  name: "label",
  initialState,
  reducers: {
    createLabel: (state, action: PayloadAction<Label>) => {
      state.labels = [action.payload, ...state.labels];
    },
    updateLabel: (state, action: PayloadAction<Label>) => {
      const labels = state.labels;
      const labelIndex = labels.findIndex(
        (label) => label.id === action.payload.id
      );

      if (labelIndex > -1) {
        const oldLabel = labels[labelIndex];
        labels[labelIndex] = { ...oldLabel, ...action.payload };

        state.labels = labels;
      }
    },
    deleteLabel: (state, action: PayloadAction<string>) => {
      state.labels = state.labels.filter(
        (label) => label.id !== action.payload
      );
    },
  },
});

export const { createLabel, updateLabel, deleteLabel } = labelSlice.actions;
export default labelSlice.reducer;
