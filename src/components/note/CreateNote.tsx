import { useState, useEffect, useRef, useCallback } from "react";
import TextareaAutoSize from "react-textarea-autosize";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from 'react-redux'
import { createNote } from '~/store/noteSlice'

export default function CreateNote() {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const dispatch = useDispatch()

  const submit = useCallback(async () => {
    if (title || note) {
      dispatch(
        createNote({
          id: uuidv4(),
          noteName: title,
          noteText: note,
          labelIds: [],
        })
      )

      setTitle("");
      setNote("");
    }
    setVisible(false);
  }, [title, note]);

  useEffect(() => {
    function handleClose(event: Event) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        submit();
      }
    }

    document.addEventListener("mousedown", handleClose);

    return () => document.removeEventListener("mousedown", handleClose);
  }, [wrapperRef, note, title, submit]);

  return (
    <>
      <div
        ref={wrapperRef}
        onFocus={() => setVisible(true)}
        className="border border-secondary rounded-lg shadow-lg-darker w-full mt-8 md:w-screen md:max-w-xl"
      >
        <div className="py-2 px-4 flex flex-col">
          {visible && (
            <Input
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              placeholder="Title"
            />
          )}
          <TextareaAutoSize
            onChange={(event) => setNote(event.target.value)}
            value={note}
            className="textarea"
            placeholder="Take a note..."
          />
        </div>
        {visible && (
          <div className="m-3 flex justify-end">
            <Button
              className="font-semibold"
              aria-label="close create note"
              size="small"
              onClick={submit}
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
