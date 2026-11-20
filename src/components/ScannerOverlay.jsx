import React, { useEffect, useState } from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';

export default function ScannerOverlay({ imageSrc }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Initializing Tensor Array', detail: 'Normalizing image pixels to [224 x 224 x 3]...' },
    { label: 'Convolutional Layer Extraction', detail: 'Analyzing pupil lens clarity & edge opacity scattering...' },
    { label: 'Grad-CAM Attention Mapping', detail: 'Computing spatial feature heatmap & Softmax probability...' },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 700);
    const timer2 = setTimeout(() => setCurrentStep(2), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-sky-500/40 bg-slate-900/90 text-white shadow-2xl relative overflow-hidden">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/30">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <span>Ocular Image Scanner Active</span>
                <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
              </h3>
              <p className="text-xs text-sky-300/70 font-mono">Model: DeepLens-Net v2.4 (DenseNet-121)</p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-sky-950 border border-sky-800 text-[11px] font-mono text-sky-400">
            Scanning... {Math.min(100, Math.floor(((currentStep + 1) / 3) * 100))}%
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="relative rounded-2xl overflow-hidden border border-sky-500/50 bg-black h-72 flex items-center justify-center shadow-inner">
            <img src={imageSrc} alt="Scanning Eye" className="w-full h-full object-contain filter contrast-125" />
            
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#38bdf8] animate-laser z-20"></div>

            <div className="absolute inset-0 border border-sky-500/20 pointer-events-none flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-sky-400/40 border-dashed animate-spin" style={{ animationDuration: '12s' }}></div>
              <div className="absolute w-2 h-2 bg-sky-400 rounded-full"></div>
            </div>

            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur text-[10px] font-mono text-cyan-300 border border-cyan-500/40">
              [LENS REGION ROI LOCKED]
            </div>
          </div>

          <div className="space-y-4 text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-400 font-mono">
              Inference Sequence
            </h4>

            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all duration-300 ${
                  idx <= currentStep
                    ? 'bg-slate-800/80 border-sky-500/40 text-white'
                    : 'bg-slate-900/40 border-slate-800/50 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold font-mono flex items-center gap-2">
                    {idx <= currentStep ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-600 inline-block"></span>
                    )}
                    <span>{step.label}</span>
                  </span>
                  <span className="text-[10px] font-mono text-sky-400">Step {idx + 1}/3</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono leading-relaxed pl-5">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
