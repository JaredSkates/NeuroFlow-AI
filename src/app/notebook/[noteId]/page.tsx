import { db } from '@/lib/db';
import { $notes } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react'
// [noteId] wildcard to access Id variable

type Props = {
    params: {
        noteId: string; // Provided by next.js
    }
}

// Server-component to fetch directly from database and return to client (Browser)
const NotebookPage = async ({params: { noteId }}: Props) => {
  const { userId } = await auth();  
  if(!userId) {
    return redirect("/dashboard");
  };

  // Fetch the note from the database
  const notes = await db
    .select()
    .from($notes)
    .where(
        and(
            eq($notes.id, parseInt(noteId)), // $notes.id == noteId (conver string to int)
            eq($notes.userId, userId), // $notes.userId == userId
        )
  );

  // Check if the note is the proper one
  if(notes.length != 1) {
    return redirect('/dashboard')
  }

  // If the note is found, return it & TODO: Find how note[0] returns the object
  const note = notes[0];

  return (
      // <pre>{JSON.stringify(note, null, 2)}</pre> : Check the note object in the browser
      <div></div>
  )
}

export default NotebookPage;