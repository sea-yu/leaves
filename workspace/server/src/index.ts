import { serve } from '@hono/node-server'
import app from './app'
import env from './lib/env'

serve({
  fetch: app.fetch,
  port: Number(env.PORT),
}, (info) => {
  console.log(`Server is running on port ${info.port}`)
})
