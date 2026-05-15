import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()
  return (
    <section className="px-6 py-16 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-[hsl(var(--shader-accent))]">
        {t('app.title')}
      </p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-[hsl(var(--shader-text))] sm:text-5xl">
        {t('app.tagline')}
      </h2>
    </section>
  )
}

export default Hero
