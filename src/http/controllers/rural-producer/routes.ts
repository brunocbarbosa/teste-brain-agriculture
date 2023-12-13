import { FastifyInstance } from 'fastify'
import { register } from './register'
import { edit } from './edit'
import { erase } from './erase'

export async function ruralProducerRoutes(app: FastifyInstance) {
  app.post('/rural-producer', register)
  app.put('/rural-producer/:ruralProducerId', edit)
  app.delete('/rural-producer/:ruralProducerId', erase)
}
