// /api/completion

import { openai } from "@ai-sdk/openai"; // Automaticaly reads you api key from .env
import { streamText } from "ai";

export async function POST(req: Request) {
  
  // Variable name must match the name in the client-side code when storing the request
  const body = await req.json();
  const { prompt } = body;

  if (!prompt) {
    return new Response("No notes provided", { status: 400 });
  }
  
  const response = await streamText({
    model: openai('gpt-3.5-turbo'),
    system: 'You are a helpful assistant',
    prompt: `Generate a completion for the following text: ${prompt}`,
  })

  // Convert to a readable stream
  const stream = response.toDataStreamResponse();

  return stream;
}
