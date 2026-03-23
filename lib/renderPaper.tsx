import React from 'react';
import { PaperSettings } from '@/types/paper';

export const renderPaperElements = (
  settings: PaperSettings,
  width: number,
  height: number
): React.ReactNode[] => {
  const elements: React.ReactNode[] = [];
  const { paperType, opacity: globalOpacity, marginTop, marginBottom, marginLeft, marginRight } = settings;
  const opacity = globalOpacity / 100;

  // Drawing boundaries based on margins
  const startX = marginLeft;
  const endX = width - marginRight;
  const startY = marginTop;
  const endY = height - marginBottom;

  const getStrokeDashArray = () => {
    if (settings.lineStyle === 'dashed') return '10 5';
    if (settings.lineStyle === 'dotted') return '2 2';
    return 'none';
  };

  const drawLine = (x1: number, y1: number, x2: number, y2: number, color: string, thickness: number, k: string, customOpacity?: number, strokeDash?: string) => (
    <line 
      key={k} 
      x1={x1} y1={y1} x2={x2} y2={y2} 
      stroke={color} 
      strokeWidth={thickness} 
      opacity={customOpacity ?? opacity} 
      strokeLinecap="round" 
      strokeDasharray={strokeDash ?? getStrokeDashArray()}
    />
  );

  const drawRect = (x: number, y: number, w: number, h: number, color: string, thickness: number, k: string, fill = 'none') => (
    <rect 
      key={k} 
      x={x} y={y} 
      width={w} height={h} 
      stroke={color} 
      strokeWidth={thickness} 
      fill={fill} 
      opacity={opacity} 
      strokeDasharray={getStrokeDashArray()}
    />
  );

  const drawCircle = (cx: number, cy: number, r: number, color: string, k: string) => (
    <circle key={k} cx={cx} cy={cy} r={r} fill={color} opacity={opacity} />
  );

  switch (paperType) {
    case 'vertical-lined': {
      const lineStep = settings.lineSpacing || 8;
      const initialY = settings.showHeaderLine ? startY + 30 : startY + 10;
      for (let y = initialY; y < endY; y += lineStep) {
        elements.push(drawLine(startX, y, endX, y, settings.lineColor, settings.lineThickness, `l-${y}`));
      }
      if (settings.showMarginLine) {
        elements.push(drawLine(startX + settings.marginPosition, startY, startX + settings.marginPosition, endY, settings.marginLineColor, settings.lineThickness, 'margin'));
      }
      break;
    }

    case 'grid': {
      const step = settings.gridSize || 5;
      const majorEvery = Math.max(1, settings.majorEvery || 5);
      for (let x = startX; x <= endX; x += step) {
        const isMajor = settings.showMajorGrid && Math.round((x - startX) / step) % majorEvery === 0;
        elements.push(drawLine(x, startY, x, endY, isMajor ? settings.majorLineColor : settings.lineColor, isMajor ? settings.majorLineThickness : settings.lineThickness, `gx-${x}`));
      }
      for (let y = startY; y <= endY; y += step) {
        const isMajor = settings.showMajorGrid && Math.round((y - startY) / step) % majorEvery === 0;
        elements.push(drawLine(startX, y, endX, y, isMajor ? settings.majorLineColor : settings.lineColor, isMajor ? settings.majorLineThickness : settings.lineThickness, `gy-${y}`));
      }
      break;
    }

    case 'dot': {
      const step = settings.gridSize || 5;
      for (let x = startX + step; x < endX; x += step) {
        for (let y = startY + step; y < endY; y += step) {
          elements.push(drawCircle(x, y, settings.dotSize / 2 || 0.5, settings.dotColor || settings.lineColor, `dot-${x}-${y}`));
        }
      }
      break;
    }

    case 'cornell': {
      const { cornellCueWidth: cue, cornellSummaryHeight: sum, cornellHeaderHeight: head, cornellSidebarPosition: side } = settings;
      const hY = startY + head;
      const bY = endY - sum;
      const isRight = side === 'right';
      const sidebarX = isRight ? endX - cue : startX + cue;

      // Dividers
      elements.push(drawLine(sidebarX, hY, sidebarX, bY, settings.dividerLineColor, 1.2, 'c-v'));
      elements.push(drawLine(startX, bY, endX, bY, settings.dividerLineColor, 1.2, 'c-h1'));
      elements.push(drawLine(startX, hY, endX, hY, settings.dividerLineColor, 1.2, 'c-h2'));

      // Lines in Note Area
      const lineStep = settings.lineSpacing || 8;
      const lStartX = isRight ? startX : sidebarX;
      const lEndX = isRight ? sidebarX : endX;

      for (let y = hY + lineStep; y < bY; y += lineStep) {
        elements.push(drawLine(lStartX, y, lEndX, y, settings.lineColor, settings.lineThickness, `cl-${y}`));
      }
      break;
    }

    case 'isometric': {
      const s = settings.isometricSpacing || 10;
      const a = 30 * (Math.PI / 180);
      const cosA = Math.cos(a);
      const tanA = Math.tan(a);
      for (let x = startX; x <= endX; x += s * cosA * 2) {
        elements.push(drawLine(x, startY, x, endY, settings.lineColor, settings.lineThickness, `iv-${x}`));
      }
      for (let y = startY - height; y < endY + height; y += s) {
        elements.push(drawLine(startX, y, endX, y + (endX - startX) * tanA, settings.lineColor, settings.lineThickness, `i1-${y}`));
        elements.push(drawLine(startX, y, endX, y - (endX - startX) * tanA, settings.lineColor, settings.lineThickness, `i2-${y}`));
      }
      break;
    }

    case 'hexagonal': {
      const r = settings.hexSize || 8;
      const h = r * Math.sin(Math.PI / 3);
      const w = 1.5 * r;
      for (let x = startX; x < endX + r; x += w) {
        const isOdd = Math.round((x - startX) / w) % 2 !== 0;
        for (let y = startY + (isOdd ? h : 0); y < endY + r; y += 2 * h) {
          const pts = [0, 60, 120, 180, 240, 300].map(deg => {
            const rad = deg * Math.PI / 180;
            return `${x + r * Math.cos(rad)},${y + r * Math.sin(rad)}`;
          }).join(' ');
          elements.push(<polygon key={`h-${x}-${y}`} points={pts} fill="none" stroke={settings.lineColor} strokeWidth={settings.lineThickness} opacity={opacity} strokeDasharray={getStrokeDashArray()} />);
        }
      }
      break;
    }

    case 'music-staff': {
      const spacing = settings.staffLineSpacing || 2;
      const gap = settings.gapBetweenStaves || 15;
      for (let i = 0; i < settings.stavesPerPage; i++) {
        const sy = startY + 15 + i * (4 * spacing + gap);
        if (sy > endY - 10) break;
        for (let j = 0; j < 5; j++) {
          const y = sy + j * spacing;
          elements.push(drawLine(startX + 10, y, endX - 10, y, settings.staffColor || '#555', settings.staffLineThickness || 0.5, `mu-${i}-${j}`));
        }
      }
      break;
    }

    case 'pink-millimeter': {
       for (let x = startX; x <= endX; x += 1) {
         const is5 = Math.round(x - startX) % 5 === 0;
         const is10 = Math.round(x - startX) % 10 === 0;
         const color = is10 ? '#ff1493' : is5 ? '#ff69b4' : '#ffb6c1';
         const thick = is10 ? 0.3 : is5 ? 0.2 : 0.1;
         elements.push(drawLine(x, startY, x, endY, color, thick, `px-${x}`));
       }
       for (let y = startY; y <= endY; y += 1) {
         const is5 = Math.round(y - startY) % 5 === 0;
         const is10 = Math.round(y - startY) % 10 === 0;
         const color = is10 ? '#ff1493' : is5 ? '#ff69b4' : '#ffb6c1';
         const thick = is10 ? 0.3 : is5 ? 0.2 : 0.1;
         elements.push(drawLine(startX, y, endX, y, color, thick, `py-${y}`));
       }
       break;
    }

    case 'mizige': {
       const s = (endX - startX) / settings.charsPerRow;
       const rows = Math.floor((endY - startY) / s);
       for (let r = 0; r < rows; r++) {
         for (let c = 0; c < settings.charsPerRow; c++) {
           const x = startX + c * s;
           const y = startY + r * s;
           elements.push(drawRect(x, y, s, s, settings.cellBorderColor, 0.8, `mz-b-${r}-${c}`));
           elements.push(drawLine(x + s/2, y, x + s/2, y + s, settings.innerDividerColor, 0.4, `mz-v-${r}-${c}`, 0.5));
           elements.push(drawLine(x, y + s/2, x + s, y + s/2, settings.innerDividerColor, 0.4, `mz-h-${r}-${c}`, 0.5));
           elements.push(drawLine(x, y, x + s, y + s, settings.innerDividerColor, 0.4, `mz-d1-${r}-${c}`, 0.5));
           elements.push(drawLine(x + s, y, x, y + s, settings.innerDividerColor, 0.4, `mz-d2-${r}-${c}`, 0.5));
         }
       }
       break;
    }

    case 'pinyin-practice': {
       const cw = (endX - startX) / settings.charsPerRow;
       const rh = settings.rowHeight || 15;
       const rows = Math.floor((endY - startY) / rh);
       for (let r = 0; r < rows; r++) {
         const y = startY + r * rh;
         elements.push(drawLine(startX, y, endX, y, settings.cellBorderColor, 0.8, `py-t-${r}`));
         elements.push(drawLine(startX, y + rh, endX, y + rh, settings.cellBorderColor, 0.8, `py-b-${r}`));
         elements.push(drawLine(startX, y + rh * 0.33, endX, y + rh * 0.33, settings.cellBorderColor, 0.3, `py-m1-${r}`, 0.4));
         elements.push(drawLine(startX, y + rh * 0.66, endX, y + rh * 0.66, settings.cellBorderColor, 0.3, `py-m2-${r}`, 0.4));
         for (let c = 0; c <= settings.charsPerRow; c++) {
           const x = startX + c * cw;
           elements.push(drawLine(x, y, x, y + rh, settings.cellBorderColor, 0.8, `py-v-${r}-${c}`));
         }
       }
       break;
    }

    case 'branded-paper': {
        elements.push(<rect key="bh" x="0" y="0" width={width} height={settings.brandedHeaderHeight} fill={settings.brandedHeaderBg} opacity={opacity} />);
        elements.push(<text key="bt" x={width / 2} y={settings.brandedHeaderHeight / 2 + 2} fontSize={8} fill={settings.brandedHeaderTextColor} textAnchor="middle" fontWeight="black" opacity={opacity}>{settings.brandedHeaderText}</text>);
        if (settings.brandedAccentBar) {
          elements.push(<rect key="ba" x="0" y={settings.brandedHeaderHeight} width={width} height={2} fill={settings.lineColor} opacity={opacity} />);
        }
        const bLineStep = settings.lineSpacing || 8;
        for (let y = settings.brandedHeaderHeight + startY; y < endY; y += bLineStep) {
          elements.push(drawLine(startX, y, endX, y, settings.lineColor, settings.lineThickness, `bl-${y}`));
        }
        elements.push(<text key="bf" x={width / 2} y={height - 8} fontSize={4} fill="#999" textAnchor="middle" opacity={opacity}>{settings.brandedFooterText}</text>);
        break;
    }

    case 'split-column': {
      const n = Math.max(2, Math.min(settings.splitColumnCount || 2, 12));
      const raw = (settings.splitColumnRatio || '1:1').split(':').map((p) => parseFloat(p)).filter((x) => !Number.isNaN(x));
      const ratios: number[] = [];
      for (let i = 0; i < n; i++) ratios.push(raw[i] ?? 1);
      const sumR = ratios.reduce((a, b) => a + b, 0) || n;
      let acc = startX;
      const contentW = endX - startX;
      for (let i = 0; i < n - 1; i++) {
        acc += (ratios[i] / sumR) * contentW;
        elements.push(drawLine(acc, startY, acc, endY, settings.dividerLineColor, 1.2, `sc-${i}`));
      }
      break;
    }

    case 'seyes': {
      const major = 8;
      const minor = settings.seyesUnitSize || 2;
      if (settings.showMarginLine) {
        elements.push(drawLine(startX + settings.marginPosition, startY, startX + settings.marginPosition, endY, settings.marginLineColor, 0.8, 'seyes-margin'));
      }
      for (let y = startY; y < endY; y += major) {
        elements.push(drawLine(startX, y, endX, y, settings.seyesMajorColor, 0.8, `seyes-m-${y}`));
        for (let k = 1; k <= 3; k++) {
          const yy = y + k * minor;
          if (yy >= endY) break;
          elements.push(drawLine(startX, yy, endX, yy, settings.seyesHelperColor, 0.35, `seyes-h-${yy}`, 0.55));
        }
      }
      break;
    }

    case 'storyboard': {
      const rows = Math.max(1, settings.storyboardRows || 3);
      const cols = Math.max(1, settings.storyboardCols || 2);
      const gap = 4;
      const pad = 8;
      const aspectRatios: Record<string, number> = { '16:9': 16 / 9, '4:3': 4 / 3, '1:1': 1, '2.35:1': 2.35 };
      const ar = aspectRatios[settings.storyboardAspectRatio || '16:9'] ?? 16 / 9;
      const aw = (endX - startX - pad * 2 - gap * (cols - 1)) / cols;
      const ah = aw / ar;
      const linesPer = Math.max(0, settings.storyboardLinesPerFrame || 3);
      storyboard: for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + pad + c * (aw + gap);
          const y = startY + pad + r * (ah + gap);
          if (y + ah > endY) break storyboard;
          elements.push(drawRect(x, y, aw, ah, settings.lineColor, 0.8, `sb-${r}-${c}`));
          if (linesPer > 0) {
            const lineStep = (ah - 6) / (linesPer + 1);
            for (let l = 1; l <= linesPer; l++) {
              const ly = y + 3 + l * lineStep;
              elements.push(drawLine(x + 2, ly, x + aw - 2, ly, settings.lineColor, 0.35, `sbl-${r}-${c}-${l}`, 0.65));
            }
          }
        }
      }
      break;
    }

    case 'guitar-tab':
    case 'ukulele-tab': {
      const strings = paperType === 'ukulele-tab' ? 4 : Math.max(4, settings.tabStrings || 6);
      const spacing = settings.tabStringSpacing || 3;
      const systems = settings.tabSystemsPerPage || 6;
      const gap = settings.gapBetweenStaves || 15;
      let sy = startY + 12;
      for (let i = 0; i < systems; i++) {
        if (sy + strings * spacing > endY - 4) break;
        for (let j = 0; j < strings; j++) {
          const yy = sy + j * spacing;
          elements.push(drawLine(startX + 10, yy, endX - 10, yy, settings.staffColor || '#222222', settings.staffLineThickness || 0.5, `tab-${i}-${j}`));
        }
        sy += strings * spacing + gap;
      }
      break;
    }

    case 'calligraphy-music': {
      const spacing = settings.staffLineSpacing || 2;
      const gap = Math.max(settings.gapBetweenStaves || 15, 22);
      const maxStaves = Math.min(settings.stavesPerPage || 4, 8);
      for (let i = 0; i < maxStaves; i++) {
        const sy = startY + 18 + i * (4 * spacing + gap);
        if (sy + 4 * spacing > endY - 8) break;
        for (let j = 0; j < 5; j++) {
          const y = sy + j * spacing;
          elements.push(drawLine(startX + 10, y, endX - 10, y, settings.staffColor || '#555555', settings.staffLineThickness || 0.5, `cm-${i}-${j}`));
        }
      }
      break;
    }

    case 'pinyin-tianzi': {
      const cw = (endX - startX) / settings.charsPerRow;
      const rh = settings.rowHeight || 18;
      let y = startY;
      let row = 0;
      while (y + rh <= endY) {
        elements.push(drawLine(startX, y, endX, y, settings.cellBorderColor, 0.8, `pt-t-${row}`));
        elements.push(drawLine(startX, y + rh * 0.35, endX, y + rh * 0.35, settings.cellBorderColor, 0.45, `pt-m-${row}`, 0.55));
        const gridTop = y + rh * 0.35;
        const gridH = rh * 0.65;
        for (let c = 0; c < settings.charsPerRow; c++) {
          const x = startX + c * cw;
          elements.push(drawRect(x, gridTop, cw, gridH, settings.cellBorderColor, 0.8, `pt-r-${row}-${c}`));
          elements.push(drawLine(x + cw / 2, gridTop, x + cw / 2, gridTop + gridH, settings.innerDividerColor, 0.4, `pt-v-${row}-${c}`, 0.55));
          elements.push(drawLine(x, gridTop + gridH / 2, x + cw, gridTop + gridH / 2, settings.innerDividerColor, 0.4, `pt-h-${row}-${c}`, 0.55));
          elements.push(drawLine(x, gridTop, x + cw, gridTop + gridH, settings.innerDividerColor, 0.35, `pt-d1-${row}-${c}`, 0.45));
          elements.push(drawLine(x + cw, gridTop, x, gridTop + gridH, settings.innerDividerColor, 0.35, `pt-d2-${row}-${c}`, 0.45));
        }
        y += rh;
        row++;
      }
      break;
    }

    case 'composition': {
      const rows = Math.max(1, settings.compositionRows || 20);
      const cols = Math.max(1, settings.compositionCols || 20);
      const cellW = (endX - startX) / cols;
      const cellH = (endY - startY) / rows;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * cellW;
          const y = startY + r * cellH;
          elements.push(drawRect(x, y, cellW, cellH, settings.cellBorderColor, 0.35, `com-${r}-${c}`));
        }
      }
      break;
    }

    case 'arithmetic': {
      const cols = Math.max(1, settings.arithmeticCols || 4);
      const ph = settings.arithmeticProblemHeight || 22;
      const colW = (endX - startX) / cols;
      let y = startY;
      let row = 0;
      while (y + ph <= endY) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * colW;
          elements.push(drawRect(x + 0.5, y, colW - 1, ph, settings.cellBorderColor, 0.75, `arith-${row}-${c}`));
          elements.push(drawLine(x + 3, y + ph - 3, x + colW - 3, y + ph - 3, settings.lineColor, 0.45, `arith-line-${row}-${c}`));
        }
        y += ph + 3;
        row++;
      }
      break;
    }

    case 'english-practice': {
      const lineStep = settings.lineSpacing || 9;
      const initialY = startY + 12;
      for (let y = initialY; y < endY; y += lineStep) {
        elements.push(drawLine(startX, y, endX, y, settings.lineColor, settings.lineThickness, `ep-${y}`));
      }
      break;
    }

    case 'german-three-line': {
      const dm = Math.max(2, settings.germanRowSpacing || 4);
      const rowH = dm * 3;
      let y = startY + 4;
      while (y + rowH <= endY) {
        elements.push(drawLine(startX, y, endX, y, settings.lineColor, settings.lineThickness, `g3-t-${y}`));
        elements.push(drawLine(startX, y + dm, endX, y + dm, settings.lineColor, 0.45, `g3-m-${y}`, undefined, '4 4'));
        elements.push(drawLine(startX, y + 2 * dm, endX, y + 2 * dm, settings.lineColor, settings.lineThickness, `g3-b-${y}`));
        y += rowH + dm;
      }
      break;
    }

    case 'german-three-line-border': {
      const dm = Math.max(2, settings.germanRowSpacing || 4);
      const rowH = dm * 3;
      const bm = settings.borderMargin || 5;
      elements.push(drawRect(startX + bm, startY + bm, endX - startX - 2 * bm, endY - startY - 2 * bm, settings.lineColor, 0.9, 'g3-outer'));
      let y = startY + bm + 6;
      const innerEnd = endY - bm - 6;
      while (y + rowH <= innerEnd) {
        elements.push(drawLine(startX + bm + 2, y, endX - bm - 2, y, settings.lineColor, settings.lineThickness, `g3b-t-${y}`));
        elements.push(drawLine(startX + bm + 2, y + dm, endX - bm - 2, y + dm, settings.lineColor, 0.45, `g3b-m-${y}`, undefined, '4 4'));
        elements.push(drawLine(startX + bm + 2, y + 2 * dm, endX - bm - 2, y + 2 * dm, settings.lineColor, settings.lineThickness, `g3b-b-${y}`));
        y += rowH + dm;
      }
      break;
    }

    case 'brazilian-calligraphy': {
      const ang = (settings.slantAngle || 52) * (Math.PI / 180);
      const span = endY - startY;
      const step = 5;
      const dx = span / Math.tan(ang);
      for (let x0 = startX - span * 2; x0 < endX + span * 2; x0 += step) {
        elements.push(drawLine(x0, startY, x0 + dx, endY, settings.slantLineColor, 0.45, `bra-${x0}`));
      }
      break;
    }

    case 'huigongge': {
      const s = (endX - startX) / settings.charsPerRow;
      const rows = Math.floor((endY - startY) / s);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < settings.charsPerRow; c++) {
          const x = startX + c * s;
          const y = startY + r * s;
          elements.push(drawRect(x, y, s, s, settings.cellBorderColor, 0.85, `hg-o-${r}-${c}`));
          const inset = s * 0.15;
          elements.push(drawRect(x + inset, y + inset, s - 2 * inset, s - 2 * inset, settings.innerDividerColor, 0.5, `hg-i-${r}-${c}`));
        }
      }
      break;
    }

    case 'jiugongge': {
      const s = (endX - startX) / settings.charsPerRow;
      const rows = Math.floor((endY - startY) / s);
      const third = s / 3;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < settings.charsPerRow; c++) {
          const x = startX + c * s;
          const y = startY + r * s;
          elements.push(drawRect(x, y, s, s, settings.cellBorderColor, 0.85, `jg-o-${r}-${c}`));
          for (let i = 1; i < 3; i++) {
            elements.push(drawLine(x + i * third, y, x + i * third, y + s, settings.innerDividerColor, 0.4, `jg-v-${r}-${c}-${i}`, 0.55));
            elements.push(drawLine(x, y + i * third, x + s, y + i * third, settings.innerDividerColor, 0.4, `jg-h-${r}-${c}-${i}`, 0.55));
          }
        }
      }
      break;
    }

    case 'tianzi-grid': {
      const s = (endX - startX) / settings.charsPerRow;
      const rows = Math.floor((endY - startY) / s);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < settings.charsPerRow; c++) {
          const x = startX + c * s;
          const y = startY + r * s;
          elements.push(drawRect(x, y, s, s, settings.cellBorderColor, 0.85, `tz-o-${r}-${c}`));
          elements.push(drawLine(x + s / 2, y, x + s / 2, y + s, settings.innerDividerColor, 0.4, `tz-v-${r}-${c}`, 0.55));
          elements.push(drawLine(x, y + s / 2, x + s, y + s / 2, settings.innerDividerColor, 0.4, `tz-h-${r}-${c}`, 0.55));
        }
      }
      break;
    }

    case 'cross-grid': {
      const s = (endX - startX) / settings.charsPerRow;
      const rows = Math.floor((endY - startY) / s);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < settings.charsPerRow; c++) {
          const x = startX + c * s;
          const y = startY + r * s;
          elements.push(drawRect(x, y, s, s, settings.cellBorderColor, 0.85, `cx-${r}-${c}`));
          elements.push(drawLine(x, y, x + s, y + s, settings.innerDividerColor, 0.4, `cx-d1-${r}-${c}`, 0.55));
          elements.push(drawLine(x + s, y, x, y + s, settings.innerDividerColor, 0.4, `cx-d2-${r}-${c}`, 0.55));
        }
      }
      break;
    }

    case 'hardpen-huigongge': {
      const s = (endX - startX) / settings.charsPerRow;
      const rows = Math.floor((endY - startY) / s);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < settings.charsPerRow; c++) {
          const x = startX + c * s;
          const y = startY + r * s;
          elements.push(drawRect(x, y, s, s, settings.cellBorderColor, 1.2, `hh-o-${r}-${c}`));
          const inset = s * 0.15;
          elements.push(drawRect(x + inset, y + inset, s - 2 * inset, s - 2 * inset, settings.innerDividerColor, 0.85, `hh-i-${r}-${c}`));
        }
      }
      break;
    }

    case 'vintage-note': {
      if (settings.showMarginLine) {
        elements.push(drawLine(startX + settings.marginPosition, startY, startX + settings.marginPosition, endY, settings.marginLineColor, 0.9, 'vn-margin'));
      }
      const lineStep = settings.lineSpacing || 8;
      const initialY = startY + 20;
      for (let y = initialY; y < endY; y += lineStep) {
        elements.push(drawLine(startX + 4, y, endX - 4, y, settings.lineColor, 0.45, `vn-${y}`, 0.75));
      }
      break;
    }

    case 'children-drawing': {
      const step = Math.max(6, settings.gridSize || 12);
      for (let x = startX; x <= endX; x += step) {
        elements.push(drawLine(x, startY, x, endY, settings.lineColor, 0.35, `cd-v-${x}`, 0.5));
      }
      for (let y = startY; y <= endY; y += step) {
        elements.push(drawLine(startX, y, endX, y, settings.lineColor, 0.35, `cd-h-${y}`, 0.5));
      }
      break;
    }

    case 'minimal-journal': {
      const step = settings.gridSize || 6;
      for (let x = startX + step; x < endX; x += step) {
        for (let y = startY + step; y < endY; y += step) {
          elements.push(drawCircle(x, y, (settings.dotSize || 1) / 2, settings.dotColor || settings.lineColor, `mj-${x}-${y}`));
        }
      }
      break;
    }

    case 'student-note': {
      const head = 22;
      elements.push(drawLine(startX, startY + head, endX, startY + head, settings.dividerLineColor, 1, 'sn-h'));
      const lineStep = settings.lineSpacing || 8;
      for (let y = startY + head + lineStep; y < endY; y += lineStep) {
        elements.push(drawLine(startX + 2, y, endX - 2, y, settings.lineColor, settings.lineThickness, `sn-${y}`));
      }
      break;
    }

    case 'meeting-note': {
      const headerH = 28;
      elements.push(drawRect(startX, startY, endX - startX, headerH, settings.dividerLineColor, 1.2, 'mn-head'));
      elements.push(drawLine(startX, startY + headerH, endX, startY + headerH, settings.dividerLineColor, 1.2, 'mn-h1'));
      const colW = (endX - startX) / 3;
      elements.push(drawLine(startX + colW, startY + headerH, startX + colW, endY, settings.dividerLineColor, 0.9, 'mn-v1'));
      elements.push(drawLine(startX + 2 * colW, startY + headerH, startX + 2 * colW, endY, settings.dividerLineColor, 0.9, 'mn-v2'));
      const lineStep = settings.lineSpacing || 8;
      for (let col = 0; col < 3; col++) {
        const cx = startX + col * colW + 4;
        const cw = colW - 8;
        for (let y = startY + headerH + 10; y < endY; y += lineStep) {
          elements.push(drawLine(cx, y, cx + cw, y, settings.lineColor, 0.4, `mn-l-${col}-${y}`, 0.65));
        }
      }
      break;
    }

    case 'project-planning': {
      const bandH = 40;
      elements.push(drawLine(startX, startY + bandH, endX, startY + bandH, settings.dividerLineColor, 1.2, 'pp-h'));
      const cols = 4;
      const colW = (endX - startX) / cols;
      for (let i = 1; i < cols; i++) {
        const vx = startX + i * colW;
        elements.push(drawLine(vx, startY + bandH, vx, endY, settings.dividerLineColor, 0.85, `pp-v-${i}`));
      }
      const lineStep = settings.lineSpacing || 8;
      for (let y = startY + bandH + 8; y < endY; y += lineStep) {
        elements.push(drawLine(startX + 4, y, endX - 4, y, settings.lineColor, 0.4, `pp-${y}`, 0.6));
      }
      break;
    }

    case 'sketch-paper': {
      const step = Math.max(3, settings.gridSize || 5);
      for (let x = startX; x <= endX; x += step) {
        elements.push(drawLine(x, startY, x, endY, settings.lineColor, 0.25, `sk-v-${x}`, 0.35));
      }
      for (let y = startY; y <= endY; y += step) {
        elements.push(drawLine(startX, y, endX, y, settings.lineColor, 0.25, `sk-h-${y}`, 0.35));
      }
      break;
    }

    case 'creative-log': {
      const blockH = 42;
      let y = startY;
      let b = 0;
      while (y + blockH <= endY) {
        elements.push(drawLine(startX, y, endX, y, settings.dividerLineColor, 1, `cl-t-${b}`));
        elements.push(drawLine(startX + 18, y, startX + 18, y + blockH, settings.innerDividerColor, 0.5, `cl-d-${b}`, 0.55));
        const lineStep = settings.lineSpacing || 7;
        for (let ly = y + 12; ly < y + blockH - 4; ly += lineStep) {
          elements.push(drawLine(startX + 22, ly, endX - 4, ly, settings.lineColor, 0.35, `cl-${b}-${ly}`, 0.55));
        }
        y += blockH;
        b++;
      }
      break;
    }

    case 'blank':
      break;

    default:
      for (let y = startY + 10; y < endY; y += settings.lineSpacing || 8) {
        elements.push(drawLine(startX, y, endX, y, settings.lineColor, settings.lineThickness, `fallback-${y}`));
      }
      break;
  }

  return elements;
};
