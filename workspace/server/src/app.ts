import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { compress } from 'hono/compress'
import { logger as httpLogger } from 'hono/logger';
import { trimTrailingSlash } from 'hono/trailing-slash'
import { prettyJSON } from 'hono/pretty-json'

import routers from './routers'
const app = new Hono()

app.use(cors())
  .use(trimTrailingSlash())
  .use(prettyJSON())
  .use(compress())
  .use(httpLogger())
  .route('/', routers)

export default app
