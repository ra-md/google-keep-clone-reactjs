import CreateNote from "../note/CreateNote";
import NoteList from "../note/NoteList";
import { useSelector } from 'react-redux'

export default function Home() {
  const notes = useSelector(state => state.note.notes)

  return (
    <>
      <CreateNote />
      <NoteList notes={notes} />
    </>
  );
}
