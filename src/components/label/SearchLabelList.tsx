import SearchLabelItem from "./SearchLabelItem";
import { Label, Note } from "~/types";
import { useVirtual } from "react-virtual";
import { useRef } from "react";

interface SearchLabelListProps {
  labels: Label[];
  note: Note;
}

export default function SearchLabelList({
  labels,
  note,
}: SearchLabelListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: labels.length,
    parentRef,
  });

  return (
    <div
      ref={parentRef}
      className="max-h-[400px] px-3 overflow-y-auto overflow-x-hidden"
    >
      <ul
        data-test-id="search-label-list"
        className="relative"
        style={{
          height: rowVirtualizer.totalSize,
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => {
          return (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureRef}
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <SearchLabelItem note={note} label={labels[virtualRow.index]} />
            </div>
          );
        })}
      </ul>
    </div>
  );

  // return (
  //   <ul data-test-id="search-label-list">
  //     {labels.map((label) => {
  //       return <SearchLabelItem key={label.id} label={label} note={note} />;
  //     })}
  //   </ul>
  // );
}
