export type PaperCategory =
  | 'Writing'
  | 'Music'
  | 'Study / Academic'
  | 'Productivity'
  | 'Work / Business'
  | 'Personal Development'
  | 'Creative'
  | 'Daily Life'
  | 'Finance'
  | 'Reading'
  | 'Travel'
  | 'Health'
  | 'Mental Health'
  | 'Goals'
  | 'Miscellaneous';

export type PaperType = 
  // General
  | 'vertical-lined' | 'grid' | 'dot' | 'pink-millimeter' | 'split-column' | 'blank' | 'cornell' | 'isometric' | 'hexagonal' | 'seyes' | 'storyboard'
  // Music
  | 'music-staff' | 'guitar-tab' | 'ukulele-tab' | 'calligraphy-music'
  // Chinese Homework
  | 'pinyin-practice' | 'pinyin-tianzi' | 'composition' | 'arithmetic' | 'english-practice' | 'german-three-line' | 'german-three-line-border' | 'brazilian-calligraphy'
  // Calligraphy Practice
  | 'mizige' | 'huigongge' | 'jiugongge' | 'tianzi-grid' | 'cross-grid' | 'hardpen-huigongge'
  // Specialty
  | 'vintage-note' | 'children-drawing' | 'minimal-journal' | 'student-note' | 'meeting-note' | 'project-planning' | 'sketch-paper' | 'creative-log' | 'branded-paper';

export type PaperSize = 'A4' | 'A3' | 'A5' | 'Letter' | 'Legal';
export type Orientation = 'portrait' | 'landscape';
export type ThemeType =
  | 'default'
  | 'dark'
  | 'sepia'
  | 'eye-care'
  | 'minimal'
  | 'forest'
  | 'ocean'
  | 'dune'
  | 'lavender'
  | 'bamboo'
  | 'mist'
  | 'sunrise'
  | 'clay'
  | 'meadow'
  | 'sky';
export type LineStyle = 'solid' | 'dashed' | 'dotted';

export interface PaperSettings {
  category: PaperCategory;
  paperType: PaperType;
  paperSize: PaperSize;
  orientation: Orientation;
  numberOfPages: number;
  theme: ThemeType;

  // Margin Settings (4-way)
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;

  // Common properties
  lineSpacing: number;
  lineColor: string;
  lineThickness: number;
  lineStyle: LineStyle;
  
  // Specific Sidebars/Dividers
  showMarginLine: boolean;
  marginLineColor: string;
  marginPosition: number; // For vertical-lined sidebar
  showHeaderLine: boolean;

  // Grid / Dot specific
  gridSize: number;
  showMajorGrid: boolean;
  majorEvery: number;
  majorLineColor: string;
  majorLineThickness: number;
  dotSpacing: number;
  dotSize: number;
  dotColor: string;

  // Category specific (General)
  splitColumnCount: number;
  splitColumnRatio: string;
  dividerLineColor: string;
  cornellCueWidth: number;
  cornellSummaryHeight: number;
  cornellHeaderHeight: number;
  cornellSidebarPosition: 'left' | 'right';
  isometricSpacing: number;
  hexSize: number;
  hexFillColor: string;
  seyesUnitSize: number;
  seyesMajorColor: string;
  seyesHelperColor: string;
  storyboardRows: number;
  storyboardCols: number;
  storyboardAspectRatio: '16:9' | '4:3' | '1:1' | '2.35:1';
  storyboardLinesPerFrame: number;

  // Category specific (Music)
  stavesPerPage: number;
  staffLineSpacing: number;
  staffColor: string;
  staffLineThickness: number;
  gapBetweenStaves: number;
  showTrebleClef: boolean;
  tabSystemsPerPage: number;
  tabStrings: number;
  tabStringSpacing: number;
  tabShowLabel: boolean;
  ukuleleStaffGap: number;

  // Category specific (Chinese/Calligraphy)
  charsPerRow: number;
  rowHeight: number;
  cellBorderColor: string;
  innerDividerColor: string;
  innerDividerStyle: 'solid' | 'dashed' | 'dotted';
  compositionRows: number;
  compositionCols: number;
  arithmeticCols: number;
  arithmeticProblemHeight: number;
  germanRowSpacing: number;
  borderMargin: number; 
  slantAngle: number;
  slantLineColor: string;

  // Specialty & Others
  brandedHeaderHeight: number;
  brandedHeaderText: string;
  brandedHeaderBg: string;
  brandedHeaderTextColor: string;
  brandedFooterText: string;
  brandedAccentBar: boolean;

  // Global Styling
  backgroundColor: string;
  opacity: number;
  showBorder: boolean;
  borderColor: string;
  borderThickness: number;
  
  // Watermark
  watermarkText: string;
  watermarkColor: string;
  watermarkOpacity: number;
  watermarkFontSize: number;
  watermarkRotation: number;
  
  // Header Logo/Text
  showPageNumbers: boolean;
  pageNumberFormat: string; // e.g. "- {n} -"
}
