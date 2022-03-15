import { useState } from "react";
import { Trash2, Tag } from "react-feather";
import Button from "~/components/ui/Button";
import UpdateNote from "./UpdateNote";
import { Note } from "~/types";
import clsx from "clsx";
import { useNoteStore } from "~/store/noteStore";
import SearchLabel from "../label/SearchLabel";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "~/components/ui/Dialog";

interface NoteItemProps extends Note {}

export default function NoteItem({ note }: { note: NoteItemProps }) {
  const [openUpdateNote, setOpenUpdateNote] = useState(false);
  const [openAddLabel, setOpenAddLabel] = useState(false);
  const deleteNote = useNoteStore((state) => state.deleteNote);

  const slicedNote =
    note.noteText && note.noteText.length > 300
      ? `${note.noteText.slice(0, 300)}...`
      : note.noteText;

  function updateNoteToggle() {
    setOpenUpdateNote(!openUpdateNote);
  }

  function addLabelToggle() {
    setOpenAddLabel(!openAddLabel);
  }

  return (
    <>
      <li
        className={clsx(
          "border relative border-secondary rounded-lg mb-5 bg-primary break-words w-full md:w-60",
          openUpdateNote && "opacity-0"
        )}
        onClick={updateNoteToggle}
      >
        <div aria-label="update this note" className="px-4 py-2">
          <div className="mb-6">
            <h1>{note.noteName}</h1>
            <p>{slicedNote}</p>
          </div>
          <div
            className={`flex justify-end absolute inset-0 items-end opacity-0 hover:opacity-100 focus:opacity-100 duration-200 ease-in-out mb-0.5 mr-0.5`}
          >
            <Button
              icon
              aria-label="Add label"
              onClick={(event) => {
                event.stopPropagation();
                addLabelToggle();
              }}
            >
              <Tag size={17} />
            </Button>
            <Button
              icon
              aria-label="Delete note"
              onClick={(event) => {
                event.stopPropagation();
                deleteNote(note.id);
              }}
            >
              <Trash2 size={17} />
            </Button>
          </div>
        </div>
      </li>
      <Dialog open={openUpdateNote} onOpenChange={updateNoteToggle}>
        <DialogContent>
          <DialogTitle>Update note</DialogTitle>
          <UpdateNote note={note} onOpenChange={updateNoteToggle} />
        </DialogContent>
      </Dialog>
      <Dialog open={openAddLabel} onOpenChange={addLabelToggle}>
        <DialogContent>
          <DialogTitle>Add label</DialogTitle>
          <SearchLabel note={note} />
        </DialogContent>
      </Dialog>
    </>
  );
}
