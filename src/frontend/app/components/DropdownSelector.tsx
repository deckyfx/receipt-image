/**
 * @fileoverview DropdownSelector component for selecting from a list of predefined options.
 * A generic dropdown component that works with string or number values.
 * 
 * @author Receipt Image Generator
 * @since 2024-12-31
 * @changelog 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import FieldBox from "./FieldBox";

/**
 * Props interface for the DropdownSelector component
 * @template T - The type of values in the dropdown (string or number)
 */
type DropdownSelectorProps<T extends string | number> = {
  /** Currently selected value or empty string for no selection */
  value?: T | "";
  /** Callback function triggered when selection changes */
  onChange?: (val: T) => void;
  /** Array of available options to choose from */
  selections: readonly T[];
  /** Optional title/label for the dropdown */
  title?: string;
  /** HTML name attribute for the select element */
  name: string;
  /** Placeholder text shown when no option is selected */
  placeholder?: string;
};

/**
 * A generic dropdown selector component with type safety.
 * 
 * This component provides a clean interface for selecting from a predefined list
 * of options. It supports both string and number values with TypeScript generics
 * for type safety. Options are automatically capitalized for display.
 * 
 * @template T - The type of values (string | number)
 * @param props - The component props
 * @param props.value - Currently selected value
 * @param props.onChange - Function called when selection changes
 * @param props.selections - Array of available options
 * @param props.title - Optional dropdown label
 * @param props.name - HTML name attribute
 * @param props.placeholder - Text shown when no option selected
 * @returns A FieldBox containing a styled select element
 * 
 * @example
 * ```tsx
 * // String-based dropdown
 * const sizes = ['small', 'medium', 'large'] as const;
 * <DropdownSelector
 *   title="Size"
 *   name="size"
 *   selections={sizes}
 *   value={selectedSize}
 *   onChange={setSelectedSize}
 *   placeholder="Choose a size"
 * />
 * 
 * // Number-based dropdown
 * const levels = [1, 2, 3, 4, 5] as const;
 * <DropdownSelector
 *   title="Level"
 *   name="level"
 *   selections={levels}
 *   value={currentLevel}
 *   onChange={setCurrentLevel}
 * />
 * ```
 */
export default function DropdownSelector<T extends string | number>({
  value,
  onChange,
  selections,
  title,
  name,
  placeholder = "-- Select --",
}: DropdownSelectorProps<T>) {
  return (
    <FieldBox label={title}>
      <select
        name={name}
        value={value}
        onChange={(e) => 
          // Type assertion is safe here as we control the option values
          onChange?.(e.target.value as T)
        }
        className="w-full border rounded p-2"
      >
        {/* Default placeholder option with empty value */}
        <option value="">{placeholder}</option>
        {selections.map((opt) => (
          <option key={String(opt)} value={String(opt)}>
            {/* Convert to uppercase for consistent display */}
            {String(opt).toLocaleUpperCase()}
          </option>
        ))}
      </select>
    </FieldBox>
  );
}
