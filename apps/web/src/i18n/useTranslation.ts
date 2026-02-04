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
export function localized<T extends Record<string, unknown>>(
  obj: T,
  field: string,
  lang: 'es' | 'en'
): string {
  if (lang === 'en') {
    const enField = `${field}_en`
    const enValue = obj[enField]
    if (enValue && typeof enValue === 'string' && enValue.trim()) {
      return enValue
    }
  }
  const value = obj[field]
  return typeof value === 'string' ? value : ''
}
