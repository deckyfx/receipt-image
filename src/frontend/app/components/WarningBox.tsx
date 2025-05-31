/**
 * @fileoverview WarningBox component for displaying warning messages with consistent styling.
 * Provides a standardized alert component for error states and warning notifications.
 * 
 * @author Receipt Image Generator
 * @since 2024-12-31
 * @changelog 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

/**
 * Props interface for the WarningBox component
 */
interface WarningBoxProps {
  /** Optional title for the warning (default: "Warning") */
  title?: string;
  /** The warning message to display */
  message: string;
}

/**
 * A styled warning/error message component with consistent alert styling.
 * 
 * This component provides a standardized way to display warning and error messages
 * with appropriate color scheme, typography, and accessibility features. It follows
 * common alert design patterns with a red color scheme for high visibility.
 * 
 * @param props - The component props
 * @param props.title - Optional title text (defaults to "Warning")
 * @param props.message - The warning message content
 * @returns A styled alert box with warning message
 * 
 * @example
 * ```tsx
 * // Basic warning
 * <WarningBox message="Please fill in all required fields" />
 * 
 * // Custom title
 * <WarningBox 
 *   title="Validation Error" 
 *   message="The uploaded file is not a valid JSON format" 
 * />
 * 
 * // Error state
 * <WarningBox 
 *   title="Upload Failed" 
 *   message="Unable to process the selected file. Please try again." 
 * />
 * 
 * // Form validation feedback
 * {error && (
 *   <WarningBox 
 *     title="Invalid Input" 
 *     message={error} 
 *   />
 * )}
 * ```
 */
export default function WarningBox({ title = "Warning", message }: WarningBoxProps) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"  // Accessibility role for screen readers
    >
      {/* Bold title with colon separator */}
      <strong className="font-bold">{title}:</strong>
      {/* Message text - responsive block/inline display */}
      <span className="block sm:inline"> {message}</span>
    </div>
  );
}