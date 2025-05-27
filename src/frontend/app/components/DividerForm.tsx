import { useState } from "react";

import FieldBox from "./FieldBox";
import AddButton from "./AddButton";
import RadioSelector from "./RadioSelector";
import { useEditorStore } from "@react/store/useEditorStore";
import type { DividerStyle, DividerThickness, PayloadByType } from "@src/types";

export function DividerForm() {
  const { addComponent } = useEditorStore();

  const [data, setData] = useState<PayloadByType<"divider">>({
    thickness: "thin",
    style: "solid",
  });

  const onAdd = () => {
    addComponent({
      type: "divider",
      data,
    });
  };

  return (
    <div className="space-y-4">
      <RadioSelector
        title="Divider Thickness"
        onChange={(v) => {
          setData({
            ...data,
            thickness: v,
          });
        }}
        name="thickness"
        selections={["medium", "thick", "thin"]}
        value={data.thickness}
      />

      <RadioSelector
        title="Divider Style"
        onChange={(v) => {
          setData({
            ...data,
            style: v,
          });
        }}
        name="style"
        selections={["solid", "dashed", "dotted", "double"]}
        value={data.style}
      />

      <AddButton component="divider" onAdd={onAdd} />
    </div>
  );
}
