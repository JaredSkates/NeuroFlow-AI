'use client';
import { Loader2, Plus } from 'lucide-react';
import { Dialog, DialogHeader, DialogTrigger } from './ui/dialog';
import React from 'react'
import { DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'; // useRouter is a hook that allows us to programmatically navigate to a different page

type Props = {}

const CreateNoteDialog = (props: Props) => {
  const router = useRouter();  // Navigate to a new page
  // State to hold the input value, 'setInput' updates 'input'
  // [state, setState]  
  const [input, setInput] = React.useState('');

  // TODO: Learn axios, useMutation, DOM Manipulation
  // useMutation is a hook that allows us to perform mutations (create, update, delete) on the server
  const createNotebook = useMutation({
    // Mutation function to create a new notebook
    // Useful for mutations such as creating, updating, or deleting data on the server
    mutationFn: async() => {
        // Sends a POST request to the endpoint to create a new notebook
        const response = await axios.post('/api/createNoteBook', { // axios helps to send data to endpoint
            // 'input' is the name of the notebook
            name: input, // Data/req that gets passed into the API endpoint
        });
        // Return the data from the POST request
        return response.data; // Returns note_id
    } 
  })

  // When you click 'create' button, it will call this function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(input === '') {
        window.alert('Please enter a name for your notebook');
        return;
    }

    // Trigger the mutation function to create a new notebook using mutate()
    // 'undefined' is the argument for the mutation function, we don't need to pass anything
    createNotebook.mutate(undefined, {
        onSuccess: ({note_id}) => { // onSuccess is an callback function when a mutation is successful
            // Test: the JSON response from the endpoint is returned here
            console.log('Notebook created successfully: ', {note_id} );
            router.push(`/notebook/${note_id}`) // Navigate to the new notebook page
        },
        onError: error => {
            console.error(error);
            window.alert("Failed To Create")
        }
    });
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
                {/* Bind the input field's value into the state: 'input' , 'setInput' updates the value */}
                {/* e: event, holds information when onChange occurs provided by React, w/o onChange we can't type in the field. */}
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder='NoteBook Name'></Input>
                
                <div className="h-4"></div>
                <div className="flex items-center gap-2">
                    <Button type='reset' variant='secondary'>Cancel</Button>
                    <Button type='submit' className='bg-blue-300' disabled={createNotebook.isPending}>
                        {createNotebook.isPending && ( // If the mutation is pending, show the loader
                            <Loader2 className='w-4 h-4 mr-2 animate-spin'/>
                        )}
                        Create
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog;