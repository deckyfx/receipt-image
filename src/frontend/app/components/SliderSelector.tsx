/**
 * @fileoverview SliderSelector component for numeric value selection using a range slider.
 * Provides an intuitive slider interface with optional reverse mode and unit display.
 * 
 * @author Receipt Image Generator
 * @since 2024-12-31
 * @changelog 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import FieldBox from "./FieldBox";

/**
 * Props interface for the SliderSelector component
 */
type SliderSelectorProps = {
  /** Current numeric value of the slider */
  value: number;
  /** Callback function triggered when slider value changes */
  onChange: (val: number) => void;
  /** Minimum allowed value (default: 0) */
  min?: number;
  /** Maximum allowed value (default: 100) */
  max?: number;
  /** Step increment for slider movement (default: 1) */
  step?: number;
  /** Optional title/label for the slider */
  title?: string;
  /** HTML name attribute for the range input */
  name: string;
  /** Unit label displayed after the value (e.g., 'px', '%', 'ms') */
  unit?: string;
  /** Whether to reverse the slider direction (default: false) */
  reverse?: boolean;
};

/**
 * A range slider component with optional reverse mode and unit display.
 * 
 * This component provides an intuitive interface for selecting numeric values
 * within a specified range. It supports reverse mode where the visual slider
 * direction is inverted, and displays the current value with optional units.
 * 
 * @param props - The component props
 * @param props.value - Current slider value
 * @param props.onChange - Function called when value changes
 * @param props.min - Minimum value (default: 0)
 * @param props.max - Maximum value (default: 100)
 * @param props.step - Value increment step (default: 1)
 * @param props.title - Optional slider label
 * @param props.name - HTML name attribute
 * @param props.unit - Unit suffix for value display
 * @param props.reverse - Whether to reverse slider direction
 * @returns A FieldBox containing a styled range slider with value display
 * 
 * @example
 * ```tsx
 * // Basic percentage slider
 * <SliderSelector
 *   title="Opacity"
 *   name="opacity"
 *   value={opacity}
 *   min={0}
 *   max={100}
 *   unit="%"
 *   onChange={setOpacity}
 * />
 * 
 * // Reverse slider for thickness (thinner = higher value)
 * <SliderSelector
 *   title="Line Thickness"
 *   name="thickness"
 *   value={thickness}
 *   min={1}
 *   max={10}
 *   reverse={true}
 *   unit="px"
 *   onChange={setThickness}
 * />
 * 
 * // Time duration slider
 * <SliderSelector
 *   title="Animation Duration"
 *   name="duration"
 *   value={duration}
 *   min={100}
 *   max={2000}
 *   step={50}
 *   unit="ms"
 *   onChange={setDuration}
 * />
 * ```
 */
export default function SliderSelector({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  title,
  name,
  unit = "",
  reverse = false,
}: SliderSelectorProps) {
  /**
   * Handles slider value changes and applies reverse logic if needed.
   * @param e - The range input change event
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = parseInt(e.target.value);
    // Apply reverse transformation if reverse mode is enabled
    const val = reverse ? max - raw + min : raw;
    onChange(val);
  }

  return (
    <FieldBox label={title}>
      <input
        type="range"  // HTML5 range input for slider functionality
        name={name}
        className="w-full"  // Full width slider
        min={min}
        max={max}
        step={step}
        value={reverse ? max - value + min : value}  // Apply reverse transformation for display
        onChange={handleChange}
      />
      {/* Display current value with optional unit */}
      <div className="text-sm text-gray-500 mt-1">
        {value}  {/* Show actual value, not transformed value */}
        {unit}   {/* Optional unit suffix */}
      </div>
    </FieldBox>
  );
}
