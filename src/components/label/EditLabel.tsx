import Button from "~/components/ui/Button";
import EditLabelList from "./EditLabelList";
import EditLabelInput from "./EditLabelInput";
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/Dialog";

interface EditLabelProps {
  visible: boolean;
  toggle: () => void;
}

export default function EditLabel({ visible, toggle }: EditLabelProps) {
  return (
    <Dialog open={visible} onOpenChange={toggle}>
      <DialogContent>
        <div data-testid="test">
          <DialogTitle>Edit labels</DialogTitle>
          <EditLabelInput />
          <EditLabelList />
          <div className="rounded-b-lg sticky bg-primary pt-4 bottom-0 left-0 right-0 flex justify-end">
            <Button aria-label="Close edit label" onClick={toggle} size="small">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
