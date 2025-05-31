// import { add, multiply } from "../src/calculator"; // <--- Crucial line!
// import { describe, it, expect } from "@jest/globals";

// describe('index file', () => {
//   test("arithmetic > 2 + 2", () => {
//     expect(add(2, 2)).toBe(4);
//   });

//   test("arithmetic > 2 * 2", () => {
//     expect(multiply(2, 2)).toBe(4);
//   });
// })

import "vitest-puppeteer";
import "expect-puppeteer";

describe("Google Homepage", (): void => {
  beforeAll(async (): Promise<void> => {
    await page.goto("https://google.com");
  });

  it('should display "google" text on page', async (): Promise<void> => {
    await expect(page).toMatchTextContent(/Google/);
  });
});