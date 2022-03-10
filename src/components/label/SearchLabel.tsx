import { useState, useEffect, ChangeEvent } from "react";
import { Search } from "react-feather";
import { Dialog } from "@headlessui/react";
import Modal from "~/components/ui/Modal";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { Label, Note } from "~/types";
import { useLabelStore } from "~/store/labelStore";
import { useNoteStore } from "~/store/noteStore";

interface SearchLabelProps {
  visible: boolean;
  toggle: () => void;
  note: Note;
}

export default function SearchLabel(props: SearchLabelProps) {
  const [searchValue, setSearchValue] = useState("");
  const { labels: allLabels, searchLabel } = useLabelStore();
  const [searchResults, setSearchResults] = useState<Label[]>([]);
  const labels = searchResults.length > 0 ? searchResults : allLabels;

  function handleSearch() {
    setSearchResults(searchLabel(searchValue));
  }

  useEffect(() => {
    if (searchValue === "") {
      setSearchResults([]);
    }
  }, [searchValue]);

  return (
    <Modal visible={props.visible} toggle={props.toggle}>
      <div className="sticky top-0 rounded-lg bg-primary">
        <Dialog.Title className="font-semibold">Label note</Dialog.Title>
        <div className="flex items-center">
          <Input
            className="font-normal"
            placeholder="Search label name"
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && searchValue !== "") {
                handleSearch();
              }
            }}
          />
          <Search size={18} />
        </div>
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

function SearchLabelList({ labels, note }: { labels: Label[]; note: Note }) {
  return (
    <ul data-test-id="search-label-list">
      {labels.map((label) => {
        return <SearchLabelItem key={label.id} label={label} note={note} />;
      })}
    </ul>
  );
}

function SearchLabelItem({ label, note }: { label: Label; note: Note }) {
  const [isChecked, setIsChecked] = useState(false);
  const { addLabel, removeLabel } = useNoteStore();

  useEffect(() => {
    if (note?.labelIds?.indexOf(label.id) !== -1) {
      setIsChecked(true);
    }
  }, [label, note]);

  function submit(event: ChangeEvent<HTMLInputElement>) {
    setIsChecked(!isChecked);
    if (event.target.checked) {
      addLabel(label.id, note.id);
    } else {
      removeLabel(label.id, note.id);
    }
  }

  return (
    <li className="my-2">
      <label className="flex items-center">
        <input
          className="mr-4 form-checkbox bg-primary rounded border-2 border-secondary text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
          type="checkbox"
          checked={isChecked}
          onChange={submit}
        />
        <span className="block w-full">{label.labelName}</span>
      </label>
    </li>
  );
}
