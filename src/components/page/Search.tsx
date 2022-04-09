import NoteList from "../note/NoteList";
import { useParams } from "react-router-dom";
import { useNoteStore } from "~/store/noteStore";
import { filterNotes } from "~/utils/filter-notes"

export default function Search() {
  const { query } = useParams<{ query: string }>();
  const notes = useNoteStore((state) => state.notes);

  const filteredNotes = filterNotes(notes, query);

  return (
    <>
      {filteredNotes.length > 0 ? (
        <NoteList notes={filteredNotes} />
      ) : (
        <h1 className="my-8">No matching results.</h1>
      )}
    </>
  );
}
