"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl mx-auto flex items-center justify-center"
          >
            <Heart size={40} className="fill-current" />
          </motion.div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight sm:text-7xl">
            Support Paperyus
          </h1>
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              Paperyus is completely free to use. If you find it helpful and would like to support its development and maintenance, your appreciation means a lot!
            </p>
            <p className="text-lg text-gray-500 italic">
              &ldquo;No matter the amount, every gesture warms our hearts. Thank you for choosing Paperyus!&rdquo;
            </p>
          </div>
        </div>

        <section className="max-w-xl mx-auto">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
              <Mail size={28} />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-gray-900">Contact us</h2>
              <a
                href="mailto:jasimmushtaq786@gmail.com"
                className="text-blue-600 font-medium hover:underline break-all"
              >
                jasimmushtaq786@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
