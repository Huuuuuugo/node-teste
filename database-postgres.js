import { sql } from "./db.js";
import validator from "validator";

function hasExactKeys(obj, expectedKeys) {
  const expected_keys = new Set(expectedKeys)
  const obj_keys = new Set(Object.keys(obj))

  if (obj_keys.size != expected_keys.size) {
    return false
  }

  for (const key of expected_keys) {
    if (!obj_keys.has(key)) {
      return false
    }
  }

  return true
}

export class DataBase {
  #entries = new Map()

  async list(filter = '') {
    // apply filter and return results
    return await sql`SELECT * FROM usuarios
        WHERE nome ILIKE ${'%'+filter+'%'}`
  }

  async create(user_data) {
    const expected_keys = ['email', 'senha', 'nome', 'altura', 'idade', 'peso']

    // check if data contains exactly the expected keys
    if (!hasExactKeys(user_data, expected_keys)) {
      return 400
    }

    // check if email is valid
    if (!validator.isEmail(user_data.email)) {
      return 400
    }

    // hash pasword

    // insert entry on table
    // if pk is not unique automaticaly returns 500 status code
    await sql`
      INSERT INTO usuarios (email, senha, nome, idade, altura, peso)
      VALUES (
        ${user_data.email},
        ${user_data.senha},
        ${user_data.nome},
        ${user_data.idade},
        ${user_data.altura},
        ${user_data.peso}
        )`

    return 201
  }

  update(id, value) {
    // set default response status code in case the given id does not match any entry
    let status = 404

    // for each entry id (stored as key) inside entries, check if it matches the given id
    for (const key of this.#entries.keys()) {
        // if there's a match, update the entry and response status code
        if (key == id) {
            const entry = this.#entries.get(id)
            const new_entry = {...entry, ...value}
            this.#entries.set(id, new_entry)

            status = 204
            break
        }
    }

    return status
  }

  async delete(id) {
    await sql`
    DELETE FROM usuarios 
    WHERE id = ${id}`

    return 204
  }
}