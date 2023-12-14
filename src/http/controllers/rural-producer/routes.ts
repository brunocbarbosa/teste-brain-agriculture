import { FastifyInstance } from 'fastify'
import { register } from './register'
import { edit } from './edit'
import { erase } from './erase'
import { getInfos } from './get-infos'

export async function ruralProducerRoutes(app: FastifyInstance) {
  app.post('/rural-producer', register)
  app.patch('/rural-producer/:ruralProducerId', edit)
  app.delete('/rural-producer/:ruralProducerId', erase)
  app.get('/rural-producer', getInfos)
}
