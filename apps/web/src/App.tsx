import { VERSION } from "@alvarocortes/shared"

export function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Alvaro Cortes</h1>
        <p className="text-neutral-400">Portfolio en construccion</p>
        <p className="text-sm text-neutral-600 mt-4">v{VERSION}</p>
      </div>
    </div>
  )
}
