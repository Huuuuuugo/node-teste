import { fastify } from 'fastify'


// create server
const server = fastify()

// create a default route
// the route is identified by the first string inside server.get()
// the given function will run whenever that route is included on the address
// '/' means the default address (when no route is given)
server.get('/', () => {
    return 'Hello World!'
})

// create a 'hello' route
server.get('/hello', () => {
    return "Hello from the /hello route!"
})

// start listenning to the port
// TODO: whay port must be a dictionary instead a number?
server.listen({
    port: 3333
})