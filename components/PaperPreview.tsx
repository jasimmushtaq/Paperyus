"use client";

import React, { useMemo } from "react";
import { PaperSettings } from "@/types/paper";
import { paperSizes } from "@/lib/paperSettings";
import { THEME_PRESETS } from "@/lib/theme";
import { renderPaperElements } from "@/lib/renderPaper";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface PaperPreviewProps {
  settings: PaperSettings;
  paperRef: React.RefObject<HTMLDivElement | null>;
  svgRef: React.RefObject<SVGSVGElement | null>;
  zoom: number;
  setZoom: (zoom: number) => void;
}

const PaperPreview: React.FC<PaperPreviewProps> = ({
  settings,
  paperRef,
  svgRef,
  zoom,
  setZoom,
}) => {
  const { paperSize, orientation, theme, watermarkText } = settings;
  const dimensions = paperSizes[paperSize];
  const themeColors = THEME_PRESETS[theme] ?? THEME_PRESETS.default;

  // Final Background color based on theme and personal choice
  const finalBg = settings.theme === 'default' ? settings.backgroundColor : themeColors.bg;

  // Paper dimensions in mm
  const width = orientation === "portrait" ? dimensions.width : dimensions.height;
  const height = orientation === "portrait" ? dimensions.height : dimensions.width;

  const elements = useMemo(() => {
    // If theme is not default, override lineColor in elements
    const themedSettings = {
      ...settings,
      lineColor: settings.theme === 'default' ? settings.lineColor : themeColors.line,
    };
    return renderPaperElements(themedSettings, width, height);
  }, [settings, width, height, themeColors]);

  // Zoom handlers
  const handleZoomIn = () => setZoom(Math.min(zoom + 0.1, 2));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.1, 0.2));
  const handleResetZoom = () => setZoom(0.8);

  return (
    <div className="w-full h-full flex flex-col items-center bg-slate-100 relative overflow-hidden">
      {/* Zoom Controls */}
      <div className="absolute top-6 right-6 z-20 flex flex-col space-y-3">
        <button
          onClick={handleZoomIn}
          className="p-3 bg-white/90 backdrop-blur rounded-full shadow-xl hover:bg-blue-600 hover:text-white transition-all text-gray-700 active:scale-95"
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-3 bg-white/90 backdrop-blur rounded-full shadow-xl hover:bg-blue-600 hover:text-white transition-all text-gray-700 active:scale-95"
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={handleResetZoom}
          className="p-3 bg-white/90 backdrop-blur rounded-full shadow-xl hover:bg-blue-600 hover:text-white transition-all text-gray-700 active:scale-95"
          title="Reset"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {/* Pages Container */}
      <div className="flex-1 w-full overflow-auto p-12 flex flex-col items-center space-y-12 scrollbar-none">
        <motion.div
          ref={paperRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative origin-top bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
          style={{
            width: `${width * (96 / 25.4) * zoom}px`,
            height: `${height * (96 / 25.4) * zoom}px`,
            backgroundColor: finalBg,
          }}
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Background Rect for color if not pure white */}
            <rect width={width} height={height} fill={finalBg} />

            {/* Paper Patterns */}
            {elements}

            {/* Watermark */}
            {watermarkText && (
              <text
                x={width / 2}
                y={height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={settings.watermarkFontSize}
                fill={settings.watermarkColor}
                opacity={settings.watermarkOpacity / 100}
                transform={`rotate(${settings.watermarkRotation}, ${width / 2}, ${height / 2})`}
                style={{ pointerEvents: "none", userSelect: "none", fontFamily: 'sans-serif', fontWeight: '900' }}
              >
                {watermarkText}
              </text>
            )}

            {/* Optional Border */}
            {settings.showBorder && (
              <rect
                x={settings.marginLeft}
                y={settings.marginTop}
                width={width - settings.marginLeft - settings.marginRight}
                height={height - settings.marginTop - settings.marginBottom}
                fill="none"
                stroke={settings.borderColor}
                strokeWidth={settings.borderThickness}
              />
            )}
          </svg>
        </motion.div>

        {/* Page Indicator */}
        <div className="py-2.5 px-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 bg-white/40 backdrop-blur-md rounded-full border border-white/40 shadow-sm flex items-center space-x-3">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          <span>Page 1 of {settings.numberOfPages}</span>
        </div>
      </div>
    </div>
  );
};

export default PaperPreview;
