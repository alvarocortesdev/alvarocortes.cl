import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { health } from "./routes/health"

const app = new Hono()
  // Middleware
  .use("*", logger())
  .use(
    "*",
    cors({
      origin: ["http://localhost:5173", "http://localhost:4173"],
      credentials: true,
    })
  )
  // Routes
  .route("/health", health)
  // Root endpoint
  .get("/", (c) => {
    return c.json({
      message: "Alvaro Cortes API",
      version: "0.0.1",
      docs: "/health",
    })
  })

// Export type for Hono RPC client
export type AppType = typeof app

// Export app for potential serverless deployment
export { app }

// Start server when run directly
const port = Number(process.env.API_PORT) || 3000
console.log(`API server starting on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}
