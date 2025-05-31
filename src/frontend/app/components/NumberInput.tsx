/**
 * @fileoverview NumberInput component for numeric value input with validation.
 * Provides a specialized input field for numbers with min/max constraints.
 * 
 * @author Receipt Image Generator
 * @since 2024-12-31
 * @changelog 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import FieldBox from "./FieldBox";

/**
 * Props interface for the NumberInput component
 */
type NumberInputProps = {
  /** Current numeric value */
  value?: number;
  /** Callback function that receives the input value as a string */
  onChange?: (val: string) => void;
  /** Placeholder text shown when input is empty */
  placeholder?: string;
  /** Optional title/label for the input field */
  title?: string;
  /** HTML name attribute for the input element */
  name?: string;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
};

/**
 * A number input component with built-in validation and constraints.
 * 
 * This component provides a clean interface for numeric input with optional
 * minimum and maximum value constraints. It uses HTML5 number input for
 * built-in browser validation and accessibility features.
 * 
 * @param props - The component props
 * @param props.value - Current number value
 * @param props.onChange - Function called when value changes (receives string)
 * @param props.placeholder - Placeholder text for empty state
 * @param props.title - Optional label text
 * @param props.name - HTML name attribute
 * @param props.min - Minimum allowed value
 * @param props.max - Maximum allowed value
 * @returns A FieldBox containing a styled number input
 * 
 * @example
 * ```tsx
 * // Basic number input
 * <NumberInput
 *   title="Age"
 *   name="age"
 *   value={age}
 *   onChange={(val) => setAge(parseInt(val) || 0)}
 *   placeholder="Enter your age"
 * />
 * 
 * // Number input with constraints
 * <NumberInput
 *   title="Quantity"
 *   name="quantity"
 *   value={quantity}
 *   min={1}
 *   max={100}
 *   onChange={(val) => setQuantity(parseInt(val) || 1)}
 * />
 * 
 * // Percentage input
 * <NumberInput
 *   title="Opacity (%)"
 *   name="opacity"
 *   value={opacity}
 *   min={0}
 *   max={100}
 *   onChange={(val) => setOpacity(parseFloat(val) || 0)}
 * />
 * ```
 */
export default function NumberInput({
  value,
  onChange,
  placeholder = "",
  title,
  name,
  min,
  max,
}: NumberInputProps) {
  return (
    <FieldBox label={title}>
      <input
        type="number"  // HTML5 number input for better UX and validation
        name={name}
        min={min}  // Browser-enforced minimum value
        max={max}  // Browser-enforced maximum value
        placeholder={placeholder}
        value={value}
        onChange={(e) => 
          // Pass string value to onChange - parent handles parsing
          onChange?.(e.target.value)
        }
        className="w-full p-2 border rounded"  // Consistent styling with other inputs
      />
    </FieldBox>
  );
}
