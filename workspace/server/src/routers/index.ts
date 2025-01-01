import { Hono } from 'hono'
import Response from '../model/response'

const routers = new Hono()

export default routers
  .get('/', (c) => c.json(Response.OK('pong')))
