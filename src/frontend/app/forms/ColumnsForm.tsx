/**
 * @fileoverview ColumnsForm component for configuring multi-column text layout receipt elements.
 * 
 * This form component provides a user interface for creating column layouts in receipts.
 * Users can configure 2-3 columns with individual text content, styling, alignment, and
 * optional width specifications. Each column supports full text formatting options including
 * size, thickness, italic, underline, and alignment. This is useful for creating structured
 * data layouts like itemized lists with prices, product details, etc.
 * 
 * Change log:
 * 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import { useState } from "react";
import TextInput from "@react/components/TextInput";
import AlignmentSelector from "@react/components/AlignmentSelector";
import AddButton from "@react/components/AddButton";
import NumberInput from "@react/components/NumberInput";
import CheckboxGroup from "@react/components/CheckboxGroup";
import RadioSelector from "@react/components/RadioSelector";

import { useEditorStore } from "@react/store/useEditorStore";
import type { ColumnPayload, TextPayload, TextStyle } from "@src/types";
import { TEXT_SIZES, TEXT_THICKNESSES } from "@src/types";

/** Minimum number of columns allowed */
const COLUMNS_MIN = 2;
/** Maximum number of columns allowed */
const COLUMNS_MAX = 3;

/** Default configuration for new column elements */
const DefaultColumn: ColumnPayload = {
  text: "", // Empty text content initially
  width: undefined, // Flexible width by default
  align: "left", // Left alignment by default
  size: "base", // Base font size
  thickness: "normal", // Normal font weight
  italic: false, // No italic styling
  underline: false, // No underline styling
};

/**
 * ColumnsForm component for configuring multi-column text layout receipt elements.
 * 
 * This form allows users to create column layouts with 2-3 columns, where each column
 * can have independent text content, styling (size, thickness, italic, underline),
 * alignment, and optional width specifications. Perfect for creating structured layouts
 * like product listings with prices, detailed breakdowns, or any tabular data.
 * 
 * @returns {JSX.Element} A form interface for configuring column layouts
 * 
 * @example
 * ```tsx
 * // Usage in a receipt editor:
 * <ColumnsForm />
 * 
 * // Creates column components like:
 * {
 *   type: "columns",
 *   data: [
 *     { text: "Product Name", width: 60, align: "left", size: "base" },
 *     { text: "$19.99", width: 40, align: "right", thickness: "bold" }
 *   ]
 * }
 * ```
 */
export default function ColumnsForm() {
  // Access the global editor store for adding components
  const { addComponent } = useEditorStore();

  // Local state for column configurations (starts with 2 columns)
  const [columns, setColumns] = useState<ColumnPayload[]>([
    { ...DefaultColumn },
    { ...DefaultColumn },
  ]);

  /**
   * Adds a third column to the layout if under the maximum limit.
   */
  function addColumn() {
    if (columns.length >= COLUMNS_MAX) return;
    setColumns([...columns, { ...DefaultColumn }]);
  }

  /**
   * Removes a column by index, maintaining minimum column requirement.
   * @param index - The index of the column to remove
   */
  function removeColumn(index: number) {
    if (columns.length <= COLUMNS_MIN) return;
    setColumns(columns.filter((_, i) => i !== index));
  }

  /**
   * Updates a specific property of a column at the given index.
   * @param index - The column index to update
   * @param key - The property key to update
   * @param value - The new value for the property
   */
  function updateColumn(index: number, key: keyof ColumnPayload, value: any) {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], [key]: value } as ColumnPayload;
    setColumns(newColumns);
  }

  /**
   * Gets the text style properties for a specific column.
   * @param index - The column index
   * @returns The column's text style properties
   */
  function getColumnStyle(index: number) {
    return columns[index] as TextStyle;
  }

  /**
   * Extracts the boolean style property keys for a column (italic, underline, etc.).
   * @param index - The column index
   * @returns Array of boolean property keys for styling checkboxes
   */
  function getColumnStyleKeys(index: number): string[] {
    const data = getColumnStyle(index);
    if (!data) {
      return [];
    }
    // Filter to only boolean properties (italic, underline)
    return Object.keys(data).filter(
      (key) => typeof data[key as keyof typeof data] === "boolean"
    ) as (keyof typeof data)[];
  }

  /**
   * Handles style changes for a specific column by updating multiple properties.
   * @param index - The column index to update
   * @param changes - Object containing the style property changes
   */
  function handleStyleChange(index: number, changes: TextStyle) {
    Object.keys(changes).forEach((key) => {
      updateColumn(
        index,
        key as keyof TextStyle,
        changes[key as keyof TextStyle]
      );
    });
  }

  // Validation: require at least one column to have non-empty content
  const canAdd = columns.some((c) => (c.text || "").trim().length > 0);

  /**
   * Handles adding the configured columns to the receipt and resetting the form.
   * Only proceeds if validation passes (at least one column has content).
   */
  function onAdd() {
    if (!canAdd) return;
    
    // Add the columns component to the receipt
    addComponent({
      type: "columns",
      data: columns,
    });
    
    // Reset form to default state with 2 empty columns
    setColumns([{ ...DefaultColumn }, { ...DefaultColumn }]);
  }

  return (
    <div className="space-y-6">
      {columns.map((col, i) => {
        return (
          <div key={i} className="border p-4 rounded space-y-3 relative">
            <div className="absolute top-2 right-2">
              {columns.length > COLUMNS_MIN && (
                <button
                  type="button"
                  onClick={() => removeColumn(i)}
                  className="text-red-600 hover:text-red-800"
                  aria-label={`Remove column ${i + 1}`}
                >
                  &times;
                </button>
              )}
            </div>

            <TextInput
              title={`Column ${i + 1} Content`}
              name={`content-${i}`}
              value={col.text}
              placeholder="Column text content"
              onChange={(content) => updateColumn(i, "text", content)}
            />

            <NumberInput
              title={`Column ${i + 1} Width (optional)`}
              name={`width-${i}`}
              value={col.width}
              placeholder="Flexible if empty"
              min={1}
              max={100}
              onChange={(v) => {
                updateColumn(
                  i,
                  "width",
                  v === "" ? undefined : Math.min(100, Math.max(1, +v))
                );
              }}
            />

            <AlignmentSelector
              value={col.align}
              name={`alignment-${i}`}
              onChange={(align) => {
                updateColumn(i, "align", align);
              }}
            />

            <RadioSelector
              title="Size"
              onChange={(v) => {
                updateColumn(i, "size", v);
              }}
              name={`size-${i}`}
              selections={TEXT_SIZES}
              value={col.size}
            />

            <RadioSelector
              title="Thickness"
              onChange={(v) => {
                updateColumn(i, "thickness", v);
              }}
              name={`thickness-${i}`}
              selections={TEXT_THICKNESSES}
              value={col.thickness}
            />

            <CheckboxGroup
              title="Styles"
              selections={getColumnStyleKeys(i)}
              names={getColumnStyleKeys(i).map((n) => `${n}-${i}`)}
              data={getColumnStyle(i)} // Type assertion because data contains more than booleans, but we only read booleans here
              onChange={(change) => {
                handleStyleChange(i, change);
              }}
            />
          </div>
        );
      })}

      <button
        type="button"
        onClick={addColumn}
        disabled={columns.length >= COLUMNS_MAX}
        className="w-full py-2 rounded bg-green-600 text-white flex items-center justify-center gap-2 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        <span className="material-icons text-xl">add</span>
        {`Add 3rd Column`.toLocaleUpperCase()}
      </button>

      <AddButton component="columns" onAdd={onAdd} disabled={!canAdd} />
    </div>
  );
}
