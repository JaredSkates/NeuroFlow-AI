// Config for Drizzle Kit (Developer Tool; Helps To View DB and migrate changes)

import { defineConfig } from "drizzle-kit";
// dotenv is used to load environment variables from a .env file into process.env
import * as dotenv from "dotenv";

// Load environment variables from .env file
// This allows us to use process.env.DATABASE_URL in our code, typically .env cant be accessed out of src.
dotenv.config({
    path: '.env',
});

// Config file sets up Drizzle-kit
export default defineConfig({
  dialect: "postgresql", // Indicates the type of DB
  schema: "./src/lib/db/schema.ts", // Path to the schema
  dbCredentials: { // DB Credentials
    url: process.env.DATABASE_URL!, // Note: '!' non-null assertion since it's expected to be defined
  }
});

// Note: Run command 'npx drizzle-kit push' to push changes to the DB