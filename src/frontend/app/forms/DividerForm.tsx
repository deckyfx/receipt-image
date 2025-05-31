/**
 * @fileoverview DividerForm component for configuring divider line receipt elements.
 * 
 * This form component provides a user interface for creating horizontal divider lines
 * in receipts. Users can configure the thickness (thin, medium, thick) and style
 * (solid, dashed, dotted) of the divider. Dividers are useful for separating sections
 * of a receipt, creating visual breaks between different types of content, or adding
 * structure to the layout.
 * 
 * Change log:
 * 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import { useState } from "react";

import AddButton from "@react/components/AddButton";
import RadioSelector from "@react/components/RadioSelector";
import { useEditorStore } from "@react/store/useEditorStore";
import type { PayloadByType } from "@src/types";
import { DIVIDER_THICKNESSES, DIVIDER_STYLES } from "@src/types";

/** Default configuration for new divider components */
const DefaultForm: PayloadByType<"divider"> = {
  thickness: "thin", // Thin line by default
  style: "solid", // Solid line style by default
};

/**
 * DividerForm component for configuring divider line receipt elements.
 * 
 * This form allows users to create horizontal divider lines with configurable:
 * - Thickness (thin, medium, thick)
 * - Style (solid, dashed, dotted)
 * 
 * Dividers require no content validation as they are purely visual elements.
 * 
 * @returns {JSX.Element} A form interface for configuring divider components
 * 
 * @example
 * ```tsx
 * // Usage in a receipt editor:
 * <DividerForm />
 * 
 * // Creates divider components like:
 * {
 *   type: "divider",
 *   data: {
 *     thickness: "medium",
 *     style: "dashed"
 *   }
 * }
 * ```
 */
export function DividerForm() {
  // Access the global editor store for adding components
  const { addComponent } = useEditorStore();

  // Local form state for the divider configuration
  const [data, setData] = useState<PayloadByType<"divider">>({
    ...DefaultForm,
  });

  /**
   * Handles adding the configured divider to the receipt and resetting the form.
   * Dividers don't require validation as they are purely visual elements.
   */
  const onAdd = () => {
    // Add the divider component to the receipt
    addComponent({
      type: "divider",
      data,
    });
    
    // Reset form to default state for next input
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
