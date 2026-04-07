import type { CSSProperties } from 'react';

export interface StrapiThemePalette {
  id?: number;
  primaryColor?: string;
  warmColor?: string;
  accentColor?: string;
}

type ThemeFamily = 'primary' | 'warm' | 'accent';
type ThemeStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type ThemeCssVariables = Record<`--color-${ThemeFamily}-${ThemeStep}`, string>;
export type ThemeInlineStyle = CSSProperties & Partial<ThemeCssVariables>;

const SCALE_STEPS: ThemeStep[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const LIGHT_MIX: Record<Exclude<ThemeStep, 500 | 600 | 700 | 800 | 900 | 950>, number> = {
  50: 0.92,
  100: 0.84,
  200: 0.68,
  300: 0.45,
  400: 0.22,
};
const DARK_MIX: Record<Exclude<ThemeStep, 50 | 100 | 200 | 300 | 400 | 500>, number> = {
  600: 0.12,
  700: 0.24,
  800: 0.38,
  900: 0.52,
  950: 0.72,
};

function normalizeHexColor(value?: string): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) {
    return null;
  }

  if (trimmed.length === 4) {
    return `#${trimmed
      .slice(1)
      .split('')
      .map((char) => char + char)
      .join('')}`.toLowerCase();
  }

  return trimmed.toLowerCase();
}

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '');
  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((channel) => Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, '0'))
    .join('')}`;
}

function mixColors(baseHex: string, mixHex: string, mixAmount: number) {
  const base = hexToRgb(baseHex);
  const mix = hexToRgb(mixHex);

  return rgbToHex(
    base.r * (1 - mixAmount) + mix.r * mixAmount,
    base.g * (1 - mixAmount) + mix.g * mixAmount,
    base.b * (1 - mixAmount) + mix.b * mixAmount,
  );
}

function buildColorScale(baseHex: string) {
  return {
    50: mixColors(baseHex, '#ffffff', LIGHT_MIX[50]),
    100: mixColors(baseHex, '#ffffff', LIGHT_MIX[100]),
    200: mixColors(baseHex, '#ffffff', LIGHT_MIX[200]),
    300: mixColors(baseHex, '#ffffff', LIGHT_MIX[300]),
    400: mixColors(baseHex, '#ffffff', LIGHT_MIX[400]),
    500: baseHex,
    600: mixColors(baseHex, '#000000', DARK_MIX[600]),
    700: mixColors(baseHex, '#000000', DARK_MIX[700]),
    800: mixColors(baseHex, '#000000', DARK_MIX[800]),
    900: mixColors(baseHex, '#000000', DARK_MIX[900]),
    950: mixColors(baseHex, '#000000', DARK_MIX[950]),
  } as const;
}

function applyFamily(
  variables: ThemeInlineStyle,
  family: ThemeFamily,
  color?: string,
) {
  const normalized = normalizeHexColor(color);
  if (!normalized) return;

  const scale = buildColorScale(normalized);
  for (const step of SCALE_STEPS) {
    variables[`--color-${family}-${step}`] = scale[step];
  }
}

export function buildThemeCssVariables(theme?: StrapiThemePalette): ThemeInlineStyle | undefined {
  if (!theme) return undefined;

  const variables: ThemeInlineStyle = {};
  applyFamily(variables, 'primary', theme.primaryColor);
  applyFamily(variables, 'warm', theme.warmColor);
  applyFamily(variables, 'accent', theme.accentColor);

  return Object.keys(variables).length > 0 ? variables : undefined;
}
