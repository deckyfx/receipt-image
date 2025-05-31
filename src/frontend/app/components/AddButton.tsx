/**
 * @fileoverview AddButton component for adding new receipt components or parse functionality.
 * Provides a reusable button with Material Icons and disabled state support.
 * 
 * @author Receipt Image Generator
 * @since 2024-12-31
 * @changelog 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import type { ComponentType } from "@src/types";

/**
 * Props interface for the AddButton component
 */
type Props = {
  /** The type of component to add (e.g., 'text', 'heading') or 'parse' for parse functionality */
  component?: ComponentType | "parse";
  /** Whether the button should be disabled */
  disabled?: boolean;
  /** Callback function triggered when the button is clicked */
  onAdd?: () => void;
};

/**
 * A customizable add button component with Material Icons integration.
 * 
 * This component renders a full-width button with an "add" icon and text indicating
 * what type of component will be added. It supports disabled state with appropriate
 * visual feedback and cursor changes.
 * 
 * @param props - The component props
 * @param props.component - Type of component to add, displayed in button text
 * @param props.disabled - Whether the button is disabled
 * @param props.onAdd - Click handler function
 * @returns A styled button element with add icon and text
 * 
 * @example
 * ```tsx
 * // Add a text component
 * <AddButton 
 *   component="text" 
 *   onAdd={() => addTextComponent()} 
 * />
 * 
 * // Disabled state
 * <AddButton 
 *   component="heading" 
 *   disabled={true}
 *   onAdd={() => addHeadingComponent()} 
 * />
 * 
 * // Parse functionality
 * <AddButton 
 *   component="parse" 
 *   onAdd={() => openParseDialog()} 
 * />
 * ```
 */
export default function AddButton({ component, disabled, onAdd }: Props) {
  return (
    <button
      onClick={onAdd}
      disabled={disabled}
      className={`
        w-full py-2 rounded
        text-white flex items-center justify-center gap-2
        ${
          // Conditional styling based on disabled state
          disabled
            ? "bg-gray-400 cursor-not-allowed"  // Muted appearance when disabled
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"  // Interactive blue theme when enabled
        }
      `}
    >
      {/* Material Icons add symbol */}
      <span className="material-icons text-xl">add</span>
      {/* Dynamic button text based on component type */}
      {`ADD ${component?.toLocaleUpperCase()}`}
    </button>
  );
}
