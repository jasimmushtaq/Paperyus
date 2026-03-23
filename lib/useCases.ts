import { PaperCategory, PaperSettings, PaperType } from '@/types/paper';
import { Template } from '@/lib/templates';
import { mergePaperPreset } from '@/lib/paperPreset';

type UseCaseRow = { slug: string; name: string; paperType: PaperType } & Partial<PaperSettings>;

function toTemplate(group: PaperCategory, e: UseCaseRow): Template {
  const { slug, name, paperType, ...rest } = e;
  return {
    id: `use-${slug}`,
    name,
    description: `Purpose preset for ${name}.`,
    category: group,
    settings: mergePaperPreset({ paperType, category: group, ...rest }),
  };
}

/** Ordered labels for filter chips (matches user list). */
export const USE_CASE_GROUPS = [
  'Writing',
  'Music',
  'Study / Academic',
  'Productivity',
  'Work / Business',
  'Personal Development',
  'Creative',
  'Daily Life',
  'Finance',
  'Reading',
  'Travel',
  'Health',
  'Mental Health',
  'Goals',
  'Miscellaneous',
] as const;

const DATA: Record<(typeof USE_CASE_GROUPS)[number], UseCaseRow[]> = {
  Writing: [
    { slug: 'creative-writing', name: 'Creative Writing', paperType: 'vertical-lined', lineSpacing: 8, theme: 'sepia' },
    { slug: 'story-writing', name: 'Story Writing', paperType: 'vertical-lined', lineSpacing: 8, theme: 'default' },
    { slug: 'short-stories', name: 'Short Stories', paperType: 'vertical-lined', lineSpacing: 9 },
    { slug: 'novel-drafts', name: 'Novel Drafts', paperType: 'blank', marginTop: 12, marginBottom: 12, marginLeft: 14, marginRight: 14 },
    { slug: 'script-writing', name: 'Script Writing', paperType: 'vertical-lined', lineSpacing: 7 },
    { slug: 'poetry', name: 'Poetry', paperType: 'vertical-lined', lineSpacing: 12, theme: 'lavender' },
    { slug: 'essays', name: 'Essays', paperType: 'cornell', cornellHeaderHeight: 24 },
    { slug: 'articles', name: 'Articles', paperType: 'cornell', cornellCueWidth: 55 },
    { slug: 'journaling', name: 'Journaling', paperType: 'dot', gridSize: 5, theme: 'forest' },
    { slug: 'letter-writing', name: 'Letter Writing', paperType: 'seyes', theme: 'default' },
  ],
  Music: [
    { slug: 'lyrics-writing', name: 'Lyrics Writing', paperType: 'vertical-lined', lineSpacing: 9, theme: 'minimal' },
    { slug: 'composition-sheets', name: 'Composition Sheets', paperType: 'music-staff', stavesPerPage: 10 },
    { slug: 'music-notes', name: 'Music Notes', paperType: 'music-staff', stavesPerPage: 8, gapBetweenStaves: 18 },
    { slug: 'practice-logs', name: 'Practice Logs', paperType: 'guitar-tab', tabSystemsPerPage: 8 },
    { slug: 'song-ideas', name: 'Song Ideas', paperType: 'grid', gridSize: 6, theme: 'mist' },
  ],
  'Study / Academic': [
    { slug: 'class-notes', name: 'Class Notes', paperType: 'cornell', cornellCueWidth: 65 },
    { slug: 'revision-notes', name: 'Revision Notes', paperType: 'cornell', cornellSummaryHeight: 55 },
    { slug: 'flashcards', name: 'Flashcards', paperType: 'grid', gridSize: 4, showMajorGrid: true, majorEvery: 4 },
    { slug: 'practice-papers', name: 'Practice Papers', paperType: 'vertical-lined', lineSpacing: 8 },
    { slug: 'assignments', name: 'Assignments', paperType: 'vertical-lined', lineSpacing: 8, showMarginLine: true },
    { slug: 'lab-records', name: 'Lab Records', paperType: 'grid', gridSize: 5 },
    { slug: 'mind-maps', name: 'Mind Maps', paperType: 'dot', gridSize: 6, theme: 'sky' },
    { slug: 'formula-sheets', name: 'Formula Sheets', paperType: 'grid', gridSize: 4, majorEvery: 2 },
  ],
  Productivity: [
    { slug: 'todo-lists', name: 'To-Do Lists', paperType: 'grid', gridSize: 5, theme: 'default' },
    { slug: 'daily-planner', name: 'Daily Planner', paperType: 'vertical-lined', lineSpacing: 7 },
    { slug: 'weekly-planner', name: 'Weekly Planner', paperType: 'split-column', splitColumnCount: 2, splitColumnRatio: '1:1' },
    { slug: 'monthly-planner', name: 'Monthly Planner', paperType: 'grid', gridSize: 8 },
    { slug: 'habit-tracker', name: 'Habit Tracker', paperType: 'grid', gridSize: 4 },
    { slug: 'goal-planner', name: 'Goal Planner', paperType: 'grid', gridSize: 6, theme: 'ocean' },
  ],
  'Work / Business': [
    { slug: 'meeting-notes', name: 'Meeting Notes', paperType: 'meeting-note' },
    { slug: 'project-plans', name: 'Project Plans', paperType: 'project-planning' },
    { slug: 'reports', name: 'Reports', paperType: 'vertical-lined', lineSpacing: 8 },
    { slug: 'proposals', name: 'Proposals', paperType: 'cornell' },
    { slug: 'business-ideas', name: 'Business Ideas', paperType: 'dot', gridSize: 6 },
    { slug: 'client-notes', name: 'Client Notes', paperType: 'cornell', cornellSidebarPosition: 'right' },
  ],
  'Personal Development': [
    { slug: 'goal-setting', name: 'Goal Setting', paperType: 'grid', gridSize: 6, theme: 'meadow' },
    { slug: 'self-reflection', name: 'Self-Reflection', paperType: 'vertical-lined', lineSpacing: 9, theme: 'lavender' },
    { slug: 'affirmations', name: 'Affirmations', paperType: 'blank', theme: 'sunrise' },
    { slug: 'motivation-notes', name: 'Motivation Notes', paperType: 'vertical-lined', lineSpacing: 10 },
    { slug: 'vision-planning', name: 'Vision Planning', paperType: 'grid', gridSize: 8, theme: 'dune' },
  ],
  Creative: [
    { slug: 'sketching', name: 'Sketching', paperType: 'sketch-paper' },
    { slug: 'doodling', name: 'Doodling', paperType: 'dot', gridSize: 4 },
    { slug: 'design-drafts', name: 'Design Drafts', paperType: 'isometric' },
    { slug: 'storyboarding', name: 'Storyboarding', paperType: 'storyboard', storyboardRows: 3, storyboardCols: 2 },
    { slug: 'brainstorming', name: 'Brainstorming', paperType: 'dot', gridSize: 5, theme: 'minimal' },
  ],
  'Daily Life': [
    { slug: 'grocery-lists', name: 'Grocery Lists', paperType: 'grid', gridSize: 6 },
    { slug: 'meal-planning', name: 'Meal Planning', paperType: 'grid', gridSize: 8 },
    { slug: 'budget-planning', name: 'Budget Planning', paperType: 'grid', gridSize: 5 },
    { slug: 'expense-tracking', name: 'Expense Tracking', paperType: 'grid', gridSize: 4 },
    { slug: 'schedules', name: 'Schedules', paperType: 'vertical-lined', lineSpacing: 7 },
  ],
  Finance: [
    { slug: 'budget-sheets', name: 'Budget Sheets', paperType: 'grid', gridSize: 4 },
    { slug: 'savings-tracker', name: 'Savings Tracker', paperType: 'grid', gridSize: 5, theme: 'forest' },
    { slug: 'investment-notes', name: 'Investment Notes', paperType: 'vertical-lined', lineSpacing: 8 },
    { slug: 'debt-tracking', name: 'Debt Tracking', paperType: 'grid', gridSize: 4 },
  ],
  Reading: [
    { slug: 'book-notes', name: 'Book Notes', paperType: 'cornell' },
    { slug: 'summaries', name: 'Summaries', paperType: 'vertical-lined', lineSpacing: 8 },
    { slug: 'quotes', name: 'Quotes', paperType: 'vertical-lined', lineSpacing: 10, theme: 'sepia' },
    { slug: 'vocabulary-lists', name: 'Vocabulary Lists', paperType: 'grid', gridSize: 5 },
  ],
  Travel: [
    { slug: 'travel-plans', name: 'Travel Plans', paperType: 'vertical-lined', lineSpacing: 8 },
    { slug: 'packing-lists', name: 'Packing Lists', paperType: 'grid', gridSize: 6 },
    { slug: 'itinerary', name: 'Itinerary', paperType: 'vertical-lined', lineSpacing: 7 },
    { slug: 'travel-journal', name: 'Travel Journal', paperType: 'dot', gridSize: 5, theme: 'ocean' },
  ],
  Health: [
    { slug: 'workout-plans', name: 'Workout Plans', paperType: 'grid', gridSize: 5 },
    { slug: 'diet-plans', name: 'Diet Plans', paperType: 'grid', gridSize: 6 },
    { slug: 'sleep-tracker', name: 'Sleep Tracker', paperType: 'grid', gridSize: 4 },
    { slug: 'water-tracker', name: 'Water Tracker', paperType: 'grid', gridSize: 8 },
  ],
  'Mental Health': [
    { slug: 'gratitude-journal', name: 'Gratitude Journal', paperType: 'vertical-lined', lineSpacing: 9, theme: 'sunrise' },
    { slug: 'mood-tracker', name: 'Mood Tracker', paperType: 'grid', gridSize: 4 },
    { slug: 'meditation-log', name: 'Meditation Log', paperType: 'blank', theme: 'mist' },
  ],
  Goals: [
    { slug: 'short-term-goals', name: 'Short-Term Goals', paperType: 'grid', gridSize: 6 },
    { slug: 'long-term-goals', name: 'Long-Term Goals', paperType: 'grid', gridSize: 8 },
    { slug: 'milestones', name: 'Milestones', paperType: 'vertical-lined', lineSpacing: 8 },
  ],
  Miscellaneous: [
    { slug: 'idea-dump', name: 'Idea Dump', paperType: 'blank' },
    { slug: 'random-notes', name: 'Random Notes', paperType: 'dot', gridSize: 5 },
    { slug: 'problem-solving', name: 'Problem Solving', paperType: 'cornell' },
    { slug: 'experiment-notes', name: 'Experiment Notes', paperType: 'grid', gridSize: 5 },
  ],
};

export const useCaseTemplates: Template[] = USE_CASE_GROUPS.flatMap((group) =>
  (DATA[group] || []).map((entry) => toTemplate(group as PaperCategory, entry))
);
