import { useState, useEffect } from "react";
import TextareaAutoSize from "react-textarea-autosize";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { useNoteStore } from "~/store/noteStore";
import NoteLabelsList from "./NoteLabelsList";
import { Note } from "~/types";
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogTitle,
} from "~/components/ui/Dialog";

interface UpdateNoteProps {
  note: Note;
  onOpenChange: () => void;
  openUpdateNote: boolean;
}

export default function UpdateNote({
  note,
  onOpenChange,
  openUpdateNote,
}: UpdateNoteProps) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const updateNote = useNoteStore((state) => state.updateNote);
  const disabled =
    (name === note.noteName && text === note.noteText) ||
    (name === "" && text === "");

  useEffect(() => {
    setName(note.noteName!);
    setText(note.noteText!);
  }, [note.noteName, note.noteText, onOpenChange]);

  function handleUpdate() {
    if (disabled) return;

    updateNote({
      noteName: name,
      noteText: text,
      id: note.id,
      labelIds: note.labelIds,
    });
    onOpenChange();
  }

  return (
    <Dialog open={openUpdateNote} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Update note</DialogTitle>
        <Input
          onChange={(event) => setName(event.target.value)}
          value={name}
          placeholder="Title"
          data-test-id="update title"
        />
        <TextareaAutoSize
          onChange={(event) => setText(event.target.value)}
          value={text}
          className="textarea max-h-96"
          placeholder="Take a note..."
          data-test-id="update text"
        />

        <div className="flex items-center mt-2 justify-between">
          <div className="note-label-list">
            <NoteLabelsList labelId={note.labelIds} noteId={note.id} />
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
            <Button
              size="small"
              aria-label="update note"
              onClick={handleUpdate}
              disabled={disabled}
            >
              Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
