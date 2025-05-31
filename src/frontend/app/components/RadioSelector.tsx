/**
 * @fileoverview RadioSelector component for single-choice selection from multiple options.
 * A generic radio button group component with type safety for string or number values.
 * 
 * @author Receipt Image Generator
 * @since 2024-12-31
 * @changelog 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import FieldBox from "./FieldBox";

/**
 * Props interface for the RadioSelector component
 * @template T - The type of values for the radio options (string or number)
 */
type RadioSelectorProps<T extends string | number> = {
  /** Currently selected value */
  value?: T;
  /** Callback function triggered when selection changes */
  onChange?: (val: T) => void;
  /** Array of available options to choose from */
  selections: readonly T[];
  /** Optional title/label for the radio group */
  title?: string;
  /** HTML name attribute for the radio button group */
  name: string;
};

/**
 * A generic radio button selector component with type safety.
 * 
 * This component renders a horizontal group of radio buttons for single-choice
 * selection. It supports both string and number values with TypeScript generics
 * for type safety. Labels are automatically capitalized for consistent display.
 * 
 * @template T - The type of values (string | number)
 * @param props - The component props
 * @param props.value - Currently selected value
 * @param props.onChange - Function called when selection changes
 * @param props.selections - Array of available options
 * @param props.title - Optional group label
 * @param props.name - HTML name attribute for radio group
 * @returns A FieldBox containing horizontally arranged radio buttons
 * 
 * @example
 * ```tsx
 * // String-based radio selection
 * const alignments = ['left', 'center', 'right'] as const;
 * <RadioSelector
 *   title="Text Alignment"
 *   name="textAlign"
 *   selections={alignments}
 *   value={currentAlign}
 *   onChange={setCurrentAlign}
 * />
 * 
 * // Number-based radio selection
 * const priorities = [1, 2, 3] as const;
 * <RadioSelector
 *   title="Priority Level"
 *   name="priority"
 *   selections={priorities}
 *   value={priority}
 *   onChange={setPriority}
 * />
 * 
 * // Used by AlignmentSelector
 * <RadioSelector
 *   title="Alignment"
 *   name="alignment"
 *   selections={ALIGNMENTS}
 *   value="center"
 *   onChange={handleAlignmentChange}
 * />
 * ```
 */
export default function RadioSelector<T extends string | number>({
  value,
  onChange,
  selections,
  title,
  name,
}: RadioSelectorProps<T>) {
  return (
    <FieldBox label={title}>
      <div className="space-x-4">  {/* Horizontal spacing between radio options */}
        {selections.map((opt) => (
          <label
            key={String(opt)}  // Ensure unique keys for React rendering
            className="inline-flex items-center space-x-1"  // Align radio and label
          >
            <input
              type="radio"
              name={name}  // Group radio buttons by name
              value={String(opt)}
              checked={value === opt}  // Controlled component - check if this option is selected
              onChange={() => onChange?.(opt)}  // Call onChange with the selected option
            />
            {/* Capitalize option labels for consistent display */}
            <span className="capitalize">{String(opt)}</span>
          </label>
        ))}
      </div>
    </FieldBox>
  );
}
