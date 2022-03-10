import { useState, useEffect } from "react";
import TextareaAutoSize from "react-textarea-autosize";
import Input from "~/components/ui/Input";
import Modal from "~/components/ui/Modal";
import Button from "~/components/ui/Button";
import { useNoteStore } from "~/store/noteStore";
import NoteLabels from "./NoteLabels";
import { Note } from "~/types";

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
    props.toggle();
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
    <Modal visible={props.visible} toggle={handleUpdate}>
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

      <div className="note-label-list flex items-center mt-2">
        <NoteLabels labelId={props.labelIds} noteId={props.id} />
        <Button
          className="ml-auto"
          size="small"
          aria-label="close update note dialog"
          onClick={handleUpdate}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
