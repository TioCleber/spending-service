import { OriginFunction } from '@fastify/cors'

export const handleCors: OriginFunction = (_origin, cb) => {
  cb(null, true)
}
