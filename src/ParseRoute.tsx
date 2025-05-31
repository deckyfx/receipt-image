/**
 * Parse Route - API endpoint for batch receipt processing and image generation.
 * 
 * This route handles requests to process multiple receipt components in a single
 * operation. It accepts an array of component payloads and returns an array of
 * base64-encoded PNG images, maintaining the order of input elements.
 * 
 * @fileoverview Batch receipt processing API endpoint
 * @author Receipt Image Generator Team
 * @version 1.0.0
 * @since 2024-12-31
 * 
 * CHANGE LOG:
 * - 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import ImageGenerator from "./ImageGenerator";
import type { BatchParsePayload } from "./types";

/**
 * Handles POST requests to process multiple receipt elements in batch.
 * 
 * This function processes requests for batch receipt generation:
 * 1. Parses the JSON payload containing an array of component data and shared width
 * 2. Iterates through each component sequentially
 * 3. Generates images for each component using the ImageGenerator
 * 4. Returns an array of base64-encoded images in the same order as input
 * 
 * The sequential processing ensures consistency and avoids overwhelming system resources
 * with parallel Puppeteer instances, which could cause memory issues.
 * 
 * @param req - Bun request object for the /api/parse endpoint
 * @returns Promise resolving to JSON array of base64-encoded images
 * 
 * @throws Will propagate errors from JSON parsing or image generation
 * 
 * @example
 * POST /api/parse
 * Content-Type: application/json
 * 
 * {
 *   "width": 320,
 *   "data": [
 *     { "type": "heading", "text": "Receipt", "align": "center" },
 *     { "type": "divider" },
 *     { "type": "text", "text": "Item 1", "align": "left" }
 *   ]
 * }
 * 
 * Response:
 * [
 *   "iVBORw0KGgoAAAANSUhEUgAA...", // heading image
 *   "iVBORw0KGgoAAAANSUhEUgAA...", // divider image  
 *   "iVBORw0KGgoAAAANSUhEUgAA..."  // text image
 * ]
 */
async function Parse(req: Bun.BunRequest<"/api/parse">): Promise<Response> {
  // Parse the incoming JSON payload with batch data
  const body = (await req.json()) as BatchParsePayload;
  const images: string[] = [];

  // Process each receipt component sequentially to maintain order and manage resources
  // Sequential processing prevents memory issues from multiple concurrent Puppeteer instances
  for (const item of body.data) {
    // Generate image for current component using shared width configuration
    const base64 = await ImageGenerator(body.width, item);
    
    // Add generated image to results array, preserving input order
    images.push(base64);
  }

  // Return array of base64-encoded images in JSON format
  return Response.json(images);
}

/**
 * Route configuration object exporting HTTP method handlers.
 * Only POST method is supported for batch receipt processing.
 */
export default {
  POST: Parse,
} as const;
