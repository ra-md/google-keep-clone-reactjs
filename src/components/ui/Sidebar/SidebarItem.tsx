import { ReactNode } from "react";
import { sidebarAtom } from "./sidebarAtom";
import { useAtom } from "jotai";
import { useLocation, Link } from "react-router-dom";
import clsx from "clsx";

interface SidebarItemProps {
  name: string;
  icon: ReactNode;
  onClick?: () => void;
  route?: string;
}

export default function SidebarItem(props: SidebarItemProps) {
  const [visible] = useAtom(sidebarAtom);
  const { pathname } = useLocation();
  const isActive = pathname.toLowerCase() === props.route?.toLowerCase();

  return (
    <li
      onClick={props.onClick}
      className={clsx(
        visible ? "rounded-l-none pl-8 w-full" : "ml-5 w-12",
        isActive ? "bg-activeSidebarMenu" : "hover:bg-secondary",
        "flex whitespace-nowrap overflow-hidden duration-200 ease-in-out rounded-full font-semibold cursor-pointer"
      )}
    >
      {props.route ? <ItemLink {...props} /> : <ItemButton {...props} />}
    </li>
  );
}

function ItemLink(props: SidebarItemProps) {
  return (
    <Link className="w-full" to={props.route!}>
      <Item {...props} />
    </Link>
  );
}

function ItemButton(props: SidebarItemProps) {
  return (
    <button className="w-full" aria-label={props.name}>
      <Item {...props} />
    </button>
  );
}

function Item(props: SidebarItemProps) {
  return (
    <div className="flex py-3 px-3">
      <div className="mr-8">{props.icon}</div>
      <span>{props.name}</span>
    </div>
  );
}
