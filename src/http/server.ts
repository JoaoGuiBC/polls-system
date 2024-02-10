import fastify from 'fastify'
import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket'

import { getPoll } from './routes/get-poll'
import { createPoll } from './routes/create-poll'
import { voteOnPoll } from './routes/vote-on-poll'

import { pollResults } from './ws/poll-results'

const app = fastify()

app.register(cookie, {
  secret: 'polls-app-secret',
  hook: 'onRequest',
})

app.register(websocket)

// HTTP routes
app.register(getPoll)
app.register(voteOnPoll)
app.register(createPoll)

// WS routes
app.register(pollResults)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running')
})
