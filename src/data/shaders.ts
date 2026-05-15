import type { ShaderMeta } from '@/types/shader'

export const shaders: ShaderMeta[] = [
  {
    id: 'plasma-wave',
    title: 'Plasma Wave',
    author: 'Ada Lumen',
    source: '',
    textures: [{ uniformName: 'u_texture_noise', filename: 'noise.png' }],
  },
  {
    id: 'voronoi-cells',
    title: 'Voronoi Cells',
    author: 'Kai Voss',
    source: '',
    textures: [],
  },
  {
    id: 'metaballs',
    title: 'Metaballs',
    author: 'Mira Stark',
    source: '',
    textures: [{ uniformName: 'u_texture_grad', filename: 'gradient.png' }],
  },
]