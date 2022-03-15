import { forwardRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const StyledContent = forwardRef((props, forwardedRef) => {
  const { children } = props;

  return (
    <TooltipPrimitive.Content className="rounded-md text-sm py-[5px] px-[8px] bg-secondary shadow-lg">
      {children}
    </TooltipPrimitive.Content>
  );
});

const StyledArrow = forwardRef((_, forwardedRef) => {
  return (
    <TooltipPrimitive.Arrow className="fill-secondary" ref={forwardedRef} />
  );
});

export const Provider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipContent = StyledContent;
export const TooltipArrow = StyledArrow;
