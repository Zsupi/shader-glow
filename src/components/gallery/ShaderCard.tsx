import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ShaderMeta } from '@/types/shader'

interface Props {
  shader: ShaderMeta
  onOpen: (s: ShaderMeta) => void
}

const ShaderCard = ({ shader, onOpen }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t } = useTranslation()

  return (
    <Card
      onClick={() => onOpen(shader)}
      className={cn(
        'group cursor-pointer overflow-hidden rounded-xl border p-0 transition-all duration-300',
        'bg-[hsl(var(--shader-surface))] border-[hsl(var(--shader-border))]',
        'hover:border-[hsl(var(--shader-accent))]',
        'hover:shadow-[0_0_24px_-4px_hsl(var(--shader-accent-glow)/0.55)]',
      )}
    >
      <div className="relative aspect-video w-full bg-[hsl(var(--shader-bg))]">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
      <div className="space-y-2 p-4">
        <h3 className="text-base font-semibold text-[hsl(var(--shader-text))]">
          {shader.title}
        </h3>
        <p className="text-xs text-[hsl(var(--shader-muted))]">
          {t('card.by', { author: shader.author })}
        </p>
        {shader.textures.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {shader.textures.map((tex) => (
              <Badge
                key={tex.uniformName}
                variant="outline"
                className={cn(
                  'border-[hsl(var(--shader-border))] bg-transparent',
                  'text-[10px] font-mono text-[hsl(var(--shader-accent))]',
                )}
              >
                {tex.filename}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

export default ShaderCard