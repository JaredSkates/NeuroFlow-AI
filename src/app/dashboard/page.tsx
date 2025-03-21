import CreateNoteDialog from '@/components/CreateNoteDialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserButton } from '@clerk/nextjs';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import {$notes} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import Image from 'next/image';

type Props = {}

const DashboardPage = async (props: Props) => {
  const {userId} = await auth();
  if(!userId) {
    return redirect('/sign-in'); // Redirect to sign-in if user is not authenticated
  }  

  const notes = await db.select().from($notes).where(eq($notes.userId, userId)).orderBy($notes.createdAt); // Fetch all notes from the db for the logged-in user, ordered by created date.
  
  return (
    <>
        <div className='bg-gradient-to-br min-h-screen from-blue-50 to-gray-300'>
            <h1 className='sm:hidden md:inline absolute top-5 left-10 text-2xl font-bold text-black'>NeuroFlow AI</h1>
            <div className='max-w-7xl mx-auto p-10'>
                <div className="h-14"></div>
                {/* Flex:Row on Screens larger than 768px and Columns on smaller devices */}
                <div className='flex justify-center items-center md:flex-row flex-col'>
                    <div className='flex items-center gap-[16px] mr-5'>
                        <Link href='/'>
                            <Button className='cursor-pointer' size='sm'>
                                <ArrowLeft className='strokeWidth={3} w-4 h-4'></ArrowLeft>
                                Back
                            </Button>
                        </Link>
                        <h1 className='text-3xl font-bold text-gray-800'>My Notes</h1>
                        <UserButton/>
                    </div>
                </div>

                <div className="h-8"></div>

                <Separator className='bg-black'/>

                <div className="h-8"></div>

                {/* Lists All The Notes Here + Conditionally Render */} 
                {notes.length === 0 && (
                    <div className='text-center'>
                        <h2 className='font-semibold'>No Existing Notes.</h2>
                        <div className="h-4"></div>
                    </div>
                )}

                {/* Display all notes */}
                <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3'>
                    <CreateNoteDialog/>
                    {notes.map((note) => {
                        return (
                            <a href={`/notebook/${note.id}`} key={note.id}>
                                <div className='overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1 rounded-lg border-3 border-black'>
                                    <Image className='border-b-3 border-black' width={400} height={200} alt={note.name} src={ note.imageUrl || ''}/>
                                    <div className='h-4'></div>
                                    {/* Fetch the createdAt date & convert to string */}
                                    <p className='text-sm text-center font-semibold'>{note.createdAt.toLocaleDateString()}</p>
                                    
                                    <div className='h-2'></div>
                                    {/* Display the note name */}
                                    <h3 className='text-xl font-bold text-center'>{note.name}</h3>
                                </div>
                            </a>
                        )
                    })}
                </div>

            </div>
        </div>
    </>
  )
}

export default DashboardPage;