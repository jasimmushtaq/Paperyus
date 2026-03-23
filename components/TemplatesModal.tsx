"use client";

import React, { useState, useMemo } from "react";
import { X, Check, Search, Filter, LayoutGrid, ListTree } from "lucide-react";
import { motion } from "framer-motion";
import { templates, Template } from "@/lib/templates";
import { useCaseTemplates, USE_CASE_GROUPS } from "@/lib/useCases";
import { CATEGORIES } from "@/lib/paperTypes";
import { PaperCategory } from "@/types/paper";

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: Template) => void;
  currentTemplateId?: string;
}

const TemplateThumbnail: React.FC<{ type: string }> = ({ type }) => {
  const renderPattern = () => {
    switch (type) {
      case "grid":
      case "hexagonal":
      case "isometric":
        return (
          <g opacity="0.1" stroke="currentColor" strokeWidth="0.5">
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={i}>
                <line x1={i * 10} y1="0" x2={i * 10} y2="120" />
                <line x1="0" y1={i * 12} x2="100" y2={i * 12} />
              </React.Fragment>
            ))}
          </g>
        );
      case "dot":
        return (
          <g opacity="0.2" fill="currentColor">
            {[...Array(8)].map((_, i) =>
              [...Array(10)].map((_, j) => (
                <circle key={`${i}-${j}`} cx={10 + i * 11} cy={10 + j * 11} r="0.8" />
              ))
            )}
          </g>
        );
      case "blank":
        return null;
      default:
        return (
          <g opacity="0.1" stroke="currentColor" strokeWidth="0.5">
            {[...Array(12)].map((_, i) => (
              <line key={i} x1="10" y1={10 + i * 8} x2="90" y2={10 + i * 8} />
            ))}
            <line x1="25" y1="0" x2="25" y2="120" stroke="red" strokeWidth="0.5" opacity="0.5" />
          </g>
        );
    }
  };

  return (
    <svg viewBox="0 0 100 120" className="w-full h-full bg-slate-50">
      <rect width="100" height="120" fill="white" />
      {renderPattern()}
      <text x="50" y="110" textAnchor="middle" fontSize="6" fill="#cbd5e1" fontWeight="bold">
        {type.replace(/-/g, " ").toUpperCase()}
      </text>
    </svg>
  );
};

type ViewMode = "layouts" | "purpose";

const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentTemplateId,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("purpose");
  const [activeLayoutCategory, setActiveLayoutCategory] = useState<PaperCategory | "All">("All");
  const [activePurposeGroup, setActivePurposeGroup] = useState<string | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const layoutList = templates;
  const purposeList = useCaseTemplates;

  const filteredTemplates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const searchMode = q.length > 0;

    if (searchMode) {
      const fromLayouts = layoutList.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
      const fromPurpose = purposeList.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
      return [...fromPurpose, ...fromLayouts];
    }

    if (viewMode === "layouts") {
      if (activeLayoutCategory === "All") return layoutList;
      return layoutList.filter((t) => t.category === activeLayoutCategory);
    }

    if (activePurposeGroup === "All") return purposeList;
    return purposeList.filter((t) => t.category === activePurposeGroup);
  }, [
    searchQuery,
    viewMode,
    activeLayoutCategory,
    activePurposeGroup,
    layoutList,
    purposeList,
  ]);

  const clearFilters = () => {
    setActiveLayoutCategory("All");
    setActivePurposeGroup("All");
    setSearchQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="bg-white w-full max-w-6xl h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Paper Templates</h2>
            <p className="text-gray-500 mt-1 font-medium">
              Layout patterns and purpose presets — {purposeList.length + layoutList.length} options.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-900 hover:rotate-90"
          >
            <X size={28} />
          </button>
        </div>

        <div className="px-10 py-4 bg-gray-50/80 border-b border-gray-100 flex flex-wrap gap-3 shrink-0">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest self-center mr-2">
            Browse
          </span>
          <button
            type="button"
            onClick={() => {
              setViewMode("purpose");
              setSearchQuery("");
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === "purpose" && searchQuery === ""
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-400"
            }`}
          >
            <ListTree size={16} />
            By purpose
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode("layouts");
              setSearchQuery("");
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === "layouts" && searchQuery === ""
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-400"
            }`}
          >
            <LayoutGrid size={16} />
            Paper layouts
          </button>
        </div>

        <div className="px-10 py-5 bg-gray-50/50 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center gap-6 shrink-0">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2 xl:pb-0 max-w-full">
            {searchQuery === "" && viewMode === "layouts" && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setActiveLayoutCategory("All");
                    setSearchQuery("");
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                    activeLayoutCategory === "All"
                      ? "bg-blue-600 text-white shadow-blue-500/20"
                      : "bg-white text-gray-500 border border-gray-200 hover:border-blue-400"
                  }`}
                >
                  All layouts
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveLayoutCategory(cat);
                      setSearchQuery("");
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                      activeLayoutCategory === cat
                        ? "bg-blue-600 text-white shadow-blue-500/20"
                        : "bg-white text-gray-500 border border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </>
            )}
            {searchQuery === "" && viewMode === "purpose" && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setActivePurposeGroup("All");
                    setSearchQuery("");
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                    activePurposeGroup === "All"
                      ? "bg-blue-600 text-white shadow-blue-500/20"
                      : "bg-white text-gray-500 border border-gray-200 hover:border-blue-400"
                  }`}
                >
                  All purposes
                </button>
                {USE_CASE_GROUPS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setActivePurposeGroup(g);
                      setSearchQuery("");
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-sm max-w-[200px] truncate ${
                      activePurposeGroup === g
                        ? "bg-blue-600 text-white shadow-blue-500/20"
                        : "bg-white text-gray-500 border border-gray-200 hover:border-blue-400"
                    }`}
                    title={g}
                  >
                    {g}
                  </button>
                ))}
              </>
            )}
            {searchQuery.length > 0 && (
              <span className="text-xs font-bold text-blue-600 px-3 py-2 bg-blue-50 rounded-xl">
                Searching all purposes and layouts
              </span>
            )}
          </div>

          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="search"
              placeholder="Search by name, category, or layout…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl text-sm font-medium outline-none transition-all shadow-sm ring-4 ring-gray-100/50 focus:ring-blue-500/10 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 scrollbar-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 pb-10">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-white rounded-[1.5rem] overflow-hidden border-2 transition-all cursor-pointer group ${
                  currentTemplateId === template.id
                    ? "border-blue-500 bg-blue-50/10 shadow-xl"
                    : "border-transparent shadow-lg shadow-gray-200/50 hover:shadow-2xl"
                }`}
                onClick={() => onSelect(template)}
              >
                <div className="h-48 relative bg-slate-50 overflow-hidden border-b border-gray-50">
                  <TemplateThumbnail type={template.settings.paperType} />

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg">
                      <Check size={16} />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 max-w-[85%]">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[9px] font-black text-gray-600 tracking-wider shadow-sm border border-white line-clamp-2 leading-tight">
                      {template.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-[11px] font-medium text-gray-400 mt-2 line-clamp-2 leading-relaxed uppercase tracking-wide">
                    {template.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-6 pt-20">
              <div className="p-6 bg-gray-50 rounded-full">
                <Filter size={64} strokeWidth={1} />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-800">No matches found</p>
                <p className="text-sm font-medium mt-1">Try a different category or search term.</p>
              </div>
              <button
                type="button"
                onClick={clearFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-full text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TemplatesModal;
