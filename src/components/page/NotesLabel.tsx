import { useParams } from "react-router-dom";
import NoteList from "../note/NoteList";
import { Tag } from "react-feather";
import { useNoteStore } from "~/store/noteStore";
import { useLabelStore } from "~/store/labelStore";

export default function NotesLabel() {
  const { labelName } = useParams<{ labelName: string }>();
  const notes = useNoteStore((state) => state.notes);
  const labels = useLabelStore((state) => state.labels);

  const findLabel = labels.find((label) => label.labelName === labelName);
  const filteredNotes = notes.filter((note) => {
    if (findLabel) {
      return note.labelIds.find((id) => id === findLabel.id);
    }
  });

  return (
    <>
      {filteredNotes.length > 0 ? (
        <NoteList notes={filteredNotes} />
      ) : (
        <div className="text-secondary flex flex-col items-center text-center h-80 justify-end">
          <Tag size={70} />
          <h1 className="mt-8">No notes with this label yet</h1>
        </div>
      )}
    </>
  );
}
