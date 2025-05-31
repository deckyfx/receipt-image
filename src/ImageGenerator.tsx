/**
 * Image Generator - Converts receipt HTML to PNG images using Puppeteer.
 * 
 * This module handles the conversion of receipt component data into rendered
 * PNG images. It processes different receipt element types (text, headings,
 * images, QR codes, barcodes, etc.) and uses Puppeteer to render the final
 * HTML as a high-quality image.
 * 
 * @fileoverview Receipt component to image conversion functionality
 * @author Receipt Image Generator Team
 * @version 1.0.0
 * @since 2024-12-31
 * 
 * CHANGE LOG:
 * - 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import puppeteer from "puppeteer";

import qrcode from "qrcode";
import JsBarcode from "jsbarcode";
import { DOMImplementation, XMLSerializer } from "xmldom";

import { ReceiptBuilder } from "./ReceiptBuilder";

import { type BatchParsePayloadItem } from "./types";

/**
 * Generates a PNG image from a receipt component payload.
 * 
 * This function orchestrates the entire image generation process:
 * 1. Launches a headless browser instance
 * 2. Processes the payload into HTML using ReceiptBuilder
 * 3. Renders the HTML in the browser
 * 4. Captures a screenshot as base64 PNG
 * 5. Cleans up browser resources
 * 
 * Supports all receipt component types including text, headings, dividers,
 * columns, images, QR codes, and barcodes.
 * 
 * @param width - The width in pixels for the generated image
 * @param payload - Receipt component data to render
 * @returns Promise resolving to base64-encoded PNG image string
 * 
 * @throws Error when encountering unsupported component types
 * 
 * @example
 * ```typescript
 * const imageBase64 = await ImageGenerator(320, {
 *   type: "text",
 *   text: "Hello World",
 *   align: "center"
 * });
 * ```
 */
export default async function ImageGenerator(
  width: number,
  payload: BatchParsePayloadItem
): Promise<string> {
  // Launch headless browser for HTML rendering
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  
  // Configure viewport to match desired image width
  await page.setViewport({
    width: width,
    height: 1, // Height will be determined by content
    deviceScaleFactor: 1, // Standard pixel density
  });

  // Initialize receipt builder for HTML generation
  const receipt = new ReceiptBuilder();
  let html = "";

  // Process payload based on component type using discriminated union
  switch (payload.type) {
    case "text": {
      // Extract text content and styling options
      const { text, type, ...data } = payload;
      receipt.addText(text || "", data);
      break;
    }
    case "heading": {
      // Extract heading content and configuration
      const { text, type, ...data } = payload;
      receipt.addHeading(text || "", data);
      break;
    }
    case "divider": {
      // Extract divider styling options
      const { type, ...data } = payload;
      receipt.addDivider(data);
      break;
    }
    case "columns": {
      // Extract column layout data
      const { data } = payload;
      receipt.addColumns(data);
      break;
    }
    case "image": {
      // Extract image source and display options
      const { src, width, align } = payload;
      receipt.addImage(src, width, align);
      break;
    }
    case "qrcode": {
      // Generate QR code image from content
      const { content, width, align } = payload;

      try {
        // Convert QR content to data URL using qrcode library
        const qrdata = await qrcode.toDataURL(content);
        receipt.addImage(qrdata, width, align);
      } catch (error: any) {
        // Log QR code generation errors but continue processing
        console.warn(error);
      }

      break;
    }
    case "barcode": {
      // Generate barcode SVG from content
      const { content, width, align, barcode_type } = payload;

      // Set up XML DOM for SVG generation
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

      // Generate barcode SVG using JsBarcode library
      JsBarcode(svgNode, content, {
        xmlDocument: document,
        format: barcode_type,
      });

      // Convert SVG DOM to string and add to receipt
      const svgText = xmlSerializer.serializeToString(svgNode);
      receipt.addSVG(svgText, width, align);
      break;
    }
    default: {
      // TypeScript exhaustiveness check for unhandled component types
      const _exhaustive: never = payload;
      throw new Error(
        `Unhandled component type: ${JSON.stringify(_exhaustive)}`
      );
    }
  }
  
  // Build final HTML from receipt components
  html = receipt.build();

  // Load HTML content into browser page
  await page.setContent(html);

  // Capture screenshot of the rendered content
  const base64 = await page.screenshot({
    encoding: "base64", // Return as base64 string
    fullPage: true, // Capture entire content height
    type: "png", // PNG format for quality
    //path: "./images/result.png", // Optional: save to file for debugging
  });

  // Clean up browser resources
  await browser.close();

  // Return base64-encoded image data
  return base64;
}
