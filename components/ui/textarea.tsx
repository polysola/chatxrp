import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-xl border bg-gray-900/50 px-4 py-3 text-base",
          "border-gray-800/50 backdrop-blur-sm shadow-xl",
          "placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/30",
          "transition-all duration-300",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
