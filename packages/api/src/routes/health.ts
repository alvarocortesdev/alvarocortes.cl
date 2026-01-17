import { Hono } from "hono"

const health = new Hono()
  .get("/", (c) => {
    return c.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "alvarocortes-api",
    })
  })

export { health }
