// Drizzle Configuration to initialize our drizzle object

import {neon, neonConfig} from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// cache all connections, so it doesn't have to create a new connection for each request (reload page)
neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
};

// Create a new instance of the database connection
const sql = neon(process.env.DATABASE_URL);

//Initializes the ORM which allows us to interact w/ the DB using ORM's API
// Ex: db.select().from(users).where(eq(users.id, 1)); -> How we interact
export const db = drizzle(sql);