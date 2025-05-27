import { useState } from "react";

import AlignmentSelector from "./AlignmentSelector";
import SliderSelector from "./SliderSelector";
import TextInput from "./TextInput";
import AddButton from "./AddButton";
import { useEditorStore } from "@react/store/useEditorStore";
import type { Alignment, PayloadByType } from "@src/types";

const DefaultForm: PayloadByType<"heading"> = {
  text: "",
  size: 1,
  align: "left",
};

export default function HeadingForm() {
  const { addComponent } = useEditorStore();

  const [data, setData] = useState<PayloadByType<"heading">>({
    ...DefaultForm,
  });

  function onAdd() {
    addComponent({
      type: "heading",
      data,
    });
    setData({
      ...DefaultForm,
    });
  }

  const canAdd = !data.text ? false : data.text.trim().length > 0;

  return (
    <div className="space-y-4">
      <TextInput
        title="Heading Text"
        name="headingText"
        value={data.text}
        placeholder="Heading Text"
        onChange={(text) => setData({ ...data, text })}
      />

      <SliderSelector
        value={data.size || 1}
        onChange={(v) => setData({ ...data, size: v })}
        min={1}
        max={6}
        step={1}
        reverse
        title="Size (H1 - H6)"
        name="size"
        unit="H"
      />

      <AlignmentSelector
        value={data.align}
        onChange={(align) =>
          setData({
            ...data,
            align: align as Alignment,
          })
        }
      />

      <AddButton component="heading" onAdd={onAdd} disabled={!canAdd} />
    </div>
  );
}
