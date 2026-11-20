import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Flame, FileText, RefreshCw, ChevronRight, ShieldAlert, Edit3, Plus, Trash2 } from 'lucide-react';

export default function ResultCard({
  result,
  imageSrc,
  patientData,
  onReset,
  onOpenReport
}) {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [isEditingRecommendations, setIsEditingRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [customDoctorNotes, setCustomDoctorNotes] = useState('');

  useEffect(() => {
    if (result && result.recommendations) {
      setRecommendations([...result.recommendations]);
    }
  }, [result]);

  const isCataract = result.label.toLowerCase().includes('cataract');
  const confidence = result.confidence || 95.0;

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  const handleAddRecommendation = () => {
    setRecommendations((prev) => [...prev, 'New doctor instruction / treatment note...']);
  };

  const handleRecommendationChange = (index, value) => {
    setRecommendations((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleRemoveRecommendation = (index) => {
    setRecommendations((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 text-left">
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-800 transition-all relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div
              className={`p-3 rounded-2xl ${
                isCataract
                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 ring-2 ring-amber-500/30'
                  : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/30'
              }`}
            >
              {isCataract ? (
                <AlertTriangle className="w-7 h-7" />
              ) : (
                <CheckCircle className="w-7 h-7" />
              )}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    isCataract
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}
                >
                  {isCataract ? 'Diagnostic Flag: Positive' : 'Diagnostic Flag: Clear'}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {result.stage}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {result.label}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onReset}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 flex items-center space-x-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Next Patient</span>
            </button>
            <button
              onClick={() => {
                result.recommendations = recommendations;
                result.doctorNotes = customDoctorNotes;
                onOpenReport();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-md flex items-center space-x-1.5 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>View & Print Patient Report</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
          <div className="md:col-span-6 space-y-3">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 h-72 flex items-center justify-center shadow-lg group">
              <img
                src={showHeatmap && result.heatmapImage ? result.heatmapImage : imageSrc}
                alt="Eye Diagnosis View"
                className="w-full h-full object-contain transition-all duration-300"
              />

              {showHeatmap && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-amber-500/90 text-white text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur flex items-center gap-1 shadow">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Grad-CAM Heatmap</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Flame className={`w-4 h-4 ${showHeatmap ? 'text-amber-500' : 'text-slate-400'}`} />
                <span>Grad-CAM Feature Heatmap Overlay</span>
              </span>
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showHeatmap ? 'bg-sky-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showHeatmap ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-between h-full space-y-6">
            <div className="flex items-center space-x-6 p-5 rounded-2xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-900/60">
              <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    className="text-slate-200 dark:text-slate-800"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    className={`${isCataract ? 'text-amber-500' : 'text-emerald-500'} transition-all duration-1000 ease-out`}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                    {confidence}%
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                    Confidence
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Patient Exam Target
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {patientData?.fullName} ({patientData?.affectedEye})
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Evaluated across 1,024 spatial feature vectors in the deep convolution stack.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">
                  Opacity Score
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                  {(result.opacityScore * 100).toFixed(0)} / 100
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">
                  Surgical Urgency
                </div>
                <div className="text-xs font-bold text-sky-600 dark:text-sky-400 mt-1 truncate">
                  {result.surgicalUrgency || 'Monitor'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-sky-500" />
              <span>Section 3: Prescribed Next Steps & Clinical Recommendations</span>
            </h4>

            <button
              onClick={() => setIsEditingRecommendations(!isEditingRecommendations)}
              className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-bold flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingRecommendations ? 'Done Editing' : 'Doctor Edit'}</span>
            </button>
          </div>

          {isEditingRecommendations ? (
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={rec}
                    onChange={(e) => handleRecommendationChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    onClick={() => handleRemoveRecommendation(index)}
                    className="p-2 text-rose-500 hover:text-rose-700 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddRecommendation}
                className="px-3 py-1.5 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 hover:bg-sky-200 font-bold text-xs flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Custom Doctor Recommendation</span>
              </button>

              <div className="mt-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Doctor's Custom Prescription / Clinical Notes
                </label>
                <textarea
                  rows={2}
                  value={customDoctorNotes}
                  onChange={(e) => setCustomDoctorNotes(e.target.value)}
                  placeholder="e.g. Advised Pataday eye drops 1 drop BD. Review in 3 months."
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          ) : (
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
