import { sql } from "./db.js";
import { randomUUID } from "node:crypto";

// sql`DROP TABLE IF EXISTS usuarioS`.then(() => {
//   console.log('dropped!')
// })

sql`
  CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(8) NOT NULL,
    nome TEXT NOT NULL,
    idade INT NOT NULL,
    altura FLOAT NOT NULL,
    peso FLOAT NOT NULL

    CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
  )`.then(() => {
    console.log("created!")
  })