/**
 * @fileoverview ImageForm component for configuring image receipt elements.
 * 
 * This form component provides a user interface for embedding images in receipts
 * by specifying a URL source. Users can configure the image source URL, width as
 * a percentage of the container, and alignment. The component includes URL validation
 * to ensure only valid HTTP/HTTPS URLs are accepted. Images are useful for adding
 * logos, product photos, or other visual elements to receipts.
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
import WarningBox from "@react/components/WarningBox";
import type { Alignment, PayloadByType } from "@src/types";

/** Default configuration for new image components */
const DefaultForm: PayloadByType<"image"> = {
  src: "", // Empty source URL initially
  width: 100, // Full width by default
  align: "left", // Left alignment by default
};

/**
 * Validates if a given string is a valid HTTP or HTTPS URL.
 * @param url - The URL string to validate
 * @returns True if the URL is valid and uses HTTP/HTTPS protocol
 */
function isValidUrl(url: string) {
  try {
    const parsed = new URL(url);
    // Only allow HTTP and HTTPS protocols for security
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    // URL constructor throws on invalid URLs
    return false;
  }
}

/**
 * ImageForm component for configuring image receipt elements.
 * 
 * This form allows users to embed images in receipts by specifying:
 * - Source URL (required, must be valid HTTP/HTTPS)
 * - Width as percentage of container
 * - Image alignment (left, center, right)
 * 
 * @returns {JSX.Element} A form interface for configuring image components
 * 
 * @example
 * ```tsx
 * // Usage in a receipt editor:
 * <ImageForm />
 * 
 * // Creates image components like:
 * {
 *   type: "image",
 *   data: {
 *     src: "https://example.com/logo.png",
 *     width: 50,
 *     align: "center"
 *   }
 * }
 * ```
 */
export default function ImageForm() {
  // Access the global editor store for adding components
  const { addComponent } = useEditorStore();

  // Local form state for the image configuration
  const [data, setData] = useState<PayloadByType<"image">>({
    ...DefaultForm,
  });

  // Validate the URL in real-time
  const isUrlValid = isValidUrl(data.src);
  // Require both non-empty source and valid URL format
  const canAdd = data.src.trim().length > 0 && isUrlValid;

  /**
   * Handles adding the configured image to the receipt and resetting the form.
   * Only proceeds if validation passes (valid URL provided).
   */
  function onAdd() {
    if (!canAdd) return;
    
    // Add the image component to the receipt
    addComponent({
      type: "image",
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
        title="Image Source URL"
        name="src"
        value={data.src}
        placeholder="Enter image URL"
        onChange={(src) => setData({ ...data, src })}
      />
      {!isUrlValid && data.src.trim() !== "" && (
        <WarningBox title="Invalid URL" message="Please enter a valid URL." />
      )}

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

      <AddButton component="image" onAdd={onAdd} disabled={!canAdd} />
    </div>
  );
}
