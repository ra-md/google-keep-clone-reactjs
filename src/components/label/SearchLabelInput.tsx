import { iconSize } from "~/utils/constants";
import Input from "~/components/ui/Input";
import { Search } from "react-feather";
import { useState, useEffect } from "react";
import { Label } from "~/types";
import { useSelector } from "react-redux";

interface SearchLabelInputProps {
  setSearchResults: (result: Label[]) => void;
}

export default function SearchLabelInput({
  setSearchResults,
}: SearchLabelInputProps) {
  const [searchValue, setSearchValue] = useState("");
  const labels = useSelector((state) => state.label.labels);

  function handleSearch() {
    setSearchResults(
      labels.filter(({ labelName }) => labelName.includes(searchValue))
    );
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
