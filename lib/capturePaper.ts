import html2canvas from "html2canvas";

export type CaptureOptions = {
  /** Opaque backgrounds for JPEG/WebP; keep null for PNG/SVG workflow. */
  backgroundColor: string | null;
};

export async function capturePaper(
  element: HTMLElement | null,
  options: CaptureOptions = { backgroundColor: null }
) {
  if (!element) return null;
  return html2canvas(element, {
    scale: 3,
    useCORS: true,
    backgroundColor: options.backgroundColor,
    logging: false,
  });
}
