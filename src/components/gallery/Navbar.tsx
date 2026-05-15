import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const { t } = useTranslation()
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex items-center justify-between',
        'border-b border-[hsl(var(--shader-border))] bg-[hsl(var(--shader-bg))]/80',
        'px-6 py-4 backdrop-blur-md',
      )}
    >
      <h1 className="text-lg font-bold tracking-tight text-[hsl(var(--shader-text))]">
        <span className="text-[hsl(var(--shader-accent))]">{'// '}</span>
        {t('app.title')}
      </h1>
      <button
        onClick={() => setDark((d) => !d)}
        aria-label={t('nav.toggleTheme')}
        className={cn(
          'rounded-md border p-2 transition-colors',
          'border-[hsl(var(--shader-border))] text-[hsl(var(--shader-muted))]',
          'hover:border-[hsl(var(--shader-accent))] hover:text-[hsl(var(--shader-accent-glow))]',
        )}
      >
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </header>
  )
}

export default Navbar
