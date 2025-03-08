// Define Schema -> tables & columns for DB

// For defining our table
import {pgTable, serial, text, timestamp} from 'drizzle-orm/pg-core';

// 'notes' is our table name + configurations
export const $notes = pgTable('notes', {
    id: serial('id').primaryKey(), // auto-incrementing integer, unique identifier for each note
    name: text('name').notNull(), // text column for the note's name, cannot be null
    createdAt: timestamp('created_at').notNull().defaultNow(), // timestamp column for when the note was created, cannot be null, defaults to the current time
    imageUrl: text('image_url'), // text column for DALL-E image url
    userId: text('user_id').notNull(), // Determines which user created the note
    editorState: text('editor_state'), // Saves the notes content
});

// Typescript Type for postgres table ensuring type safety when working with data from the DB. 
// Useful for UI components, API routes, and typescript definitions
export type NoteType = typeof $notes.$inferSelect;