import { iconSize } from "~/utils/constants";
import Input from "~/components/ui/Input";
import { Search } from "react-feather";
import { useState, ChangeEvent, useEffect } from "react";
import { useLabelStore } from "~/store/labelStore";

interface SearchLabelInputProps {
	setSearchResults: (result: Label[]) => void
}

export default function SearchLabelInput({ setSearchResults }: SearchLabelInputProps) {
  const [searchValue, setSearchValue] = useState("");
  const searchLabel = useLabelStore((state) => state.searchLabel);

  function handleSearch() {
    setSearchResults(searchLabel(searchValue));
  }

  useEffect(() => {
    if (searchValue === "") {
      setSearchResults([]);
    }
  }, [searchValue]);

  return (
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
      <Search size={iconSize} />
    </div>
  );
}
