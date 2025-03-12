// Save editorState (Note content) to Database
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {

    try{

        const body = await req.json(); // convert request body to JSON & Access request body
        let { noteId, noteContent } = body; // We pass the noteId and editorState in here
    
        if(!noteId || !noteContent) {
            return new Response("Missing noteId or editorState", { status: 400 });
        }

        noteId = parseInt(noteId); // Convert noteId to integer to use for a condition
        const notes = await db.select().from($notes).where(eq($notes.id, noteId)) // Fetch the data from the $notes table where the id matches noteId.
        if(notes.length != 1) { // Ensures only one note is found, '> 1' means the id is not unique and '< 1' means no note is found
            return new Response("Note not found", { status: 404 });
        }

        const note = notes[0];
        if(note.editorState !== noteContent) {
            // Update $notes table and set editorState column w/ current state where id matches this noteId.
            await db.update($notes).set({ editorState: noteContent }).where(eq($notes.id, noteId)); 
        }
        
        return new Response("Note Update: Success", { status: 200 });

    } catch(e) {
        return new Response("Note Update: Unsuccessful", { status: 500 });
    }

};