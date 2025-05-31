import { useState } from "react";
import { useEditorStore } from "@react/store/useEditorStore";
import AlignmentSelector from "@react/components/AlignmentSelector";
import SliderSelector from "@react/components/SliderSelector";
import TextInput from "@react/components/TextInput";
import AddButton from "@react/components/AddButton";
import DropdownSelector from "@react/components/DropdownSelector";
import { BARCODE_TYPES } from "@src/types";
import type { Alignment, PayloadByType, BarCodeType } from "@src/types";

const DefaultColumn: PayloadByType<"barcode"> = {
  barcode_type: "CODE128",
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

      <DropdownSelector
        title="Barcode Type"
        name="barcode_type"
        selections={BARCODE_TYPES}
        value={data.barcode_type}
        onChange={(type) => setData({ ...data, barcode_type: type as BarCodeType })}
      />

      <SliderSelector
        value={data.width || 100}
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
