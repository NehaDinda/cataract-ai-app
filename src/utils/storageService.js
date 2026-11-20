const STORAGE_KEY = 'optiai_saved_patient_reports_v1';

const INITIAL_RECORDS = [
  {
    id: 'RPT-784920',
    patientData: {
      patientId: 'PID-784920',
      fullName: 'Eleanor Vance',
      age: '64',
      gender: 'Female',
      contactNumber: '+1 (555) 234-5678',
      email: 'eleanor.vance@example.com',
      clinicName: 'St. Jude Ocular Healthcare & Eye Institute',
      referringDoctor: 'Dr. Alexander Hayes, MD',
      affectedEye: 'OD (Right Eye)',
      symptoms: ['Blurry or cloudy vision at distance', 'Increased glare during night driving']
    },
    result: {
      label: 'Nuclear Cataract Detected',
      confidence: 96.8,
      stage: 'Stage 2 - Moderate Nuclear Sclerosis',
      opacityScore: 0.68,
      riskLevel: 'Moderate',
      surgicalUrgency: 'Elective / 6-12 Months',
      description: 'Central lens core yellowing and density clouding observed in anterior segment scan.',
      recommendations: [
        'Schedule a slit-lamp examination with an Ophthalmologist within 3 months.',
        'Update spectacle prescription to optimize current visual acuity.',
        'Avoid unassisted night driving due to glare halos.'
      ],
      doctorNotes: 'Prescribed Pataday 0.2% eye drops 1 drop OD once daily. Review in 90 days.'
    },
    imageSrc: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23090d16"/><circle cx="200" cy="200" r="85" fill="%230284c7"/><circle cx="200" cy="200" r="32" fill="%23d97706"/></svg>',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

export function getSavedReports() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_RECORDS));
    return INITIAL_RECORDS;
  } catch (err) {
    console.error('Storage read error:', err);
    return INITIAL_RECORDS;
  }
}

export function saveReportToStorage(report) {
  try {
    const current = getSavedReports();
    const updated = [report, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Storage save error:', err);
    return [];
  }
}

export function deleteReportFromStorage(id) {
  try {
    const current = getSavedReports();
    const updated = current.filter((r) => r.id !== id && r.patientData?.patientId !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Storage delete error:', err);
    return [];
  }
}
