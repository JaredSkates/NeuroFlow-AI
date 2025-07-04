'use client';
import { NoteType } from '@/lib/db/schema';
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Text from '@tiptap/extension-text'
import React from 'react'
import TipTapMenu from './TipTapMenu';
import { Button } from './ui/button';
import { useDebounce } from '@/lib/useDebounce';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCompletion } from '@ai-sdk/react';

type Props = { 
  note : NoteType;
  onEditorStateChange?: (editrState: string) => void;
};

const TipTapEditor = ({note, onEditorStateChange} : Props) => {
  const [editorState, setEditorState] = React.useState( note.editorState ||  `<h1>${note.name}</h1>`);  // Holds and updates the content of the editor otherwise display note name

  // useCompletion() allows us to return the completion text from the API
  // 'complete' is a function that an argument, prompt, and is sent to API endpoint, completion is what the API returns and it is a string.
  const { complete, completion} = useCompletion({
    api: '/api/completion', // API endpoint to reach
  })

  // Mutation to save note to the DB
  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/saveNote', {
        noteId: note.id,
        noteContent: debouncedEditorState,
      });
      return response.data; // Return the response data
    },
  })

  
  // TipTap Custom Text Extension For AI Autocomplete, must be defined before the editor
  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        'Shift-Enter': () => {
          // Add your custom action here
          console.log('Shift + Enter pressed');

          // Get the last 30 words
          const prompt = this.editor.getText().split(" ").slice(-30).join(" "); // Get the content of the editor, split by spaces into an array, get the last 30 values in the array, and join them as a string with white spaces.
          
          console.log(prompt); // Test

          // Pass prompt to complete to pass to the API endpoint
          complete(prompt); // AutoComplete function
          
          return true; // Prevent the default behavior
        },
      }
    },
  })

  // Configurations for the editor
  const editor = useEditor({
    autofocus: true, // Immediately focus on the textbox (editor) when loaded
    extensions: [StarterKit, customText], // Extensions for the editor
    content: editorState, // State of the editor
    onUpdate: ({editor}) => { // Event Handler -> When the editor is changed, we update the editorState
        const newEditorState = editor.getHTML();
        setEditorState(newEditorState); // Update the state with the current content of the editor
        onEditorStateChange?.(newEditorState);
    },

  });

  // Update the editorState with the auto completed text dynamically as the API updates completion
  const lastCompletion = React.useRef(''); // A hook that takes an inital value as an arugment and returns a mutable reference. Single property called current which provides inital value.
  React.useEffect(() => {
    if(!completion || !editor) return; // Check if completion or editor is null
    // Prevent old content being re-generated by the AI to insert into the editor
    const diff = completion.slice(lastCompletion.current.length); // Slice at the end of lastCompletion's length to end of string.
    lastCompletion.current = completion; // Update the last completion w/ the added content to completion to avoid duplication
    editor?.commands.insertContent(diff); // Insert the difference into the editor
  }, [completion, editor]) // When the completion or editor changes, run the effect

  // Debounce Save to Database
  const debouncedEditorState = useDebounce(editorState, 500);
  React.useEffect(() => {
    // Save to DB
    console.log(debouncedEditorState); // Test
    if (debouncedEditorState !== '') { // If the editor is empty, do not save for efficiency and optimization
      saveNote.mutate(undefined, {
        onSuccess: (data) => {
          console.log('Note saved successfully');
        },
        onError: (error) => {
          console.error('Error saving note:', error);
        }
      })
    }
  }, [debouncedEditorState]); // Only runs when the debouncedEditorState changes, not on every keystroke
  
  // if(!editor) {console.log('Editor Unsuccessful: NULL');};

  return (
    <div className='w-full h-full'>
      <div className='flex mb-8'>
        {editor && ( // Check that editor exists
          <TipTapMenu editor={editor}/> 
        )}
        <Button disabled variant='outline'>
          {saveNote.isPending ? 'Saving...' : 'Saved'}
        </Button>
      </div>
      {/* prose is a className for a tailwind library to add typography styles; needed for menu bar to work */}
      <div className='prose'>
        {/* Displays the editor state of the notes */}
        <EditorContent editor={editor} /> 

        {/* Future: Add BubbleMenu */}
        {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    
      </div>  

      <div className="h-4"></div>

      {/* Tip for the user */}
      <span className="text-sm">
        Tip: Press {' '}
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
          Shift + Enter
        </kbd>
        {" "} for AI autocomplete
      </span>
    </div>

  )
}

export default TipTapEditor;

