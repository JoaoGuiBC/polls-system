import z from 'zod'
import type { FastifyInstance } from 'fastify'

import { voting } from '@/utils/voting-pub-sub'

export async function pollResults(app: FastifyInstance) {
  app.get(
    '/polls/:pollId/results',
    { websocket: true },
    (connetion, request) => {
      const getPollParams = z.object({
        pollId: z.string().uuid(),
      })

      const { pollId } = getPollParams.parse(request.params)

      voting.subscribe(pollId, (message) => {
        connetion.socket.send(JSON.stringify(message))
      })
    },
  )
}
