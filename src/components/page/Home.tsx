import CreateNote from "../note/CreateNote";
import NoteList from "../note/NoteList";
import { useNoteStore } from "~/store/noteStore";

export default function Home() {
  const notes = useNoteStore((state) => state.notes);

  return (
    <>
      <CreateNote />
      <NoteList notes={notes} />
    </>
  );
}
