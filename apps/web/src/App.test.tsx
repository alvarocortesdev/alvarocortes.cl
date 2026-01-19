import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { App } from "./App"

describe("App", () => {
  it("renders the main heading", () => {
    render(<App />)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Alvaro Cortes"
    )
  })

  it("shows job title", () => {
    render(<App />)
    expect(screen.getByText(/Full Stack Developer/i)).toBeInTheDocument()
  })
})
