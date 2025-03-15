import TipTapEditor from '@/components/TipTapEditor';
import { Button } from '@/components/ui/button';
import { clerk } from '@/lib/clerk-server';
import { db } from '@/lib/db';
import { $notes } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import  Link from 'next/link';
import { redirect } from 'next/navigation';
import Summary from '@/components/Summary';
import React from 'react'
// [noteId] wildcard to access Id variable

type Props = {
    // {TODO: What are params?}
    params: {
        noteId: string; // Provided by next.js
    }
}

// Server-component to fetch directly from database and return to client (Browser)
const NotebookPage = async ({params}: Props) => {

  const { noteId } = await params;
  const { userId } = await auth(); // extracts userId if valid authentication
  
  if(!userId) {
    return redirect("/dashboard");
  };

  // Fetch the user from clerk to access name; frontend purposes
  const user = await clerk.users.getUser(userId);

  // Fetch the note from the database
  const notes = await db
    .select() // select all
    .from($notes) // from notes table
    .where( // where noteId and userId match the ones in the database
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
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-gray-300'>
        <div className='max-w-8xl mx-auto sm:p-4'>
            <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex items-center gap-4'>
                <Link href='/dashboard'>
                    <Button className='bg-blue-100 p-5 text-black' size='sm' variant='secondary'>Back</Button>
                </Link>
                <h1 className='text-stone-500 font-semibold'><span className='font-semibold text-black'>{user.firstName} {user.lastName} / </span>{note.name}</h1>
                <div className='ml-auto'>
                    <Button variant='destructive'/>
                </div>
            </div>
            
            <div className='h-4'></div>

            <div className='flex sm:flex-row w-full flex-col gap-4'>
                {/* Display the note content */}
                <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex items-center sm:w-[70%] px-16 py-8'>
                    {/* TipTapEditor Content */}
                    <TipTapEditor note={note} />
                </div>

                {/* Summary Content Section */}
                <Summary note={note} />
            </div>
            
        </div>
    </div>
  )
}

export default NotebookPage;