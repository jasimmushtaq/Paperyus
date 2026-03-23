import { PaperSettings, PaperType } from '@/types/paper';
import { DEFAULT_PAPER_SETTINGS, getPaperCategoryForPaperType } from './paperTypes';

/** Merge defaults with a paper type and optional overrides. Keeps explicit category when provided. */
export function mergePaperPreset(
  partial: Partial<PaperSettings> & { paperType: PaperType }
): PaperSettings {
  return {
    ...DEFAULT_PAPER_SETTINGS,
    ...partial,
    category:
      partial.category !== undefined
        ? partial.category
        : getPaperCategoryForPaperType(partial.paperType),
  };
}
