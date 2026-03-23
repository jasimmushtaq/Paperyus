import { capturePaper } from "./capturePaper";
import { downloadDataUrl } from "./downloadTrigger";

export type RasterFormat = "png" | "jpeg" | "webp";

export async function exportRaster(
  element: HTMLElement | null,
  format: RasterFormat,
  filename: string
) {
  if (!element) return;

  const lossy = format !== "png";
  const canvas = await capturePaper(element, {
    backgroundColor: lossy ? "#ffffff" : null,
  });
  if (!canvas) return;

  const mime =
    format === "png"
      ? "image/png"
      : format === "jpeg"
        ? "image/jpeg"
        : "image/webp";

  let dataUrl: string;
  let outName = filename;

  try {
    dataUrl =
      format === "png"
        ? canvas.toDataURL("image/png")
        : canvas.toDataURL(mime, 0.92);
  } catch {
    if (format === "webp") {
      dataUrl = canvas.toDataURL("image/png");
      outName = filename.replace(/\.webp$/i, ".png");
    } else {
      console.error("Raster export failed for", format);
      return;
    }
  }

  downloadDataUrl(dataUrl, outName);
}
