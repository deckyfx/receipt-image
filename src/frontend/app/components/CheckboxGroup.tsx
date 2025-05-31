/**
 * @fileoverview CheckboxGroup component for rendering multiple checkbox options in a group.
 * Provides a reusable interface for managing boolean options like text styling (italic, underline).
 * 
 * @author Receipt Image Generator
 * @since 2024-12-31
 * @changelog 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import FieldBox from "./FieldBox";

/**
 * Props interface for the CheckboxGroup component
 */
type CheckboxGroupProps = {
  /** Array of checkbox option labels (e.g., ['italic', 'underline']) */
  selections?: readonly string[];
  /** Array of HTML name attributes corresponding to each selection */
  names?: readonly string[];
  /** Object containing current checkbox states (e.g., { italic: true, underline: false }) */
  data?: Record<string, boolean>;
  /** Callback function triggered when any checkbox state changes */
  onChange?: (change: Record<string, boolean>) => void;
  /** Optional title/label for the checkbox group */
  title?: string;
};

/**
 * A flexible checkbox group component for managing multiple boolean options.
 * 
 * This component renders a horizontal group of checkboxes with labels, commonly used
 * for text styling options (italic, underline, bold) or feature toggles. Each checkbox
 * can be individually controlled and returns state changes as an object.
 * 
 * @param props - The component props
 * @param props.selections - Array of option labels to display
 * @param props.names - Array of HTML name attributes (should match selections length)
 * @param props.data - Object mapping selection keys to their boolean states
 * @param props.onChange - Function called when any checkbox state changes
 * @param props.title - Optional group title displayed above checkboxes
 * @returns A FieldBox containing horizontally arranged checkboxes
 * 
 * @example
 * ```tsx
 * // Text styling options
 * const [textStyles, setTextStyles] = useState({ italic: false, underline: true });
 * 
 * <CheckboxGroup
 *   title="Text Styling"
 *   selections={['italic', 'underline']}
 *   names={['textItalic', 'textUnderline']}
 *   data={textStyles}
 *   onChange={(changes) => setTextStyles(prev => ({ ...prev, ...changes }))}
 * />
 * 
 * // Feature toggles
 * <CheckboxGroup
 *   title="Options"
 *   selections={['showBorder', 'autoResize']}
 *   data={options}
 *   onChange={updateOptions}
 * />
 * ```
 */
export default function CheckboxGroup({
  selections = [],
  names = [],
  data = {},
  onChange,
  title,
}: CheckboxGroupProps) {
  return (
    <FieldBox label={title}>
      <div className="flex space-x-4">
        {selections.map((selection, index) => (
          <label key={selection} className="flex items-center space-x-1">
            <input
              type="checkbox"
              name={names[index]}  // Use corresponding name or fallback to undefined
              checked={!!data[selection]}  // Convert to boolean, handle undefined gracefully
              onChange={(e) => 
                // Call onChange with object containing only the changed selection
                onChange?.({ [selection]: e.target.checked })
              }
            />
            {/* Capitalize the selection label for better readability */}
            <span className="text-sm capitalize">{selection}</span>
          </label>
        ))}
      </div>
    </FieldBox>
  );
}
