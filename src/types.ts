export interface Label {
  id: string;
  labelName: string;
}

export interface Note {
  id: string;
  noteName: string;
  noteText: string;
  labelIds: string[];
}
