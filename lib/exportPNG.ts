import { exportRaster } from "./exportRaster";

export const exportPNG = async (element: HTMLElement | null) => {
  await exportRaster(
    element,
    "png",
    `paperyus-paper-${Date.now()}.png`
  );
};
