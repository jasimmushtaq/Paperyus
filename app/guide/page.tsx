import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";
import { BookOpen, HelpCircle, Printer, Edit3 } from "lucide-react";

export default function GuidePage() {
  const faqItems = [
    {
      question: "Can I use it on mobile phones?",
      answer: "Yes, Paperyus supports mobile phones, tablets, and computers. Large screens are more convenient for operation.",
    },
    {
      question: "Is there a page limit for generated PDFs?",
      answer: "You can generate up to 100 pages at a time. If you need more, generate multiple times and merge them.",
    },
    {
      question: "How do I adjust line color and thickness?",
      answer: "In the 'Line Settings' section of the control panel, use the color picker to change color and the number input to adjust thickness. Changes are shown in real-time.",
    },
    {
      question: "Do I need to pay?",
      answer: "No, Paperyus is completely free to use. No signup or payment required.",
    },
  ];

  const sections = [
    {
      icon: <BookOpen className="text-blue-600" size={24} />,
      title: "Quick Start",
      content: "Welcome to Paperyus! Click 'Templates' in the navbar to select a template, or customize settings through the left control panel. After adjustments, use Download in the sidebar to save as PDF, Word, PowerPoint, SVG, PNG, JPEG, or WebP. Tip: Lined paper is suitable for notes, grid paper for calculations, and dot paper for drawing.",
    },
    {
        icon: <Edit3 className="text-blue-600" size={24} />,
        title: "Template Library",
        content: "We provide various paper templates, including lined paper, grid paper, dot paper, music paper, calligraphy paper, etc. Click any template to load it and customize further.",
    },
    {
        icon: <HelpCircle className="text-blue-600" size={24} />,
        title: "Custom Settings",
        content: "In the left control panel, you can adjust: Paper type and size, Line color, spacing, thickness, and style, Background color and watermark settings. The preview on the right updates in real-time — what you see is what you get.",
    },
    {
        icon: <Printer className="text-blue-600" size={24} />,
        title: "Export and Print",
        content: "Choose a format under Download (PDF for printing, Word or PowerPoint for slides and documents, or image formats for the web). Tip: Use high-quality printing paper. Double-sided printing saves paper. Generate up to 100 pages at a time.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                User Guide
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Everything you need to know about creating the perfect custom paper with Paperyus.
            </p>
        </section>

        {/* Documentation Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="mb-4 p-3 bg-blue-50 text-blue-600 rounded-xl inline-block group-hover:scale-110 transition-transform">
                        {section.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{section.content}</p>
                </div>
            ))}
        </section>

        {/* FAQ Section */}
        <section className="space-y-8 bg-blue-50/10 p-10 rounded-3xl border border-blue-100">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                <p className="text-gray-500">Quick answers to common inquiries.</p>
            </div>
            <FAQAccordion items={faqItems} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
