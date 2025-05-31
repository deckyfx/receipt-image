/**
 * @fileoverview Control Panel Page Component
 * 
 * This file contains the ControlPanel component which serves as the main configuration
 * sidebar for the receipt generator application. It provides controls for setting receipt
 * width, selecting component types, and rendering appropriate forms for each component type.
 * The panel also includes functionality to export the current receipt elements as JSON.
 * 
 * 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

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

/**
 * Maps component types to their corresponding form components.
 * This mapping allows dynamic form rendering based on the selected component type.
 * The "parse" option is included for batch processing functionality.
 */
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

/**
 * Control Panel Component
 * 
 * The ControlPanel serves as the primary configuration interface for the receipt generator.
 * It provides a sidebar with controls for setting receipt width, selecting component types,
 * and configuring individual receipt elements through dynamically rendered forms.
 * 
 * Key features:
 * - Width slider for adjusting receipt dimensions (100-800px)
 * - Dropdown selector for choosing component types
 * - Dynamic form rendering based on selected component
 * - Export functionality to save current elements as JSON
 * 
 * @returns {JSX.Element} The control panel interface with width controls, component selector, 
 *                        dynamic forms, and export functionality
 * 
 * @example
 * ```tsx
 * // Used in the main layout to provide receipt configuration controls
 * <div className="flex">
 *   <ControlPanel />
 *   <PreviewPanel />
 * </div>
 * ```
 */
export default function ControlPanel() {
  // Extract state and actions from the global store
  const { selected, setSelected, width, setWidth, exportElements, elements } = useEditorStore();

  // Dynamically determine which form component to render based on selection
  const SelectedForm = selected ? formMap[selected] : null;

  /**
   * Handles exporting current receipt elements as a downloadable JSON file.
   * Creates a blob from the serialized elements and triggers a download.
   */
  const handleExport = () => {
    // Get serialized JSON data from store
    const jsonData = exportElements();
    
    // Create downloadable blob
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    // Create temporary download link and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "receipt-elements.json";
    document.body.appendChild(a);
    a.click();
    
    // Clean up resources
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-120 border-r p-4 space-y-4 overflow-y-auto flex flex-col h-full">
      {/* Main controls section - takes up remaining space */}
      <div className="space-y-4 flex-1">
        {/* Width control slider - allows users to adjust receipt width */}
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

        {/* Component type selector - determines which form to show */}
        <DropdownSelector
          title="Element Type"
          onChange={(v) => setSelected(v as ComponentType)}
          name="elementtype"
          selections={[...COMPONENT_TYPES, "parse"]}
          value={selected || ""}
        />

        {/* Conditionally render the appropriate form component based on selection */}
        {SelectedForm && <SelectedForm />}
      </div>

      {/* Export button - only shown when there are elements to export */}
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
