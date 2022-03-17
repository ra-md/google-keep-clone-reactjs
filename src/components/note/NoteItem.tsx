import { useState } from "react";
import { Trash2, Tag } from "react-feather";
import Button from "~/components/ui/Button";
import UpdateNote from "./UpdateNote";
import { Note } from "~/types";
import clsx from "clsx";
import { useNoteStore } from "~/store/noteStore";
import SearchLabel from "../label/SearchLabel";

interface NoteItemProps {
  note: Note
}

export default function NoteItem({ note }: NoteItemProps) {
  const [openUpdateNote, setOpenUpdateNote] = useState(false);
  const [openAddLabel, setOpenAddLabel] = useState(false);
  const [hover, setHover] = useState(false);
  const deleteNote = useNoteStore((state) => state.deleteNote);

  const slicedText =
    note.noteText && note.noteText.length > 300
      ? `${note.noteText.slice(0, 300)}...`
      : note.noteText;
  const slicedName =
    note.noteName && note.noteName.length > 100
      ? `${note.noteName.slice(0, 100)}...`
      : note.noteName;

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
        aria-label="update this note"
      >
        <div className="px-4 py-2">
          <div className="mb-6">
            <h1>{slicedName}</h1>
            <p>{slicedText}</p>
          </div>
          <div
            className={`flex justify-end absolute inset-0 items-end focus:opacity-100 duration-200 ease-in-out mb-0.5 mr-0.5`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            data-testid="note-item-btn-wrapper"
          >
            <Button
              style={{opacity: hover ? 1 : 0}}
              icon
              aria-label="Add label"
              dataTip="Add label"
              onClick={(event) => {
                event.stopPropagation();
                addLabelToggle();
              }}
            >
              <Tag size={17} />
            </Button>
            <Button
              style={{opacity: hover ? 1 : 0}}
              icon
              aria-label="Delete note"
              dataTip="Delete note"
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
      <UpdateNote
        note={note}
        openUpdateNote={openUpdateNote}
        onOpenChange={updateNoteToggle}
      />
      <SearchLabel
        note={note}
        openAddLabel={openAddLabel}
        onOpenChange={addLabelToggle}
      />
    </>
  );
}
