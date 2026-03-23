import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paperyus - Free Online Custom Paper Generator",
  description: "Create and customize your own printable paper templates. Lined, grid, dot, music, calligraphy, and more. Export as PDF, Word, PowerPoint, SVG, PNG, JPEG, or WebP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
