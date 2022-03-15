import { Label } from "~/types";
import { useState, useEffect } from "react";
import { useLabelStore } from "~/store/labelStore";
import Button from "~/components/ui/Button";
import { Check, Edit2, Tag, Trash2 } from "react-feather";
import Input from "~/components/ui/Input";
import { iconSize } from "~/utils/constants";
import clsx from "clsx";

export default function EditLabelItem({ label }: { label: Label }) {
  const [openDeleteBtn, setopenDeleteBtn] = useState(false);
  const [openUpdateInput, setOpenUpdateInput] = useState(false);
  const [labelName, setLabelName] = useState("");
  const { deleteLabel, updateLabel, labels } = useLabelStore((state) => ({
    labels: state.labels,
    deleteLabel: state.deleteLabel,
    updateLabel: state.updateLabel,
  }));

  function handleUpdateLabel() {
    if (labelName === "" || labelName.length > 40) return;

    const findLabel = labels.find((label) => label.labelName === labelName);

    if (labelName === label.labelName || findLabel === undefined) {
      updateLabel({ id: label.id, labelName });
      setOpenUpdateInput(false);
    }
  }

  function handleDeleteLabel() {
    deleteLabel(label.id);
  }

  useEffect(() => {
    setLabelName(label.labelName);
  }, [label.labelName]);

  return (
    <li
      className="flex items-center justify-between my-3"
      onMouseEnter={() => setopenDeleteBtn(true)}
      onMouseLeave={() => setopenDeleteBtn(false)}
    >
      <Button
        icon
        onClick={handleDeleteLabel}
        dataTip="Delete label"
        aria-label="Delete label"
      >
        {openDeleteBtn ? <Trash2 size={iconSize} /> : <Tag size={iconSize} />}
      </Button>
      {openUpdateInput ? (
        <Input
          className={clsx(
            `border-b py-1 mx-3`,
            labelName.length > 40 || labelName === ""
              ? "border-red-500"
              : "border-secondary"
          )}
          value={labelName}
          onChange={(event) => setLabelName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleUpdateLabel();
            }
          }}
        />
      ) : (
        <p style={{ wordBreak: "break-all" }}>{label.labelName}</p>
      )}
      {openUpdateInput ? (
        <Button
          icon
          onClick={handleUpdateLabel}
          dataTip="Save label"
          aria-label="Save label"
        >
          <Check size={iconSize} />
        </Button>
      ) : (
        <Button
          icon
          onClick={() => setOpenUpdateInput(true)}
          dataTip="Rename label"
          aria-label="Rename label"
        >
          <Edit2 size={iconSize} />
        </Button>
      )}
    </li>
  );
}
