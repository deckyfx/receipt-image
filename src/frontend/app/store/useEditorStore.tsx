import { create } from "zustand";

import type { BatchParsePayloadItem, ComponentType } from "@src/types";

type ElementData = {
  type: ComponentType;
  data: any;
};

type EditorStore = {
  selected: ComponentType | "";
  width: number;
  images: string[];
  setSelected: (type: ComponentType) => void;
  setWidth: (width: number) => void;
  addImage: (base64: string) => void;
  removeImage: (index: number) => void;
  addComponent: (element: ElementData) => Promise<void>;
  parseBatch: (elements: BatchParsePayloadItem[]) => Promise<void>;
};

export const useEditorStore = create<EditorStore>((set, get) => ({
  selected: "",
  width: 320,
  images: [],
  setSelected: (type) => set({ selected: type }),
  setWidth: (width) => set({ width }),
  addImage: (image) => set((state) => ({ images: [...state.images, image] })),
  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index),
    })),
  addComponent: async ({ type, data }) => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data, width: get().width }),
    });
    const { image } = (await res.json()) as { image: string };
    get().addImage(image);
  },
  parseBatch: async (data) => {
    const res = await fetch("/api/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ width: get().width, data }),
    });
    const images = (await res.json()) as string[];
    images.forEach((image) => {
      get().addImage(image);
    });
  },
}));
