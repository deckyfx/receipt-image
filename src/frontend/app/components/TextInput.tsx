/**
 * @fileoverview TextInput component for single-line text input fields.
 * Provides a simple, reusable text input with consistent styling and labeling.
 * 
 * @author Receipt Image Generator
 * @since 2024-12-31
 * @changelog 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import FieldBox from "./FieldBox";

/**
 * Props interface for the TextInput component
 */
type TextInputProps = {
  /** Current text value */
  value?: string;
  /** Callback function triggered when text changes */
  onChange?: (val: string) => void;
  /** Placeholder text shown when input is empty */
  placeholder?: string;
  /** Optional title/label for the input field */
  title?: string;
  /** HTML name attribute for the input element */
  name: string;
};

/**
 * A simple text input component with consistent styling.
 * 
 * This component provides a basic single-line text input field wrapped in
 * the standard FieldBox container for consistent styling across the application.
 * It handles empty values gracefully and provides a clean interface for text entry.
 * 
 * @param props - The component props
 * @param props.value - Current input value
 * @param props.onChange - Function called when input value changes
 * @param props.placeholder - Placeholder text for empty state
 * @param props.title - Optional label text
 * @param props.name - HTML name attribute
 * @returns A FieldBox containing a styled text input
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <TextInput
 *   title="Name"
 *   name="name"
 *   value={name}
 *   onChange={setName}
 *   placeholder="Enter your name"
 * />
 * 
 * // Form field without label
 * <TextInput
 *   name="searchQuery"
 *   value={query}
 *   onChange={setQuery}
 *   placeholder="Search..."
 * />
 * 
 * // Receipt component text field
 * <TextInput
 *   title="Receipt Text"
 *   name="receiptText"
 *   value={receiptData.text}
 *   onChange={(val) => updateReceiptData({ text: val })}
 * />
 * ```
 */
export default function TextInput({
  value,
  onChange,
  placeholder = "",
  title,
  name,
}: TextInputProps) {
  return (
    <FieldBox label={title}>
      <input
        type="text"  // Standard text input type
        name={name}
        placeholder={placeholder}
        value={value || ""}  // Handle undefined/null values gracefully
        onChange={(e) => 
          // Pass the input value to the onChange callback
          onChange?.(e.target.value)
        }
        className="w-full p-2 border rounded"  // Consistent styling with other inputs
      />
    </FieldBox>
  );
}
