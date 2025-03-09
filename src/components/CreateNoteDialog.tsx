'use client';
import { Plus } from 'lucide-react';
import { Dialog, DialogHeader, DialogTrigger } from './ui/dialog';
import React from 'react'
import { DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

type Props = {}

const CreateNoteDialog = (props: Props) => {

  // State to hold the input value, 'setInput' updates 'input'
  // [state, setState]  
  const [input, setInput] = React.useState('');

  // TODO: Learn axios, useMutation, DOM Manipulation
  const createNotebook = useMutation({
    mutationFn: async() => {
        const response = await axios.post('/api/createNoteBook', {
            name: input,
        });
        return response.data;
    } 
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(input === '') {
        window.alert('Please enter a name for your notebook');
        return;
    }

    createNotebook.mutate(undefined);
  }; 
  
  return (
    <Dialog>
        <DialogTrigger>
            <div className='border-dashed border-2 border-blue-300 h-full flex rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row gap-2 p-4'>
                <Plus className='w-6 h-6 text-blue-300' strokeWidth={3}></Plus>
                <h2 className='font-semibold text-blue-300 sm:mt-2'>New Note Book</h2>
            </div>
        </DialogTrigger>

        <DialogContent>
            {/* PopUp To Create New Note */}
            <DialogHeader className='flex items-center'>
                <DialogTitle>
                    Create A New Note
                </DialogTitle>
                <DialogDescription>
                    Create A New Note By Clicking The Button Below
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                {/* Bind the value into the state: 'input' , 'setInput' updates the value */}
                {/* e: event, holds information when onChange occurs provided by React. */}
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder='NoteBook Name'></Input>
                
                <div className="h-4"></div>
                <div className="flex items-center gap-2">
                    <Button type='reset' variant='secondary'>Cancel</Button>
                    <Button type='submit' className='bg-blue-300'>Create</Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog;