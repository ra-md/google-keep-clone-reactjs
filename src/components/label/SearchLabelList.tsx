import SearchLabelItem from "./SearchLabelItem";
import { Label, Note } from "~/types";

interface SearchLabelListProps {
  labels: Label[];
  note: Note;
}

export default function SearchLabelList({
  labels,
  note,
}: SearchLabelListProps) {
  return (
    <ul data-test-id="search-label-list">
      {labels.map((label) => {
        return <SearchLabelItem key={label.id} label={label} note={note} />;
      })}
    </ul>
  );
}
