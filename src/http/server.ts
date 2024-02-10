import fastify from 'fastify'

import { getPoll } from './routes/get-poll'
import { createPoll } from './routes/create-poll'

const app = fastify()

app.register(getPoll)
app.register(createPoll)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running')
})
