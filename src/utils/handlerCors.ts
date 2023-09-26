import { OriginFunction } from '@fastify/cors'

export const handleCors: OriginFunction = (origin, cb) => {
  const hostname = origin && new URL(origin).hostname

  if (hostname === 'localhost' || !hostname) {
    cb(null, true)

    return
  }

  cb(new Error('Not allowed'), false)
}
