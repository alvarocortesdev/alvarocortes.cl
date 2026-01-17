import { describe, it, expect } from "vitest"
import { health } from "./health"

describe("Health endpoint", () => {
  it("returns status ok", async () => {
    const res = await health.request("/")
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.status).toBe("ok")
    expect(json.service).toBe("alvarocortes-api")
  })

  it("includes timestamp", async () => {
    const res = await health.request("/")
    const json = await res.json()

    expect(json.timestamp).toBeDefined()
    expect(new Date(json.timestamp)).toBeInstanceOf(Date)
  })
})
