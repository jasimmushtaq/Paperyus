import jsPDF from "jspdf";
import { PaperSettings } from "@/types/paper";
import { capturePaper } from "./capturePaper";

export async function exportPDF(element: HTMLDivElement | null, settings: PaperSettings) {
  if (!element) return;

  const { orientation, numberOfPages } = settings;

  const pdf = new jsPDF({
    orientation: orientation === "portrait" ? "p" : "l",
    unit: "mm",
  });

  const canvas = await capturePaper(element, { backgroundColor: null });
  if (!canvas) return;

  const imgData = canvas.toDataURL("image/png", 1.0);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < numberOfPages; i++) {
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
  }

  pdf.save(`paperyus-${settings.paperType}-${new Date().getTime()}.pdf`);
}
