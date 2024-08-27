import { randomUUID } from "node:crypto";


export class DataBase {
    #entries = new Map()

    list(filter = '') {
        // apply filter
        let inputArray = []
        if (filter) {
            inputArray = Array.from(this.#entries.entries()).filter((entriesArray) => {
                if (entriesArray[1].nome.includes(filter)) {
                    return true
                }
            })
        }
        else {
            inputArray = Array.from(this.#entries)
        }

        // return an array of objects
        return inputArray.map((entriesArray) => {
            const id = entriesArray[0]
            const values = entriesArray[1]


            return {
                id: id,
                ...values
            }
        })

        // // return object where id is the key and the entry is the value
        // const entries_obj = {}
        // console.log(this.#entries)
        // for (const [key, value] of this.#entries) {
        //     console.log(key, value)
        //     entries_obj[key] = value
        // }
        // return entries_obj
    }

    create(user_data) {
        const id = randomUUID()

        this.#entries.set(id, user_data)
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

        // return the response status code
        return status
    }

    delete(id) {
        this.#entries.delete(id)
    }
}