function isTextCorrect(text: string) {
  if (!text) {
    return false;
  }
  return typeof text === "string";
}

function isAlignCorrect(align: string) {
  if (!align) {
    return true;
  }
  return ["left", "right", "center"].includes(align);
}

function isHeadingSizeCorrect(size: number) {
  if (!size) {
    return true;
  }
  return typeof size === "number" && size >= 1 && size <= 6;
}

function checkHeadingElementError(data: any) {
  if (!isTextCorrect(data.text))
    return "Heading element must have text property";
  if (!isHeadingSizeCorrect(data.size))
    return "Heading size must be number, 1 - 6";
  if (!isAlignCorrect(data.align))
    return `Heading align must be "left" or "right" or "center"`;
  return "";
}

function isTextSizeCorrect(size: string) {
  if (!size) {
    return true;
  }
  return ["xs", "sm", "base", "lg", "xl"].includes(size);
}

function isTextThicknessCorrect(thickness: string) {
  if (!thickness) {
    return true;
  }
  return ["normal", "bolder", "lighter"].includes(thickness);
}

function isBooleanCorrect(value: boolean) {
  if (value === undefined) {
    return true;
  }
  return typeof value === "boolean";
}

function checkTextElementError(data: any) {
  if (!isTextCorrect(data.text)) return "Text element must have text property";
  if (!isTextSizeCorrect(data.size))
    return `Text size must be "xs", "sm", "base", "lg", "xl"`;
  if (!isTextThicknessCorrect(data.thickness))
    return `Text thickness must be "normal", "bolder", "lighter"`;
  if (!isBooleanCorrect(data.underline))
    return `Text underline flag must be true or false"`;
  if (!isBooleanCorrect(data.italic))
    return `Text italic flag must be true or false"`;
  if (!isAlignCorrect(data.align))
    return `Text align must be "left" or "right" or "center"`;
  return "";
}

// --- Type Guard for BatchParsePayloadItem ---
// This function checks if an unknown value conforms to the BatchParsePayloadItem structure.
export function isBatchParsePayloadItem(item: any): string {
  if (typeof item !== "object" || item === null || !("type" in item)) {
    return "Must be an object and have a 'type' property";
  }

  const { type } = item;

  // Perform specific checks based on the 'type' discriminator
  switch (type) {
    case "heading":
      return checkHeadingElementError(item);
    case "text":
      return checkTextElementError(item);
  }
  return "";
}

// --- Type Guard for BatchParsePayloadItem[] (Array of BatchParsePayloadItem) ---
export function isBatchParsePayloadItemArray(values: any): string {
  if (!Array.isArray(values)) {
    return "Must be Array object";
  }
  // Check if every item in the array is a valid BatchParsePayloadItem
  for (let value of values) {
    const error = isBatchParsePayloadItem(value);
    if (error.length > 0) {
      return error;
    }
  }
  return "";
}
