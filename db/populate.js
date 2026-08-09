#! /usr/bin/env node
require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS posted_messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  added TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO posted_messages (text, username)
VALUES
  ('Wagwan g, you coming college today or nah?', 'Amando'),
  ('Yeah man, leaving in 10 minutes', 'Bryan'),
  ('Anyone got notes from last week''s lecture?', 'Odin'),
  ('Ngl I''m still in bed lol', 'Damon'),
  ('Bet, see you outside the library', 'Amando');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();