/**
 * @fileoverview TextForm component for configuring plain text receipt elements.
 * 
 * This form component provides a user interface for creating styled text elements
 * in receipts. Users can configure text content, alignment, size, thickness (font weight),
 * and style options like italic and underline. This is the most fundamental receipt
 * component for adding any textual content like product descriptions, store information,
 * instructions, or any other readable content that doesn't require special formatting.
 * 
 * Change log:
 * 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import { useState } from "react";

import AlignmentSelector from "@react/components/AlignmentSelector";
import AddButton from "@react/components/AddButton";
import RadioSelector from "@react/components/RadioSelector";
import CheckboxGroup from "@react/components/CheckboxGroup";
import TextInput from "@react/components/TextInput";
import { useEditorStore } from "@react/store/useEditorStore";
import type { Alignment, PayloadByType, TextStyle } from "@src/types";
import { TEXT_SIZES, TEXT_THICKNESSES } from "@src/types";

/** Default configuration for new text components */
const DefaultForm: PayloadByType<"text"> = {
  text: "", // Empty text content initially
  align: "left", // Left alignment by default
  size: "base", // Base font size
  thickness: "normal", // Normal font weight
  italic: false, // No italic styling
  underline: false, // No underline styling
};

/**
 * TextForm component for configuring plain text receipt elements.
 * 
 * This form allows users to create styled text components with configurable:
 * - Text content (required)
 * - Text alignment (left, center, right)
 * - Font size (xs, sm, base, lg, xl, 2xl)
 * - Font thickness/weight (thin, normal, medium, semibold, bold, extrabold)
 * - Style options (italic, underline)
 * 
 * @returns {JSX.Element} A form interface for configuring text components
 * 
 * @example
 * ```tsx
 * // Usage in a receipt editor:
 * <TextForm />
 * 
 * // Creates text components like:
 * {
 *   type: "text",
 *   data: {
 *     text: "Thank you for your purchase!",
 *     align: "center",
 *     size: "lg",
 *     thickness: "bold",
 *     italic: true,
 *     underline: false
 *   }
 * }
 * ```
 */
export default function TextForm() {
  // Access the global editor store for adding components
  const { addComponent } = useEditorStore();

  // Local form state for the text configuration
  const [data, setData] = useState<PayloadByType<"text">>({
    ...DefaultForm,
  });

  // Extract boolean style keys for the checkbox group (italic, underline)
  const styleKeys = Object.keys(data).filter(
    (key) => typeof data[key as keyof typeof data] === "boolean"
  ) as (keyof typeof data)[];

  // Validation: require non-empty text content
  const canAdd = !data.text ? false : data.text.trim().length > 0;

  /**
   * Handles adding the configured text to the receipt and resetting the form.
   * Only proceeds if validation passes (text content is not empty).
   */
  function onAdd() {
    // Add the text component to the receipt
    addComponent({
      type: "text",
      data,
    });
    
    // Reset form to default state for next input
    setData({
      ...DefaultForm,
    });
  }

  /**
   * Handles changes to text style properties (italic, underline).
   * Merges the style changes with the current text data.
   * @param change - Object containing the style property changes
   */
  function handleStyleChange(change: TextStyle) {
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
        selections={TEXT_SIZES}
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
        selections={TEXT_THICKNESSES}
        value={data.thickness}
      />

      <CheckboxGroup
        selections={styleKeys as string[]}
        data={data as TextStyle} // Type assertion because data contains more than booleans, but we only read booleans here
        onChange={handleStyleChange}
        title="Styles"
      />

      <AddButton component="text" onAdd={onAdd} disabled={!canAdd} />
    </div>
  );
}
