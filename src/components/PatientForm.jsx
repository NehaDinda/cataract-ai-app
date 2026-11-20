import React, { useState } from 'react';
import { User, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function PatientForm({ patientData, setPatientData, onProceedToScan }) {
  const [formData, setFormData] = useState(
    patientData || {
      patientId: 'PID-' + Math.floor(100000 + Math.random() * 900000),
      fullName: '',
      age: '',
      gender: 'Male',
      contactNumber: '',
      email: '',
      clinicName: 'St. Jude Ocular Healthcare & Eye Institute',
      referringDoctor: 'Dr. Robert Vance, MD',
      affectedEye: 'OD (Right Eye)',
      symptoms: ['Blurry vision at distance', 'Increased glare during night driving']
    }
  );

  const symptomOptions = [
    'Blurry or cloudy vision at distance',
    'Increased glare or light halos when night driving',
    'Frequent changes in eyeglass prescription',
    'Fading or yellowing of colors',
    'Double vision in a single eye',
    'Need for brighter light for reading'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSymptom = (symptom) => {
    setFormData((prev) => {
      const exists = prev.symptoms.includes(symptom);
      return {
        ...prev,
        symptoms: exists
          ? prev.symptoms.filter((s) => s !== symptom)
          : [...prev.symptoms, symptom]
      };
    });
  };

  const handleFillDemoData = () => {
    setFormData({
      patientId: 'PID-784920',
      fullName: 'Eleanor Vance',
      age: '64',
      gender: 'Female',
      contactNumber: '+1 (555) 234-5678',
      email: 'eleanor.vance@example.com',
      clinicName: 'VisionCare Ocular Institute',
      referringDoctor: 'Dr. Alexander Hayes, MD',
      affectedEye: 'OD (Right Eye)',
      symptoms: [
        'Blurry or cloudy vision at distance',
        'Increased glare or light halos when night driving',
        'Fading or yellowing of colors'
      ]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      alert('Please enter Patient Full Name.');
      return;
    }
    if (!formData.age) {
      alert('Please enter Patient Age.');
      return;
    }
    setPatientData(formData);
    onProceedToScan();
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 text-left">
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              Step 01 of 03
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <User className="w-6 h-6 text-sky-500" />
              <span>Patient Medical Registration</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Enter patient demographics and ocular symptoms before running AI disease detection.
            </p>
          </div>

          <button
            type="button"
            onClick={handleFillDemoData}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/80 flex items-center space-x-1.5 transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Auto-Fill Demo Patient</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 font-mono mb-4">
              Patient Demographics & Identification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              
              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Patient ID / MRN
                </label>
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="sm:col-span-5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Johnathan Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Age (Years) *
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="e.g. 62"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="+1 (555) 000-0000"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="patient@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 font-mono mb-4">
              Clinical Context & Target Ocular Examination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              
              <div className="sm:col-span-6">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Healthcare Institute / Clinic
                </label>
                <input
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Examining Physician / Ophthalmologist
                </label>
                <input
                  type="text"
                  name="referringDoctor"
                  value={formData.referringDoctor}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="sm:col-span-12">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Target Eye for Examination
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['OD (Right Eye)', 'OS (Left Eye)', 'OU (Bilateral Both Eyes)'].map((eye) => (
                    <button
                      type="button"
                      key={eye}
                      onClick={() => setFormData((p) => ({ ...p, affectedEye: eye }))}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                        formData.affectedEye === eye
                          ? 'bg-sky-600 text-white border-sky-500 shadow-md ring-2 ring-sky-400/40'
                          : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-sky-400'
                      }`}
                    >
                      {eye}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 font-mono mb-2">
              Reported Patient Symptoms (Select all that apply)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {symptomOptions.map((symptom) => {
                const checked = formData.symptoms.includes(symptom);
                return (
                  <button
                    type="button"
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`p-3 rounded-xl text-xs text-left font-medium transition-all flex items-center justify-between border ${
                      checked
                        ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-400 text-sky-900 dark:text-sky-200'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <span>{symptom}</span>
                    {checked && <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white font-bold shadow-lg shadow-sky-500/25 border border-sky-400/30 flex items-center justify-center space-x-2 transition-transform active:scale-95"
            >
              <span>Save Patient & Proceed to Eye Scan</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
