import { useState, useEffect } from "react";
import AddButton from "@react/components/AddButton";
import TextAreaInput from "@react/components/TextAreaInput";
import FileUploadButton from "@react/components/FileUploadButton";
import WarningBox from "@react/components/WarningBox";
import { isBatchParsePayloadItemArray } from "@react/components/ParseFormValidator";

import { useEditorStore } from "@react/store/useEditorStore";
import type { BatchParsePayloadItem } from "@src/types";

const DefaultForm: string = "";

export default function ParseForm() {
  const { parseBatch } = useEditorStore();

  const [jsonInput, setJsonInput] = useState<string>(DefaultForm);
  const [isValidStructure, setIsValidStructure] = useState<boolean>(false);
  const [parseError, setParseError] = useState<string | null>(null);
  // To store the *parsed and validated* array of items
  const [parsedItems, setParsedItems] = useState<
    BatchParsePayloadItem[] | null
  >(null);

  function onAdd() {
    // Before adding, ensure it's still valid JSON AND follows the structure
    if (!isValidStructure || !parsedItems || parsedItems.length === 0) {
      setParseError(
        "Cannot add: JSON is invalid, empty, or does not match the required structure."
      );
      return;
    }

    parseBatch(parsedItems);

    setJsonInput(DefaultForm); // Clear the textarea after adding
    setIsValidStructure(false); // Reset validation state
    setParseError(null);
    setParsedItems(null);
  }

  // The Add button should be disabled if JSON is not valid structure OR the input is empty
  const canAdd =
    isValidStructure && parsedItems !== null && parsedItems.length > 0;

  // Effect to parse and validate JSON whenever jsonInput changes
  useEffect(() => {
    if (jsonInput.trim() === "") {
      setIsValidStructure(false);
      setParseError(null);
      setParsedItems(null);
      return;
    }

    try {
      const rawParsed = JSON.parse(jsonInput);

      // Now, validate the structure against BatchParsePayloadItem[]
      const error = isBatchParsePayloadItemArray(rawParsed);
      if (!error) {
        setParsedItems(rawParsed);
        setIsValidStructure(true);
        setParseError(null);
      } else {
        setIsValidStructure(false);
        setParsedItems(null);
        setParseError(error);
      }
    } catch (e: any) {
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
