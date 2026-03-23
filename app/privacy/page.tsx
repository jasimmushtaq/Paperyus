import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, EyeOff, Smartphone, Lock, Activity, Settings } from "lucide-react";

export default function PrivacyPage() {
  const points = [
    {
        icon: <ShieldCheck className="text-blue-600" size={24} />,
        title: "Respect and Protect",
        text: "Paperyus respects and protects the privacy rights of all users.",
    },
    {
        icon: <EyeOff className="text-blue-600" size={24} />,
        title: "No Collection",
        text: "We do not collect your personal identification information.",
    },
    {
        icon: <Smartphone className="text-blue-600" size={24} />,
        title: "Local Storage Only",
        text: "Your paper template settings are stored only on your local device and are not uploaded to our servers.",
    },
    {
        icon: <Activity className="text-blue-600" size={24} />,
        title: "No Selling",
        text: "We do not sell, trade, or transfer your information to third parties.",
    },
    {
        icon: <Lock className="text-blue-600" size={24} />,
        title: "Security Measures",
        text: "We take appropriate security measures to protect your information.",
    },
    {
        icon: <Settings className="text-blue-600" size={24} />,
        title: "Under Your Control",
        text: "Your settings data is stored locally and is completely under your control.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 space-y-12">
        <header className="text-center space-y-4">
            <h1 className="text-5xl font-black text-gray-900 tracking-tight sm:text-6xl">
                Privacy Policy
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Simple, transparent, and focused on protecting you.
            </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {points.map((point, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1">
                    <div className="mb-4 p-4 bg-slate-50 text-blue-600 rounded-2xl inline-block group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        {point.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{point.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{point.text}</p>
                </div>
            ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
