import { fastify } from 'fastify'
import { DataBase } from './database-memory.js'


// create server
const server = fastify()
const database = new DataBase()


// create a default route
// the route is identified by the first string inside server.get()
// the given function will run whenever that route is included on the address
// '/' means the default address (when no route is given)
server.get('/', () => {
    return 'Hello World!'
})

// route to register a user
server.post('/user', (request, response) => {
    const body = request.body

    database.create(
        body
    )

    return response.status(201).send()
})

// route to update user info
server.put('/user/:id', (request, response) => {
    const id = request.params.id
    const body = request.body

    const status = database.update(id, body)

    return response.status(status).send()
})

// route to delete user info
server.delete('/user/:id', (request, response) => {
    const id = request.params.id

    database.delete(id)
    
    return response.status(204).send()
})

// route to list registered users
server.get('/user', () => {
    return database.list()
})

// start listenning to the port
// TODO: why port must be a dictionary instead a number?
server.listen({
    port: 3333
})