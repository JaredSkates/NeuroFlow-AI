'use client';
import React from 'react'
import { Button } from './ui/button'
import { ArrowDownFromLine } from 'lucide-react'
import { NoteType } from '@/lib/db/schema';
import axios from 'axios';
import NoteType from '@/lib/db/schema';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

type Props = { note : NoteType } // Passed from the notebook page

// {TODO: Fix editorState for summary; Not passing updated editorState}
const Summary = ( {note} : Props) => {
  const [summary, setSummary] = React.useState(''); // Holds and updates the content of the summary

  const createSummary = useMutation({
    mutationFn: async () => {
        try{
            const reponse = await axios.post('/api/createSummary', {
                notes: note.editorState, // Send the editor state to the API
            })
            return setSummary(reponse.data.summary);
        } catch(error) {return console.log(error);}
    }
  })
  const handleClick = async () => {
    createSummary.mutate(undefined, {
        onSuccess: (data) => {
            console.log('Summary created successfully');
        },
        onError: (error) => {
            console.error('Error creating summary:', error);
        }
    });
}


  return (
    <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex flex-col sm:w-[30%] lg:h-[700px]'>
        <div className='flex flex-row gap-4 w-full h-[80px]'>
            <h1 className='font-semibold text-2xl text-stone-700'>Summary</h1>
            <Button className='w-4 bg-black hover:bg-blue-300' onClick={handleClick}>
                {createSummary.isPending ? ( // If the mutation is pending, show the loader otherwise default icon
                        <Loader2 className='w-4 h-4 animate-spin'/>
                        ) : <ArrowDownFromLine className='text-white hover:text-black' /> }   
            </Button>
        </div>
        
        <div className='h-full w-full border-2 border-blue-300 rounded-md px-12 py-8'>
            {summary ? ( // Check that it's not empty
            <p className='text-black font-semibold'>{summary}</p> // Display Summary
            ) : (
            <p className='text-stone-400 font-semibold'>No summary generated yet.</p> // Default Message
            )}
        </div>
    </div>
  )
}
export default Summary;