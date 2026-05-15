import ShaderCard from './ShaderCard'
import type { ShaderMeta } from '@/types/shader'

interface Props {
  shaders: ShaderMeta[]
  onOpen: (s: ShaderMeta) => void
}

const ShaderGrid = ({ shaders, onOpen }: Props) => (
  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-3">
    {shaders.map((s) => (
      <ShaderCard key={s.id} shader={s} onOpen={onOpen} />
    ))}
  </div>
)

export default ShaderGrid
