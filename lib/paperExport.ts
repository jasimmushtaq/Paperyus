import type { RefObject } from "react";
import { PaperSettings } from "@/types/paper";
import { exportPDF } from "./exportPDF";
import { exportSVG } from "./exportSVG";
import { exportRaster } from "./exportRaster";
import { exportDocx } from "./exportDocx";
import { exportPptx } from "./exportPptx";

export type DownloadFormat =
  | "pdf"
  | "svg"
  | "png"
  | "jpeg"
  | "webp"
  | "docx"
  | "pptx";

export const DOWNLOAD_FORMAT_OPTIONS: {
  format: DownloadFormat;
  label: string;
  hint: string;
}[] = [
  { format: "pdf", label: "PDF", hint: "Print & share" },
  { format: "docx", label: "Word", hint: ".docx" },
  { format: "pptx", label: "PowerPoint", hint: ".pptx" },
  { format: "svg", label: "SVG", hint: "Vector" },
  { format: "png", label: "PNG", hint: "Raster" },
  { format: "jpeg", label: "JPEG", hint: ".jpg" },
  { format: "webp", label: "WebP", hint: "Web" },
];

export async function runPaperExport(
  format: DownloadFormat,
  paperRef: RefObject<HTMLDivElement | null>,
  svgRef: RefObject<SVGSVGElement | null>,
  settings: PaperSettings
) {
  const stamp = Date.now();
  const base = `paperyus-${settings.paperType}-${stamp}`;

  switch (format) {
    case "pdf":
      await exportPDF(paperRef.current, settings);
      return;
    case "svg":
      exportSVG(svgRef.current);
      return;
    case "png":
      await exportRaster(paperRef.current, "png", `${base}.png`);
      return;
    case "jpeg":
      await exportRaster(paperRef.current, "jpeg", `${base}.jpg`);
      return;
    case "webp":
      await exportRaster(paperRef.current, "webp", `${base}.webp`);
      return;
    case "docx":
      await exportDocx(paperRef.current, settings);
      return;
    case "pptx":
      await exportPptx(paperRef.current, settings);
      return;
    default:
      return;
  }
}
