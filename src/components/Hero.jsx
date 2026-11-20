import React from 'react';
import { Eye, Sparkles, Zap, Award, ArrowDown, Activity, ShieldCheck } from 'lucide-react';

export default function Hero({ onScrollToUpload }) {
  return (
    <section className="relative pt-10 pb-12 md:pt-14 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-25">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-sky-400/30 via-cyan-400/20 to-blue-600/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-sky-100/80 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Deep Learning Ocular Screening Suite</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
          <span className="font-mono text-sky-600 dark:text-sky-400">98.7% Validation Accuracy</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-6">
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            AI Cataract Detection System
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Automated lens opacity classification, live webcam capture, nuclear density grading, and Grad-CAM heatmap visualization.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={onScrollToUpload}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white font-semibold shadow-xl shadow-sky-500/25 border border-sky-400/30 flex items-center justify-center space-x-2.5 transition-all transform hover:-translate-y-0.5 active:scale-95 group"
          >
            <Eye className="w-5 h-5 text-sky-100 group-hover:scale-110 transition-transform" />
            <span>Start Patient Examination</span>
            <ArrowDown className="w-4 h-4 text-sky-200 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
