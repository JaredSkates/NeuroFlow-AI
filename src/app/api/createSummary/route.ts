import { NextResponse } from 'next/server';
import { generateSummary } from '@/lib/openai'
import { auth } from '@clerk/nextjs/server';
// /api/createSummary -> For rest API route

// API endpoint to create a new summary
export async function POST(req: Request) {

    // Check for authentication
    const {userId} = await auth(); // clerk/next.js, server-site function -> returns userID
    if(!userId) {
        return new NextResponse("Unauthorized", { status: 401 }); // If user is not logged in
    }

    const body = await req.json(); // convert request body to JSON & Access request body
    const {notes} = body as {notes: string}; // We pass the contents in here through converting the object's contents into a string (destructuring))
    
    // {TODO: Convert HTML to text for OpenAI}, Converion HTML -> Text

    // Test if we are recieving the correct editorState
    console.log(notes);

    /* Accessing OpenAI API */
    const summary = await generateSummary(notes); // generateSummary(notes) already returns a string
    if(!summary) {
        return new NextResponse("Failed to generate summary", { status: 500 });
    }

    console.log(summary)
    // Return the summary as a JSON response
    return NextResponse.json({
        summary: summary,
    });
}