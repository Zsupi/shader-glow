import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { ShaderMeta } from '@/types/shader'

interface Props {
  shader: ShaderMeta | null
  onClose: () => void
}

const ShaderModal = ({ shader, onClose }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t } = useTranslation()

  return (
    <Dialog open={!!shader} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className={cn(
          'flex max-w-none flex-col items-center gap-4 border p-6 sm:rounded-xl',
          'w-[92vw] bg-[hsl(var(--shader-surface))] border-[hsl(var(--shader-border))]',
          'text-[hsl(var(--shader-text))]',
        )}
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{shader?.title ?? ''}</DialogTitle>
        <button
          onClick={onClose}
          aria-label={t('modal.close')}
          className={cn(
            'absolute right-4 top-4 rounded-md p-2 transition-colors',
            'text-[hsl(var(--shader-muted))] hover:text-[hsl(var(--shader-accent-glow))]',
            'hover:bg-[hsl(var(--shader-bg))]',
          )}
        >
          <X className="h-5 w-5" />
        </button>
        {shader && (
          <>
            <div
              className={cn(
                'w-[85vw] max-w-[1600px] overflow-hidden rounded-lg border',
                'border-[hsl(var(--shader-border))] bg-[hsl(var(--shader-bg))]',
              )}
              style={{ height: '75vh', maxHeight: '85vh' }}
            >
              <canvas ref={canvasRef} className="h-full w-full" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">{shader.title}</h2>
              <p className="text-sm text-[hsl(var(--shader-muted))]">
                {t('card.by', { author: shader.author })}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ShaderModal
