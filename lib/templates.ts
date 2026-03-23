import { PaperSettings, PaperType } from '@/types/paper';
import {
  DEFAULT_PAPER_SETTINGS,
  CATEGORY_TYPES,
  CATEGORIES,
  getPaperCategoryForPaperType,
} from './paperTypes';

export interface Template {
  id: string;
  name: string;
  description: string;
  /** Layout category (e.g. Writing) or use-case preset label. */
  category: string;
  settings: PaperSettings;
}

const customDescriptions: Partial<Record<PaperType, string>> = {
  'blank': 'The most flexible layout - a pure white base for sketching or free-form notes.',
  'vertical-lined': 'Standard single-margin notebook paper, ideal for school and letters.',
  'grid': 'High-precision planning and engineering grid for math, art, or layout design.',
  'dot': 'The favorite choice for bullet journaling and minimalist task management.',
  'cornell': 'The gold standard for effective note-taking, includes cue column and summary area.',
  'music-staff': 'Professional 5-line staff layout for classical and modern music composition.',
  'guitar-tab': 'Specialized 6-line system for acoustic and electric guitar players.',
  'isometric': '3D perspective grid for architectural sketching and geometric art.',
  'seyes': 'Traditional French style ruled paper with multi-layered height lines.',
  'mizige': 'Traditional Chinese calligraphy grid with diagonal divisions and rice-character frame.',
  'storyboard': 'The industry standard frame layout for film, animation, and video production.',
};

const generateTemplates = (): Template[] => {
  const templates: Template[] = [];
  const seen = new Set<PaperType>();

  for (const category of CATEGORIES) {
    for (const type of CATEGORY_TYPES[category]) {
      if (seen.has(type)) continue;
      seen.add(type);
      const primary = getPaperCategoryForPaperType(type);
      templates.push({
        id: type,
        name: type.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        description:
          customDescriptions[type] ||
          `High-quality ${type.replace(/-/g, ' ')} template for diverse professional and creative applications.`,
        category: primary,
        settings: {
          ...DEFAULT_PAPER_SETTINGS,
          category: primary,
          paperType: type,
        },
      });
    }
  }

  return templates;
};

export const templates: Template[] = generateTemplates();
