type Alignment = "left" | "center" | "right";

type ColumnSpec = {
  content: string;
  width?: string; // e.g. '30%', '20%', or undefined for flexible
  align?: Alignment;
};

export class ReceiptBuilder {
  private htmls: string[] = [];

  constructor(private width: number = 320) {
    this.htmls.push(`<!DOCTYPE html><html><head><style>
      body { font-family: monospace; font-size: 12px; padding: 0px, margin: 8px 2px; color: black; }
      .center { text-align: center; }
      .right { text-align: right; }
      .left { text-align: left; }
      .bold { font-weight: bold; }
      .lighter { font-weight: lighter; color: gray }
      .italic { font-style: italic; }
      .underline { text-decoration: underline; }
      .divider { border-top: 1px dashed #000; margin: 8px 0; }
      .two-col, .three-col { display: flex; justify-content: space-between; }
    </style></head><meta charset="UTF-8">
    <meta name="viewport" content="width=${width}px, initial-scale=1.0"><body>`);
  }

  addText(
    content: string,
    opts?: {
      align?: Alignment;
      thickness?: "normal" | "bolder" | "lighter";
      italic?: boolean;
      underline?: boolean;
    }
  ) {
    const classes: string[] = [];
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
    this.htmls.push(`<div class="${classes.join(" ")}">${content}</div>`);
  }

  addHeading(content: string, level: number = 1, align: Alignment = "left") {
    this.htmls.push(`<h${level} class="${align}">${content}</h${level}>`);
  }

  addDivider(
    style: {
      thickness?: "medium" | "thick" | "thin";
      style?: "solid" | "dashed" | "dotted" | "double";
    } = {
      thickness: "thin",
      style: "solid",
    }
  ) {
    const styles = [
      `border-top-width: ${style.thickness}`,
      `border-top-style: ${style.style}`,
    ];
    this.htmls.push(`<div class="divider" style="${styles.join("; ")}"></div>`);
  }

  addImage(
    src: string,
    width: string = "100%",
    alignment: Alignment = "center"
  ) {
    this.htmls.push(
      `<div class="${alignment}"><img src="${src}" style="max-width: ${width}; height: auto;"/></div>`
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

  addColumns(columns: ColumnSpec[]) {
    const htmlParts = columns.map((col) => {
      const styleParts = [];
      if (col.width) {
        const flex_style = ["0", "0", col.width];
        styleParts.push(`flex: ${flex_style.join(" ")}`);
      } else {
        styleParts.push(`flex: 1`);
      }
      if (col.align) styleParts.push(`text-align: ${col.align}`);
      styleParts.push("word-wrap: break-word");
      styleParts.push("white-space: normal");
      return `<div style="${styleParts.join("; ")}">${col.content}</div>`;
    });
    this.htmls.push(
      `<div style="display: flex; gap: 4px;">${htmlParts.join("")}</div>`
    );
  }

  build(): string {
    this.htmls.push("</body></html>");
    return this.htmls.join("");
  }
}
