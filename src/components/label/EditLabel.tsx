import { Dialog } from "@headlessui/react";
import Modal from "~/components/ui/Modal";
import Button from "~/components/ui/Button";
import EditLabelList from "./EditLabelList";
import EditLabelInput from "./EditLabelInput";

interface EditLabelProps {
  visible: boolean;
  toggle: () => void;
}

export default function EditLabel({ visible, toggle }: EditLabelProps) {
  return (
    <Modal visible={visible} toggle={toggle}>
      <div data-testid="test">
        <Dialog.Title className="font-semibold">Edit labels</Dialog.Title>
        <EditLabelInput />
        <EditLabelList />
        <div className="rounded-b-lg sticky bg-primary pt-4 bottom-0 left-0 right-0 flex justify-end">
          <Button aria-label="Close edit label" onClick={toggle} size="small">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
