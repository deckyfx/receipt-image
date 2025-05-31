import { 
  ALIGNMENTS,
  TEXT_SIZES,
  TEXT_THICKNESSES,
  DIVIDER_THICKNESSES,
  DIVIDER_STYLES,
  BARCODE_TYPES,
  COMPONENT_TYPES
} from "@src/types/index";

// Common validators
const validators = {
  required: (value: any, fieldName: string): string => {
    if (value === undefined || value === null || value === "") {
      return `${fieldName} is required`;
    }
    return "";
  },
  
  optional: (value: any, validator: (val: any) => string): string => {
    if (value === undefined || value === null) return "";
    return validator(value);
  },
  
  string: (value: any, fieldName: string): string => {
    if (typeof value !== "string") {
      return `${fieldName} must be a string`;
    }
    return "";
  },
  
  number: (value: any, fieldName: string, min?: number, max?: number): string => {
    if (typeof value !== "number") {
      return `${fieldName} must be a number`;
    }
    if (min !== undefined && value < min) {
      return `${fieldName} must be at least ${min}`;
    }
    if (max !== undefined && value > max) {
      return `${fieldName} must be at most ${max}`;
    }
    return "";
  },
  
  boolean: (value: any, fieldName: string): string => {
    if (typeof value !== "boolean") {
      return `${fieldName} must be true or false`;
    }
    return "";
  },
  
  enum: (value: any, options: readonly any[], fieldName: string): string => {
    if (!options.includes(value)) {
      return `${fieldName} must be one of: ${options.join(", ")}`;
    }
    return "";
  },
  
  array: (value: any, fieldName: string): string => {
    if (!Array.isArray(value)) {
      return `${fieldName} must be an array`;
    }
    return "";
  },
  
  url: (value: any, fieldName: string): string => {
    if (typeof value !== "string") {
      return `${fieldName} must be a string`;
    }
    // Basic URL or data URL validation
    if (!value.startsWith("http://") && !value.startsWith("https://") && !value.startsWith("data:")) {
      return `${fieldName} must be a valid URL or data URL`;
    }
    return "";
  }
};

// Element validators now use imported constants

function checkHeadingElementError(data: any): string {
  // Required fields
  const textError = validators.required(data.text, "Heading text");
  if (textError) return textError;
  
  const textTypeError = validators.string(data.text, "Heading text");
  if (textTypeError) return textTypeError;
  
  // Optional fields
  if (data.size !== undefined) {
    const sizeError = validators.number(data.size, "Heading size", 1, 6);
    if (sizeError) return sizeError;
  }
  
  if (data.align !== undefined) {
    const alignError = validators.enum(data.align, ALIGNMENTS, "Heading align");
    if (alignError) return alignError;
  }
  
  return "";
}

function checkTextElementError(data: any): string {
  // Optional text field (can be empty string)
  if (data.text !== undefined) {
    const textError = validators.string(data.text, "Text");
    if (textError) return textError;
  }
  
  // Optional fields
  if (data.size !== undefined) {
    const sizeError = validators.enum(data.size, TEXT_SIZES, "Text size");
    if (sizeError) return sizeError;
  }
  
  if (data.thickness !== undefined) {
    const thicknessError = validators.enum(data.thickness, TEXT_THICKNESSES, "Text thickness");
    if (thicknessError) return thicknessError;
  }
  
  if (data.italic !== undefined) {
    const italicError = validators.boolean(data.italic, "Text italic");
    if (italicError) return italicError;
  }
  
  if (data.underline !== undefined) {
    const underlineError = validators.boolean(data.underline, "Text underline");
    if (underlineError) return underlineError;
  }
  
  if (data.align !== undefined) {
    const alignError = validators.enum(data.align, ALIGNMENTS, "Text align");
    if (alignError) return alignError;
  }
  
  return "";
}

function checkDividerElementError(data: any): string {
  // All fields are optional
  if (data.thickness !== undefined) {
    const thicknessError = validators.enum(data.thickness, DIVIDER_THICKNESSES, "Divider thickness");
    if (thicknessError) return thicknessError;
  }
  
  if (data.style !== undefined) {
    const styleError = validators.enum(data.style, DIVIDER_STYLES, "Divider style");
    if (styleError) return styleError;
  }
  
  return "";
}

function checkColumnElementError(column: any, index: number): string {
  // Check text properties (columns inherit from TextPayload)
  const textError = checkTextElementError(column);
  if (textError) return `Column ${index + 1}: ${textError}`;
  
  // Check width
  if (column.width !== undefined) {
    const widthError = validators.number(column.width, `Column ${index + 1} width`, 1, 100);
    if (widthError) return widthError;
  }
  
  return "";
}

function checkColumnsElementError(data: any): string {
  // Columns must have a data array
  const arrayError = validators.required(data.data, "Columns data");
  if (arrayError) return arrayError;
  
  const arrayTypeError = validators.array(data.data, "Columns data");
  if (arrayTypeError) return arrayTypeError;
  
  if (data.data.length === 0) {
    return "Columns must have at least one column";
  }
  
  // Validate each column
  for (let i = 0; i < data.data.length; i++) {
    const columnError = checkColumnElementError(data.data[i], i);
    if (columnError) return columnError;
  }
  
  return "";
}

function checkImageElementError(data: any): string {
  // Required fields
  const srcError = validators.required(data.src, "Image src");
  if (srcError) return srcError;
  
  const urlError = validators.url(data.src, "Image src");
  if (urlError) return urlError;
  
  // Optional fields
  if (data.width !== undefined) {
    const widthError = validators.number(data.width, "Image width", 1, 100);
    if (widthError) return widthError;
  }
  
  if (data.align !== undefined) {
    const alignError = validators.enum(data.align, ALIGNMENTS, "Image align");
    if (alignError) return alignError;
  }
  
  return "";
}

function checkQRCodeElementError(data: any): string {
  // Required fields
  const contentError = validators.required(data.content, "QR code content");
  if (contentError) return contentError;
  
  const contentTypeError = validators.string(data.content, "QR code content");
  if (contentTypeError) return contentTypeError;
  
  // Optional fields (same as image)
  if (data.width !== undefined) {
    const widthError = validators.number(data.width, "QR code width", 1, 100);
    if (widthError) return widthError;
  }
  
  if (data.align !== undefined) {
    const alignError = validators.enum(data.align, ALIGNMENTS, "QR code align");
    if (alignError) return alignError;
  }
  
  return "";
}

function checkBarCodeElementError(data: any): string {
  // Required fields
  const contentError = validators.required(data.content, "Barcode content");
  if (contentError) return contentError;
  
  const contentTypeError = validators.string(data.content, "Barcode content");
  if (contentTypeError) return contentTypeError;
  
  const barcodeTypeError = validators.required(data.barcode_type, "Barcode type");
  if (barcodeTypeError) return barcodeTypeError;
  
  const barcodeTypeEnumError = validators.enum(data.barcode_type, BARCODE_TYPES, "Barcode type");
  if (barcodeTypeEnumError) return barcodeTypeEnumError;
  
  // Optional fields
  if (data.width !== undefined) {
    const widthError = validators.number(data.width, "Barcode width", 1, 100);
    if (widthError) return widthError;
  }
  
  if (data.align !== undefined) {
    const alignError = validators.enum(data.align, ALIGNMENTS, "Barcode align");
    if (alignError) return alignError;
  }
  
  return "";
}

// --- Type Guard for BatchParsePayloadItem ---
// This function checks if an unknown value conforms to the BatchParsePayloadItem structure.
export function isBatchParsePayloadItem(item: any): string {
  if (typeof item !== "object" || item === null || !("type" in item)) {
    return "Each item must be an object with a 'type' property";
  }

  const { type } = item;
  
  if (!COMPONENT_TYPES.includes(type)) {
    return `Invalid type '${type}'. Must be one of: ${COMPONENT_TYPES.join(", ")}`;
  }

  // Perform specific checks based on the 'type' discriminator
  switch (type) {
    case "heading":
      return checkHeadingElementError(item);
    case "text":
      return checkTextElementError(item);
    case "divider":
      return checkDividerElementError(item);
    case "columns":
      return checkColumnsElementError(item);
    case "image":
      return checkImageElementError(item);
    case "qrcode":
      return checkQRCodeElementError(item);
    case "barcode":
      return checkBarCodeElementError(item);
    default:
      return `Unhandled element type: ${type}`;
  }
}

// --- Type Guard for BatchParsePayloadItem[] (Array of BatchParsePayloadItem) ---
export function isBatchParsePayloadItemArray(values: any): string {
  if (!Array.isArray(values)) {
    return "The JSON must be an array of receipt elements";
  }
  
  if (values.length === 0) {
    return "The array must contain at least one element";
  }
  
  // Check if every item in the array is a valid BatchParsePayloadItem
  for (let i = 0; i < values.length; i++) {
    const error = isBatchParsePayloadItem(values[i]);
    if (error) {
      return `Element ${i + 1}: ${error}`;
    }
  }
  
  return "";
}
