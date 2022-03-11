import { Label } from "~/types";
import { useLabelStore } from "~/store/labelStore";
import EditLabelItem from "./EditLabelItem";

export default function EditLabelList() {
  const labels = useLabelStore((state) => state.labels);

  return (
    <ul data-test-id="label-list">
      {labels.map((label) => (
        <EditLabelItem key={label.id} label={label} />
      ))}
    </ul>
  );
}
