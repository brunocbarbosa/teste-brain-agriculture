import fastify from 'fastify'
import { ZodError } from 'zod'

export const app = fastify()

app.setErrorHandler((error, _req, rep) => {
  if (error instanceof ZodError) {
    return rep
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  return rep.status(500).send({ message: 'Internal server error' })
})
