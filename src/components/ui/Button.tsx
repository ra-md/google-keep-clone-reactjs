import {
  ReactNode,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  forwardRef,
} from "react";
import ReactTooltip from "react-tooltip";
import clsx from "clsx";

const sizeClassnames = {
  big: "py-2 px-6 text-sm rounded-lg",
  small: "px-2 py-1 text-sm rounded-md",
  tiny: "px-1 text-sm rounded-5",
};

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
  className?: string;
  size?: keyof typeof sizeClassnames;
  dataTip?: string;
  icon?: boolean;
}

const Button = forwardRef(
  (
    { size = "big", className, dataTip, icon, ...props }: ButtonProps,
    forwardedRef
  ) => {
    return (
      <button
        ref={forwardedRef}
        className={clsx(
          "flex items-center justify-center focus:bg-secondary hover:bg-hover",
          Boolean(icon) ? "p-2 rounded-full" : sizeClassnames[size],
          className
        )}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

export default Button;
