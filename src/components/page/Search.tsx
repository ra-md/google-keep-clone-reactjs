import NoteList from "../note/NoteList";
import { useParams } from "react-router-dom";
import { useNoteStore } from "~/store/noteStore";
import { searchNotes } from "~/utils/search-notes";

export default function Search() {
  const { query } = useParams<{ query: string }>();
  const notes = useNoteStore((state) => state.notes);

  const filteredNotes = searchNotes(notes, query);

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
