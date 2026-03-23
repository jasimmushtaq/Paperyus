import { PaperSettings, PaperSize } from '@/types/paper';
import { DEFAULT_PAPER_SETTINGS } from './paperTypes';

export const paperSizes: Record<PaperSize, { width: number; height: number }> = {
  A4: { width: 210, height: 297 },
  A3: { width: 297, height: 420 },
  A5: { width: 148, height: 210 },
  Letter: { width: 215.9, height: 279.4 },
  Legal: { width: 215.9, height: 355.6 },
};

export const defaultSettings: PaperSettings = DEFAULT_PAPER_SETTINGS;
