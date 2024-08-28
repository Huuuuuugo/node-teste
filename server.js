import { fastify } from 'fastify'
// import { DataBase } from './database-memory.js'
import { DataBase } from "./database-postgres.js";


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
server.post('/user', async (request, response) => {
  const body = request.body

  const status = await database.create(body)

  return response.status(status).send()
})

// route to update user info
server.put('/user/:id', (request, response) => {
  const id = request.params.id
  const body = request.body

  const status = database.update(id, body)

  return response.status(status).send()
})

// route to delete user info
server.delete('/user/:id', async (request, response) => {
  const id = request.params.id

  const status = await database.delete(id)
  
  return response.status(status).send()
})

// route to list registered users
server.get('/user', async (request, response) => {
  const filter = request.query.filter

  return await database.list(filter)
})

// start listenning to the port
// TODO: why port must be a dictionary instead a number?
server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333
})