import { useState, useRef, useEffect } from "react";
import { Check, X } from "react-feather";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { v4 as uuidv4 } from "uuid";
import { iconSize } from "~/utils/constants";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { createLabel } from "~/store/labelSlice";

export default function EditLabelInput() {
  const [labelName, setLabelName] = useState("");
  const [blur, setBlur] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.label.labels);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function createNewLabel() {
    if (labelName === "" || labelName.length > 40) return;
    const findLabel = labels.findIndex(
      (label) => label.labelName === labelName
    );
    if (findLabel === -1) {
      dispatch(
        createLabel({
          id: uuidv4(),
          labelName: labelName,
        })
      );
      setLabelName("");
      setBlur(false);
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
        ref={inputRef}
        placeholder="Create new label"
        className={clsx(
          `border-b border-secondary py-1 mx-3`,
          (blur && labelName === "") || (blur && labelName.length > 40)
            ? "border-red-500"
            : "border-secondary"
        )}
        onBlur={() => setBlur(true)}
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
