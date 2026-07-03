declare module 'fontkit' {
  interface Glyph {
    advanceWidth: number
  }

  interface GlyphRun {
    glyphs: Glyph[]
  }

  interface Font {
    unitsPerEm: number
    capHeight: number
    ascent: number
    layout(text: string): GlyphRun
  }

  function openSync(path: string): Font
  function open(path: string): Promise<Font>
}