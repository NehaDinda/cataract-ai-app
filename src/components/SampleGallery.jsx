import React from 'react';
import { SAMPLE_EYES } from '../utils/sampleData';
import { Eye, Check } from 'lucide-react';

export default function SampleGallery({ onSelectSample, activePresetId }) {
  return (
    <div className="w-full max-w-4xl mx-auto my-6 text-left">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-sky-500" />
            <span>Preset Eye Scan Test Gallery</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any sample image below to test the classifier instantly without uploading.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {SAMPLE_EYES.map((sample) => {
          const isSelected = activePresetId === sample.id;
          return (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className={`group relative rounded-2xl p-3 text-left transition-all duration-300 glass-card border ${
                isSelected
                  ? 'border-sky-500 ring-2 ring-sky-500/30 scale-[1.02] shadow-lg'
                  : 'border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-600'
              }`}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-black border border-slate-800">
                <img
                  src={sample.image}
                  alt={sample.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900/80 backdrop-blur text-sky-300 border border-sky-500/30">
                  {sample.category}
                </span>

                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shadow">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                {sample.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate">
                {sample.stage}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
