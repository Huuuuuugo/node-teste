import { sql } from "./db.js";

sql`
  CREATE TABLE usuario (
    id TEXT PRIMARY KEY,
    nome TEXT,
    idade INT,
    altura FLOAT,
    peso FLOAT
  )`.then(() => {
    console.log("created!")
  })