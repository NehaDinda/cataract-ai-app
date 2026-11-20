import React from 'react';
import { Eye, ShieldCheck, Heart, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          <div className="md:col-span-5 space-y-3 text-left">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
                <Eye className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                AI Cataract Detection System
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              State-of-the-art deep learning platform engineered for ocular anterior segment analysis, cataract triage, and clinical decision support.
            </p>
          </div>

          <div className="md:col-span-4 space-y-2 text-left p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center space-x-1.5 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Medical Disclaimer</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              This system is designed as an AI decision-support screening tool and does not replace a clinical examination by a licensed Ophthalmologist or Optometrist.
            </p>
          </div>

          <div className="md:col-span-3 text-left md:text-right space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Developer Info
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center md:justify-end gap-1.5">
              <span>Engineered with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for Medical AI</span>
            </p>
            <div className="flex items-center md:justify-end space-x-3 text-xs text-sky-600 dark:text-sky-400 font-mono">
              <span className="flex items-center gap-1">
                <Code className="w-3.5 h-3.5" /> React + Vite + Tailwind
              </span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} AI Cataract Detection System. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0 font-mono text-[11px]">
            <span>Version 2.4.0</span>
            <span>•</span>
            <span>Live Webcam Enabled</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
