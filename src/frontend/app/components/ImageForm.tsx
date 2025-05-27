import React, { useState } from "react";
import { useEditorStore } from "../store/useEditorStore";
import AlignmentSelector from "./AlignmentSelector";
import SliderSelector from "./SliderSelector";
import TextInput from "./TextInput";
import AddButton from "./AddButton";
import type { Alignment } from "@src/types";

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

  const [data, setData] = useState({
    src: "",
    width: 100,
    align: "left" as Alignment,
  });

  const isUrlValid = isValidUrl(data.src);
  const canAdd = data.src.trim().length > 0 && isUrlValid;

  function onAdd() {
    if (!canAdd) return;
    addComponent({
      type: "image",
      data,
    });
    setData({ src: "", width: 100, align: "left" });
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
        <div className="text-sm text-red-600">Please enter a valid URL.</div>
      )}

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

      <AddButton component="image" onAdd={onAdd} disabled={!canAdd} />
    </div>
  );
}
