import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { cors } from 'hono/cors'

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://alvarocortes.cl',
  'https://admin.alvarocortes.cl',
]

const app = new Hono()
  .use(
    '*',
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  )
  .get('/', (c) => {
    return c.json({
      message: 'Alvaro Cortes API',
      version: '0.0.1',
      status: 'ok',
    })
  })
  .get('/health', (c) => {
    return c.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

const handler = handle(app)

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
export const PATCH = handler
