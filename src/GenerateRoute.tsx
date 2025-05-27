import puppeteer from "puppeteer";

import { ReceiptBuilder } from "./ReceiptBuilder";

import type { ComponentType, PayloadByType } from "./types";

type RequestPayload<T extends ComponentType> = {
  type: string;
  data: PayloadByType<T>;
  width: number;
};

async function Generate(
  req: Bun.BunRequest<"/api/generate">
): Promise<Response> {
  const body = (await req.json()) as RequestPayload<"text">;

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
    case "image": {
      const { src, width, align } = body.data as PayloadByType<"image">;
      receipt.addImage(src, width, align);
      break;
    }
    case "columns": {
      const payload = body.data as PayloadByType<"columns">;
      receipt.addColumns(payload);
      break;
    }
  }
  html = receipt.build();
  console.log(html);

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
