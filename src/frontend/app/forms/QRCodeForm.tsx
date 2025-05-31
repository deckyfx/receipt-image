/**
 * @fileoverview QRCodeForm component for configuring QR code receipt elements.
 * 
 * This form component provides a user interface for creating QR code elements in
 * receipts. Users can specify the QR code data/content, width as a percentage of
 * the container, and alignment. QR codes are useful for embedding URLs, contact
 * information, payment links, wifi credentials, or any other data that customers
 * might want to scan with their mobile devices.
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
import type { Alignment, PayloadByType } from "@src/types";

/** Default configuration for new QR code components */
const DefaultForm: PayloadByType<"qrcode"> = {
  content: "", // Empty content initially
  width: 100, // Full width by default
  align: "left", // Left alignment by default
};

/**
 * QRCodeForm component for configuring QR code receipt elements.
 * 
 * This form allows users to create QR code components with configurable:
 * - Content/data to encode (required - URLs, text, contact info, etc.)
 * - Width as percentage of container
 * - Alignment (left, center, right)
 * 
 * @returns {JSX.Element} A form interface for configuring QR code components
 * 
 * @example
 * ```tsx
 * // Usage in a receipt editor:
 * <QRCodeForm />
 * 
 * // Creates QR code components like:
 * {
 *   type: "qrcode",
 *   data: {
 *     content: "https://store.example.com/feedback",
 *     width: 50,
 *     align: "center"
 *   }
 * }
 * ```
 */
export default function QRCodeForm() {
  // Access the global editor store for adding components
  const { addComponent } = useEditorStore();

  // Local form state for the QR code configuration
  const [data, setData] = useState<PayloadByType<"qrcode">>({
    ...DefaultForm,
  });

  // Validation: require non-empty content
  const canAdd = data.content.trim().length > 0;

  /**
   * Handles adding the configured QR code to the receipt and resetting the form.
   * Only proceeds if validation passes (content is not empty).
   */
  function onAdd() {
    if (!canAdd) return;
    
    // Add the QR code component to the receipt
    addComponent({
      type: "qrcode",
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
        title="QRCode Data"
        name="src"
        value={data.content}
        placeholder="Enter QRCode Data"
        onChange={(content) => setData({ ...data, content })}
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

      <AddButton component="qrcode" onAdd={onAdd} disabled={!canAdd} />
    </div>
  );
}
