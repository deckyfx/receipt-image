import type { Alignment, PayloadByType } from "./types";

export class ReceiptBuilder {
  private htmls: string[] = [];

  constructor(private width: number = 320) {
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

  addText(content: string, opts?: Omit<PayloadByType<"text">, "text">) {
    const classes: string[] = [];
    classes.push("text-content");
    if (opts?.align) classes.push(opts.align);
    if (opts?.thickness) classes.push(opts?.thickness);
    if (opts?.italic) classes.push("italic");
    if (opts?.underline) classes.push("underline");
    if (opts?.size) classes.push(`text-${opts.size}`);
    const classes_text = classes.join(" ");
    const element = `<div class="${classes_text}">${content}</div>`;
    this.htmls.push(element);
  }

  addHeading(content: string, opts?: Omit<PayloadByType<"heading">, "text">) {
    const size = opts?.size || 1;
    const classes: string[] = [];
    classes.push("text-content");
    if (opts?.align) classes.push(opts.align);
    const classes_text = classes.join(" ");
    const element = `<h${size} class="${classes_text}">${content}</h${size}>`;
    this.htmls.push(element);
  }

  addDivider(opts?: PayloadByType<"divider">) {
    const styles = [
      `border-top-width: ${opts?.thickness || "thin"}`,
      `border-top-style: ${opts?.style || "solid"}`,
    ];
    this.htmls.push(`<div class="divider" style="${styles.join("; ")}"></div>`);
  }

  addImage(src: string, width: number = 100, alignment: Alignment = "center") {
    this.htmls.push(
      `<div class="${alignment}"><img src="${src}" style="max-width: ${width}%; height: auto;"/></div>`
    );
  }

  addSVG(svg: string, width: number = 100, alignment: Alignment = "center") {
    // Regex to capture the <svg> tag and its attributes, including the style attribute if it exists
    const svgTagRegex = /<svg\s*([^>]*?)>/;
    const match = svg.match(svgTagRegex);

    if (!match) {
      console.warn("Could not find <svg> tag in the provided SVG string.");
      return svg; // Return original if no svg tag found
    }

    const fullSvgTag = match[0]; // e.g., <svg width="178px" height="142px" ... style="..." >
    let attributesString: string = match[1] || ""; // Initialize with the captured string, TypeScript knows it's definitely a string here

    // 1. Remove existing width and height attributes
    attributesString = attributesString.replace(/\s*width="[^"]*"/g, "");
    attributesString = attributesString.replace(/\s*height="[^"]*"/g, "");

    // 2. Extract or create the style attribute content
    let currentStyleContent: string = ""; // Initialize with an empty string
    const styleAttrRegex = /style="([^"]*)"/;
    const styleMatch = attributesString.match(styleAttrRegex);

    if (styleMatch) {
      currentStyleContent = styleMatch[1] || ""; // TypeScript now knows styleMatch[1] exists if styleMatch is not null
      // Remove the old style attribute from the attributesString
      attributesString = attributesString.replace(styleAttrRegex, "");
    }

    // 3. Update or add max-width and height: auto to the style content
    let newStyleContent = currentStyleContent; // No change needed here, as currentStyleContent is guaranteed to be a string

    // Remove any existing max-width or height properties to ensure we don't duplicate
    newStyleContent = newStyleContent.replace(/max-width:[^;]*;?/g, "");
    newStyleContent = newStyleContent.replace(/height:[^;]*;?/g, "");

    // Trim and add our new styles, ensuring no double semicolons or leading/trailing spaces
    newStyleContent = newStyleContent.trim();
    if (newStyleContent.length > 0 && !newStyleContent.endsWith(";")) {
      newStyleContent += ";";
    }
    newStyleContent += ` max-width: ${width}%; height: auto;`;
    newStyleContent = newStyleContent.trim(); // Trim again in case of leading space from semicolon

    // 4. Construct the new style attribute
    const newStyleAttribute = `style="${newStyleContent}"`;

    // 5. Reassemble the SVG tag
    const newSvgTag = `<svg ${attributesString.trim()} ${newStyleAttribute}>`;

    // Replace the original SVG tag with the new one
    svg = svg.replace(fullSvgTag, newSvgTag);

    this.htmls.push(`<div class="${alignment}">${svg}</div>`);
  }

  addColumns(columns: PayloadByType<"columns">) {
    const htmlParts = columns.map((col) => {
      const classes: string[] = [];
      classes.push("text-content");
      if (col?.align) classes.push(col.align);

      const styleParts = [];
      if (col.width) {
        const flex_style = ["0", "0", col.width];
        styleParts.push(`flex: ${flex_style.join(" ")}`);
      } else {
        styleParts.push(`flex: 1`);
      }

      if (col?.thickness) classes.push(col?.thickness);
      if (col?.italic) classes.push("italic");
      if (col?.underline) classes.push("underline");
      if (col?.size) classes.push(`text-${col.size}`);

      const classes_text = classes.join(" ");
      const styles_text = styleParts.join("; ");
      const element = `<div style="${styles_text}" class="${classes_text}">${col.text}</div>`;
      return element;
    });
    const combined_html = htmlParts.join("");
    const element = `<div style="display: flex; gap: 4px;">${combined_html}</div>`;
    this.htmls.push(element);
  }

  build(): string {
    this.htmls.push("</body></html>");
    return this.htmls.join("");
  }
}
