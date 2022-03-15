import { useState, useEffect } from "react";
import TextareaAutoSize from "react-textarea-autosize";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { useNoteStore } from "~/store/noteStore";
import NoteLabels from "./NoteLabels";
import { Note } from "~/types";
import { DialogClose } from "~/components/ui/Dialog";

interface UpdateNoteProps extends Note {
  visible: boolean;
  toggle: () => void;
}

export default function UpdateNote(props: UpdateNoteProps) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const updateNote = useNoteStore((state) => state.updateNote);

  useEffect(() => {
    setTitle(props.noteName!);
    setNote(props.noteText!);
  }, [props.noteName, props.noteText]);

  function handleUpdate() {
    if (title !== props.noteName || note !== props.noteText) {
      updateNote({
        noteName: title,
        noteText: note,
        id: props.id,
        labelIds: props.labelIds,
      });
    }
  }

  return (
    <>
      <Input
        onChange={(event) => setTitle(event.target.value)}
        value={title}
        placeholder="Title"
      />
      <TextareaAutoSize
        onChange={(event) => setNote(event.target.value)}
        value={note}
        className="textarea max-h-96"
        placeholder="Take a note..."
      />

      <div className="flex items-center mt-2 justify-between">
        <div className="note-label-list">
          <NoteLabels labelId={props.labelIds} noteId={props.id} />
        </div>
        <div className="flex">
          <DialogClose asChild>
            <Button
              className="mr-2"
              size="small"
              aria-label="close update note dialog"
            >
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              size="small"
              aria-label="update note"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </DialogClose>
        </div>
      </div>
    </>
  );
}
