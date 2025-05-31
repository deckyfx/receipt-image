/**
 * @fileoverview HeadingForm component for configuring heading text receipt elements.
 * 
 * This form component provides a user interface for creating heading elements in
 * receipts. Users can configure the heading text content, size (H1-H6), and alignment.
 * Headings are useful for creating section titles, store names, receipt types, or any
 * prominent text that needs to stand out from regular content. The size uses HTML
 * heading semantics where H1 is largest and H6 is smallest.
 * 
 * Change log:
 * 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import { useState } from "react";

import AlignmentSelector from "@react/components/AlignmentSelector";
import SliderSelector from "@react/components/SliderSelector";
import TextInput from "@react/components/TextInput";
import AddButton from "@react/components/AddButton";
import { useEditorStore } from "@react/store/useEditorStore";
import type { Alignment, PayloadByType } from "@src/types";

/** Default configuration for new heading components */
const DefaultForm: PayloadByType<"heading"> = {
  text: "", // Empty text content initially
  size: 1, // H1 size by default (largest)
  align: "left", // Left alignment by default
};

/**
 * HeadingForm component for configuring heading text receipt elements.
 * 
 * This form allows users to create heading elements with configurable:
 * - Text content (required)
 * - Size from H1 (largest) to H6 (smallest)
 * - Text alignment (left, center, right)
 * 
 * @returns {JSX.Element} A form interface for configuring heading components
 * 
 * @example
 * ```tsx
 * // Usage in a receipt editor:
 * <HeadingForm />
 * 
 * // Creates heading components like:
 * {
 *   type: "heading",
 *   data: {
 *     text: "RECEIPT",
 *     size: 1,
 *     align: "center"
 *   }
 * }
 * ```
 */
export default function HeadingForm() {
  // Access the global editor store for adding components
  const { addComponent } = useEditorStore();

  // Local form state for the heading configuration
  const [data, setData] = useState<PayloadByType<"heading">>({
    ...DefaultForm,
  });

  /**
   * Handles adding the configured heading to the receipt and resetting the form.
   * Only proceeds if validation passes (text content is not empty).
   */
  function onAdd() {
    // Add the heading component to the receipt
    addComponent({
      type: "heading",
      data,
    });
    
    // Reset form to default state for next input
    setData({
      ...DefaultForm,
    });
  }

  // Validation: require non-empty text content
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
