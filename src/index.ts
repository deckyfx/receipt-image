import puppeteer from "puppeteer";
import { ReceiptBuilder } from "./ReceiptBuilder";
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({});

const page = await browser.newPage();
await page.setViewport({
  width: 320,
  height: 480,
  deviceScaleFactor: 1,
});

const html = CreateReceiptHTML();
console.log(html);
await page.setContent(html);

const image = await page.screenshot({
  //encoding: "base64",
  fullPage: true,
  type: "png",
  path: "./images/result.png",
});

await browser.close();

function CreateReceiptHTML() {
  const receipt = new ReceiptBuilder();

  receipt.addHeading("My Store", 1, "center");
  
  receipt.addImage("https://picsum.photos/536/354");

  receipt.addDivider();

  for (let i = 0; i < 100; i++) {
    receipt.addColumns([
      { content: "Item A", align: "left" },
      { content: "2", width: "20%", align: "center" },
      { content: "Rp 15,000", width: "30%", align: "right" },
    ]);
  }

  receipt.addText("Bold Text", {
    thickness: "bold",
  });

  receipt.addText("Normal Text");

  receipt.addText("Thin Text", {
    thickness: "lighter",
  });

  receipt.addText("Centered Text", {
    align: "center",
    italic: true,
    underline: true,
  });

  receipt.addDivider({
    thickness: "thick",
    style: "double",
  });

  receipt.addColumns([
    { content: "Total", align: "left" },
    { content: "Rp 15,000", width: "30%", align: "right" },
  ]);

  return receipt.build(); // send this to native for bitmap rendering
}
