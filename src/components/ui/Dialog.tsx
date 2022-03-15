import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import clsx from "clsx";

const StyledOverlay = forwardRef<
  HTMLDivElement,
  DialogPrimitive.DialogOverlayProps
>((props, forwardedRef) => {
  const { className } = props;
  return (
    <DialogPrimitive.Overlay
      ref={forwardedRef}
      className={clsx("fixed inset-0 bg-black opacity-30 z-40", className)}
    />
  );
});

const StyledContent = forwardRef<
  HTMLDivElement,
  DialogPrimitive.DialogContentProps
>((props, forwardedRef) => {
  const { className, children } = props;
  return (
    <DialogPrimitive.Content
      ref={forwardedRef}
      className={clsx(
        `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:max-w-md
         max-w-[90%] p-4 overflow-hidden text-left bg-primary border border-secondary rounded-lg z-50
        `,
        className
      )}
    >
      {children}
    </DialogPrimitive.Content>
  );
});

const Title = forwardRef<HTMLHeadingElement, DialogPrimitive.DialogTitleProps>(
  (props, forwardedRef) => {
    const { className, children } = props;

    return (
      <DialogPrimitive.Title
        ref={forwardedRef}
        className={clsx("font-semiblod", className)}
      >
        {children}
      </DialogPrimitive.Title>
    );
  }
);

function Content({ children, ...props }: DialogPrimitive.DialogPortalProps) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogContent = Content;
export const DialogTitle = Title;
