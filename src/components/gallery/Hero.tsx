import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

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
      <a
        href="https://github.com/Zsupi/shader-glow"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'mt-6 inline-flex items-center gap-2 font-mono text-sm',
          'text-[hsl(var(--shader-muted))] transition-colors',
          'hover:text-[hsl(var(--shader-accent))]',
        )}
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
        <span>View project on GitHub</span>
      </a>
    </section>
  )
}

export default Hero
