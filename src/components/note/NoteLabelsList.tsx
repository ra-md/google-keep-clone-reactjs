import { useLabelStore } from "~/store/labelStore";
import NoteLabelsItem from "./NoteLabelsItem";
import { useSelector } from "react-redux";

interface NoteLabelsProps {
  labelId: string[];
  noteId: string;
}

export default function NoteLabels({ labelId, noteId }: NoteLabelsProps) {
  // const labels = useLabelStore((state) => state.labels);
  const labels = useSelector((state) => state.label.labels);
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
