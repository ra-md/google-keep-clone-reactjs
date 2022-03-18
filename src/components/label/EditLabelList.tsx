import EditLabelItem from "./EditLabelItem";
import { useVirtual } from "react-virtual";
import { useRef } from "react";
import { useSelector } from 'react-redux'

export default function EditLabelList() {
  const labels = useSelector(state => state.label.labels)
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: labels.length,
    parentRef,
  });

  return (
    <div
      ref={parentRef}
      className="max-h-[400px] overflow-y-auto overflow-x-hidden"
    >
      <ul
        data-test-id="label-list"
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
              <EditLabelItem label={labels[virtualRow.index]} />
            </div>
          );
        })}
      </ul>
    </div>
  );
}
