/**
 * @fileoverview FieldBox component providing consistent styling wrapper for form fields.
 * A reusable container that provides standard spacing, borders, and labeling for form inputs.
 * 
 * @author Receipt Image Generator
 * @since 2024-12-31
 * @changelog 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import React from "react";

/**
 * Props interface for the FieldBox component
 */
type Props = {
  /** Optional label text displayed above the field */
  label?: string;
  /** Child elements to be rendered inside the styled container */
  children: React.ReactNode;
};

/**
 * A wrapper component that provides consistent styling for form fields.
 * 
 * This component creates a standardized container for form inputs with optional
 * labeling. It provides consistent spacing, borders, shadows, and typography
 * that matches the application's design system.
 * 
 * @param props - The component props
 * @param props.label - Optional label text shown above the field
 * @param props.children - Form elements or other content to be wrapped
 * @returns A styled container with optional label and consistent form field styling
 * 
 * @example
 * ```tsx
 * // With label
 * <FieldBox label="Username">
 *   <input type="text" placeholder="Enter username" />
 * </FieldBox>
 * 
 * // Without label
 * <FieldBox>
 *   <div className="flex gap-2">
 *     <button>Save</button>
 *     <button>Cancel</button>
 *   </div>
 * </FieldBox>
 * 
 * // Complex content
 * <FieldBox label="Settings">
 *   <div>
 *     <input type="checkbox" /> Option 1
 *     <input type="checkbox" /> Option 2
 *   </div>
 * </FieldBox>
 * ```
 */
export default function FieldBox({ label, children }: Props) {
  return (
    <div className="mb-4">  {/* Bottom margin for consistent field spacing */}
      {/* Conditional label rendering - only show if label prop provided */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {/* Styled container with consistent border, padding, and shadow */}
      <div className="bg-white border border-gray-300 rounded px-3 py-2 shadow-sm">
        {children}
      </div>
    </div>
  );
}
