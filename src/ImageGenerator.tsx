import puppeteer from "puppeteer";

import qrcode from "qrcode";
import JsBarcode from "jsbarcode";
import { DOMImplementation, XMLSerializer } from "xmldom";

import { ReceiptBuilder } from "./ReceiptBuilder";

import { type BatchParsePayloadItem } from "./types";

export default async function ImageGenerator(
  width: number,
  payload: BatchParsePayloadItem
): Promise<string> {
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
      const { text, type, ...data } = payload;
      receipt.addText(text || "", data);
      break;
    }
    case "heading": {
      const { text, type, ...data } = payload;
      receipt.addHeading(text || "", data);
      break;
    }
    case "divider": {
      const { type, ...data } = payload;
      receipt.addDivider(data);
      break;
    }
    case "columns": {
      const { data } = payload;
      receipt.addColumns(data);
      break;
    }
    case "image": {
      const { src, width, align } = payload;
      receipt.addImage(src, width, align);
      break;
    }
    case "qrcode": {
      const { content, width, align } = payload;

      try {
        const qrdata = await qrcode.toDataURL(content);
        receipt.addImage(qrdata, width, align);
      } catch (error: any) {
        console.warn(error);
      }

      break;
    }
    case "barcode": {
      const { content, width, align, barcode_type } = payload;

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
        format: barcode_type,
      });

      const svgText = xmlSerializer.serializeToString(svgNode);
      receipt.addSVG(svgText, width, align);
      break;
    }
    default: {
      const _exhaustive: never = payload;
      throw new Error(
        `Unhandled component type: ${JSON.stringify(_exhaustive)}`
      );
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

  await browser.close();

  return base64;
}
