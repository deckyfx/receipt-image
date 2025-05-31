/**
 * @fileoverview TextAreaInput component with auto-resizing functionality.
 * Provides a multi-line text input that automatically adjusts height based on content.
 * 
 * @author Receipt Image Generator
 * @since 2024-12-31
 * @changelog 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import React, { useRef, useEffect } from "react";
import FieldBox from "./FieldBox";

/**
 * Props interface for the TextAreaInput component
 */
type TextAreaInputProps = {
  /** Current text value */
  value?: string;
  /** Callback function triggered when text changes */
  onChange?: (val: string) => void;
  /** Placeholder text shown when textarea is empty */
  placeholder?: string;
  /** Optional title/label for the textarea */
  title?: string;
  /** HTML name attribute for the textarea element */
  name: string;
  /** Minimum number of visible rows (default: 3) */
  minRows?: number;
  /** Maximum number of rows before scrolling appears (default: 10) */
  maxRows?: number;
};

/**
 * An auto-resizing textarea component with min/max row constraints.
 * 
 * This component provides a multi-line text input that automatically adjusts
 * its height based on content. It supports minimum and maximum row constraints
 * to ensure proper layout while providing a smooth user experience.
 * 
 * @param props - The component props
 * @param props.value - Current textarea value
 * @param props.onChange - Function called when content changes
 * @param props.placeholder - Placeholder text for empty state
 * @param props.title - Optional label text
 * @param props.name - HTML name attribute
 * @param props.minRows - Minimum visible rows (default: 3)
 * @param props.maxRows - Maximum rows before scrolling (default: 10)
 * @returns A FieldBox containing an auto-resizing textarea
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <TextAreaInput
 *   title="Description"
 *   name="description"
 *   value={description}
 *   onChange={setDescription}
 *   placeholder="Enter description..."
 * />
 * 
 * // With custom row constraints
 * <TextAreaInput
 *   title="Long Text"
 *   name="longText"
 *   value={text}
 *   minRows={5}
 *   maxRows={15}
 *   onChange={setText}
 * />
 * 
 * // Compact textarea
 * <TextAreaInput
 *   title="Short Note"
 *   name="note"
 *   value={note}
 *   minRows={2}
 *   maxRows={4}
 *   onChange={setNote}
 * />
 * ```
 */
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

  /**
   * Effect to automatically adjust textarea height based on content.
   * Runs whenever value, minRows, or maxRows change.
   */
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto for accurate scrollHeight calculation
      textareaRef.current.style.height = "auto";

      // Set height based on content's scroll height
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";

      // Apply maxRows constraint if specified
      if (maxRows) {
        const lineHeight = parseInt(
          getComputedStyle(textareaRef.current).lineHeight
        );
        const maxHeight = maxRows * lineHeight;
        
        if (textareaRef.current.scrollHeight > maxHeight) {
          // Limit height and enable scrolling
          textareaRef.current.style.height = maxHeight + "px";
          textareaRef.current.style.overflowY = "auto";
        } else {
          // Hide scrollbar when content fits within maxRows
          textareaRef.current.style.overflowY = "hidden";
        }
      } else {
        // No maxRows limit - always hide scrollbar
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  }, [value, minRows, maxRows]); // Re-run when dependencies change

  /**
   * Effect to set minimum height based on minRows.
   * Only runs on initial render or when minRows changes.
   */
  useEffect(() => {
    if (textareaRef.current) {
      // Set minimum height based on minRows
      textareaRef.current.style.minHeight = `${
        minRows * parseInt(getComputedStyle(textareaRef.current).lineHeight)
      }px`;
      
      // Perform initial height adjustment
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [minRows]); // Only run when minRows changes

  /**
   * Handles textarea content changes.
   * @param e - The textarea change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
    // Height adjustment is handled automatically by useEffect
  };

  return (
    <FieldBox label={title}>
      <textarea
        ref={textareaRef}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={minRows}  // Initial rows for SSR and accessibility
      />
    </FieldBox>
  );
}
