import postgres from 'postgres';
import * as schema from './schema.js';
import { drizzle } from 'drizzle-orm/postgres-js';

const client = postgres(process.env.DATABASE_URL || '');
const db = drizzle(client, { schema });

export { client, db };
