import { useState } from 'react'

import Hero from '@/components/gallery/Hero'
import Navbar from '@/components/gallery/Navbar'
import ShaderGrid from '@/components/gallery/ShaderGrid'
import ShaderModal from '@/components/gallery/ShaderModal'
import { shaders } from '@/data/shaders'
import type { ShaderMeta } from '@/types/shader'

const App = () => {
  const [active, setActive] = useState<ShaderMeta | null>(null)
  return (
    <div className="min-h-screen bg-[hsl(var(--shader-bg))] text-[hsl(var(--shader-text))]">
      <Navbar />
      <Hero />
      <ShaderGrid shaders={shaders} onOpen={setActive} />
      <ShaderModal
        shader={active}
        onClose={() => {
          setActive(null)
        }}
      />
    </div>
  )
}

export default App
