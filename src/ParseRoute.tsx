import puppeteer from "puppeteer";

import qrcode from "qrcode";
import JsBarcode from "jsbarcode";
import { DOMImplementation, XMLSerializer } from "xmldom";

import { ReceiptBuilder } from "./ReceiptBuilder";

import type { BatchParsePayload, PayloadByType } from "./types";

async function Parse(req: Bun.BunRequest<"/api/parse">): Promise<Response> {
  const body = (await req.json()) as BatchParsePayload;

  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.setViewport({
    width: body.width,
    height: 1,
    deviceScaleFactor: 1,
  });
  const receipt = new ReceiptBuilder();
  let html = "";

  switch (body.type) {
    case "text": {
      const { text, ...payload } = body.data as PayloadByType<"text">;
      receipt.addText(text || "", payload);
      break;
    }
    case "heading": {
      const { text, ...payload } = body.data as PayloadByType<"heading">;
      const size = body.data.size;
      receipt.addHeading(text || "", payload);
      break;
    }
    case "divider": {
      const payload = body.data as PayloadByType<"divider">;
      receipt.addDivider(payload);
      break;
    }
    case "columns": {
      const payload = body.data as PayloadByType<"columns">;
      receipt.addColumns(payload);
      break;
    }
    case "image": {
      const { src, width, align } = body.data as PayloadByType<"image">;
      receipt.addImage(src, width, align);
      break;
    }
    case "qrcode": {
      const { content, width, align } = body.data as PayloadByType<"qrcode">;

      try {
        const qrdata = await qrcode.toDataURL(content);
        receipt.addImage(qrdata, width, align);
      } catch (error: any) {
        console.warn(error);
      }

      break;
    }
    case "barcode": {
      const { content, width, align } = body.data as PayloadByType<"barcode">;

      const xmlSerializer = new XMLSerializer();
      const document = new DOMImplementation().createDocument(
        "http://www.w3.org/1999/xhtml",
        "html",
        null
      );
      const svgNode = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );

      JsBarcode(svgNode, content, {
        xmlDocument: document,
      });

      const svgText = xmlSerializer.serializeToString(svgNode);
      receipt.addSVG(svgText, width, align);
      break;
    }
  }
  html = receipt.build();

  await page.setContent(html);

  const base64 = await page.screenshot({
    encoding: "base64",
    fullPage: true,
    type: "png",
    //path: "./images/result.png",
  });

  return Response.json({ status: "ok", image: base64 });
}

export default {
  POST: Parse,
} as const;
