import { Label } from "~/types";
import { EditLabelItem } from "./EditLabelItem";

export function EditLabelList({ labels }: { labels: Label[] }) {
  return (
    <ul data-test-id="label-list">
      {labels.map((label) => (
        <EditLabelItem key={label.id} label={label} />
      ))}
    </ul>
  );
}
