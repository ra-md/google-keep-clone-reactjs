import { Label } from "~/types";
import { useLabelStore } from "~/store/labelStore";
import EditLabelItem from "./EditLabelItem";
import { useVirtual } from 'react-virtual'
import { useRef, useCallback } from 'react'

export default function EditLabelList() {
  const labels = useLabelStore((state) => state.labels);
  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtual({
    size: labels.length,
    parentRef,
  })

  return (
    <div
      ref={parentRef}
      className="max-h-[400px] overflow-y-auto overflow-x-hidden"
    >
      <ul
        data-test-id="label-list"
        style={{
          height: rowVirtualizer.totalSize,
          position: 'relative',
          margin: '0 1.5rem'
        }}
      >
        {rowVirtualizer.virtualItems.map(virtualRow => {
          return (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <EditLabelItem label={labels[virtualRow.index]}/>
            </div>
          )
        })}
      </ul>
    </div>
  );
}
