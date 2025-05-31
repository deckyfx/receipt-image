/**
 * @fileoverview ParseForm component for batch importing receipt components from JSON.
 * 
 * This form component provides a user interface for importing multiple receipt components
 * at once from JSON data. Users can either paste JSON directly into a textarea or upload
 * a JSON file. The component validates the JSON structure in real-time and provides
 * detailed error messages for invalid data. This is useful for bulk importing pre-defined
 * receipt layouts, templates, or migrating from other systems.
 * 
 * Change log:
 * 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import { useState, useEffect } from "react";
import AddButton from "@react/components/AddButton";
import TextAreaInput from "@react/components/TextAreaInput";
import FileUploadButton from "@react/components/FileUploadButton";
import WarningBox from "@react/components/WarningBox";
import { isBatchParsePayloadItemArray } from "@react/components/ParseFormValidator";

import { useEditorStore } from "@react/store/useEditorStore";
import type { BatchParsePayloadItem } from "@src/types";

/** Default form state (empty JSON input) */
const DefaultForm: string = "";

/**
 * ParseForm component for batch importing receipt components from JSON.
 * 
 * This form allows users to import multiple receipt components at once by:
 * - Pasting JSON data directly into a textarea
 * - Uploading a JSON file using the file upload button
 * - Real-time validation with detailed error messages
 * - Batch processing of all valid components
 * 
 * @returns {JSX.Element} A form interface for batch importing components
 * 
 * @example
 * ```tsx
 * // Usage in a receipt editor:
 * <ParseForm />
 * 
 * // Accepts JSON arrays like:
 * [
 *   { "type": "heading", "text": "Store Name", "size": 1, "align": "center" },
 *   { "type": "text", "text": "Thank you for shopping!", "align": "left" },
 *   { "type": "divider", "thickness": "thin", "style": "solid" }
 * ]
 * ```
 */
export default function ParseForm() {
  // Access the global editor store for batch adding components
  const { parseBatch } = useEditorStore();

  // Raw JSON input from user (textarea or file)
  const [jsonInput, setJsonInput] = useState<string>(DefaultForm);
  // Whether the JSON structure is valid for batch processing
  const [isValidStructure, setIsValidStructure] = useState<boolean>(false);
  // Error message for invalid JSON or structure
  const [parseError, setParseError] = useState<string | null>(null);
  // Parsed and validated array of receipt components
  const [parsedItems, setParsedItems] = useState<
    BatchParsePayloadItem[] | null
  >(null);

  /**
   * Handles adding all validated components to the receipt and resetting the form.
   * Performs final validation before batch processing to ensure data integrity.
   */
  function onAdd() {
    // Final validation check before adding
    if (!isValidStructure || !parsedItems || parsedItems.length === 0) {
      setParseError(
        "Cannot add: JSON is invalid, empty, or does not match the required structure."
      );
      return;
    }

    // Batch add all validated components to the receipt
    parseBatch(parsedItems);

    // Reset form to clean state after successful import
    setJsonInput(DefaultForm);
    setIsValidStructure(false);
    setParseError(null);
    setParsedItems(null);
  }

  // Enable add button only when we have valid, non-empty data
  const canAdd =
    isValidStructure && parsedItems !== null && parsedItems.length > 0;

  /**
   * Effect to parse and validate JSON whenever input changes.
   * Provides real-time feedback on JSON validity and structure compliance.
   */
  useEffect(() => {
    // Clear validation state for empty input
    if (jsonInput.trim() === "") {
      setIsValidStructure(false);
      setParseError(null);
      setParsedItems(null);
      return;
    }

    try {
      // First, parse the JSON to check basic syntax
      const rawParsed = JSON.parse(jsonInput);

      // Then validate the structure against expected component format
      const error = isBatchParsePayloadItemArray(rawParsed);
      if (!error) {
        // Valid structure - store the parsed items
        setParsedItems(rawParsed);
        setIsValidStructure(true);
        setParseError(null);
      } else {
        // Invalid structure - show specific error
        setIsValidStructure(false);
        setParsedItems(null);
        setParseError(error);
      }
    } catch (e: any) {
      // JSON syntax error - show parsing error
      setIsValidStructure(false);
      setParsedItems(null);
      setParseError("Invalid JSON format: " + e.message);
    }
  }, [jsonInput]);

  return (
    <div className="space-y-4">
      <FileUploadButton
        title="Batch Component JSON Data"
        onFileContent={setJsonInput}
        onError={setParseError}
      />

      <TextAreaInput
        title=""
        name="batchComponentData"
        value={jsonInput}
        placeholder={`Enter component data as JSON Array, example:\n[\n {"type": "heading", "text": "Heading Text"},\n {"type": "text", "text": "Hello World"}\n]`}
        onChange={(text) => setJsonInput(text)}
        minRows={10} // Give more space for complex JSON
      />

      {parseError && (
        <WarningBox title="Validation Error" message={parseError} />
      )}

      {/* The Add button now adds multiple components */}
      <AddButton component="parse" onAdd={onAdd} disabled={!canAdd} />
    </div>
  );
}
