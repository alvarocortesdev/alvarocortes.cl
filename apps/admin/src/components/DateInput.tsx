import { useState } from 'react'

interface DateInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  error?: string
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

function parseDateInput(input: string): { month: number; year: number } | null {
  // Try "Mar 2023" format
  const match1 = input.match(/^([A-Za-z]{3})\s+(\d{4})$/)
  if (match1) {
    const monthStr = match1[1]
    const yearStr = match1[2]
    if (monthStr && yearStr) {
      const monthIndex = MONTHS.findIndex(
        m => m.toLowerCase() === monthStr.toLowerCase()
      )
      if (monthIndex >= 0) {
        return { month: monthIndex, year: parseInt(yearStr) }
      }
    }
  }

  // Try "2023-03" or "2023-3" format
  const match2 = input.match(/^(\d{4})-(\d{1,2})$/)
  if (match2) {
    const yearStr = match2[1]
    const monthStr = match2[2]
    if (yearStr && monthStr) {
      const month = parseInt(monthStr) - 1
      if (month >= 0 && month <= 11) {
        return { month, year: parseInt(yearStr) }
      }
    }
  }

  return null
}

function formatDate(month: number, year: number): string {
  return `${MONTHS[month]} ${year}`
}

export function DateInput({ value, onChange, label, error }: DateInputProps) {
  const [textInput, setTextInput] = useState(value || '')
  const [showDropdown, setShowDropdown] = useState(false)

  const parsed = parseDateInput(textInput)
  const currentMonth = parsed?.month ?? new Date().getMonth()
  const currentYear = parsed?.year ?? new Date().getFullYear()

  const handleTextChange = (text: string) => {
    setTextInput(text)
    const p = parseDateInput(text)
    if (p) {
      const formatted = formatDate(p.month, p.year)
      onChange(formatted)
    }
  }

  const handleMonthChange = (month: number) => {
    const formatted = formatDate(month, currentYear)
    onChange(formatted)
    setTextInput(formatted)
  }

  const handleYearChange = (year: number) => {
    const formatted = formatDate(currentMonth, year)
    onChange(formatted)
    setTextInput(formatted)
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-neutral-300">
          {label}
        </label>
      )}

      <input
        type="text"
        value={textInput}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="e.g., Mar 2023 or 2023-03"
        className={`w-full bg-neutral-800 border ${
          error ? 'border-red-500' : 'border-neutral-700'
        } rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500`}
      />

      <div className="text-xs text-neutral-500">
        Format: "Mon YYYY" or "YYYY-MM"
      </div>

      {error && (
        <div className="text-xs text-red-400">{error}</div>
      )}

      {showDropdown && (
        <div className="border border-neutral-700 rounded bg-neutral-800 p-3 space-y-3">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Month</label>
            <select
              value={currentMonth}
              onChange={(e) => handleMonthChange(parseInt(e.target.value))}
              className="w-full bg-neutral-700 border border-neutral-600 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500"
            >
              {MONTHS.map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Year</label>
            <input
              type="number"
              value={currentYear}
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
              min="1900"
              max="2100"
              className="w-full bg-neutral-700 border border-neutral-600 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-sm text-blue-400 hover:text-blue-300"
      >
        {showDropdown ? 'Hide' : 'Show'} Date Picker
      </button>
    </div>
  )
}
