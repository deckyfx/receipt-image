/**
 * Type Definitions - Comprehensive type system for receipt component configuration.
 * 
 * This file defines the complete type system for the receipt image generator,
 * including component types, styling options, payload structures, and API interfaces.
 * It uses TypeScript discriminated unions and const assertions to provide type safety
 * and autocomplete support throughout the application.
 * 
 * @fileoverview Complete type system for receipt generation
 * @author Receipt Image Generator Team
 * @version 1.0.0
 * @since 2024-12-31
 * 
 * CHANGE LOG:
 * - 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

// ================================================================================
// CONSTANTS FOR STRING LITERAL TYPES
// ================================================================================

/**
 * Available receipt component types.
 * These define the fundamental building blocks for receipt generation.
 */
export const COMPONENT_TYPES = [
  "heading",  // Semantic headings (h1-h6)
  "text",     // Regular text content with styling
  "divider",  // Horizontal separator lines
  "columns",  // Multi-column layouts for tabular data
  "image",    // Images and photos
  "qrcode",   // QR code generation
  "barcode"   // Barcode generation with various formats
] as const;

/**
 * Text and element alignment options.
 * Used consistently across all components that support alignment.
 */
export const ALIGNMENTS = ["left", "center", "right"] as const;

/**
 * Font weight/thickness options for text styling.
 * Maps to CSS font-weight values.
 */
export const TEXT_THICKNESSES = ["normal", "bolder", "lighter"] as const;

/**
 * Predefined font size options for consistent typography.
 * Maps to Tailwind CSS text size classes.
 */
export const TEXT_SIZES = ["xs", "sm", "base", "lg", "xl"] as const;

/**
 * Border thickness options for divider elements.
 * Maps to CSS border-width values.
 */
export const DIVIDER_THICKNESSES = ["thin", "medium", "thick"] as const;

/**
 * Border style options for divider elements.
 * Maps to CSS border-style values.
 */
export const DIVIDER_STYLES = ["solid", "dashed", "dotted", "double"] as const;

// ================================================================================
// DERIVED TYPES FROM CONSTANTS
// ================================================================================

/** Union type of all supported receipt component types */
export type ComponentType = typeof COMPONENT_TYPES[number];

/** Union type of all supported alignment options */
export type Alignment = typeof ALIGNMENTS[number];

/** Union type of all supported text thickness/weight options */
export type TextThickness = typeof TEXT_THICKNESSES[number];

/** Union type of all supported text size options */
export type TextSize = typeof TEXT_SIZES[number];

/** Union type of all supported divider thickness options */
export type DividerThickness = typeof DIVIDER_THICKNESSES[number];

/** Union type of all supported divider style options */
export type DividerStyle = typeof DIVIDER_STYLES[number];

// ================================================================================
// COMPONENT PAYLOAD TYPES
// ================================================================================

/**
 * Configuration for heading elements (h1-h6).
 * Headings provide semantic structure and visual hierarchy.
 */
export type HeadingPayload = {
  /** Text content for the heading */
  text?: string;
  /** Heading level (1-6), corresponds to h1-h6 elements */
  size?: number;
  /** Text alignment within the heading */
  align?: Alignment;
};

/**
 * Configuration for text elements with rich styling options.
 * Extends heading payload but replaces semantic size with font size options.
 */
export type TextPayload = Omit<HeadingPayload, "size"> & {
  /** Font size using predefined scale */
  size?: TextSize;
  /** Font weight/boldness */
  thickness?: TextThickness;
  /** Whether to apply italic styling */
  italic?: boolean;
  /** Whether to apply underline styling */
  underline?: boolean;
};

/**
 * Configuration for horizontal divider lines.
 * Used to separate sections of a receipt visually.
 */
export type DividerPayload = {
  /** Border thickness for the divider line */
  thickness?: DividerThickness;
  /** Border style (solid, dashed, dotted, etc.) */
  style?: DividerStyle;
};

/**
 * Configuration for individual columns in multi-column layouts.
 * Combines width allocation with text styling options.
 */
export type ColumnPayload = {
  /** Column width as percentage of container (optional, uses flex: 1 if not specified) */
  width?: number;
} & TextPayload;

/**
 * Configuration for image elements.
 * Supports both external URLs and data URLs for embedded images.
 */
export type ImagePayload = {
  /** Image source URL or data URL */
  src: string;
  /** Maximum width as percentage of container (1-100) */
  width?: number;
  /** Image alignment within its container */
  align?: Alignment;
};

/**
 * Configuration for QR code generation.
 * Inherits image properties but uses content instead of src.
 */
export type QRCodePayload = Omit<ImagePayload, "src"> & {
  /** Text content to encode in the QR code */
  content: string;
};

/**
 * Configuration for barcode generation.
 * Extends QR code payload with specific barcode format selection.
 */
export type BarCodePayload = QRCodePayload & {
  /** Barcode format specification */
  barcode_type: BarCodeType;
};

/**
 * Supported barcode formats for barcode generation.
 * These correspond to formats supported by the JsBarcode library.
 */
export const BARCODE_TYPES = [
  "CODE128",    // Most common 1D barcode format
  "EAN",        // European Article Number
  "EAN-13",     // 13-digit EAN (most common product barcode)
  "EAN-8",      // 8-digit EAN (smaller products)
  "EAN-5",      // 5-digit EAN supplement
  "EAN-2",      // 2-digit EAN supplement
  "UPC (A)",    // Universal Product Code (US standard)
  "UPC (E)",    // Universal Product Code (smaller format)
  "CODE39",     // Code 39 (alphanumeric support)
  "ITF",        // Interleaved 2 of 5
  "ITF-14",     // ITF-14 for shipping containers
  "MSI",        // MSI Plessey
  "MSI10",      // MSI with Modulo 10 check digit
  "MSI11",      // MSI with Modulo 11 check digit
  "MSI1010",    // MSI with double Modulo 10 check digits
  "MSI1110",    // MSI with Modulo 11 and 10 check digits
  "Pharmacode", // Pharmaceutical binary code
  "Codabar"     // Codabar (used in libraries, blood banks)
] as const;

/** Union type of all supported barcode formats */
export type BarCodeType = typeof BARCODE_TYPES[number];

// ================================================================================
// UTILITY TYPES
// ================================================================================

/**
 * Utility type for text styling properties.
 * Extracts only italic and underline properties from TextPayload.
 */
export type TextStyle = Pick<TextPayload, "italic" | "underline">;

/**
 * Conditional type utility that maps component types to their payload types.
 * This provides type safety when working with different component configurations.
 * 
 * @template T - The component type to get the payload for
 */
export type PayloadByType<T extends ComponentType> = T extends "heading"
  ? HeadingPayload
  : T extends "text"
  ? TextPayload
  : T extends "divider"
  ? DividerPayload
  : T extends "columns"
  ? ColumnPayload[] // Columns use an array of column configurations
  : T extends "image"
  ? ImagePayload
  : T extends "qrcode"
  ? QRCodePayload
  : T extends "barcode"
  ? BarCodePayload
  : never;

// ================================================================================
// API PAYLOAD TYPES
// ================================================================================

/**
 * Payload structure for the /api/generate endpoint.
 * Used for generating single receipt elements.
 */
export type GeneratePayload = {
  /** Type of component to generate */
  type: ComponentType;
  /** Component-specific configuration data */
  data: unknown;
  /** Image width in pixels */
  width: number;
};

/**
 * Discriminated union type for individual receipt components in batch processing.
 * Each variant merges the component type with its specific payload properties.
 * This flattened structure simplifies data handling in the ImageGenerator.
 */
export type BatchParsePayloadItem =
  | ({ type: "heading" } & HeadingPayload)  // Heading with merged properties
  | ({ type: "text" } & TextPayload)        // Text with merged properties
  | ({ type: "divider" } & DividerPayload)  // Divider with merged properties
  | { type: "columns"; data: ColumnPayload[] } // Columns with special array handling
  | ({ type: "image" } & ImagePayload)      // Image with merged properties
  | ({ type: "qrcode" } & QRCodePayload)    // QR code with merged properties
  | ({ type: "barcode" } & BarCodePayload); // Barcode with merged properties

/**
 * Payload structure for the /api/parse endpoint.
 * Used for batch processing multiple receipt components.
 */
export type BatchParsePayload = {
  /** Shared image width in pixels for all components */
  width: number;
  /** Array of component configurations to process */
  data: BatchParsePayloadItem[];
};
