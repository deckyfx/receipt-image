import puppeteer from "puppeteer";

import qrcode from "qrcode";
import JsBarcode from "jsbarcode";
import { DOMImplementation, XMLSerializer } from "xmldom";

import { ReceiptBuilder } from "./ReceiptBuilder";

import { type BatchParsePayloadItem, type PayloadByType } from "./types";

export default async function ImageGenerator(width: number, payload: BatchParsePayloadItem) {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.setViewport({
    width: width,
    height: 1,
    deviceScaleFactor: 1,
  });
  const receipt = new ReceiptBuilder();
  let html = "";

  switch (payload.type) {
    case "text": {
      const { text, ...data } = payload as PayloadByType<"text">;
      receipt.addText(text || "", data);
      break;
    }
    case "heading": {
      const { text, ...data } = payload as PayloadByType<"heading">;
      receipt.addHeading(text || "", data);
      break;
    }
    case "divider": {
      const data = payload as PayloadByType<"divider">;
      receipt.addDivider(data);
      break;
    }
    case "columns": {
      const data = payload.data as PayloadByType<"columns">;
      receipt.addColumns(data);
      break;
    }
    case "image": {
      const { src, width, align } = payload as PayloadByType<"image">;
      receipt.addImage(src, width, align);
      break;
    }
    case "qrcode": {
      const { content, width, align } = payload as PayloadByType<"qrcode">;

      try {
        const qrdata = await qrcode.toDataURL(content);
        receipt.addImage(qrdata, width, align);
      } catch (error: any) {
        console.warn(error);
      }

      break;
    }
    case "barcode": {
      const { content, width, align } = payload as PayloadByType<"barcode">;

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

  return base64;
}
