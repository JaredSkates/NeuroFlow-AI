import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq, ne } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const body = await req.json();
    const { noteId } = body;

    if (!noteId) {
        return NextResponse.json({ error: 'Note ID not found' }, { status: 400 });
    }

    try {
        await db.delete($notes).where(eq($notes.id, parseInt(noteId))); // Delete the note from the database

        return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 });
    } catch(error) {return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });}
    // Delete the note where the noteId matches

}