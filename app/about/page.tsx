import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageSquare, Target, Lightbulb } from "lucide-react";

export default function AboutPage() {
  const sections = [
    {
      icon: <Lightbulb className="text-amber-500" size={32} />,
      title: "Our Story",
      content: "How Paperyus was born — the idea that everyone deserves perfectly formatted paper, whether students needing note paper, teachers needing teaching material, or office workers needing planning sheets. Market templates are expensive or low quality. Paperyus lets anyone create their own templates, adjust freely, and print whenever they want.",
    },
    {
        icon: <Target className="text-blue-600" size={32} />,
        title: "Mission Statement",
        content: "I believe everyone should be able to use paper that best suits them, rather than being constrained by limited market choices. This is the original intention of Paperyus — to let paper truly be yours!",
    },
    {
        icon: <MessageSquare className="text-emerald-500" size={32} />,
        title: "Vision",
        content: "Create a paper customization platform anyone can use. Whether student, teacher, designer, or office worker — find or create paper that best suits your needs.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter sm:text-7xl">
                About Paperyus
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
                Paperyus is more than just a paper generator. It&apos;s a tool for creativity, planning, and organization.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
            {sections.map((section, index) => (
                <div key={index} className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-xl group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center space-y-6">
                    <div className="p-5 bg-slate-50 rounded-3xl group-hover:bg-blue-50 transition-colors">
                        {section.icon}
                    </div>
                    <div className="space-y-4 max-w-3xl">
                        <h2 className="text-4xl font-extrabold text-gray-900">{section.title}</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">{section.content}</p>
                    </div>
                </div>
            ))}
        </div>

        <section className="mt-24 py-16 px-8 rounded-3xl bg-blue-600 text-white text-center space-y-6 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            
            <h2 className="text-3xl sm:text-4xl font-bold">Start creating your own paper now</h2>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
                No registration, no payment, completely free. Simple to use, professional results.
            </p>
            <Link
                href="/"
                className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
            >
                Launch App
            </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
