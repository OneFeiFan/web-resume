import { useEffect, useCallback } from 'react';

interface Palette {
  primary: string;
  surface: string;
  onSurface: string;
  accent: string;
  muted: string;
  border: string;
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map((c) => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, '0')).join('');
}

function hexToRgb(hex: string) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] as const : [0, 0, 0] as const;
}

function lerpColor(a: string, b: string, t: number) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex(
    ar + (br - ar) * t,
    ag + (bg - ag) * t,
    ab + (bb - ab) * t,
  );
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, s * 100, l * 100];
}

/**
 * Smart color extraction: samples image, discards near-white/black pixels,
 * picks the most saturated color from the mid-tone cluster as primary.
 */
function extractKeyColor(img: HTMLImageElement): [number, number, number] {
  const canvas = document.createElement('canvas');
  const size = 80;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;

  // Collect valid mid-tone pixels (skip too dark < 40 or too light > 230)
  const pixels: [number, number, number, number][] = []; // [r,g,b,saturation]
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const brightness = (r + g + b) / 3;
    if (brightness < 40 || brightness > 230) continue;
    const [, s] = rgbToHsl(r, g, b);
    if (s < 5) continue; // skip near-gray
    pixels.push([r, g, b, s]);
  }

  if (pixels.length === 0) return [58, 80, 104]; // fallback navy

  // Pick top 20% most saturated pixels, average them
  pixels.sort((a, b) => b[3] - a[3]);
  const top = pixels.slice(0, Math.max(5, Math.floor(pixels.length * 0.2)));
  let sr = 0, sg = 0, sb = 0;
  top.forEach(([r, g, b]) => { sr += r; sg += g; sb += b; });
  return [sr / top.length, sg / top.length, sb / top.length];
}

/**
 * Generate a readable tonal palette from a key color.
 * Strategy: key color → primary (heading/accent base)
 * Then derive surface/onSurface/muted with proper reading contrast.
 */
function generatePalette(r: number, g: number, b: number): Palette {
  const primary = rgbToHex(Math.round(r * 0.8), Math.round(g * 0.8), Math.round(b * 0.8));
  const accent = rgbToHex(
    Math.round(Math.min(255, r * 1.25)),
    Math.round(Math.min(255, g * 1.25)),
    Math.round(Math.min(255, b * 1.25)),
  );
  const muted = lerpColor('#FDFCFA', rgbToHex(Math.round(r * 0.15), Math.round(g * 0.15), Math.round(b * 0.15)), 0.35);
  const border = lerpColor('#1C1E22', '#FDFCFA', 0.82);

  return { primary, surface: '#FDFCFA', onSurface: '#1C1E22', accent, muted, border };
}

/** Clean, readable fallback — used before image loads or on error */
const FALLBACK: Palette = {
  primary: '#3D5570',
  surface: '#FDFCFA',
  onSurface: '#1C1E22',
  accent: '#5B8DB8',
  muted: '#F0EDE8',
  border: '#D8D4CE',
};

function applyPalette(p: Palette) {
  const root = document.documentElement;
  root.style.setProperty('--c-primary', p.primary);
  root.style.setProperty('--c-surface', p.surface);
  root.style.setProperty('--c-on-surface', p.onSurface);
  root.style.setProperty('--c-accent', p.accent);
  root.style.setProperty('--c-muted', p.muted);
  root.style.setProperty('--c-border', p.border);
}

export function useImageColor(imageUrl: string | null) {
  const extract = useCallback(() => {
    // Always start with readable fallback
    applyPalette(FALLBACK);

    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const [r, g, b] = extractKeyColor(img);
        const p = generatePalette(r, g, b);
        applyPalette(p);
      } catch {
        applyPalette(FALLBACK);
      }
    };
    img.onerror = () => applyPalette(FALLBACK);
    img.src = imageUrl;
  }, [imageUrl]);

  useEffect(() => { extract(); }, [extract]);
}
