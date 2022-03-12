import { useState } from "react";
import { Check, X } from "react-feather";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { v4 as uuidv4 } from "uuid";
import { useLabelStore } from "~/store/labelStore";
import { iconSize } from "~/utils/constants";

export default function EditLabelInput() {
  const [labelName, setLabelName] = useState("");
  const { createLabel, labels } = useLabelStore(({ labels, createLabel }) => ({
    labels,
    createLabel,
  }));

  function createNewLabel() {
    const findLabel = labels.findIndex(
      (label) => label.labelName === labelName
    );
    if (labelName !== "" && findLabel === -1) {
      createLabel({
        id: uuidv4(),
        labelName: labelName,
      });
      setLabelName("");
    }
  }

  return (
    <div className="flex items-center">
      <Button
        icon
        onClick={() => setLabelName("")}
        aria-label="Clear edit label input"
        dataTip="Clear"
      >
        <X size={iconSize} />
      </Button>
      <Input
        placeholder="Create new label"
        className="border-b border-secondary py-1 mx-3"
        value={labelName}
        onChange={(event) => setLabelName(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            createNewLabel();
          }
        }}
      />
      <Button
        icon
        onClick={createNewLabel}
        aria-label="Create new label"
        dataTip="Create new label"
      >
        <Check size={iconSize} />
      </Button>
    </div>
  );
}
