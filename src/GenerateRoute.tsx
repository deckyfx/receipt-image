import ImageGenerator from "./ImageGenerator";
import { type GeneratePayload, type BatchParsePayloadItem } from "./types";

async function Generate(
  req: Bun.BunRequest<"/api/generate">
): Promise<Response> {
  const body = (await req.json()) as GeneratePayload;

  // Convert GeneratePayload to BatchParsePayloadItem format
  const payloadItem: BatchParsePayloadItem = {
    type: body.type,
    ...(body.data as any),
  } as BatchParsePayloadItem;

  const base64 = await ImageGenerator(body.width, payloadItem);

  return Response.json({ status: "ok", image: base64 });
}

export default {
  POST: Generate,
} as const;
