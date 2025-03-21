"use client";
import { NoteType } from '@/lib/db/schema'
import React from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { Trash2 } from 'lucide-react';

type Props = {note: NoteType}

// Since the noteId never changes, we can use a client component to delete the note
export const DeleteButton = ( {note} : Props) => {
  const handleSubmit = async () => {
    const confirm = window.confirm("Are you sure you want to delete this note?") // Confirm deletion
    if(confirm === true) {
        const response = await axios.post('/api/deleteNote', {
            noteId: note.id,
        });
        if(response.data) {
            return redirect("/dashboard") // Redirect to the dashboard after deletion
        }
    }
    return;
  }  
  return (
    <Button className='hover:bg-black' onClick={handleSubmit} variant='destructive'>
        <Trash2 />
    </Button>
  )
}