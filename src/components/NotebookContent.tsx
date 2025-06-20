"use client";
import { NoteType } from '@/lib/db/schema';
import TipTapEditor from '@/components/TipTapEditor';
import Summary from '@/components/Summary';
import { useState } from 'react';
import React from 'react'
import exp from 'constants';


type Props = {note: NoteType;}

const NotebookContent = ({note}: Props) => {
  const [currentEditorState, setCurrentEditorState] = useState<string>(''); // Holds and updates the content of the editor otherwise display note name
  return (
    <div className='flex sm:flex-row w-full flex-col gap-4'>
                {/* Display the note content */}
                <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex items-center sm:w-[70%] px-16 py-8'>
                    {/* TipTapEditor Content */}
                    <TipTapEditor note={note} onEditorStateChange={setCurrentEditorState}/>
                </div>

                {/* Summary Content Section */}
                <Summary note={note} currentEditorState={currentEditorState}/>
    </div>
  )
}

export default NotebookContent;