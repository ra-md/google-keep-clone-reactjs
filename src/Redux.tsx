import { RootState } from "./store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  createNote,
  deleteNote,
  updateNote,
  addLabel,
  removeLabel,
} from "./store/noteSlice";
import Button from "./components/ui/Button";

export default function Redux() {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.note.notes);

  const note = {
    id: "3",
    noteName: `note update name`,
    noteText: `note update text`,
    labelIds: [],
  };

  return (
    <div>
      <Button
        onClick={() => dispatch(removeLabel({ labelId: "11", noteId: "3" }))}
      >
        dispatch
      </Button>
      {notes.length > 0 ? (
        <>
          {notes.map((note) => {
            return (
              <div key={note.id}>
                <h1>
                  {note.noteName}, id: {note.id}
                </h1>
                {note.labelIds.length > 0 &&
                  note.labelIds.map((label) => <p key={label}>{label}</p>)}
              </div>
            );
          })}
        </>
      ) : (
        <h1>0.</h1>
      )}
    </div>
  );
}
