/**
 * Global State Store - Zustand-based state management for the receipt editor.
 * 
 * This file implements the centralized state management system for the receipt
 * image generator application. It manages component selection, width settings,
 * generated images, element configurations, and provides actions for API
 * interactions and data export functionality.
 * 
 * @fileoverview Global state management using Zustand
 * @author Receipt Image Generator Team
 * @version 1.0.0
 * @since 2024-12-31
 * 
 * CHANGE LOG:
 * - 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import { create } from "zustand";

import type { BatchParsePayloadItem, ComponentType } from "@src/types";

/**
 * Temporary data structure for component creation.
 * Used when transitioning from form data to the final element structure.
 */
type ElementData = {
  /** The type of receipt component being created */
  type: ComponentType;
  /** Component-specific configuration data (varies by type) */
  data: any;
};

/**
 * Complete store interface defining all state and actions.
 * Provides type safety for the entire application state management.
 */
type EditorStore = {
  // ===============================
  // STATE PROPERTIES
  // ===============================
  
  /** Currently selected component type in the control panel (empty string means no selection) */
  selected: ComponentType | "";
  
  /** Receipt width in pixels (affects both generation and preview display) */
  width: number;
  
  /** Array of base64-encoded PNG images generated from receipt components */
  images: string[];
  
  /** Array of receipt element configurations for export functionality */
  elements: BatchParsePayloadItem[];

  // ===============================
  // BASIC STATE ACTIONS
  // ===============================
  
  /** Updates the selected component type in the control panel */
  setSelected: (type: ComponentType) => void;
  
  /** Updates the receipt width for both generation and display */
  setWidth: (width: number) => void;
  
  /** Adds a new base64 image to the images array */
  addImage: (base64: string) => void;
  
  /** Removes an image and its corresponding element by index */
  removeImage: (index: number) => void;
  
  /** Clears all images and elements from the store */
  clearAll: () => void;

  // ===============================
  // API INTERACTION ACTIONS
  // ===============================
  
  /** Generates an image from component data via /api/generate endpoint */
  addComponent: (element: ElementData) => Promise<void>;
  
  /** Processes multiple components via /api/parse endpoint */
  parseBatch: (elements: BatchParsePayloadItem[]) => Promise<void>;
  
  /** Exports current elements as formatted JSON string */
  exportElements: () => string;
};

/**
 * Zustand store instance providing global state management for the receipt editor.
 * 
 * This store manages the complete application state and provides both synchronous
 * state updates and asynchronous API interactions. It maintains data consistency
 * between the images array and elements array to ensure export functionality
 * accurately reflects the generated content.
 * 
 * @example
 * ```typescript
 * // Using in a component
 * const { width, setWidth, addComponent } = useEditorStore();
 * 
 * // Update width
 * setWidth(400);
 * 
 * // Add a text component
 * await addComponent({
 *   type: "text",
 *   data: { text: "Hello World", align: "center" }
 * });
 * ```
 */
export const useEditorStore = create<EditorStore>((set, get) => ({
  // ===============================
  // INITIAL STATE VALUES
  // ===============================
  
  /** No component selected initially */
  selected: "",
  
  /** Default receipt width of 320px (typical thermal receipt width) */
  width: 320,
  
  /** Empty array of generated images */
  images: [],
  
  /** Empty array of element configurations */
  elements: [],

  // ===============================
  // SYNCHRONOUS STATE ACTIONS
  // ===============================
  
  /**
   * Updates the currently selected component type.
   * Triggers re-render of the control panel to show appropriate form.
   */
  setSelected: (type) => set({ selected: type }),
  
  /**
   * Updates the receipt width setting.
   * Affects both future image generation and preview display.
   */
  setWidth: (width) => set({ width }),
  
  /**
   * Adds a new base64-encoded image to the end of the images array.
   * Used by both single component generation and batch processing.
   */
  addImage: (image) => set((state) => ({ images: [...state.images, image] })),
  
  /**
   * Removes an image and its corresponding element by array index.
   * Maintains synchronization between images and elements arrays.
   */
  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index),
      elements: state.elements.filter((_, i) => i !== index),
    })),
  
  /**
   * Clears all generated images and element configurations.
   * Resets the application to initial empty state.
   */
  clearAll: () => set({ images: [], elements: [] }),

  // ===============================
  // ASYNCHRONOUS API ACTIONS
  // ===============================
  
  /**
   * Generates a single receipt component image via the /api/generate endpoint.
   * 
   * This function:
   * 1. Sends component data to the generation API
   * 2. Adds the returned image to the store
   * 3. Stores the element configuration for export
   * 4. Handles special case for columns type (array data structure)
   */
  addComponent: async ({ type, data }) => {
    // Call the single component generation API
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data, width: get().width }),
    });
    
    // Extract the base64 image from the response
    const { image } = (await res.json()) as { image: string };
    get().addImage(image);
    
    // Store the element data for export functionality
    // Handle special case for columns which has nested data structure
    const element: BatchParsePayloadItem = type === "columns" 
      ? { type, data }  // Columns keeps data as nested array
      : { type, ...data } as BatchParsePayloadItem;  // Other types merge data properties
    
    set((state) => ({ elements: [...state.elements, element] }));
  },
  
  /**
   * Processes multiple receipt components via the /api/parse endpoint.
   * 
   * This function:
   * 1. Sends an array of components to the batch processing API
   * 2. Iterates through returned images and adds each to the store
   * 3. Appends the processed elements to the existing elements array
   */
  parseBatch: async (data) => {
    // Call the batch processing API
    const res = await fetch("/api/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ width: get().width, data }),
    });
    
    // Extract array of base64 images from the response
    const images = (await res.json()) as string[];
    
    // Add each generated image to the store sequentially
    images.forEach((image) => {
      get().addImage(image);
    });
    
    // Store all parsed elements for export functionality
    set((state) => ({ elements: [...state.elements, ...data] }));
  },
  
  /**
   * Exports current element configurations as formatted JSON string.
   * 
   * This provides a way to save and share receipt configurations,
   * which can later be imported via the ParseForm component.
   * 
   * @returns Formatted JSON string with 2-space indentation
   */
  exportElements: () => {
    const { elements } = get();
    return JSON.stringify(elements, null, 2);
  },
}));
