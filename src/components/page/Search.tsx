import NoteList from "../note/NoteList";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function Search() {
  const { query } = useParams<{ query: string }>();
  const notes = useSelector(state => state.note.notes)

  const filterNotes = Array.from(
    new Set([
      ...notes.filter(({ noteName }) => noteName?.includes(query)),
      ...notes.filter(({ noteText }) => noteText?.includes(query)),
    ])
  );

  return (
    <>
      {filterNotes.length > 0 ? (
        <NoteList notes={filterNotes} />
      ) : (
        <h1 className="my-8">No matching results.</h1>
      )}
    </>
  );
}
