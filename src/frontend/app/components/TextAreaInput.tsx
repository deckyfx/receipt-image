// app/components/TextAreaInput.tsx
import React, { useRef, useEffect } from "react";
import FieldBox from "./FieldBox"; // Assuming FieldBox is in the same directory

type TextAreaInputProps = {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  title?: string;
  name: string;
  minRows?: number; // Optional: Minimum number of rows
  maxRows?: number; // Optional: Maximum number of rows before scrolling
};

export default function TextAreaInput({
  value = "", // Default to empty string for controlled component
  onChange,
  placeholder = "",
  title,
  name,
  minRows = 3, // Default minimum rows
  maxRows = 10, // No default maxRows
}: TextAreaInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Effect to adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to calculate scrollHeight correctly
      textareaRef.current.style.height = "auto";

      // Set new height based on scrollHeight
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";

      // If maxRows is provided, prevent it from exceeding a certain height
      if (maxRows) {
        const lineHeight = parseInt(
          getComputedStyle(textareaRef.current).lineHeight
        );
        const maxHeight = maxRows * lineHeight;
        if (textareaRef.current.scrollHeight > maxHeight) {
          textareaRef.current.style.height = maxHeight + "px";
          textareaRef.current.style.overflowY = "auto"; // Add scrollbar when maxRows is hit
        } else {
          textareaRef.current.style.overflowY = "hidden"; // Hide scrollbar if not needed
        }
      } else {
        textareaRef.current.style.overflowY = "hidden"; // Always hide scrollbar if no maxRows
      }
    }
  }, [value, minRows, maxRows]); // Re-run effect when value changes, or min/max rows change

  // Handle initial render to set minRows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.minHeight = `${
        minRows * parseInt(getComputedStyle(textareaRef.current).lineHeight)
      }px`;
      // Initial height adjustment
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [minRows]); // Only run on initial render or when minRows changes

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
    // The useEffect will handle the height adjustment after state update
  };

  return (
    <FieldBox label={title}>
      <textarea
        ref={textareaRef}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        // Tailwind classes for basic styling
        className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        // Set initial rows for accessibility and basic rendering before JS kicks in
        rows={minRows}
      />
    </FieldBox>
  );
}
