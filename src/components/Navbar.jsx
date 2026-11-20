import React from 'react';
import { Eye, Activity, Sun, Moon, Cpu, Database, PlusCircle } from 'lucide-react';
import { CONFIG } from '../services/aiService';

export default function Navbar({
  darkMode,
  setDarkMode,
  onOpenTechModal,
  activeView,
  setActiveView,
  savedCount
}) {
  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div
            onClick={() => setActiveView('EXAM')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/25 ring-2 ring-sky-400/30 group-hover:scale-105 transition-transform">
              <Eye className="w-6 h-6 animate-pulse-slow" />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 via-sky-900 to-sky-700 dark:from-white dark:via-sky-200 dark:to-cyan-400 bg-clip-text text-transparent">
                  OptiAI <span className="text-sky-500 font-extrabold">Cataract</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  Ocular Diagnostic Suite
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                <Activity className="w-3 h-3 text-emerald-500" /> Automated Patient Clinical Workflow
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveView('EXAM')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeView === 'EXAM'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Patient Exam</span>
            </button>

            <button
              onClick={() => setActiveView('SAVED_REPORTS')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeView === 'SAVED_REPORTS'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-sky-400" />
              <span>Saved Database</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 text-sky-700 dark:text-sky-300 font-mono font-extrabold">
                {savedCount}
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenTechModal}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/60 text-xs font-medium transition-all shadow-sm active:scale-95"
            >
              <Cpu className="w-4 h-4 text-sky-500" />
              <span className="font-mono">Tech Specs</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-all active:scale-95"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
