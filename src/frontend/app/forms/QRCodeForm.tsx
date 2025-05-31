import { useState } from "react";
import { useEditorStore } from "@react/store/useEditorStore";
import AlignmentSelector from "@react/components/AlignmentSelector";
import SliderSelector from "@react/components/SliderSelector";
import TextInput from "@react/components/TextInput";
import AddButton from "@react/components/AddButton";
import type { Alignment, PayloadByType } from "@src/types";

const DefaultColumn: PayloadByType<"qrcode"> = {
  content: "",
  width: 100,
  align: "left",
};

export default function QRCodeForm() {
  const { addComponent } = useEditorStore();

  const [data, setData] = useState<PayloadByType<"qrcode">>({
    ...DefaultColumn,
  });

  const canAdd = data.content.trim().length > 0;

  function onAdd() {
    if (!canAdd) return;
    addComponent({
      type: "qrcode",
      data,
    });
    setData({
      ...DefaultColumn,
    });
  }

  return (
    <div className="space-y-4">
      <TextInput
        title="QRCode Data"
        name="src"
        value={data.content}
        placeholder="Enter QRCode Data"
        onChange={(content) => setData({ ...data, content })}
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

      <AddButton component="qrcode" onAdd={onAdd} disabled={!canAdd} />
    </div>
  );
}
