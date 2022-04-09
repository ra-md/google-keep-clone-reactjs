import { searchNotes } from "../search-notes";

export const fakeNotes = [
  {
    id: "1",
    noteName: "note 1",
    noteText: "",
    labelIds: ["1", "2"],
  },
  {
    id: "2",
    noteName: "",
    noteText: "note 2",
    labelIds: ["2"],
  },
  {
    id: "3",
    noteName: "note 2",
    noteText: "note 1",
    labelIds: [],
  },
];

describe("search-notes", () => {
  it("should return correct notes", () => {
    const filteredNotes = searchNotes(fakeNotes, "note 1");

    expect(filteredNotes).toEqual([fakeNotes[0], fakeNotes[2]]);
  });

  it("should return empty array when the notes is not containing searched text", () => {
    const filteredNotes = searchNotes(fakeNotes, "test 1");

    expect(filteredNotes).toEqual([]);
  });
});
