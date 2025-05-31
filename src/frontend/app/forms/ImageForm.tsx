import { useState } from "react";
import { useEditorStore } from "@react/store/useEditorStore";
import AlignmentSelector from "@react/components/AlignmentSelector";
import SliderSelector from "@react/components/SliderSelector";
import TextInput from "@react/components/TextInput";
import AddButton from "@react/components/AddButton";
import WarningBox from "@react/components/WarningBox";
import type { Alignment, PayloadByType } from "@src/types";

const DefaultColumn: PayloadByType<"image"> = {
  src: "",
  width: 100,
  align: "left",
};

function isValidUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default function ImageForm() {
  const { addComponent } = useEditorStore();

  const [data, setData] = useState<PayloadByType<"image">>({
    ...DefaultColumn,
  });

  const isUrlValid = isValidUrl(data.src);
  const canAdd = data.src.trim().length > 0 && isUrlValid;

  function onAdd() {
    if (!canAdd) return;
    addComponent({
      type: "image",
      data,
    });
    setData({
      ...DefaultColumn,
    });
  }

  return (
    <div className="space-y-4">
      <TextInput
        title="Image Source URL"
        name="src"
        value={data.src}
        placeholder="Enter image URL"
        onChange={(src) => setData({ ...data, src })}
      />
      {!isUrlValid && data.src.trim() !== "" && (
        <WarningBox title="Invalid URL" message="Please enter a valid URL." />
      )}

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

      <AddButton component="image" onAdd={onAdd} disabled={!canAdd} />
    </div>
  );
}
