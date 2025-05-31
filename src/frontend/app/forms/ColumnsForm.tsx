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

const COLUMNS_MIN = 2;
const COLUMNS_MAX = 3;

const DefaultColumn: ColumnPayload = {
  text: "",
  width: undefined,
  align: "left",
  size: "base",
  thickness: "normal",
  italic: false,
  underline: false,
};

export default function ColumnsForm() {
  const { addComponent } = useEditorStore();

  const [columns, setColumns] = useState<ColumnPayload[]>([
    { ...DefaultColumn },
    { ...DefaultColumn },
  ]);

  function addColumn() {
    if (columns.length >= COLUMNS_MAX) return;
    setColumns([...columns, { ...DefaultColumn }]);
  }

  // Remove a column (min 2 columns)
  function removeColumn(index: number) {
    if (columns.length <= COLUMNS_MIN) return;
    setColumns(columns.filter((_, i) => i !== index));
  }

  // Update a column property
  function updateColumn(index: number, key: keyof ColumnPayload, value: any) {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], [key]: value } as ColumnPayload;
    setColumns(newColumns);
  }

  function getColumnStyle(index: number) {
    return columns[index] as TextStyle;
  }

  function getColumnStyleKeys(index: number): string[] {
    const data = getColumnStyle(index);
    if (!data) {
      return [];
    }
    return Object.keys(data).filter(
      (key) => typeof data[key as keyof typeof data] === "boolean"
    ) as (keyof typeof data)[];
  }

  function handleStyleChange(index: number, changes: TextStyle) {
    Object.keys(changes).forEach((key) => {
      updateColumn(
        index,
        key as keyof TextStyle,
        changes[key as keyof TextStyle]
      );
    });
  }

  // Validate content (at least one non-empty)
  const canAdd = columns.some((c) => (c.text || "").trim().length > 0);

  function onAdd() {
    if (!canAdd) return;
    addComponent({
      type: "columns",
      data: columns,
    });
    // reset form
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
