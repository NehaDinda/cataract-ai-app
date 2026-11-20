import React from 'react';
import { X, Cpu, Layers, Activity, Terminal } from 'lucide-react';
import { CONFIG } from '../services/aiService';

export default function TechnicalDetailsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-card rounded-3xl p-6 sm:p-8 bg-slate-900 text-white border border-sky-500/40 shadow-2xl my-8 max-h-[90vh] overflow-y-auto text-left">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono">Technical AI Specs & Model Architecture</h3>
              <p className="text-xs text-sky-400 font-mono">{CONFIG.MODEL_NAME}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <h4 className="text-xs font-bold font-mono text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Neural Backbone & Layer Configuration</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Backbone</span>
                <span className="text-white font-bold">DenseNet-121</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Input Tensor</span>
                <span className="text-white font-bold">224 x 224 x 3</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">ROC-AUC</span>
                <span className="text-emerald-400 font-bold">0.987</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Heatmap Layer</span>
                <span className="text-sky-400 font-bold">conv5_block16</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <h4 className="text-xs font-bold font-mono text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>Python FastAPI / PyTorch Integration Endpoint Snippet</span>
            </h4>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-sky-200 overflow-x-auto">
              <pre className="text-[11px] leading-relaxed">
{`from fastapi import FastAPI, UploadFile, File
import torch
import PIL.Image

app = FastAPI()
model = torch.load("cataract_densenet121.pth")
model.eval()

@app.post("/predict")
async def predict_cataract(file: UploadFile = File(...)):
    img = PIL.Image.open(file.file).convert("RGB")
    tensor = transform(img).unsqueeze(0)
    
    with torch.no_grad():
        output = model(tensor)
        prob = torch.softmax(output, dim=1)[0]
        
    return {
        "prediction": "Cataract Detected" if prob[1] > 0.5 else "Normal",
        "confidence": float(prob.max() * 100),
        "stage": "Stage 2 Moderate"
    }`}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all"
          >
            Close Tech Specs
          </button>
        </div>

      </div>
    </div>
  );
}
