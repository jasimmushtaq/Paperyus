import { PaperSettings } from "@/types/paper";
import { capturePaper } from "./capturePaper";
import { paperSizes } from "./paperSettings";

export async function exportPptx(
  element: HTMLElement | null,
  settings: PaperSettings
) {
  if (!element) return;

  const canvas = await capturePaper(element, { backgroundColor: null });
  if (!canvas) return;

  const { default: PptxGenJS } = await import("pptxgenjs");

  const dataUrl = canvas.toDataURL("image/png", 1);

  const base = paperSizes[settings.paperSize];
  const widthMm =
    settings.orientation === "portrait" ? base.width : base.height;
  const heightMm =
    settings.orientation === "portrait" ? base.height : base.width;
  const widthIn = widthMm / 25.4;
  const heightIn = heightMm / 25.4;

  const pptx = new PptxGenJS();
  pptx.author = "Paperyus";
  pptx.title = "Paperyus paper";

  const layoutName = `PAPER_${settings.paperSize}_${settings.orientation}`;
  pptx.defineLayout({ name: layoutName, width: widthIn, height: heightIn });
  pptx.layout = layoutName;

  for (let i = 0; i < settings.numberOfPages; i++) {
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addImage({
      data: dataUrl,
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
    });
  }

  await pptx.writeFile({
    fileName: `paperyus-${settings.paperType}-${Date.now()}.pptx`,
  });
}
