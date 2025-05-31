import DropdownSelector from "@react/components/DropdownSelector";
import SliderSelector from "@react/components/SliderSelector";

import HeadingForm from "@react/forms/HeadingForm";
import TextForm from "@react/forms/TextForm";
import { DividerForm } from "@react/forms/DividerForm";
import ColumnsForm from "@react/forms/ColumnsForm";
import ImageForm from "@react/forms/ImageForm";
import QRCodeForm from "@react/forms/QRCodeForm";
import BarCodeForm from "@react/forms/BarCodeForm";
import ParseForm from "@react/forms/ParseForm";

import type { ComponentType } from "@src/types";
import { COMPONENT_TYPES } from "@src/types";
import { useEditorStore } from "@react/store/useEditorStore";

const formMap: Record<ComponentType | "parse", any> = {
  heading: HeadingForm,
  text: TextForm,
  divider: DividerForm,
  columns: ColumnsForm,
  image: ImageForm,
  qrcode: QRCodeForm,
  barcode: BarCodeForm,
  parse: ParseForm,
};

export default function ControlPanel() {
  const { selected, setSelected, width, setWidth, exportElements, elements } = useEditorStore();

  const SelectedForm = selected ? formMap[selected] : null;

  const handleExport = () => {
    const jsonData = exportElements();
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "receipt-elements.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-120 border-r p-4 space-y-4 overflow-y-auto flex flex-col h-full">
      <div className="space-y-4 flex-1">
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
          selections={[...COMPONENT_TYPES, "parse"]}
          value={selected || ""}
        />

        {SelectedForm && <SelectedForm />}
      </div>

      {elements.length > 0 && (
        <button
          onClick={handleExport}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="material-icons text-xl">download</span>
          Export Elements as JSON
        </button>
      )}
    </div>
  );
}
