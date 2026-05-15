import { useTranslation } from 'react-i18next'
import { Github } from 'lucide-react'
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
        <Github className="h-4 w-4" />
        <span>View project on GitHub</span>
      </a>
    </section>
  )
}

export default Hero
