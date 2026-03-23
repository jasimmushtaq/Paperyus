"use client";

import React from "react";
import Link from "next/link";
import { FileText, Mail, Linkedin, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-gray-900">Paperyus</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Provide you with beautiful custom printable papers to meet all your creative needs.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                <Mail size={16} />
              </div>
              <a
                href="mailto:jasimmushtaq786@gmail.com"
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                jasimmushtaq786@gmail.com
              </a>
            </div>
            <p className="text-sm text-gray-700 font-medium">Jasim Mushtaq</p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.linkedin.com/in/jasim-mushtaq/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="Jasim Mushtaq on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/jasim__mushtaq?igsh=MXFyN2VobGd3MzR2bw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-700 hover:bg-pink-600 hover:text-white transition-colors"
                aria-label="Jasim Mushtaq on Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Support Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center space-y-1">
          <p className="text-xs text-gray-500">
            © 2026 Paperyus. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Jasim Mushtaq
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
