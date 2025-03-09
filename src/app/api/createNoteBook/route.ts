// /api/createNoteBook -> For rest API route

import { generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get the request body
export async function POST(req: Request) {
    // async handles the request and returns a response
    const { userId } = await auth(); // next.js, server-site function -> returns userID

    if (!userId) {
        return new Response("Unauthorized", { status: 401 }); // If user is not logged in
    }
    const body = await req.json(); // convert request body to JSON & Access request body
    const {name} = body; // We pass the notebook name in here

    // Test
    const prompt = await generateImagePrompt(name); // Generate a prompt for the image
    console.log(prompt);
    return new NextResponse('ok');
}