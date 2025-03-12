import { createClerkClient } from "@clerk/backend"; // from npm package

// Clerk client to access the backend (Ex: name, email, etc)
export const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

