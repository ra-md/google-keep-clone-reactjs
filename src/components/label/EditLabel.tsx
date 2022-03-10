import { useState } from "react";
import { Check, X } from "react-feather";
import { Dialog } from "@headlessui/react";
import Modal from "~/components/ui/Modal";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { v4 as uuidv4 } from "uuid";
import { useLabelStore } from "~/store/labelStore";
import { EditLabelList } from "./EditLabelList";
import { iconSize } from "~/utils/constants";

interface EditLabelProps {
  visible: boolean;
  toggle: () => void;
}

export default function EditLabel({ visible, toggle }: EditLabelProps) {
  const [labelName, setLabelName] = useState("");
  const { createLabel, labels } = useLabelStore();

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
    <Modal visible={visible} toggle={toggle}>
      <div className="max-h-lg overflow-y-auto">
        <Dialog.Title className="font-semibold">Edit labels</Dialog.Title>
        <div className="flex items-center">
          <Button
            icon
            onClick={() => setLabelName("")}
            aria-label="clear edit label input"
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
            aria-label="Save label"
            dataTip="Save label"
          >
            <Check size={iconSize} />
          </Button>
        </div>
        <EditLabelList labels={labels} />
        <div className="rounded-b-lg sticky bg-primary bottom-0 left-0 right-0 flex justify-end">
          <Button aria-label="Close edit label" onClick={toggle} size="small">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
