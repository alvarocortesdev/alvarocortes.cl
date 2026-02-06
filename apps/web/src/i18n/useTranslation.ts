import { useLanguage } from '../context/LanguageContext'
import translations, { type TranslationKey } from './translations'

export function useTranslation() {
  const { lang } = useLanguage()

  function t(key: TranslationKey, params?: Record<string, string | number>): string {
    let value: string = translations[lang][key] ?? translations.es[key] ?? key
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replace(`{${k}}`, String(v))
      }
    }
    return value
  }

  return { t }
}

/**
 * Returns the localized version of a field from a database object.
 * If lang is 'en' and `obj[field + '_en']` exists, returns that.
 * Otherwise falls back to `obj[field]`.
 */
export function localized<T extends object>(
  obj: T,
  field: string,
  lang: 'es' | 'en'
): string {
  const record = obj as Record<string, unknown>
  if (lang === 'en') {
    const enField = `${field}_en`
    const enValue = record[enField]
    if (enValue && typeof enValue === 'string' && enValue.trim()) {
      return enValue
    }
  }
  const value = record[field]
  return typeof value === 'string' ? value : ''
}

/**
 * Parses a timeline period stored as "Mon YYYY" (English 3-letter month)
 * and returns it formatted for the given locale.
 */
const EN_MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
}

export function localizedPeriod(period: string, lang: 'es' | 'en'): string {
  if (lang === 'en') return period
  const locale = 'es-CL'
  return period.replace(/\b([A-Za-z]{3})\s+(\d{4})\b/g, (_match, mon: string, year: string) => {
    const monthIndex = EN_MONTHS[mon.toLowerCase()]
    if (monthIndex === undefined) return _match
    const date = new Date(parseInt(year), monthIndex, 1)
    const monthName = date.toLocaleString(locale, { month: 'short' })
    // Capitalize first letter
    const capitalized = monthName.charAt(0).toUpperCase() + monthName.slice(1).replace(/\.$/, '')
    return `${capitalized} ${year}`
  })
}
