/**
 * @fileoverview BarCodeForm component for configuring barcode receipt elements.
 * 
 * This form component provides a user interface for creating barcode elements that can be
 * added to receipt layouts. Users can specify the barcode data/content, barcode type
 * (CODE128, QR, etc.), width percentage, and alignment. The component validates that
 * content is provided before allowing the barcode to be added to the receipt.
 * 
 * Change log:
 * 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import { useState } from "react";
import { useEditorStore } from "@react/store/useEditorStore";
import AlignmentSelector from "@react/components/AlignmentSelector";
import SliderSelector from "@react/components/SliderSelector";
import TextInput from "@react/components/TextInput";
import AddButton from "@react/components/AddButton";
import DropdownSelector from "@react/components/DropdownSelector";
import { BARCODE_TYPES } from "@src/types";
import type { Alignment, PayloadByType, BarCodeType } from "@src/types";

/** Default configuration for new barcode components */
const DefaultForm: PayloadByType<"barcode"> = {
  barcode_type: "CODE128", // Default to CODE128 format
  content: "", // Empty content initially
  width: 100, // Full width by default
  align: "left", // Left alignment by default
};

/**
 * BarCodeForm component for configuring barcode receipt elements.
 * 
 * This form allows users to create barcode components for receipts by specifying:
 * - Barcode content/data (required)
 * - Barcode type (CODE128, QR, etc.)
 * - Width as percentage of container
 * - Text alignment (left, center, right)
 * 
 * @returns {JSX.Element} A form interface for configuring barcode components
 * 
 * @example
 * ```tsx
 * // Usage in a receipt editor:
 * <BarCodeForm />
 * 
 * // Creates barcode components like:
 * {
 *   type: "barcode",
 *   data: {
 *     content: "123456789",
 *     barcode_type: "CODE128",
 *     width: 80,
 *     align: "center"
 *   }
 * }
 * ```
 */
export default function BarCodeForm() {
  // Access the global editor store for adding components
  const { addComponent } = useEditorStore();

  // Local form state for the barcode configuration
  const [data, setData] = useState<PayloadByType<"barcode">>({
    ...DefaultForm,
  });

  // Validation: require non-empty content
  const canAdd = data.content.trim().length > 0;

  /**
   * Handles adding the configured barcode to the receipt and resetting the form.
   * Only proceeds if validation passes (content is not empty).
   */
  function onAdd() {
    if (!canAdd) return;
    
    // Add the barcode component to the receipt
    addComponent({
      type: "barcode",
      data,
    });
    
    // Reset form to default state for next input
    setData({
      ...DefaultForm,
    });
  }

  return (
    <div className="space-y-4">
      <TextInput
        title="Bar Code Data"
        name="src"
        value={data.content}
        placeholder="Enter Bar Code Data"
        onChange={(content) => setData({ ...data, content })}
      />

      <DropdownSelector
        title="Barcode Type"
        name="barcode_type"
        selections={BARCODE_TYPES}
        value={data.barcode_type}
        onChange={(type) => setData({ ...data, barcode_type: type as BarCodeType })}
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

      <AddButton component="barcode" onAdd={onAdd} disabled={!canAdd} />
    </div>
  );
}
