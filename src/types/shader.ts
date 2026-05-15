export interface ShaderMeta {
  id: string
  title: string
  author: string
  source: string
  textures: Array<{ uniformName: string; filename: string }>
}
