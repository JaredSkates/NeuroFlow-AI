// /api/createNoteBook -> For rest API route 
// API endpoint to create a new notebook
// This is a server-side function that handles the request and returns a response

import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get the request body, 
export async function POST(req: Request) {
    // async handles the request and returns a response (promise)
    const { userId } = await auth(); // clerk/next.js, server-site function -> returns userID

    // Check if the user is logged in to prevent unauthorized access
    if (!userId) {
        return new Response("Unauthorized", { status: 401 }); // If user is not logged in
    }

    const body = await req.json(); // convert request body to JSON & Access request body
    const {name} = body; // We pass the notebook name in here


    /* Accessing OpenAI API */
    const prompt = await generateImagePrompt(name); // Generate a prompt for the image
    if(!prompt) {
        return new Response("Failed to generate image prompt", { status: 500 });
    }

    const image_url = await generateImage(prompt);
    if(!image_url) {
        return new Response("Failed to generate image", { status: 500 });
    }

    // Inserts the notebook into the database using the values from the request body.
    const note_ids = await db.insert($notes).values({
        name, 
        userId,
        imageUrl: image_url,
    }).returning({ // returns the id of the newly inserted notebook
        insertedId: $notes.id, // Stores the id of newly inserted notebook back to note_ids
    })
    // If the notebook is successfully created, return a formatted JSON response with the notebook ID to the client
    return NextResponse.json({
        note_id: note_ids[0].insertedId,
    })
}