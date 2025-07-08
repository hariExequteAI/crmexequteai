import React from "react";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = "", ...props }, ref) => (
  <textarea
    ref={ref}
    className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${className}`}
    {...props}
  />
));

Textarea.displayName = "Textarea";
