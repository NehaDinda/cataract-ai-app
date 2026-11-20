import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkflowStepper from './components/WorkflowStepper';
import PatientForm from './components/PatientForm';
import UploadCard from './components/UploadCard';
import SampleGallery from './components/SampleGallery';
import ScannerOverlay from './components/ScannerOverlay';
import ResultCard from './components/ResultCard';
import TechnicalDetailsModal from './components/TechnicalDetailsModal';
import ReportModal from './components/ReportModal';
import SavedReportsPage from './components/SavedReportsPage';
import Footer from './components/Footer';
import { analyzeEyeImage } from './services/aiService';
import { getSavedReports, saveReportToStorage, deleteReportFromStorage } from './utils/storageService';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeView, setActiveView] = useState('EXAM'); // 'EXAM' or 'SAVED_REPORTS'
  const [currentStep, setCurrentStep] = useState(1); // 1: Patient Info, 2: Scan, 3: Report
  
  const [patientData, setPatientData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [patientReports, setPatientReports] = useState([]);

  useEffect(() => {
    const saved = getSavedReports();
    setPatientReports(saved);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectSample = (sample) => {
    setSelectedPreset(sample);
    setSelectedImage(sample.image);
    setPredictionResult(null);
  };

  const scrollToWorkflow = () => {
    setActiveView('EXAM');
    setTimeout(() => {
      const mainEl = document.getElementById('workflow-container');
      if (mainEl) {
        mainEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      alert('Please upload, capture via camera, or select an eye image scan first.');
      return;
    }
    if (!patientData) {
      alert('Please enter patient details first.');
      setCurrentStep(1);
      return;
    }

    setIsScanning(true);
    setPredictionResult(null);

    try {
      const result = await analyzeEyeImage(selectedImage, selectedPreset);
      setPredictionResult(result);
      setCurrentStep(3);

      const reportId = 'RPT-' + (patientData.patientId ? patientData.patientId.replace(/[^0-9]/g, '') : Math.floor(100000 + Math.random() * 900000));
      const newRecord = {
        id: reportId,
        patientData: { ...patientData },
        result: { ...result },
        imageSrc: selectedImage,
        timestamp: new Date().toISOString()
      };

      const updatedList = saveReportToStorage(newRecord);
      setPatientReports(updatedList);

      setTimeout(() => {
        setIsReportModalOpen(true);
      }, 600);

    } catch (err) {
      alert('AI Disease Detection Failed: ' + err.message);
    } finally {
      setIsScanning(false);
    }
  };

  const handleViewSavedReport = (record) => {
    setPatientData(record.patientData);
    setPredictionResult(record.result);
    setSelectedImage(record.imageSrc);
    setIsReportModalOpen(true);
  };

  const handleDeleteReport = (id) => {
    const updated = deleteReportFromStorage(id);
    setPatientReports(updated);
  };

  const handleNewPatientScan = () => {
    setPatientData(null);
    setSelectedImage(null);
    setSelectedPreset(null);
    setPredictionResult(null);
    setCurrentStep(1);
    setActiveView('EXAM');
    scrollToWorkflow();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-sky-500 selection:text-white">
      
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenTechModal={() => setIsTechModalOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        savedCount={patientReports.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {activeView === 'EXAM' ? (
          <>
            <Hero onScrollToUpload={scrollToWorkflow} />

            <div id="workflow-container">
              
              <WorkflowStepper
                currentStep={currentStep}
                setStep={setCurrentStep}
                isPatientFilled={!!patientData}
                isPredicted={!!predictionResult}
              />

              {currentStep === 1 && (
                <PatientForm
                  patientData={patientData}
                  setPatientData={setPatientData}
                  onProceedToScan={() => setCurrentStep(2)}
                />
              )}

              {currentStep === 2 && (
                <>
                  <SampleGallery
                    onSelectSample={handleSelectSample}
                    activePresetId={selectedPreset?.id}
                  />

                  <UploadCard
                    patientData={patientData}
                    onChangePatient={() => setCurrentStep(1)}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    selectedPreset={selectedPreset}
                    setSelectedPreset={setSelectedPreset}
                    onPredict={handlePredict}
                    isScanning={isScanning}
                  />
                </>
              )}

              {isScanning && (
                <ScannerOverlay imageSrc={selectedImage} />
              )}

              {currentStep === 3 && predictionResult && !isScanning && (
                <ResultCard
                  result={predictionResult}
                  imageSrc={selectedImage}
                  patientData={patientData}
                  onReset={handleNewPatientScan}
                  onOpenReport={() => setIsReportModalOpen(true)}
                />
              )}

            </div>
          </>
        ) : (
          <SavedReportsPage
            reports={patientReports}
            onViewReport={handleViewSavedReport}
            onDeleteReport={handleDeleteReport}
            onNewPatientScan={handleNewPatientScan}
          />
        )}

      </main>

      <TechnicalDetailsModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        result={predictionResult}
        imageSrc={selectedImage}
        patientData={patientData}
      />

      <Footer />

    </div>
  );
}
