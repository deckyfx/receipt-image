import { useState } from "react";

import AlignmentSelector from "./AlignmentSelector";
import FieldBox from "./FieldBox";
import AddButton from "./AddButton";
import RadioSelector from "./RadioSelector";
import CheckboxGroup from "./CheckboxGroup";
import TextInput from "./TextInput";
import { useEditorStore } from "@react/store/useEditorStore";
import type { Alignment, PayloadByType } from "@src/types";

export default function TextForm() {
  const { addComponent } = useEditorStore();

  const [data, setData] = useState<PayloadByType<"text">>({
    text: "",
    align: "left",
    size: "base",
    thickness: "normal",
    italic: false,
    underline: false,
  });

  const styleKeys = Object.keys(data).filter(
    (key) => typeof data[key as keyof typeof data] === "boolean"
  ) as (keyof typeof data)[];

  const canAdd = !data.text ? false : data.text.trim().length > 0;

  function onAdd() {
    addComponent({
      type: "text",
      data,
    });
  }

  function handleStyleChange(change: Partial<Record<string, boolean>>) {
    setData((prev) => ({
      ...prev,
      ...change,
    }));
  }

  return (
    <div className="space-y-4">
      <TextInput
        title="Text Content"
        name="text"
        value={data.text}
        placeholder="Text Content"
        onChange={(text) => setData({ ...data, text })}
      />
      <AlignmentSelector
        value={data.align || "left"}
        onChange={(align) => {
          setData({
            ...data,
            align: align as Alignment,
          });
        }}
      />
      <RadioSelector
        title="Size"
        onChange={(v) => {
          setData({
            ...data,
            size: v,
          });
        }}
        name="size"
        selections={["xs", "sm", "base", "lg", "xl"]}
        value={data.size}
      />
      <RadioSelector
        title="Thickness"
        onChange={(v) => {
          setData({
            ...data,
            thickness: v,
          });
        }}
        name="thickness"
        selections={["normal", "bolder", "lighter"]}
        value={data.thickness}
      />
      <CheckboxGroup
        selections={styleKeys as string[]}
        data={data as Record<string, boolean>} // Type assertion because data contains more than booleans, but we only read booleans here
        onChange={handleStyleChange}
        title="Styles"
      />
      <AddButton component="text" onAdd={onAdd} disabled={!canAdd} />
    </div>
  );
}
