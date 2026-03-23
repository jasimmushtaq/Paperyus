"use client";

import React, { useEffect, Dispatch, SetStateAction } from "react";
import { PaperSettings, PaperCategory, PaperType, PaperSize, LineStyle } from "@/types/paper";
import { CATEGORIES, CATEGORY_TYPES } from "@/lib/paperTypes";
import { THEME_ORDER, THEME_PRESETS } from "@/lib/theme";
import SectionBlock from "./SectionBlock";
import { Download, Type, Settings } from "lucide-react";
import {
  type DownloadFormat,
  DOWNLOAD_FORMAT_OPTIONS,
} from "@/lib/paperExport";

interface ControlPanelProps {
  settings: PaperSettings;
  setSettings: Dispatch<SetStateAction<PaperSettings>>;
  onExportFormat: (format: DownloadFormat) => void | Promise<void>;
  exportBusy?: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  settings,
  setSettings,
  onExportFormat,
  exportBusy = false,
}) => {
  const updateSetting = <K extends keyof PaperSettings>(key: K, value: PaperSettings[K]) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleCategoryChange = (cat: PaperCategory) => {
    const firstType = CATEGORY_TYPES[cat][0];
    setSettings({ ...settings, category: cat, paperType: firstType });
  };

  useEffect(() => {
    setSettings((prev) => {
      const allowed = CATEGORY_TYPES[prev.category];
      if (!allowed?.length) return prev;
      if (!allowed.includes(prev.paperType)) {
        return { ...prev, paperType: allowed[0] };
      }
      return prev;
    });
  }, [settings.category, settings.paperType, setSettings]);

  const FieldLabel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <label className={`text-[9px] font-black text-gray-400 uppercase tracking-[0.15em] pl-1 mb-1.5 block ${className}`}>
      {children}
    </label>
  );

  const SliderField = ({
    label,
    value,
    min,
    max,
    step,
    name,
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    name: keyof PaperSettings;
  }) => (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center pr-1.5">
        <FieldLabel>{label}</FieldLabel>
        <span className="text-[10px] font-black text-blue-600 bg-blue-50/50 px-2 py-0.5 rounded-full ring-1 ring-blue-500/10">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => updateSetting(name, parseFloat(e.target.value))}
        className="w-full h-1 bg-gray-100 rounded-full appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
      />
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 shadow-[0_0_40px_rgba(0,0,0,0.02)] overflow-hidden font-sans select-none">
      {/* Scrollable Settings Area */}
      <div className="flex-1 overflow-y-auto p-7 space-y-8 scrollbar-none bg-white">
        
        {/* SECTION 1: CORE CONFIG */}
        <SectionBlock title="CORE CONFIGURATION" defaultOpen={true}>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5 col-span-2">
                <FieldLabel>Layout Category</FieldLabel>
                <select
                  value={settings.category}
                  onChange={(e) => handleCategoryChange(e.target.value as PaperCategory)}
                  className="w-full h-12 px-4 bg-gray-50/50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all cursor-pointer shadow-sm hover:bg-gray-100"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 col-span-2">
                <FieldLabel>Paper Layout</FieldLabel>
                <select
                  value={settings.paperType}
                  onChange={(e) => updateSetting("paperType", e.target.value as PaperType)}
                  className="w-full h-12 px-4 bg-gray-50/50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all cursor-pointer shadow-sm hover:bg-gray-100"
                >
                  {CATEGORY_TYPES[settings.category].map((type) => (
                    <option key={type} value={type}>{type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <FieldLabel>Paper Size</FieldLabel>
                <select
                  value={settings.paperSize}
                  onChange={(e) => updateSetting("paperSize", e.target.value as PaperSize)}
                  className="w-full h-12 px-4 bg-gray-50/50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl text-sm font-bold shadow-sm outline-none transition-all"
                >
                  <option value="A4">A4</option>
                  <option value="A3">A3</option>
                  <option value="A5">A5</option>
                  <option value="Letter">Letter</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>
              <div className="space-y-1.5 text-center">
                <FieldLabel className="text-center w-full">Orientation</FieldLabel>
                <div className="flex bg-gray-100/40 p-1.5 rounded-2xl h-12 border border-gray-100 shadow-inner">
                  <button
                    onClick={() => updateSetting("orientation", "portrait")}
                    className={`flex-1 flex items-center justify-center text-[9px] font-black rounded-xl transition-all ${
                      settings.orientation === "portrait" ? "bg-white shadow-xl text-blue-600 ring-1 ring-black/5" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    UPRIGHT
                  </button>
                  <button
                    onClick={() => updateSetting("orientation", "landscape")}
                    className={`flex-1 flex items-center justify-center text-[9px] font-black rounded-xl transition-all ${
                      settings.orientation === "landscape" ? "bg-white shadow-xl text-blue-600 ring-1 ring-black/5" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    FLIPPED
                  </button>
                </div>
              </div>
            </div>
            
            <SliderField label="Number of Sheets" value={settings.numberOfPages} min={1} max={50} step={1} name="numberOfPages" />

            <div className="space-y-1.5">
              <FieldLabel>Environmental Theme</FieldLabel>
              <div className="grid grid-cols-5 gap-2">
                 {THEME_ORDER.map((t) => (
                    <button 
                      key={t}
                      type="button"
                      onClick={() => updateSetting("theme", t)}
                      className={`h-11 rounded-xl border-2 transition-all p-1 ${
                        settings.theme === t ? "border-blue-600 ring-4 ring-blue-500/5 shadow-lg" : "border-gray-100 bg-gray-50/50 hover:bg-white"
                      }`}
                      title={THEME_PRESETS[t].label}
                    >
                      <div
                        className="w-full h-full rounded-lg border border-black/5"
                        style={{ backgroundColor: THEME_PRESETS[t].bg }}
                      />
                    </button>
                 ))}
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* SECTION 2: MARGINS */}
        <SectionBlock title="MARGINS & SPACING" defaultOpen={false}>
          <div className="grid grid-cols-2 gap-x-5 gap-y-6">
             <SliderField label="Top (mm)" value={settings.marginTop} min={0} max={100} step={1} name="marginTop" />
             <SliderField label="Bottom" value={settings.marginBottom} min={0} max={100} step={1} name="marginBottom" />
             <SliderField label="Left" value={settings.marginLeft} min={0} max={100} step={1} name="marginLeft" />
             <SliderField label="Right" value={settings.marginRight} min={0} max={100} step={1} name="marginRight" />
          </div>
        </SectionBlock>

        {/* SECTION 3: LINE STYLING */}
        <SectionBlock title="LAYOUT CUSTOMIZATION" defaultOpen={true}>
          <div className="space-y-6">
            <div className="space-y-1.5">
                <FieldLabel>Stroke Weight (px)</FieldLabel>
                <div className="flex bg-gray-100/40 p-1.5 rounded-2xl border border-gray-100">
                  {([0.3, 0.5, 0.8, 1.2, 2.0]).map(w => (
                    <button
                      key={w}
                      onClick={() => updateSetting("lineThickness", w)}
                      className={`flex-1 flex flex-col items-center justify-center h-10 transition-all rounded-xl relative ${
                        settings.lineThickness === w ? "bg-white shadow-xl text-blue-600 ring-1 ring-black/5" : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <div className="w-6 h-[0.5px] bg-current" style={{ height: `${w}px` }} />
                      <span className="text-[8px] font-bold mt-1">{w}</span>
                    </button>
                  ))}
                </div>
            </div>

            <div className="space-y-1.5">
              <FieldLabel>Line Style Pattern</FieldLabel>
              <div className="grid grid-cols-3 gap-2">
                 {(['solid', 'dashed', 'dotted'] as LineStyle[]).map(ls => (
                    <button
                      key={ls}
                      onClick={() => updateSetting("lineStyle", ls)}
                      className={`h-11 flex items-center justify-center rounded-xl border-2 transition-all font-black text-[9px] uppercase tracking-widest ${
                        settings.lineStyle === ls ? "border-blue-600 bg-blue-50/20 text-blue-700 shadow-lg" : "border-gray-100 text-gray-400 bg-gray-50/50 hover:bg-white"
                      }`}
                    >
                      {ls}
                    </button>
                 ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <FieldLabel>Stroke Color Palette</FieldLabel>
              <div className="flex items-center space-x-4 h-12 bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100">
                 <input 
                   type="color" 
                   value={settings.lineColor} 
                   onChange={(e)=>updateSetting("lineColor", e.target.value)} 
                   className="w-12 h-full p-0.5 bg-white border border-gray-200 rounded-xl cursor-pointer" 
                 />
                 <div className="flex-1 flex space-x-2">
                    {['#c0c0c0', '#4267B2', '#DB4437', '#0F9D58', '#F4B400'].map(c => (
                      <button 
                        key={c}
                        onClick={() => updateSetting("lineColor", c)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          settings.lineColor === c ? 'border-blue-600 scale-125 shadow-lg' : 'border-white'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                 </div>
              </div>
            </div>

            {/* Pattern specifics */}
            {['vertical-lined', 'grid', 'dot'].includes(settings.paperType) && (
               <SliderField 
                label={settings.paperType === 'grid' || settings.paperType === 'dot' ? "Cell Size (mm)" : "Line Spacing (mm)"} 
                value={settings.paperType === 'grid' || settings.paperType === 'dot' ? settings.gridSize : settings.lineSpacing} 
                min={2} max={25} step={0.5} 
                name={settings.paperType === 'grid' || settings.paperType === 'dot' ? "gridSize" : "lineSpacing"} 
              />
            )}
            
            {settings.paperType === 'cornell' && (
              <div className="space-y-5 p-5 bg-blue-50/20 rounded-2xl border border-blue-100/30">
                <SliderField label="Cue Area Width" value={settings.cornellCueWidth} min={30} max={120} step={5} name="cornellCueWidth" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <FieldLabel>Sidebar Side</FieldLabel>
                    <div className="flex bg-white/60 p-1 rounded-xl h-10 border border-blue-100">
                      <button onClick={() => updateSetting("cornellSidebarPosition", "left")} className={`flex-1 rounded-lg text-[8px] font-black transition-all ${settings.cornellSidebarPosition === "left" ? "bg-blue-600 text-white" : "text-gray-400"}`}>LEFT</button>
                      <button onClick={() => updateSetting("cornellSidebarPosition", "right")} className={`flex-1 rounded-lg text-[8px] font-black transition-all ${settings.cornellSidebarPosition === "right" ? "bg-blue-600 text-white" : "text-gray-400"}`}>RIGHT</button>
                    </div>
                  </div>
                  <SliderField label="Header" value={settings.cornellHeaderHeight} min={0} max={50} step={5} name="cornellHeaderHeight" />
                </div>
              </div>
            )}
          </div>
        </SectionBlock>

        {/* SECTION 4: EXTRAS */}
        <SectionBlock title="WATERMARK & PAGE" defaultOpen={false}>
          <div className="space-y-6">
            <div className="space-y-2">
              <FieldLabel>Watermark Protection</FieldLabel>
              <div className="relative">
                <input
                  type="text"
                  placeholder="COPYRIGHT, DRAFT, SAMPLE..."
                  value={settings.watermarkText}
                  onChange={(e) => updateSetting("watermarkText", e.target.value)}
                  className="w-full h-12 px-11 bg-gray-50/50 border-2 border-transparent focus:border-blue-500/20 rounded-2xl text-sm font-bold outline-none shadow-sm transition-all"
                />
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            {settings.watermarkText && (
               <div className="grid grid-cols-2 gap-x-5 gap-y-6 pb-4">
                  <SliderField label="Size" value={settings.watermarkFontSize} min={10} max={150} step={2} name="watermarkFontSize" />
                  <SliderField label="Rotate" value={settings.watermarkRotation} min={-180} max={180} step={5} name="watermarkRotation" />
                  <SliderField label="Visibility" value={settings.watermarkOpacity} min={0} max={100} step={5} name="watermarkOpacity" />
                  <div className="space-y-1.5">
                    <FieldLabel>Ghost Color</FieldLabel>
                    <input type="color" value={settings.watermarkColor} onChange={(e)=>updateSetting("watermarkColor", e.target.value)} className="w-full h-8 p-0.5 bg-white border-2 border-gray-100 rounded-xl" />
                  </div>
               </div>
            )}

            <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                     <Settings size={14} className="text-gray-500" />
                  </div>
                  <span className="text-[10px] font-black text-gray-700 tracking-wider">PAGE NUMBERING</span>
                </div>
                <button 
                  onClick={() => updateSetting("showPageNumbers", !settings.showPageNumbers)}
                  className={`w-11 h-6 rounded-full transition-all relative ${settings.showPageNumbers ? 'bg-blue-600 shadow-lg shadow-blue-500/20' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${settings.showPageNumbers ? 'right-1' : 'left-1'}`} />
                </button>
            </div>
          </div>
        </SectionBlock>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="p-7 border-t border-gray-50 bg-white space-y-4">
        <div className="flex items-center justify-between pl-1 pr-0.5">
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.15em]">
            Download
          </span>
          <Download size={14} className="text-gray-300" aria-hidden />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {DOWNLOAD_FORMAT_OPTIONS.map(({ format, label, hint }) => (
            <button
              key={format}
              type="button"
              disabled={exportBusy}
              onClick={() => void onExportFormat(format)}
              className={`h-11 rounded-xl border text-left px-3 py-2 transition-all flex flex-col justify-center ${
                format === "pdf"
                  ? "col-span-2 border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_10px_24px_-8px_rgba(37,99,235,0.45)] hover:from-blue-700 hover:to-indigo-700 border-transparent"
                  : "border-gray-100 bg-gray-50/50 hover:bg-gray-100 text-gray-800"
              } ${exportBusy ? "opacity-50 pointer-events-none" : "active:scale-[0.98]"}`}
            >
              <span
                className={`font-black text-[10px] uppercase tracking-widest ${
                  format === "pdf" ? "text-white" : "text-gray-800"
                }`}
              >
                {label}
              </span>
              <span
                className={`text-[8px] font-bold uppercase tracking-wide mt-0.5 ${
                  format === "pdf" ? "text-white/80" : "text-gray-400"
                }`}
              >
                {hint}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
