# Shader Framework Implementation Plan

## Overview

A browser-based shader rendering framework built on **R3F (React Three Fiber) + drei**, integrated into the existing shader-glow gallery. Each shader project is a self-contained folder with a fragment shader, config file, and optional assets. The framework provides glsl-canvas-compatible built-in uniforms and a shared fullscreen quad vertex shader.

---

## 1. Project Structure

```
public/assets/shaders/
  01_Blobs/
    config.json
    blob.frag
  02_Planet/
    config.json
    planet.frag
    texture.png              # optional textures live alongside

src/
  shaders/
    fullscreen-quad.vert     # shared vertex shader (raw GLSL)
  engine/
    types.ts                 # ShaderProject, ShaderConfig types
    use-shader-registry.ts   # discovers & loads all projects via import.meta.glob
    use-shader-uniforms.ts   # manages built-in uniforms (time, mouse, resolution, etc.)
    ShaderCanvas.tsx          # R3F canvas that renders a single shader
    ShaderMaterial.tsx        # custom shaderMaterial with uniform injection
  components/gallery/
    ...                      # existing gallery components wired to real shader data
```

---

## 2. Config Schema

Each shader project contains a `config.json`:

```json
{
  "name": "Blobs",
  "shader": "blob.frag",
  "textures": {
    "0": "texture.png",
    "1": "normal_map.png"
  },
  "uniforms": {
    "u_speed": { "type": "float", "value": 1.0 },
    "u_color": { "type": "vec3", "value": [0.1, 0.5, 0.8] }
  }
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Display name for the gallery |
| `shader` | Yes | Filename of the fragment shader in the same folder |
| `textures` | No | Slot-to-filename mapping. Injected as `u_texture_0`, `u_texture_1`, etc. |
| `uniforms` | No | Custom uniforms with type + default value. Supports `float`, `vec2`, `vec3`, `vec4` |

The schema is designed for extension: future fields (e.g., `author`, `description`, `tags`) can be added without breaking existing configs.

---

## 3. Built-in Uniforms & Attributes

Matching the glsl-canvas extension, these are injected automatically into every shader.

### Uniforms

| Type | Name | Source |
|------|------|--------|
| `vec2` | `u_resolution` | Canvas size, updated on resize |
| `float` | `u_time` | Elapsed seconds from R3F `useFrame` clock |
| `vec2` | `u_mouse` | Normalized mouse position over canvas |
| `vec3` | `u_camera` | Orbital camera position |
| `vec2[10]` | `u_trails` | Mouse trail positions with inertia (ring buffer) |

### Attributes

Provided by the fullscreen quad geometry:

| Type | Name | Description |
|------|------|-------------|
| `vec4` | `a_position` | Vertex position (quad corners in clip space) |
| `vec4` | `a_normal` | Vertex normal (all face forward: 0, 0, 1) |
| `vec2` | `a_texcoord` | UV coordinates (0-1) |
| `vec4` | `a_color` | Vertex color (white default) |

---

## 4. Shared Vertex Shader

A minimal fullscreen quad pass-through. Every shader project uses this same vertex shader; all drawing happens in the fragment shader.

```glsl
attribute vec4 a_position;
attribute vec4 a_normal;
attribute vec2 a_texcoord;
attribute vec4 a_color;

varying vec2 v_texcoord;

void main() {
  v_texcoord = a_texcoord;
  gl_Position = a_position;
}
```

The geometry is a 2-triangle quad covering clip space (-1 to 1). Fragment shaders receive `gl_FragCoord` for pixel coordinates (which the existing Blobs and Planet shaders already use) and `v_texcoord` if needed.

---

## 5. Key Components

### `useShaderRegistry()` — Shader Discovery

1. Uses `import.meta.glob` to glob `public/assets/shaders/*/config.json` at build time
2. Parses each config, resolves asset paths (shader file, textures) relative to project folder
3. Returns `ShaderProject[]` for the gallery to consume
4. Replaces the current static `src/data/shaders.ts`

### `useShaderUniforms(canvasRef)` — Uniform Management

1. Creates a `uniforms` ref object containing all built-in uniforms
2. Uses `useFrame` to update `u_time` every frame from the R3F clock
3. Tracks mouse position over the canvas for `u_mouse`
4. Maintains `u_trails` ring buffer with inertia-smoothed mouse positions
5. Listens to canvas resize for `u_resolution`
6. Merges in custom uniforms from config
7. Merges in texture uniforms (loaded via drei's `useTexture`)

### `ShaderCanvas` — The R3F Scene

1. Receives a `ShaderProject` (parsed config + loaded shader source)
2. Renders a `<Canvas>` with a fullscreen quad mesh
3. Applies a custom `<shaderMaterial>` with the shared VS + project FS + merged uniforms
4. Handles texture loading via drei's `useTexture`

### `ShaderMaterial` — Three.js Integration

1. Wraps Three.js `ShaderMaterial`
2. Takes vertex source, fragment source, and uniforms object
3. Sets up custom attributes on the quad geometry
4. Updates uniform values every frame via `useFrame`

---

## 6. Gallery Integration

The existing gallery UI stays intact. Data source changes:

1. `useShaderRegistry()` replaces the static `src/data/shaders.ts` array
2. `ShaderCard` renders a live `<ShaderCanvas>` in its thumbnail area (canvas ref already exists)
3. `ShaderModal` renders a larger `<ShaderCanvas>` for the focused/fullscreen view
4. `ShaderMeta` type is updated to align with `config.json` fields

---

## 7. Data Flow

```
config.json ──glob──> useShaderRegistry() ──> ShaderProject[]
                                                    |
                          ┌─────────────────────────┘
                          v
                    ShaderCanvas
                          |
            ┌─────────────┼──────────────┐
            v             v              v
      fetch .frag    useTexture    useShaderUniforms
            |         (drei)             |
            v             v              v
         ShaderMaterial(vs, fs, uniforms + textures)
            |
            v
       Fullscreen quad mesh ──> renders every frame via useFrame
```

---

## 8. Shader Migration

The two existing shaders from the Shaders repo will be migrated as the first projects:

### 01_Blobs
- Uses: `u_resolution`, `u_mouse`, `u_camera`, `u_time`
- No textures
- Contains its own ray marching with SDF metaballs

### 02_Planet (from feature/planet branch)
- Uses: `u_resolution`, `u_mouse`, `u_time`
- No textures
- Contains ray marching with SDF planet, refraction, voronoi patterns

Both shaders already use `gl_FragCoord`-based rendering and are compatible with the fullscreen quad approach. Minor adjustments may be needed to align uniform names with the framework conventions.

---

## 9. Dependencies

New packages to add:

| Package | Purpose |
|---------|---------|
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | Helpers (useTexture, shaderMaterial utilities) |
| `three` | Three.js core |
| `@types/three` | TypeScript types |
