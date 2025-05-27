import { useState } from "react";
import { useEditorStore } from "../store/useEditorStore";
import AlignmentSelector from "./AlignmentSelector";
import SliderSelector from "./SliderSelector";
import TextInput from "./TextInput";
import AddButton from "./AddButton";
import type { Alignment, PayloadByType } from "@src/types";

const DefaultColumn: PayloadByType<"barcode"> = {
  type: "CODE128",
  content: "",
  width: 100,
  align: "left",
};

export default function BarCodeForm() {
  const { addComponent } = useEditorStore();

  const [data, setData] = useState<PayloadByType<"barcode">>({
    ...DefaultColumn,
  });

  const canAdd = data.content.trim().length > 0;

  function onAdd() {
    if (!canAdd) return;
    addComponent({
      type: "barcode",
      data,
    });
    setData({
      ...DefaultColumn,
    });
  }

  return (
    <div className="space-y-4">
      <TextInput
        title="Bar Code Data"
        name="src"
        value={data.content}
        placeholder="Enter Bar Code Data"
        onChange={(content) => setData({ ...data, content })}
      />

      <SliderSelector
        value={data.width}
        onChange={(val) => setData({ ...data, width: val })}
        min={1}
        max={100}
        step={1}
        title="Width (%)"
        name="width"
        unit="%"
      />

      <AlignmentSelector
        value={data.align}
        onChange={(align) => setData({ ...data, align: align as Alignment })}
      />

      <AddButton component="barcode" onAdd={onAdd} disabled={!canAdd} />
    </div>
  );
}
