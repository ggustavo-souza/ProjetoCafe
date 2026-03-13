import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'error';

const client = postgres(connectionString);

if(connectionString === 'error') {
  console.error('O banco de dados não possui uma URL válida');
  process.exit(1);
}

export const db = drizzle(client);