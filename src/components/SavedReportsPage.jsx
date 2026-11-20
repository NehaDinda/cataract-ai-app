import React, { useState } from 'react';
import { Database, Search, Printer, Trash2, Download, Plus, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

export default function SavedReportsPage({
  reports,
  onViewReport,
  onDeleteReport,
  onNewPatientScan
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const filteredReports = reports.filter((item) => {
    const pName = item.patientData?.fullName?.toLowerCase() || '';
    const pId = item.patientData?.patientId?.toLowerCase() || '';
    const docName = item.patientData?.referringDoctor?.toLowerCase() || '';
    const label = item.result?.label?.toLowerCase() || '';
    const query = searchTerm.toLowerCase();

    const matchesSearch = pName.includes(query) || pId.includes(query) || docName.includes(query) || label.includes(query);

    if (!matchesSearch) return false;

    if (filterCategory === 'CATARACT') return label.includes('cataract');
    if (filterCategory === 'NORMAL') return label.includes('normal') || label.includes('clear');
    if (filterCategory === 'HIGH_URGENCY') return item.result?.riskLevel === 'High' || item.result?.surgicalUrgency?.toLowerCase().includes('surgery');

    return true;
  });

  const totalCount = reports.length;
  const cataractCount = reports.filter((r) => r.result?.label?.toLowerCase().includes('cataract')).length;
  const normalCount = reports.filter((r) => r.result?.label?.toLowerCase().includes('normal')).length;
  const highUrgencyCount = reports.filter((r) => r.result?.riskLevel === 'High' || r.result?.surgicalUrgency?.toLowerCase().includes('surgery')).length;

  const handleExportCSV = () => {
    if (reports.length === 0) return;

    let csvContent = 'data:text/csv;charset=utf-8,Patient ID,Full Name,Age,Gender,Target Eye,Diagnosis,Confidence %,Stage,Doctor,Exam Date\n';

    reports.forEach((r) => {
      const row = [
        r.patientData?.patientId || '',
        `"${r.patientData?.fullName || ''}"`,
        r.patientData?.age || '',
        r.patientData?.gender || '',
        r.patientData?.affectedEye || '',
        `"${r.result?.label || ''}"`,
        r.result?.confidence || '',
        `"${r.result?.stage || ''}"`,
        `"${r.patientData?.referringDoctor || ''}"`,
        new Date(r.timestamp).toLocaleDateString()
      ].join(',');
      csvContent += row + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `optiai_patient_reports_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-8 text-left space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
            System Patient Archives
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            <Database className="w-7 h-7 text-sky-500" />
            <span>Saved Patient Diagnostic Database</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Central repository of all patient ocular diagnostic reports saved in the system.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 flex items-center space-x-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-sky-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onNewPatientScan}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white shadow-lg shadow-sky-500/25 border border-sky-400/30 flex items-center space-x-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Patient Exam</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">Total Saved</span>
            <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">{totalCount}</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Patient records archived</p>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-amber-500 uppercase">Cataract Cases</span>
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">{cataractCount}</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Positive opacity flagged</p>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-emerald-500 uppercase">Healthy / Clear</span>
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{normalCount}</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Normal lens scans</p>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-rose-500 uppercase">High Priority</span>
            <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">{highUrgencyCount}</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Surgery recommended</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Patient Name, ID, Doctor, or Condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'ALL', label: 'All Records' },
            { id: 'CATARACT', label: 'Cataracts' },
            { id: 'NORMAL', label: 'Healthy / Clear' },
            { id: 'HIGH_URGENCY', label: 'High Urgency' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === tab.id
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
        {filteredReports.length === 0 ? (
          <div className="text-center py-12">
            <Database className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
              No Patient Reports Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
              Try adjusting your search filter or add a new patient examination.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                  <th className="py-3 px-4">Patient Name / MRN</th>
                  <th className="py-3 px-4">Demographics</th>
                  <th className="py-3 px-4">Diagnosed Condition</th>
                  <th className="py-3 px-4">Confidence</th>
                  <th className="py-3 px-4">Examining Doctor</th>
                  <th className="py-3 px-4">Exam Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
                {filteredReports.map((record) => {
                  const isCataract = record.result?.label?.toLowerCase().includes('cataract');
                  const pId = record.id || record.patientData?.patientId;

                  return (
                    <tr key={pId} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {record.patientData?.fullName || 'Patient'}
                        </div>
                        <div className="font-mono text-[11px] text-sky-600 dark:text-sky-400">
                          {record.patientData?.patientId}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono text-slate-700 dark:text-slate-300">
                        <div>{record.patientData?.age} yrs ({record.patientData?.gender})</div>
                        <div className="text-[10px] text-sky-600 dark:text-sky-400 font-bold">{record.patientData?.affectedEye}</div>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isCataract
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}
                        >
                          {record.result?.label}
                        </span>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">{record.result?.stage}</div>
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {record.result?.confidence}%
                      </td>

                      <td className="py-4 px-4 font-mono text-slate-600 dark:text-slate-400">
                        {record.patientData?.referringDoctor || 'Dr. Vance, MD'}
                      </td>

                      <td className="py-4 px-4 font-mono text-slate-500 text-[11px]">
                        {new Date(record.timestamp || Date.now()).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => onViewReport(record)}
                            className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center space-x-1 shadow-sm transition-all"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print Report</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete report for ${record.patientData?.fullName}?`)) {
                                onDeleteReport(pId);
                              }
                            }}
                            className="p-1.5 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
