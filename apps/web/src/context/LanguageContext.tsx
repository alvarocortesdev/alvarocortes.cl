import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type Lang = 'es' | 'en'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
}

const STORAGE_KEY = 'lang-preference'

function getLangPreference(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'es' || stored === 'en') return stored
  return 'es'
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getLangPreference)

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext)
