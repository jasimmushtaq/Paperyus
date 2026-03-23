import { ThemeType } from '@/types/paper';

export const THEME_PRESETS: Record<
  ThemeType,
  { bg: string; line: string; label: string }
> = {
  default: { bg: '#ffffff', line: '#c0c0c0', label: 'Default' },
  dark: { bg: '#1a1a2e', line: '#444466', label: 'Dark' },
  sepia: { bg: '#f4ecd8', line: '#d2b48c', label: 'Sepia' },
  'eye-care': { bg: '#e8f5e9', line: '#aed581', label: 'Eye care' },
  minimal: { bg: '#f9f9f9', line: '#eeeeee', label: 'Minimal' },
  forest: { bg: '#f0f7f0', line: '#4a7c59', label: 'Forest' },
  ocean: { bg: '#eef8ff', line: '#4a7faf', label: 'Ocean' },
  dune: { bg: '#faf7f0', line: '#c4a574', label: 'Dune' },
  lavender: { bg: '#f7f4ff', line: '#9b8bb8', label: 'Lavender' },
  bamboo: { bg: '#f6faf3', line: '#7a9c6e', label: 'Bamboo' },
  mist: { bg: '#eef2f6', line: '#6b7c93', label: 'Mist' },
  sunrise: { bg: '#fff8f0', line: '#e8a87c', label: 'Sunrise' },
  clay: { bg: '#faf5f2', line: '#c17a6b', label: 'Clay' },
  meadow: { bg: '#f4faf4', line: '#5a9d6e', label: 'Meadow' },
  sky: { bg: '#f0f9ff', line: '#7eb8e0', label: 'Sky' },
};

/** Display order in the control panel */
export const THEME_ORDER: ThemeType[] = [
  'default',
  'dark',
  'sepia',
  'eye-care',
  'minimal',
  'forest',
  'ocean',
  'dune',
  'lavender',
  'bamboo',
  'mist',
  'sunrise',
  'clay',
  'meadow',
  'sky',
];
