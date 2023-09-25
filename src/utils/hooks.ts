import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ApplicationHook, LifecycleHook } from 'fastify/types/hooks'
import auth from '../middlewares/auth'

export function addNewHook(
  instance: FastifyInstance,
  hook: ApplicationHook | LifecycleHook
) {
  return instance.addHook(
    hook,
    (req: FastifyRequest, reply: FastifyReply, done: () => void) => {
      auth.authentication(req, reply, done)
    }
  )
}
