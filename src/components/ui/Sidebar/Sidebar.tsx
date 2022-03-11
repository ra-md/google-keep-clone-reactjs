import { useState } from "react";
import { sidebarAtom, sidebarAtomOnHover } from "./sidebarAtom";
import { useAtom } from "jotai";
import { Book, Edit2, Tag } from "react-feather";
import SidebarItem from "./SidebarItem";
import EditLabel from "../../label/EditLabel";
import clsx from "clsx";
import { useLabelStore } from "../../../store/labelStore";

const sidebarList = [
  {
    icon: <Book />,
    name: "Notes",
    route: "/",
  },
];

export default function Sidebar() {
  const [openSidebar] = useAtom(sidebarAtom);
  const [visibleOnHover, setVisibleOnHover] = useAtom(sidebarAtomOnHover);
  const [openEditLabel, setOpenEditLabel] = useState(false);
  const labels = useLabelStore((state) => state.labels);

  const hoverToggle = () => {
    if (window.innerWidth > 768) {
      setVisibleOnHover(!visibleOnHover);
    }
  };

  return (
    <>
      <nav
        className={clsx(
          openSidebar || visibleOnHover ? "w-72" : "w-20",
          visibleOnHover && "shadow-lg-darker",
          openSidebar && "shadow-lg-darker md:shadow-none",
          "fixed top-14 left-0 bottom-0 pt-4 z-20 duration-200 ease-in-out bg-primary overflow-y-auto"
        )}
        onMouseEnter={hoverToggle}
        onMouseLeave={hoverToggle}
      >
        <ul data-test-id="sidebar-list">
          {sidebarList.map((sidebarItem) => {
            return (
              <SidebarItem
                key={sidebarItem.name}
                icon={sidebarItem.icon}
                name={sidebarItem.name}
                route={sidebarItem.route}
              />
            );
          })}
          {labels.map((label) => (
            <SidebarItem
              key={label.id}
              icon={<Tag />}
              name={label.labelName}
              route={`/label/${label.labelName}`}
            />
          ))}
          <SidebarItem
            icon={<Edit2 />}
            name="Edit labels"
            onClick={() => setOpenEditLabel(true)}
          />
        </ul>
      </nav>
      <EditLabel
        toggle={() => setOpenEditLabel(!openEditLabel)}
        visible={openEditLabel}
      />
    </>
  );
}
