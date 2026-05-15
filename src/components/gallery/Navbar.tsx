import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Github, Linkedin } from 'lucide-react'
import { cn } from '@/lib/utils'
import i18n from '@/i18n'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
                onClick={() => i18n.changeLanguage(lang.code)}
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
          <Github className="h-4 w-4" />
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
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </header>
  )
}

export default Navbar
