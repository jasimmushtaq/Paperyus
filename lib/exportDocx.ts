import {
  AlignmentType,
  Document,
  ImageRun,
  Packer,
  PageBreak,
  PageOrientation,
  Paragraph,
  type ParagraphChild,
} from "docx";
import { PaperSettings } from "@/types/paper";
import { capturePaper } from "./capturePaper";
import { downloadBlob } from "./downloadTrigger";
import { paperSizes } from "./paperSettings";

function mmToTwip(mm: number) {
  return Math.round((mm / 25.4) * 1440);
}

function mmToEmu(mm: number) {
  return Math.round((mm / 25.4) * 914400);
}

function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1] ?? "";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function exportDocx(
  element: HTMLElement | null,
  settings: PaperSettings
) {
  if (!element) return;

  const canvas = await capturePaper(element, { backgroundColor: null });
  if (!canvas) return;

  const pngDataUrl = canvas.toDataURL("image/png", 1);
  const pngBytes = dataUrlToUint8Array(pngDataUrl);

  const base = paperSizes[settings.paperSize];
  const widthMm =
    settings.orientation === "portrait" ? base.width : base.height;
  const heightMm =
    settings.orientation === "portrait" ? base.height : base.width;

  const contentW = Math.max(
    1,
    widthMm - settings.marginLeft - settings.marginRight
  );
  const contentH = Math.max(
    1,
    heightMm - settings.marginTop - settings.marginBottom
  );
  const widthEmu = mmToEmu(contentW);
  const heightEmu = mmToEmu(contentH);

  const children: Paragraph[] = [];
  for (let i = 0; i < settings.numberOfPages; i++) {
    const runChildren: ParagraphChild[] = [
      new ImageRun({
        type: "png",
        data: pngBytes,
        transformation: {
          width: widthEmu,
          height: heightEmu,
        },
      }),
    ];
    if (i < settings.numberOfPages - 1) {
      runChildren.push(new PageBreak());
    }
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: runChildren,
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: mmToTwip(widthMm),
              height: mmToTwip(heightMm),
              orientation:
                settings.orientation === "portrait"
                  ? PageOrientation.PORTRAIT
                  : PageOrientation.LANDSCAPE,
            },
            margin: {
              top: mmToTwip(settings.marginTop),
              right: mmToTwip(settings.marginRight),
              bottom: mmToTwip(settings.marginBottom),
              left: mmToTwip(settings.marginLeft),
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlob(
    blob,
    `paperyus-${settings.paperType}-${Date.now()}.docx`
  );
}
