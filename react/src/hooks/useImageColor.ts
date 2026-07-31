import { useState, useEffect, useCallback } from 'react';

/**
 * Extract a tonal palette from an image URL using Canvas.
 * Returns a 6-color palette for CSS custom properties.
 */
interface Palette {
  primary: string;
  surface: string;
  onSurface: string;
  accent: string;
  muted: string;
  border: string;
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
}

function hexToRgb(hex: string) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] as const : [0, 0, 0] as const;
}

function lerpColor(a: string, b: string, t: number) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex(
    Math.round(ar + (br - ar) * t),
    Math.round(ag + (bg - ag) * t),
    Math.round(ab + (bb - ab) * t),
  );
}

function extractDominantColor(img: HTMLImageElement): [number, number, number] {
  const canvas = document.createElement('canvas');
  const size = 50;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;
  let r = 0, g = 0, b = 0, count = 0;
  for (let i = 0; i < data.length; i += 16) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
}

function generatePalette(r: number, g: number, b: number): Palette {
  const base = rgbToHex(r, g, b);
  const dark = '#121418';
  const light = '#F9F8F6';
  const surface = lerpColor(light, base, 0.03);
  const onSurface = lerpColor(dark, base, 0.15);
  const accent = rgbToHex(
    Math.min(255, Math.round(r * 1.3)),
    Math.min(255, Math.round(g * 1.3)),
    Math.min(255, Math.round(b * 1.3)),
  );
  const muted = lerpColor(surface, base, 0.08);
  const border = lerpColor(onSurface, surface, 0.85);
  return { primary: base, surface, onSurface, accent, muted, border };
}

const FALLBACK: Palette = {
  primary: '#3A5068',
  surface: '#F9F8F6',
  onSurface: '#1A1D22',
  accent: '#5B7FA5',
  muted: '#EDEBE6',
  border: '#D4D2CC',
};

export function useImageColor(imageUrl: string | null) {
  const [palette, setPalette] = useState<Palette>(FALLBACK);

  const extract = useCallback(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const [r, g, b] = extractDominantColor(img);
      const p = generatePalette(r, g, b);
      setPalette(p);
      const root = document.documentElement;
      root.style.setProperty('--c-primary', p.primary);
      root.style.setProperty('--c-surface', p.surface);
      root.style.setProperty('--c-on-surface', p.onSurface);
      root.style.setProperty('--c-accent', p.accent);
      root.style.setProperty('--c-muted', p.muted);
      root.style.setProperty('--c-border', p.border);
    };
    img.onerror = () => setPalette(FALLBACK);
    img.src = imageUrl;
  }, [imageUrl]);

  useEffect(() => { extract(); }, [extract]);

  return { palette, refresh: extract };
}
