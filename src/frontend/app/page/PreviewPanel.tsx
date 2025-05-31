/**
 * @fileoverview Preview Panel Page Component
 * 
 * This file contains the PreviewPanel component which displays generated receipt images
 * in a scrollable preview area. It provides functionality to view all generated receipt
 * elements, remove individual images, and clear all images at once. The panel dynamically
 * adjusts its width based on the receipt width setting and includes hover-based controls
 * for image management.
 * 
 * 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import { useEditorStore } from "@react/store/useEditorStore";

/**
 * Preview Panel Component
 * 
 * The PreviewPanel serves as the image display and management area for the receipt generator.
 * It shows all generated receipt element images in a vertical scrollable layout, with
 * individual and bulk deletion capabilities. The panel width dynamically matches the
 * configured receipt width for accurate preview representation.
 * 
 * Key features:
 * - Displays base64-encoded PNG images generated from receipt elements
 * - Individual image removal with hover-activated delete buttons
 * - Bulk "Clear All" functionality when images are present
 * - Dynamic width adjustment based on receipt width setting
 * - Vertical scrolling for handling multiple images
 * - Visual feedback with hover states and transitions
 * 
 * @returns {JSX.Element} The preview panel interface with image display, individual delete
 *                        buttons, and bulk clear functionality
 * 
 * @example
 * ```tsx
 * // Used alongside ControlPanel in the main layout
 * <div className="flex h-screen">
 *   <ControlPanel />
 *   <PreviewPanel />
 * </div>
 * ```
 */
export default function PreviewPanel() {
  // Extract image state and management functions from global store
  const { images, removeImage, width, clearAll } = useEditorStore();

  return (
    <div className="flex flex-col h-full">
      {/* Header with bulk actions - only shown when images exist */}
      {images.length > 0 && (
        <div className="p-2 border-b flex justify-end">
          <button
            onClick={clearAll}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer flex items-center gap-2 text-sm"
          >
            <span className="material-icons text-lg">delete_sweep</span>
            Clear All
          </button>
        </div>
      )}
      
      {/* Main preview area with dynamic width and scrolling */}
      <div
        style={{ width }} // Dynamic width based on receipt width setting
        className="p-0 overflow-y-auto border-l border border-red-300 rounded flex-1"
      >
        {/* Render each generated image with individual controls */}
        {images.map((img, idx) => (
          <div key={idx} className="relative group">
            {/* Base64 encoded image display */}
            <img
              src={`data:image/png;base64,${img}`}
              className="w-full"
              alt={`Generated preview ${idx + 1}`}
            />
            
            {/* Individual delete button - appears on hover */}
            <button
              onClick={() => removeImage(idx)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-700"
            >
              <span className="material-icons text-xl">close</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
