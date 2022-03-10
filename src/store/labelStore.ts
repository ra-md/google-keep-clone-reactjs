import create from "zustand";
import { persist } from "zustand/middleware";
import { Label } from "../types";

interface StoreState {
  labels: Label[];
  createLabel(newLabel: Label): void;
  updateLabel(updateLabel: Label): void;
  deleteLabel(id: string): void;
  searchLabel(label: string): Label[];
}

export const useLabelStore = create<StoreState>(
  persist(
    (set, get) => ({
      labels: [],
      createLabel(newLabel) {
        const { labels } = get();
        set({ labels: [newLabel, ...labels] });
      },
      updateLabel(updateLabel) {
        const { labels } = get();
        const labelIndex = labels.findIndex(
          (label) => label.id === updateLabel.id
        );

        if (labelIndex > -1) {
          const oldLabel = labels[labelIndex];
          labels[labelIndex] = { ...oldLabel, ...updateLabel };

          set({ labels: [...labels] });
        }
      },
      deleteLabel(id) {
        const { labels } = get();

        set({ labels: labels.filter((label) => label.id !== id) });
      },
      searchLabel(label) {
        const { labels } = get();
        return labels.filter(({ labelName }) => labelName.includes(label));
      },
    }),
    { name: "label" }
  )
);
