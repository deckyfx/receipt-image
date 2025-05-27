import DropdownSelector from "./DropdownSelector";
import SliderSelector from "./SliderSelector";

import HeadingForm from "./HeadingForm";
import TextForm from "./TextForm";
import { DividerForm } from "./DividerForm";
import ColumnsForm from "./ColumnsForm";
import ImageForm from "./ImageForm";
import QRCodeForm from "./QRCodeForm";
import BarCodeForm from "./BarCodeForm";

import type { ComponentType } from "@src/types";
import { useEditorStore } from "@react/store/useEditorStore";

const formMap: Record<ComponentType, any> = {
  heading: HeadingForm,
  text: TextForm,
  divider: DividerForm,
  columns: ColumnsForm,
  image: ImageForm,
  qrcode: QRCodeForm,
  barcode: BarCodeForm,
};

export default function ControlPanel() {
  const { selected, setSelected, width, setWidth } = useEditorStore();

  const SelectedForm = selected ? formMap[selected] : null;

  return (
    <div className="w-120 border-r p-4 space-y-4 overflow-y-auto">
      <SliderSelector
        value={width}
        onChange={(v) => setWidth(v)}
        min={100}
        max={800}
        step={10}
        title="Receipt Width"
        name="width"
        unit="px"
      />

      <DropdownSelector
        title="Element Type"
        onChange={(v) => setSelected(v as ComponentType)}
        name="elementtype"
        selections={[
          "heading",
          "text",
          "divider",
          "columns",
          "image",
          "qrcode",
          "barcode",
        ]}
        value={selected || ""}
      />

      {SelectedForm && <SelectedForm />}
    </div>
  );
}
