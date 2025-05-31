/**
 * Generate Route - API endpoint for single receipt element image generation.
 * 
 * This route handles requests to generate images from individual receipt
 * components. It accepts a component payload with width specification and
 * returns a base64-encoded PNG image.
 * 
 * @fileoverview Single receipt element generation API endpoint
 * @author Receipt Image Generator Team
 * @version 1.0.0
 * @since 2024-12-31
 * 
 * CHANGE LOG:
 * - 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import ImageGenerator from "./ImageGenerator";
import { type GeneratePayload, type BatchParsePayloadItem } from "./types";

/**
 * Handles POST requests to generate a single receipt element image.
 * 
 * This function processes requests for individual receipt components:
 * 1. Parses the JSON payload containing component data and width
 * 2. Transforms the payload format for the ImageGenerator
 * 3. Generates the image using the ImageGenerator module
 * 4. Returns the base64-encoded image in a standardized response
 * 
 * @param req - Bun request object for the /api/generate endpoint
 * @returns Promise resolving to JSON response with status and base64 image
 * 
 * @throws Will propagate errors from JSON parsing or image generation
 * 
 * @example
 * POST /api/generate
 * Content-Type: application/json
 * 
 * {
 *   "type": "text",
 *   "width": 320,
 *   "data": {
 *     "text": "Hello World",
 *     "align": "center"
 *   }
 * }
 * 
 * Response:
 * {
 *   "status": "ok",
 *   "image": "iVBORw0KGgoAAAANSUhEUgAA..."
 * }
 */
async function Generate(
  req: Bun.BunRequest<"/api/generate">
): Promise<Response> {
  // Parse the incoming JSON payload
  const body = (await req.json()) as GeneratePayload;

  // Transform GeneratePayload to BatchParsePayloadItem format for consistency
  // This allows using the same ImageGenerator interface for both single and batch operations
  const payloadItem: BatchParsePayloadItem = {
    type: body.type,
    ...(body.data as any), // Spread the component-specific data
  } as BatchParsePayloadItem;

  // Generate the image using the unified ImageGenerator function
  const base64 = await ImageGenerator(body.width, payloadItem);

  // Return standardized JSON response with status and image data
  return Response.json({ status: "ok", image: base64 });
}

/**
 * Route configuration object exporting HTTP method handlers.
 * Only POST method is supported for receipt element generation.
 */
export default {
  POST: Generate,
} as const;
