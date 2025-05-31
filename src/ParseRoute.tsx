import ImageGenerator from "./ImageGenerator";
import type { BatchParsePayload } from "./types";

async function Parse(req: Bun.BunRequest<"/api/parse">): Promise<Response> {
  const body = (await req.json()) as BatchParsePayload;
  const images: string[] = [];

  // Process each item in the batch
  for (const item of body.data) {
    const base64 = await ImageGenerator(body.width, item);
    images.push(base64);
  }

  return Response.json(images);
}

export default {
  POST: Parse,
} as const;
