export type ComponentType =
  | "heading"
  | "text"
  | "divider"
  | "columns"
  | "image"
  | "qrcode"
  | "barcode";

export type Alignment = "left" | "right" | "center";

export type TextThickness = "normal" | "bolder" | "lighter";

export type TextSize = "xs" | "sm" | "base" | "lg" | "xl";

export type DividerThickness = "medium" | "thick" | "thin";

export type DividerStyle = "solid" | "dashed" | "dotted" | "double";

export type HeadingPayload = {
  text?: string;
  size?: number;
  align?: Alignment;
};

export type TextPayload = Omit<HeadingPayload, "size"> & {
  size?: TextSize;
  thickness?: TextThickness;
  italic?: boolean;
  underline?: boolean;
};

export type DividerPayload = {
  thickness?: DividerThickness;
  style?: DividerStyle;
};

export type ColumnPayload = {
  width?: number;
} & TextPayload;

export type ImagePayload = {
  src: string;
  width?: number; // percentage 1-100
  align?: Alignment;
};

export type QRCodePayload = Omit<ImagePayload, "src"> & {
  content: string;
};

export type BarCodePayload = QRCodePayload & {
  type: BarCodeType;
};

export type BarCodeType =
  | "CODE128"
  | "EAN"
  | "EAN-13"
  | "EAN-8"
  | "EAN-5"
  | "EAN-2"
  | "UPC (A)"
  | "UPC (E)"
  | "CODE39"
  | "ITF"
  | "ITF"
  | "ITF-14"
  | "MSI"
  | "MSI10"
  | "MSI11"
  | "MSI1010"
  | "MSI1110"
  | "Pharmacode"
  | "Codabar";

export type TextStyle = Pick<TextPayload, "italic" | "underline">;

export type PayloadByType<T extends ComponentType> = T extends "heading"
  ? HeadingPayload
  : T extends "text"
  ? TextPayload
  : T extends "divider"
  ? DividerPayload
  : T extends "columns"
  ? ColumnPayload[]
  : T extends "image"
  ? ImagePayload
  : T extends "qrcode"
  ? QRCodePayload
  : T extends "barcode"
  ? BarCodePayload
  : never;

export type GeneratePayload = {
  type: ComponentType;
  data: unknown;
  width: number;
};

// No more PayloadByType helper needed for this structure

// This is the new, merged/flat structure for a single component item
export type BatchParsePayloadItem =
  | ({ type: "heading" } & HeadingPayload) // Merges HeadingPayload properties directly
  | ({ type: "text" } & TextPayload)
  | ({ type: "divider" } & DividerPayload)
  | { type: "columns"; data: ColumnPayload[] } // Special handling for columns if it's an array
  | ({ type: "image" } & ImagePayload)
  | ({ type: "qrcode" } & QRCodePayload)
  | ({ type: "barcode" } & BarCodePayload);

// Your BatchParsePayload would then use this new type
export type BatchParsePayload = {
  width: number;
  data: BatchParsePayloadItem[];
};
