import { useState } from "react";

import AddButton from "@react/components/AddButton";
import RadioSelector from "@react/components/RadioSelector";
import { useEditorStore } from "@react/store/useEditorStore";
import type { PayloadByType } from "@src/types";
import { DIVIDER_THICKNESSES, DIVIDER_STYLES } from "@src/types";

const DefaultForm: PayloadByType<"divider"> = {
  thickness: "thin",
  style: "solid",
};

export function DividerForm() {
  const { addComponent } = useEditorStore();

  const [data, setData] = useState<PayloadByType<"divider">>({
    ...DefaultForm,
  });

  const onAdd = () => {
    addComponent({
      type: "divider",
      data,
    });
    setData({
      ...DefaultForm,
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
        selections={DIVIDER_THICKNESSES}
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
        selections={DIVIDER_STYLES}
        value={data.style}
      />

      <AddButton component="divider" onAdd={onAdd} />
    </div>
  );
}
