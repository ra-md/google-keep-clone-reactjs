import { Label } from "~/types";
import { useState, useEffect } from "react";
import { useLabelStore } from "~/store/labelStore";
import Button from "~/components/ui/Button";
import { Check, Edit2, Tag, Trash2 } from "react-feather";
import Input from "~/components/ui/Input";
import { iconSize } from "~/utils/constants";

export function EditLabelItem({ label }: { label: Label }) {
  const [openDeleteBtn, setopenDeleteBtn] = useState(false);
  const [openUpdateInput, setOpenUpdateInput] = useState(false);
  const [labelName, setLabelName] = useState("");
  const { deleteLabel, updateLabel } = useLabelStore();

  function handleUpdateLabel() {
    if (labelName !== label.labelName) {
      updateLabel({ id: label.id, labelName });
    }
    setOpenUpdateInput(false);
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
        aria-label="Delete label"
        dataTip="Delete label"
      >
        {openDeleteBtn ? <Trash2 size={iconSize} /> : <Tag size={iconSize} />}
      </Button>
      {openUpdateInput ? (
        <Input
          className="border-b border-secondary py-1 mx-3"
          value={labelName}
          onChange={(event) => setLabelName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleUpdateLabel();
            }
          }}
        />
      ) : (
        <span>{label.labelName}</span>
      )}
      {openUpdateInput ? (
        <Button
          icon
          onClick={handleUpdateLabel}
          aria-label="rename label"
          dataTip="Rename label"
        >
          <Check size={iconSize} />
        </Button>
      ) : (
        <Button
          icon
          onClick={() => setOpenUpdateInput(true)}
          aria-label="edit label"
          dataTip="Rename label"
        >
          <Edit2 size={iconSize} />
        </Button>
      )}
    </li>
  );
}
