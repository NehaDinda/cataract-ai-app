import React, { useState, useEffect } from 'react';
import { X, Printer, ShieldCheck, Eye, FileText, UserCheck, Stethoscope, Edit3, Plus, Trash2, Check } from 'lucide-react';

export default function ReportModal({ isOpen, onClose, result, imageSrc, patientData }) {
  if (!isOpen || !result) return null;

  const [recommendations, setRecommendations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [doctorNotes, setDoctorNotes] = useState('');

  useEffect(() => {
    if (result && result.recommendations) {
      setRecommendations([...result.recommendations]);
    }
    if (result && result.doctorNotes) {
      setDoctorNotes(result.doctorNotes);
    }
  }, [result]);

  const handlePrint = () => {
    window.print();
  };

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

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const isCataract = result.label.toLowerCase().includes('cataract');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl my-8 print:m-0 print:p-6 print:shadow-none print:w-full print:max-w-none print:rounded-none">
        
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-sky-600" />
            <span className="font-bold text-slate-900 text-sm">Official Patient Diagnostic Clinical Report</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 border transition-all ${
                isEditing
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              {isEditing ? <Check className="w-4 h-4" /> : <Edit3 className="w-4 h-4 text-sky-600" />}
              <span>{isEditing ? 'Done Editing' : 'Edit Section 3 (Doctor)'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print Patient Report</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Eye className="w-8 h-8 text-sky-600 shrink-0" />
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                  {patientData?.clinicName || 'OptiAI Ocular Healthcare Institute'}
                </h1>
                <p className="text-xs font-mono text-slate-600">
                  Anterior Segment Ocular Lens Diagnostic Summary & Patient Report
                </p>
              </div>
            </div>
          </div>

          <div className="text-right font-mono text-xs text-slate-600 leading-tight">
            <div><strong className="text-slate-900">Report ID:</strong> RPT-{patientData?.patientId || Math.floor(100000 + Math.random() * 900000)}</div>
            <div><strong className="text-slate-900">Exam Date:</strong> {currentDate}</div>
            <div><strong className="text-slate-900">Examining Doctor:</strong> {patientData?.referringDoctor || 'Dr. Robert Vance, MD'}</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 mb-6">
          <h3 className="text-xs font-bold font-mono text-sky-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-sky-600" />
            <span>Section 1: Patient Demographics & Examination Target</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">PATIENT FULL NAME</span>
              <strong className="text-slate-900 text-sm">{patientData?.fullName || 'Anonymous Patient'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">PATIENT ID / MRN</span>
              <strong className="text-slate-900">{patientData?.patientId || 'PID-000000'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">AGE / GENDER</span>
              <strong className="text-slate-900">{patientData?.age || 'N/A'} yrs / {patientData?.gender || 'N/A'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">TARGET EYE</span>
              <strong className="text-sky-700 font-bold">{patientData?.affectedEye || 'OD (Right Eye)'}</strong>
            </div>
          </div>

          {patientData?.symptoms && patientData.symptoms.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-200 text-xs">
              <span className="text-slate-500 font-mono text-[10px] block">REPORTED SYMPTOMS:</span>
              <span className="text-slate-800 font-semibold">{patientData.symptoms.join(' • ')}</span>
            </div>
          )}
        </div>

        <div className="p-4 rounded-xl border-2 border-slate-900 mb-6 bg-slate-50/50">
          <h3 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Stethoscope className="w-4 h-4 text-sky-600" />
            <span>Section 2: Ocular Diagnostic Summary Report</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono mb-4">
            <div className="p-2.5 rounded-lg bg-white border border-slate-300">
              <span className="text-slate-500 block text-[10px]">DIAGNOSED CONDITION</span>
              <strong className={`text-sm ${isCataract ? 'text-amber-600' : 'text-emerald-600'}`}>
                {result.label}
              </strong>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-300">
              <span className="text-slate-500 block text-[10px]">DIAGNOSTIC ACCURACY</span>
              <strong className="text-slate-900 text-sm">{result.confidence}%</strong>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-300">
              <span className="text-slate-500 block text-[10px]">SEVERITY STAGE</span>
              <strong className="text-slate-900">{result.stage}</strong>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-300">
              <span className="text-slate-500 block text-[10px]">SURGICAL URGENCY</span>
              <strong className="text-sky-700">{result.surgicalUrgency || 'Monitor'}</strong>
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            <strong>Clinical Diagnosis Details:</strong> {result.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="h-44 rounded-xl overflow-hidden bg-black border border-slate-300 mb-1">
              <img src={imageSrc} alt="Patient Ocular Scan" className="w-full h-full object-contain" />
            </div>
            <span className="text-[11px] font-mono text-slate-500">Patient Ocular Image ({patientData?.affectedEye || 'Eye'})</span>
          </div>

          <div className="text-center">
            <div className="h-44 rounded-xl overflow-hidden bg-black border border-slate-300 mb-1">
              <img src={result.heatmapImage || imageSrc} alt="Grad-CAM Spatial Focus" className="w-full h-full object-contain" />
            </div>
            <span className="text-[11px] font-mono text-slate-500">Grad-CAM Lens Opacity Heatmap Focus</span>
          </div>
        </div>

        <div className="text-left text-xs mb-8 p-4 rounded-xl border border-sky-300 bg-sky-50/40">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-slate-900 font-mono uppercase text-xs flex items-center gap-2">
              <span>Section 3: Prescribed Next Steps & Clinical Recommendations</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-200 text-sky-800 font-mono print:hidden">
                Doctor Editable
              </span>
            </h4>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-[11px] text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1 print:hidden"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Save Edits' : 'Edit Section 3'}</span>
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-3 print:hidden">
              <div className="space-y-2">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={rec}
                      onChange={(e) => handleRecommendationChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      onClick={() => handleRemoveRecommendation(index)}
                      className="p-2 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddRecommendation}
                className="px-3 py-1.5 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 font-bold text-xs flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Custom Recommendation</span>
              </button>

              <div className="mt-4 pt-3 border-t border-sky-200">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Doctor's Custom Clinical & Prescription Notes
                </label>
                <textarea
                  rows={3}
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  placeholder="e.g. Prescribed Pataday 0.2% eye drops 1 drop OD once daily. Schedule slit-lamp re-assessment in 90 days."
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center space-x-1 ml-auto shadow"
                >
                  <Check className="w-4 h-4" />
                  <span>Save & Apply to Report</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <ul className="list-disc pl-5 space-y-1.5 text-slate-800 leading-relaxed font-sans">
                {recommendations.map((rec, i) => (
                  <li key={i} className="font-medium">{rec}</li>
                ))}
              </ul>

              {doctorNotes && (
                <div className="mt-3 p-3 rounded-lg bg-white border border-sky-200 text-slate-800 text-xs">
                  <strong className="text-sky-900 block font-mono text-[10px] uppercase mb-0.5">
                    Examining Physician Clinical Prescription Notes:
                  </strong>
                  <p className="italic leading-relaxed">{doctorNotes}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pt-8 border-t-2 border-slate-900 flex items-end justify-between font-mono text-xs text-slate-600">
          <div className="flex items-center space-x-1 text-emerald-700 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Clinical Diagnostic Evaluation Verified</span>
          </div>

          <div className="text-right space-y-8">
            <div className="w-64 border-b border-slate-900"></div>
            <div className="text-slate-900 font-bold text-[11px]">
              {patientData?.referringDoctor || 'Ophthalmologist Sign-off Signature'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
