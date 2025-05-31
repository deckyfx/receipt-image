/**
 * @fileoverview AlignmentSelector component for selecting text/content alignment options.
 * A specialized wrapper around RadioSelector specifically for alignment choices.
 * 
 * @author Receipt Image Generator
 * @since 2024-12-31
 * @changelog 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import { type Alignment, ALIGNMENTS } from "@src/types";
import RadioSelector from "./RadioSelector";

/**
 * Props interface for the AlignmentSelector component
 */
type Props = {
  /** Current alignment value ('left', 'center', 'right') */
  value?: Alignment;
  /** HTML name attribute for the input group (defaults to 'alignment') */
  name?: string;
  /** Callback function triggered when alignment selection changes */
  onChange: (align: Alignment) => void;
};

/**
 * A specialized alignment selector component built on top of RadioSelector.
 * 
 * This component provides a user-friendly interface for selecting text or content
 * alignment options (left, center, right). It automatically uses the predefined
 * ALIGNMENTS constant and provides sensible defaults.
 * 
 * @param props - The component props
 * @param props.value - Currently selected alignment option
 * @param props.name - HTML name attribute for radio button group
 * @param props.onChange - Function called when user selects a new alignment
 * @returns A RadioSelector configured for alignment options
 * 
 * @example
 * ```tsx
 * // Basic usage with state
 * const [alignment, setAlignment] = useState<Alignment>('left');
 * 
 * <AlignmentSelector 
 *   value={alignment}
 *   onChange={setAlignment}
 * />
 * 
 * // With custom name for form handling
 * <AlignmentSelector 
 *   name="textAlign"
 *   value={formData.align}
 *   onChange={(align) => updateFormData({ align })}
 * />
 * ```
 */
export default function AlignmentSelector({ name, value, onChange }: Props) {
  return (
    <RadioSelector
      title="Alignment"  // Fixed title for all alignment selectors
      onChange={onChange}
      name={name || "alignment"}  // Default name if none provided
      selections={ALIGNMENTS}  // Predefined alignment options from types
      value={value || "left"}  // Default to left alignment
    />
  );
}
