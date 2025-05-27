import { useState } from "react";
import TextInput from "./TextInput";
import AlignmentSelector from "./AlignmentSelector";
import AddButton from "./AddButton";
import NumberInput from "./NumberInput";

import { useEditorStore } from "@react/store/useEditorStore";
import type { ColumnPayload } from "@src/types";

const COLUMNS_MIN = 2;
const COLUMNS_MAX = 3;

export default function ColumnsForm() {
  const { addComponent } = useEditorStore();

  const [columns, setColumns] = useState<ColumnPayload[]>([
    { text: "", width: undefined, align: "left" },
    { text: "", width: undefined, align: "left" },
  ]);

  function addColumn() {
    if (columns.length >= COLUMNS_MAX) return;
    setColumns([...columns, { text: "", width: undefined, align: "left" }]);
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

  // Validate content (at least one non-empty)
  const canAdd = columns.some((c) => (c.text || "").trim().length > 0);

  function onAdd() {
    if (!canAdd) return;
    addComponent({
      type: "columns",
      data: columns,
    });
    // reset form
    setColumns([
      { text: "", width: undefined, align: "left" },
      { text: "", width: undefined, align: "left" },
    ]);
  }

  return (
    <div className="space-y-6">
      {columns.map((col, i) => (
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
            onChange={(align) => updateColumn(i, "align", align)}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addColumn}
        disabled={columns.length >= COLUMNS_MAX}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        Add Column
      </button>

      <AddButton component="columns" onAdd={onAdd} disabled={!canAdd} />
    </div>
  );
}
