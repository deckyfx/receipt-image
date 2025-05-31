/**
 * @fileoverview FileUploadButton component for handling file uploads with validation.
 * Provides a styled button interface for file selection with built-in error handling and validation.
 * 
 * @author Receipt Image Generator
 * @since 2024-12-31
 * @changelog 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import { useRef } from "react";

/**
 * Props interface for the FileUploadButton component
 */
interface FileUploadButtonProps {
  /** Optional title displayed above the upload button */
  title?: string;
  /** Callback function that receives the file content as a string */
  onFileContent: (content: string) => void;
  /** Callback function that receives error messages */
  onError: (error: string) => void;
  /** Accepted file types (e.g., '.json', '.txt', '.json,.csv') */
  accept?: string;
  /** Text displayed on the upload button */
  buttonText?: string;
  /** CSS classes for styling the button */
  buttonClassName?: string;
  /** CSS classes for styling the container */
  containerClassName?: string;
  /** CSS classes for styling the title */
  titleClassName?: string;
}

/**
 * A file upload component with validation and error handling.
 * 
 * This component provides a user-friendly interface for file uploads with automatic
 * file type validation, error handling, and customizable styling. It uses a hidden
 * file input triggered by a styled button for better UX.
 * 
 * @param props - The component props
 * @param props.title - Optional title text shown above the button
 * @param props.onFileContent - Function called with file content when upload succeeds
 * @param props.onError - Function called with error message when upload fails
 * @param props.accept - File type restrictions (MIME types or extensions)
 * @param props.buttonText - Text displayed on the upload button
 * @param props.buttonClassName - Custom CSS classes for button styling
 * @param props.containerClassName - Custom CSS classes for container styling
 * @param props.titleClassName - Custom CSS classes for title styling
 * @returns A file upload interface with validation and error handling
 * 
 * @example
 * ```tsx
 * // Basic JSON file upload
 * <FileUploadButton
 *   title="Import Data"
 *   accept=".json"
 *   onFileContent={(content) => {
 *     try {
 *       const data = JSON.parse(content);
 *       setImportedData(data);
 *     } catch (e) {
 *       console.error('Invalid JSON');
 *     }
 *   }}
 *   onError={(error) => setErrorMessage(error)}
 * />
 * 
 * // Multiple file types with custom styling
 * <FileUploadButton
 *   title="Upload Document"
 *   accept=".txt,.csv,.json"
 *   buttonText="Choose File"
 *   buttonClassName="bg-green-600 hover:bg-green-700"
 *   onFileContent={handleFileContent}
 *   onError={handleError}
 * />
 * ```
 */
export default function FileUploadButton({
  title,
  onFileContent,
  onError,
  accept = ".json",
  buttonText = "Upload JSON File",
  buttonClassName = "w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer flex items-center justify-center gap-2",
  containerClassName = "space-y-4",
  titleClassName = "text-lg font-semibold",
}: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles file selection and validation
   * @param event - The file input change event
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file extension against accepted types
    const acceptedExtensions = accept.split(",").map(ext => ext.trim());
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    
    if (!acceptedExtensions.some(ext => fileExtension === ext)) {
      onError(`Please upload a file with one of these extensions: ${accept}`);
      return;
    }

    // Read file content as text
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileContent(content);  // Pass content to parent component
    };
    reader.onerror = () => {
      onError("Failed to read file");  // Handle read errors
    };
    reader.readAsText(file);

    // Reset input value to allow re-selecting the same file
    event.target.value = "";
  };

  /**
   * Programmatically triggers the hidden file input
   */
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Core upload interface without title wrapper
  const content = (
    <>
      {/* Styled button that triggers file selection */}
      <button
        onClick={triggerFileUpload}
        className={buttonClassName}
      >
        <span className="material-icons text-xl">upload</span>
        {buttonText}
      </button>
      {/* Hidden file input that handles actual file selection */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileUpload}
        className="hidden"  // Visually hidden but accessible
      />
    </>
  );

  // Return content without wrapper if no title provided
  if (!title) {
    return content;
  }

  // Return content with title wrapper
  return (
    <div className={containerClassName}>
      <h3 className={titleClassName}>{title}</h3>
      {content}
    </div>
  );
}