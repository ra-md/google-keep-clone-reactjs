import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Modal from "~/components/ui/Modal";
import Button from "~/components/ui/Button";
import { Label, Note } from "~/types";
import { useLabelStore } from "~/store/labelStore";
import SearchLabelList from "./SearchLabelList";
import SearchLabelInput from "./SearchLabelInput";

interface SearchLabelProps {
  visible: boolean;
  toggle: () => void;
  note: Note;
}

export default function SearchLabel(props: SearchLabelProps) {
  const allLabels = useLabelStore((state) => state.labels);
  const [searchResults, setSearchResults] = useState<Label[]>([]);
  const labels = searchResults.length > 0 ? searchResults : allLabels;

  return (
    <Modal visible={props.visible} toggle={props.toggle}>
      <div className="sticky top-0 rounded-lg bg-primary">
        <Dialog.Title className="font-semibold">Label note</Dialog.Title>
        <SearchLabelInput setSearchResults={setSearchResults} />
      </div>
      <div className="px-3 max-h-96 overflow-y-auto">
        {labels != null && (
          <SearchLabelList labels={labels} note={props.note} />
        )}
      </div>
      <div className="rounded-b-lg sticky bg-primary bottom-0 left-0 right-0 flex justify-end">
        <Button
          aria-label="Close add label"
          onClick={props.toggle}
          size="small"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
