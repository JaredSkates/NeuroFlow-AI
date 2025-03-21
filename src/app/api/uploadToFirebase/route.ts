import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { $notes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { uploadToFirebase } from '@/lib/firebase'; // Import the uploadToFirebase function

export async function POST(req: Request) {
    try{
        const { noteId } = await req.json();
        
        if (!noteId) {
            return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
        }

        const note = await db.select().from($notes).where(eq($notes.id, parseInt(noteId)));
        if (!note[0].imageUrl) {
            return NextResponse.json({ error: 'URL not found' }, { status: 404 });
        }
        
        const firebase_url = await uploadToFirebase(note[0].imageUrl, note[0].name);
        if (!firebase_url) {
            return NextResponse.json({ error: 'Failed to upload to Firebase' }, { status: 500 });
        }

        await db.update($notes).set({ imageUrl: firebase_url }).where(eq($notes.id, parseInt(noteId))); // Update the note with the new Firebase URL
        // Update the note with the new Firebase URL
        return new NextResponse('ok', { status: 200 });
        
    } catch(error) {console.error(error);}
}