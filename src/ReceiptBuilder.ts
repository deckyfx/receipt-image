import type { Alignment, PayloadByType } from "./types";

export class ReceiptBuilder {
  private htmls: string[] = [];

  constructor(private width: number = 320) {
    this.htmls.push(`<!DOCTYPE html><html><head><style>
      body { font-family: monospace; font-size: 12px; margin: 0px 0px 2px 0px; padding: 0px 0px 2px 0px; color: black; }
      h1, h2, h3, h4, h5, h6 { padding: 0px; margin: 0px; }}
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
    if (opts?.thickness) {
      switch (opts.thickness) {
        case "bolder":
          classes.push("bold");
          break;
        case "lighter":
          classes.push("lighter");
          break;
      }
    }
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

  addQRCode(data: string) {
    const encoded = encodeURIComponent(data);
    this.htmls.push(
      `<div class="center"><img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encoded}"/></div>`
    );
  }

  addBarcode(data: string) {
    const encoded = encodeURIComponent(data);
    this.htmls.push(
      `<div class="center"><img src="https://barcode.tec-it.com/barcode.ashx?data=${encoded}&code=Code128&dpi=96"/></div>`
    );
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
