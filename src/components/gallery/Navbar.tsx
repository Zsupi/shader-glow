import { Globe } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import i18n from '@/i18n'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hu', label: 'Magyar' },
  { code: 'de', label: 'Deutsch' },
]

const Navbar = () => {
  const { t } = useTranslation()

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

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
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="Select language"
              className={cn(
                'rounded-md border p-2 transition-colors',
                'border-[hsl(var(--shader-border))] text-[hsl(var(--shader-muted))]',
                'hover:border-[hsl(var(--shader-accent))] hover:text-[hsl(var(--shader-accent-glow))]',
              )}
            >
              <Globe className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-[hsl(var(--shader-border))] bg-[hsl(var(--shader-surface))] text-[hsl(var(--shader-text))]"
          >
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => void i18n.changeLanguage(lang.code)}
                className="cursor-pointer hover:bg-[hsl(var(--shader-border))] focus:bg-[hsl(var(--shader-border))] focus:text-[hsl(var(--shader-text))] data-[highlighted]:bg-[hsl(var(--shader-border))]"
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <a
          href="https://github.com/Zsupi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className={cn(
            'rounded-md border p-2 transition-colors',
            'border-[hsl(var(--shader-border))] text-[hsl(var(--shader-muted))]',
            'hover:border-[hsl(var(--shader-accent))] hover:text-[hsl(var(--shader-accent-glow))]',
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
        </a>

        <a
          href="https://www.linkedin.com/in/botond-n%C3%A9meth/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className={cn(
            'rounded-md border p-2 transition-colors',
            'border-[hsl(var(--shader-border))] text-[hsl(var(--shader-muted))]',
            'hover:border-[hsl(var(--shader-accent))] hover:text-[hsl(var(--shader-accent-glow))]',
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
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      </div>
    </header>
  )
}

export default Navbar
