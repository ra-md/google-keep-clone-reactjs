import { Label, Note } from "~/types";
import { useState, useEffect, ChangeEvent } from "react";
import { useNoteStore } from "~/store/noteStore";

interface SearchLabelItemProps {
  label: Label;
  note: Note;
}

export default function SearchLabelItem({ label, note }: SearchLabelItemProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { addLabel, removeLabel } = useNoteStore();

  useEffect(() => {
    if (note.labelIds.indexOf(label.id) !== -1) {
      setIsChecked(true);
    }
  }, [label, note]);

  function submit(event: ChangeEvent<HTMLInputElement>) {
    setIsChecked(!isChecked);
    if (event.target.checked) {
      addLabel(label.id, note.id);
    } else {
      removeLabel(label.id, note.id);
    }
  }

  return (
    <li className="my-2">
      <label className="flex items-center">
        <input
          className="mr-4 form-checkbox bg-primary rounded border-2 border-secondary text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
          type="checkbox"
          checked={isChecked}
          onChange={submit}
        />
        <p className="w-full">{label.labelName}</p>
      </label>
    </li>
  );
}
