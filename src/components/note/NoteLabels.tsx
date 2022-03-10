import { X } from "react-feather";
import { Label } from "~/types";
import { useNoteStore } from "~/store/noteStore";
import { useLabelStore } from "~/store/labelStore";

interface NoteLabelsProps {
  labelId: string[];
  noteId: string;
}

export default function NoteLabels({ labelId, noteId }: NoteLabelsProps) {
  const labels = useLabelStore((state) => state.labels);
  const filteredLabels = labels.filter((label) => labelId.includes(label.id));

  if (filteredLabels.length === 0) return null;

  return (
    <div className="flex">
      <ul className="relative flex-wrap flex z-10">
        {filteredLabels.length > 0 &&
          filteredLabels.map((label) => (
            <NoteLabelsItem key={label.id} noteId={noteId} label={label} />
          ))}
      </ul>
    </div>
  );
}

function NoteLabelsItem(props: { label: Label; noteId: string }) {
  const removeLabel = useNoteStore((state) => state.removeLabel);

  return (
    <li className="rounded-full border border-secondary px-2 text-sm relative mr-1">
      <div>
        <p className="whitespace-nowrap overflow-hidden max-w-20">
          {props.label.labelName}
        </p>
        <div className="absolute inset-0 opacity-0 hover:opacity-100 rounded-full flex justify-end items-center duration-200 ease-in-out">
          <button
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
