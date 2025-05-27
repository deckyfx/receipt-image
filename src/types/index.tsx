export type ComponentType =
  | "heading"
  | "text"
  | "divider"
  | "image"
  | "columns";

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

export type TextPayload = {
  text?: string;
  size?: TextSize;
  align?: Alignment;
  thickness?: TextThickness;
  italic?: boolean;
  underline?: boolean;
};

export type DividerPayload = {
  thickness?: DividerThickness;
  style?: DividerStyle;
};

export type ImagePayload = {
  src: string;
  width?: number; // percentage 1-100
  align?: Alignment;
};

export type ColumnPayload = {
  width?: number;
} & TextPayload;

export type PayloadByType<T extends ComponentType> = T extends "heading"
  ? HeadingPayload
  : T extends "text"
  ? TextPayload
  : T extends "divider"
  ? DividerPayload
  : T extends "image"
  ? ImagePayload
  : T extends "columns"
  ? ColumnPayload[]
  : never;
