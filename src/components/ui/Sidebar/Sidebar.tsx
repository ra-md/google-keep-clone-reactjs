// @ts-nocheck
import { useState, useRef } from "react";
import { sidebarAtom } from "./sidebarAtom";
import { useAtom } from "jotai";
import { Book, Edit2, Tag } from "react-feather";
import SidebarItem from "./SidebarItem";
import EditLabel from "../../label/EditLabel";
import clsx from "clsx";
import { useLabelStore } from "~/store/labelStore";
import { useVirtual } from "react-virtual";

export default function Sidebar() {
  const [openSidebar] = useAtom(sidebarAtom);
  const [openEditLabel, setOpenEditLabel] = useState(false);
  const labels = useLabelStore((state) => state.labels);
  const customMenu = [
    {
      icon: <Book />,
      name: "Notes",
      route: "/",
    },
    {
      icon: <Edit2 />,
      name: "Edit labels",
      onClick: () => setOpenEditLabel(true),
    },
  ];
  const sidebarMenu = [...customMenu, ...labels];

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: sidebarMenu.length,
    parentRef,
  });

  return (
    <>
      <nav
        className={clsx(
          openSidebar ? "w-72" : "w-20",
          openSidebar && "shadow-lg-darker md:shadow-none",
          "fixed top-14 left-0 bottom-0 pt-4 z-20 duration-200 ease-in-out bg-primary overflow-y-auto"
        )}
      >
        <ul data-test-id="sidebar-list">
          <div
            ref={parentRef}
            className="max-h-[540px] overflow-y-auto overflow-x-hidden"
          >
            <div
              className="relative"
              style={{
                height: rowVirtualizer.totalSize,
              }}
            >
              {rowVirtualizer.virtualItems.map((virtualRow) => (
                <div
                  key={virtualRow.index}
                  ref={virtualRow.measureRef}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {"labelName" in sidebarMenu[virtualRow.index] ? (
                    <SidebarItem
                      icon={<Tag />}
                      name={sidebarMenu[virtualRow.index].labelName}
                      route={`/label/${
                        sidebarMenu[virtualRow.index].labelName
                      }`}
                    />
                  ) : (
                    <SidebarItem
                      icon={sidebarMenu[virtualRow.index].icon}
                      name={sidebarMenu[virtualRow.index].name}
                      route={sidebarMenu[virtualRow.index].route}
                      onClick={sidebarMenu[virtualRow.index]?.onClick}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </ul>
      </nav>
      <EditLabel
        toggle={() => setOpenEditLabel(!openEditLabel)}
        visible={openEditLabel}
      />
    </>
  );
}
