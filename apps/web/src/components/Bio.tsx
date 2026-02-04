import { useTranslation } from "../i18n/useTranslation"

export function Bio() {
  const { t } = useTranslation()

  return (
    <section className="pt-2 pb-24 md:pt-4 md:pb-28">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="max-w-xl md:max-w-3xl mx-auto text-center">
          <div className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed space-y-4">
            <p>{t('bio.p1')}</p>
            <p>{t('bio.p2')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
