/**
 * Receipt Builder - A fluent API for constructing HTML receipt layouts.
 * 
 * This class provides methods to build receipt-style HTML documents with monospace
 * styling, supporting various elements like text, headings, dividers, images, and columns.
 * The generated HTML is optimized for conversion to receipt-like images.
 * 
 * @fileoverview Core receipt HTML building functionality
 * @author Receipt Image Generator Team
 * @version 1.0.0
 * @since 2024-12-31
 * 
 * CHANGE LOG:
 * - 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import type { Alignment, PayloadByType } from "./types";

/**
 * A fluent API class for building receipt-style HTML documents.
 * 
 * This class accumulates HTML elements and provides methods to add various
 * receipt components such as text, headings, dividers, images, QR codes,
 * barcodes, and multi-column layouts.
 * 
 * @example
 * ```typescript
 * const receipt = new ReceiptBuilder(320);
 * receipt.addHeading("RECEIPT", { align: "center", size: 2 });
 * receipt.addDivider();
 * receipt.addText("Thank you for your purchase!");
 * const html = receipt.build();
 * ```
 */
export class ReceiptBuilder {
  /** Array to accumulate HTML fragments during construction */
  private htmls: string[] = [];

  /**
   * Creates a new ReceiptBuilder instance with specified width.
   * 
   * Initializes the HTML document structure with:
   * - Monospace font styling for authentic receipt appearance
   * - CSS classes for alignment, typography, and layout
   * - Responsive viewport configuration
   * 
   * @param width - The width of the receipt in pixels (default: 320px)
   */
  constructor(private width: number = 320) {
    // Initialize HTML document with comprehensive CSS for receipt styling
    this.htmls.push(`<!DOCTYPE html><html><head><style>
      body { font-family: monospace; font-size: 12px; margin: 0px 0px 2px 0px; padding: 0px 0px 2px 0px; color: black; }
      h1, h2, h3, h4, h5, h6 { padding: 0px; margin: 0px; }
      .center { text-align: center; }
      .right { text-align: right; }
      .left { text-align: left; }
      .bold { font-weight: bold; }
      .lighter { font-weight: lighter; color: gray }
      .italic { font-style: italic; }
      .underline { text-decoration: underline; }
      .divider { border-top: 1px dashed #000; margin: 8px 0; }
      .text-content { word-wrap: break-word; white-space: normal; }
      .text-xs { font-size: 0.75rem; }
      .text-sm { font-size: 0.875rem; }
      .text-base { font-size: 1rem; }
      .text-lg { font-size: 1.125rem; }
      .text-xl { font-size: 1.25rem; }
      .two-col, .three-col { display: flex; justify-content: space-between; }
    </style></head><meta charset="UTF-8">
    <meta name="viewport" content="width=${this.width}px, initial-scale=1.0"><body>`);
  }

  /**
   * Adds a text element to the receipt with optional styling.
   * 
   * Creates a div element with the specified content and applies CSS classes
   * based on the provided options for alignment, typography, and styling.
   * 
   * @param content - The text content to display
   * @param opts - Optional styling configuration
   * @param opts.align - Text alignment: 'left', 'center', or 'right'
   * @param opts.thickness - Font weight: 'bold' or 'lighter'
   * @param opts.italic - Whether to apply italic styling
   * @param opts.underline - Whether to apply underline styling
   * @param opts.size - Font size: 'xs', 'sm', 'base', 'lg', or 'xl'
   * 
   * @example
   * ```typescript
   * receipt.addText("Total: $19.99", { align: "right", thickness: "bold" });
   * ```
   */
  addText(content: string, opts?: Omit<PayloadByType<"text">, "text">) {
    const classes: string[] = [];
    
    // Always apply base text content styling for proper word wrapping
    classes.push("text-content");
    
    // Apply conditional styling based on options
    if (opts?.align) classes.push(opts.align);
    if (opts?.thickness) classes.push(opts?.thickness);
    if (opts?.italic) classes.push("italic");
    if (opts?.underline) classes.push("underline");
    if (opts?.size) classes.push(`text-${opts.size}`);
    
    // Combine all CSS classes and create the HTML element
    const classes_text = classes.join(" ");
    const element = `<div class="${classes_text}">${content}</div>`;
    this.htmls.push(element);
  }

  /**
   * Adds a heading element to the receipt with semantic HTML structure.
   * 
   * Creates an h1-h6 element based on the specified size, with optional
   * alignment styling. Headings provide semantic structure for receipt sections.
   * 
   * @param content - The heading text content
   * @param opts - Optional heading configuration
   * @param opts.size - Heading level (1-6), defaults to 1 for h1
   * @param opts.align - Text alignment: 'left', 'center', or 'right'
   * 
   * @example
   * ```typescript
   * receipt.addHeading("STORE NAME", { size: 1, align: "center" });
   * receipt.addHeading("Items", { size: 2, align: "left" });
   * ```
   */
  addHeading(content: string, opts?: Omit<PayloadByType<"heading">, "text">) {
    // Default to h1 if no size specified
    const size = opts?.size || 1;
    const classes: string[] = [];
    
    // Apply base text content styling
    classes.push("text-content");
    
    // Apply alignment if specified
    if (opts?.align) classes.push(opts.align);
    
    // Combine classes and create semantic heading element
    const classes_text = classes.join(" ");
    const element = `<h${size} class="${classes_text}">${content}</h${size}>`;
    this.htmls.push(element);
  }

  /**
   * Adds a horizontal divider line to separate receipt sections.
   * 
   * Creates a visual separator with customizable thickness and style.
   * Useful for separating different sections of a receipt like header,
   * items, totals, and footer.
   * 
   * @param opts - Optional divider styling configuration
   * @param opts.thickness - Border thickness: 'thin', 'medium', 'thick', or CSS value
   * @param opts.style - Border style: 'solid', 'dashed', 'dotted', etc.
   * 
   * @example
   * ```typescript
   * receipt.addDivider(); // Default thin solid line
   * receipt.addDivider({ thickness: "thick", style: "dashed" });
   * ```
   */
  addDivider(opts?: PayloadByType<"divider">) {
    // Configure border styles with sensible defaults
    const styles = [
      `border-top-width: ${opts?.thickness || "thin"}`,
      `border-top-style: ${opts?.style || "solid"}`,
    ];
    
    // Create divider element with configured styles
    this.htmls.push(`<div class="divider" style="${styles.join("; ")}"></div>`);
  }

  /**
   * Adds an image element to the receipt with responsive sizing.
   * 
   * Embeds images (logos, photos, etc.) with automatic height adjustment
   * to maintain aspect ratio. Supports data URLs for embedded images.
   * 
   * @param src - Image source URL or data URL
   * @param width - Maximum width as percentage of container (default: 100%)
   * @param alignment - Image alignment: 'left', 'center', or 'right' (default: 'center')
   * 
   * @example
   * ```typescript
   * receipt.addImage("data:image/png;base64,iVBOR...", 50, "center");
   * receipt.addImage("https://example.com/logo.png", 80, "left");
   * ```
   */
  addImage(src: string, width: number = 100, alignment: Alignment = "center") {
    // Create responsive image with alignment wrapper
    this.htmls.push(
      `<div class="${alignment}"><img src="${src}" style="max-width: ${width}%; height: auto;"/></div>`
    );
  }

  /**
   * Adds an SVG element to the receipt with responsive sizing and style normalization.
   * 
   * This method processes SVG strings to ensure responsive behavior by:
   * - Removing fixed width/height attributes from the SVG tag
   * - Adding responsive CSS styles (max-width and height: auto)
   * - Preserving existing styles while ensuring no duplicates
   * 
   * Commonly used for barcodes, QR codes, and vector graphics.
   * 
   * @param svg - Complete SVG markup string
   * @param width - Maximum width as percentage of container (default: 100%)
   * @param alignment - SVG alignment: 'left', 'center', or 'right' (default: 'center')
   * 
   * @example
   * ```typescript
   * const qrSvg = '<svg width="100" height="100">...</svg>';
   * receipt.addSVG(qrSvg, 50, "center");
   * ```
   */
  addSVG(svg: string, width: number = 100, alignment: Alignment = "center") {
    // Regex to capture the <svg> tag and its attributes, including the style attribute if it exists
    const svgTagRegex = /<svg\s*([^>]*?)>/;
    const match = svg.match(svgTagRegex);

    // Validate that SVG tag exists in the provided string
    if (!match) {
      console.warn("Could not find <svg> tag in the provided SVG string.");
      return svg; // Return original if no svg tag found
    }

    const fullSvgTag = match[0]; // e.g., <svg width="178px" height="142px" ... style="..." >
    let attributesString: string = match[1] || ""; // Initialize with the captured string, TypeScript knows it's definitely a string here

    // Step 1: Remove existing width and height attributes to enable responsive sizing
    attributesString = attributesString.replace(/\s*width="[^"]*"/g, "");
    attributesString = attributesString.replace(/\s*height="[^"]*"/g, "");

    // Step 2: Extract or create the style attribute content
    let currentStyleContent: string = ""; // Initialize with an empty string
    const styleAttrRegex = /style="([^"]*)"/;
    const styleMatch = attributesString.match(styleAttrRegex);

    if (styleMatch) {
      currentStyleContent = styleMatch[1] || ""; // TypeScript now knows styleMatch[1] exists if styleMatch is not null
      // Remove the old style attribute from the attributesString
      attributesString = attributesString.replace(styleAttrRegex, "");
    }

    // Step 3: Update or add max-width and height: auto to the style content
    let newStyleContent = currentStyleContent; // No change needed here, as currentStyleContent is guaranteed to be a string

    // Remove any existing max-width or height properties to ensure we don't duplicate
    newStyleContent = newStyleContent.replace(/max-width:[^;]*;?/g, "");
    newStyleContent = newStyleContent.replace(/height:[^;]*;?/g, "");

    // Step 4: Normalize style content and add responsive styles
    // Trim and add our new styles, ensuring no double semicolons or leading/trailing spaces
    newStyleContent = newStyleContent.trim();
    if (newStyleContent.length > 0 && !newStyleContent.endsWith(";")) {
      newStyleContent += ";";
    }
    newStyleContent += ` max-width: ${width}%; height: auto;`;
    newStyleContent = newStyleContent.trim(); // Trim again in case of leading space from semicolon

    // Step 5: Construct the new style attribute
    const newStyleAttribute = `style="${newStyleContent}"`;

    // Step 6: Reassemble the SVG tag with normalized attributes
    const newSvgTag = `<svg ${attributesString.trim()} ${newStyleAttribute}>`;

    // Replace the original SVG tag with the new one
    svg = svg.replace(fullSvgTag, newSvgTag);

    // Wrap SVG in alignment container and add to receipt
    this.htmls.push(`<div class="${alignment}">${svg}</div>`);
  }

  /**
   * Adds a multi-column layout to the receipt for tabular data.
   * 
   * Creates a flexbox-based layout where each column can have individual
   * styling, width allocation, and text alignment. Perfect for item lists,
   * price tables, and structured data presentation.
   * 
   * @param columns - Array of column configurations
   * @param columns[].text - Text content for the column
   * @param columns[].width - Optional width percentage (uses flex: 1 if not specified)
   * @param columns[].align - Text alignment: 'left', 'center', or 'right'
   * @param columns[].thickness - Font weight: 'bold' or 'lighter'
   * @param columns[].italic - Whether to apply italic styling
   * @param columns[].underline - Whether to apply underline styling
   * @param columns[].size - Font size: 'xs', 'sm', 'base', 'lg', or 'xl'
   * 
   * @example
   * ```typescript
   * receipt.addColumns([
   *   { text: "Item", align: "left", thickness: "bold" },
   *   { text: "Qty", align: "center", width: 20 },
   *   { text: "Price", align: "right", thickness: "bold" }
   * ]);
   * ```
   */
  addColumns(columns: PayloadByType<"columns">) {
    // Process each column configuration into HTML
    const htmlParts = columns.map((col) => {
      const classes: string[] = [];
      
      // Apply base text content styling
      classes.push("text-content");
      if (col?.align) classes.push(col.align);

      // Configure flex layout and width allocation
      const styleParts = [];
      if (col.width) {
        // Use specific width percentage with flex-shrink: 0
        const flex_style = ["0", "0", `${col.width}%`];
        styleParts.push(`flex: ${flex_style.join(" ")}`);
      } else {
        // Use equal distribution for columns without specified width
        styleParts.push(`flex: 1`);
      }

      // Apply optional typography styling
      if (col?.thickness) classes.push(col?.thickness);
      if (col?.italic) classes.push("italic");
      if (col?.underline) classes.push("underline");
      if (col?.size) classes.push(`text-${col.size}`);

      // Combine styling and create column element
      const classes_text = classes.join(" ");
      const styles_text = styleParts.join("; ");
      const element = `<div style="${styles_text}" class="${classes_text}">${col.text}</div>`;
      return element;
    });
    
    // Combine all columns into a flex container with spacing
    const combined_html = htmlParts.join("");
    const element = `<div style="display: flex; gap: 4px;">${combined_html}</div>`;
    this.htmls.push(element);
  }

  /**
   * Finalizes and returns the complete HTML document.
   * 
   * Closes the HTML document structure and combines all accumulated
   * elements into a single HTML string. This method should be called
   * after adding all desired receipt elements.
   * 
   * @returns Complete HTML document string ready for rendering or conversion
   * 
   * @example
   * ```typescript
   * const receipt = new ReceiptBuilder();
   * receipt.addHeading("My Store");
   * receipt.addText("Thank you!");
   * const html = receipt.build();
   * ```
   */
  build(): string {
    // Close the HTML document structure
    this.htmls.push("</body></html>");
    
    // Combine all HTML fragments into final document
    return this.htmls.join("");
  }
}
