'use client';
import { NoteType } from '@/lib/db/schema';
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import TipTapMenu from './TipTapMenu';
import { Button } from './ui/button';
import { useDebounce } from '@/lib/useDebounce';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Props = { note : NoteType};

const TipTapEditor = ({note} : Props) => {
  const [editorState, setEditorState] = React.useState( note.editorState ||  `<h1>${note.name}</h1>`);  // Holds and updates the content of the editor otherwise display note name

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

  // Configurations for the editor
  const editor = useEditor({
    autofocus: true, // Immediately focus on the textbox (editor) when loaded
    extensions: [StarterKit], // Extensions for the editor
    content: editorState, // State of the editor
    onUpdate: ({editor}) => { // Event Handler -> When the editor is changed, we update the editorState
        setEditorState(editor.getHTML()); // Update the state with the current content of the editor
    },

  });

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
  }, [debouncedEditorState]);

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
          Shift + A
        </kbd>
        {" "} for AI autocomplete
      </span>
    </div>

  )
}

export default TipTapEditor;

