import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <input
        className={clsx(
          "h-full my-3 bg-transparent w-full font-semibold",
          className
        )}
        ref={forwardedRef}
        {...props}
      />
    );
  }
);

export default Input;
