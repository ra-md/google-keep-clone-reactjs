import { useState } from "react";
import Button from "~/components/ui/Button";
import { Label, Note } from "~/types";
import { useLabelStore } from "~/store/labelStore";
import SearchLabelList from "./SearchLabelList";
import SearchLabelInput from "./SearchLabelInput";
import { DialogClose, Dialog, DialogContent, DialogTitle } from "~/components/ui/Dialog";

interface SearchLabelProps {
  note: Note;
  onOpenChange: () => void;
  openAddLabel: boolean
}

export default function SearchLabel({ note, openAddLabel, onOpenChange }: SearchLabelProps) {
  const allLabels = useLabelStore((state) => state.labels);
  const [searchResults, setSearchResults] = useState<Label[]>([]);
  const labels = searchResults.length > 0 ? searchResults : allLabels;

  return (
    <Dialog open={openAddLabel} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Add label</DialogTitle>
        <div className="sticky top-0 rounded-lg bg-primary">
          <SearchLabelInput setSearchResults={setSearchResults} />
        </div>
        <div className="max-h-96">
          {labels != null && <SearchLabelList labels={labels} note={note} />}
        </div>
        <div className="rounded-b-lg sticky bg-primary pt-4 bottom-0 left-0 right-0 flex justify-end">
          <DialogClose asChild>
            <Button aria-label="Close add label" size="small">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
