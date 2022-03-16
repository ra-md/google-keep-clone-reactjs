import { X } from "react-feather";
import { Label } from "~/types";
import { useNoteStore } from "~/store/noteStore";
import { useState } from "react";

export default function NoteLabelsItem(props: {
  label: Label;
  noteId: string;
}) {
  const removeLabel = useNoteStore((state) => state.removeLabel);
  const [visible, setVisible] = useState(false);

  return (
    <li className="rounded-full border border-secondary px-2 text-sm relative mr-1">
      <div>
        <p className="whitespace-nowrap overflow-hidden max-w-20">
          {props.label.labelName}
        </p>
        <div
          data-testid="remove-label-wrapper"
          className="absolute inset-0 rounded-full flex justify-end items-center duration-200 ease-in-out"
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <button
            style={{ opacity: visible ? 1 : 0 }}
            className="p-0.5 mr-0.5 bg-primary rounded-full shadow-lg hover:bg-hover"
            aria-label="Remove label"
            onClick={(event) => {
              event.stopPropagation();
              removeLabel(props.label.id, props.noteId);
            }}
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </li>
  );
}
