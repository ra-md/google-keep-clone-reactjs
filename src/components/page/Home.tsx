import CreateNote from "../note/CreateNote";
import NoteList from "../note/NoteList";
import { useSelector } from "react-redux";
import { RootState } from "~/store/store";

export default function Home() {
  const notes = useSelector((state: RootState) => state.note.notes);

  return (
    <>
      <CreateNote />
      <NoteList notes={notes} />
    </>
  );
}
