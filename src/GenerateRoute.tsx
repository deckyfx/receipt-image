import puppeteer from "puppeteer";

import { ReceiptBuilder } from "./ReceiptBuilder";

type RequestPayload = {
  type: "heading" | "text";
  data: {
    text: string;
    size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    align: "left" | "right" | "center";
    thickness: "normal" | "bolder" | "lighter";
    italic: boolean;
    underline: boolean;
  };
  width: number;
};

async function Generate(
  req: Bun.BunRequest<"/api/generate">
): Promise<Response> {
  const body = (await req.json()) as RequestPayload;

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
    case "text":
      receipt.addText(body.data.text, {
        align: body.data.align,
        italic: body.data.italic,
        underline: body.data.underline,
        thickness: body.data.thickness,
      });
      break;
    case "heading":
      const size = body.data.size.replace(/\w/, "");
      receipt.addHeading(body.data.text, Number(size), body.data.align);
      break;
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
  POST: Generate,
} as const;
