import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, Camera, Trash2, Sparkles, CheckCircle2, UserCheck, RefreshCw, FlipHorizontal, AlertCircle, VideoOff, Check } from 'lucide-react';

export default function UploadCard({
  patientData,
  onChangePatient,
  selectedImage,
  setSelectedImage,
  selectedPreset,
  setSelectedPreset,
  onPredict,
  isScanning
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Camera State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [isMirrored, setIsMirrored] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  const [shutterFlash, setShutterFlash] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Enumerate available video input camera devices
  const getCameraDevices = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        return;
      }
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter((d) => d.kind === 'videoinput');
      setCameraDevices(videoInputs);
      if (videoInputs.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoInputs[0].deviceId);
      }
    } catch (err) {
      console.warn('Unable to enumerate camera devices:', err);
    }
  };

  useEffect(() => {
    getCameraDevices();
  }, []);

  // Start Live Video Stream when isCameraActive or selectedDeviceId changes
  useEffect(() => {
    if (!isCameraActive) {
      stopCameraStream();
      return;
    }

    let isSubscribed = true;

    async function startCamera() {
      setCameraError(null);
      stopCameraStream(); // Stop existing track before starting new one

      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Webcam access is not supported by this browser environment or connection protocol.');
        }

        const constraints = {
          video: selectedDeviceId
            ? { deviceId: { exact: selectedDeviceId }, width: { ideal: 1280 }, height: { ideal: 720 } }
            : { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (!isSubscribed) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        mediaStreamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch((e) => console.error('Video play error:', e));
          };
        }

        // Re-enumerate to get full device labels after permission granted
        getCameraDevices();
      } catch (err) {
        console.error('Camera Stream Error:', err);
        setCameraError(
          err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
            ? 'Camera permission denied. Please allow camera access in your browser settings.'
            : `Camera initialization error: ${err.message}`
        );
      }
    }

    startCamera();

    return () => {
      isSubscribed = false;
      stopCameraStream();
    };
  }, [isCameraActive, selectedDeviceId]);

  const stopCameraStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleCamera = () => {
    if (isCameraActive) {
      setIsCameraActive(false);
      stopCameraStream();
    } else {
      setIsCameraActive(true);
    }
  };

  const captureCameraSnapshot = () => {
    if (!videoRef.current) return;

    // Trigger visual shutter flash effect
    setShutterFlash(true);
    setTimeout(() => setShutterFlash(false), 250);

    const videoNode = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = videoNode.videoWidth || 640;
    canvas.height = videoNode.videoHeight || 480;

    const ctx = canvas.getContext('2d');

    // Flip canvas horizontally if mirror mode is enabled
    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(videoNode, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');

    setSelectedImage(dataUrl);
    setSelectedPreset(null);

    // Stop camera after successful capture
    setIsCameraActive(false);
    stopCameraStream();
  };

  // File Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result);
      setSelectedPreset(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setSelectedPreset(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div id="upload-section" className="w-full max-w-4xl mx-auto my-6 text-left">
      
      {/* Active Patient Details Pill Bar */}
      {patientData && (
        <div className="mb-4 p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-sky-500 text-white font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  Patient: {patientData.fullName}
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-mono text-[10px] font-bold">
                  {patientData.patientId}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px] mt-0.5">
                Age: {patientData.age} yr | Gender: {patientData.gender} | Target Eye: <strong className="text-sky-600 dark:text-sky-400">{patientData.affectedEye}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onChangePatient}
            className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-semibold"
          >
            Edit Patient Details
          </button>
        </div>
      )}

      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800 relative overflow-hidden transition-all">
        
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-200/80 dark:border-slate-800 pb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              Step 02 of 03
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <UploadCloud className="w-6 h-6 text-sky-500" />
              <span>Ocular Image Upload & Eye Disease Detection</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Upload anterior segment eye scan, use your live webcam, or click a preset sample below.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleCamera}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-md active:scale-95 ${
                isCameraActive
                  ? 'bg-rose-600 hover:bg-rose-500 text-white ring-2 ring-rose-400'
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-500/25'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{isCameraActive ? 'Close Camera' : 'Start Live Camera'}</span>
            </button>
          </div>
        </div>

        {/* LIVE WEBCAM CAMERA INTERFACE */}
        {isCameraActive && (
          <div className="mb-6 rounded-2xl overflow-hidden bg-slate-950 border-2 border-sky-500 shadow-2xl relative">
            
            {/* Camera Controls Bar */}
            <div className="bg-slate-900 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-emerald-400 font-bold uppercase">LIVE EYE SCANNER FEED</span>
              </div>

              <div className="flex items-center space-x-2">
                {/* Device Selector */}
                {cameraDevices.length > 1 && (
                  <select
                    value={selectedDeviceId}
                    onChange={(e) => setSelectedDeviceId(e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    {cameraDevices.map((d, index) => (
                      <option key={d.deviceId || index} value={d.deviceId}>
                        {d.label || `Camera ${index + 1}`}
                      </option>
                    ))}
                  </select>
                )}

                {/* Mirror Toggle */}
                <button
                  type="button"
                  onClick={() => setIsMirrored(!isMirrored)}
                  className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1 ${
                    isMirrored ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                  title="Toggle Camera Flip / Mirror"
                >
                  <FlipHorizontal className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Flip</span>
                </button>
              </div>
            </div>

            {/* Video Viewport Container */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              {shutterFlash && (
                <div className="absolute inset-0 bg-white z-30 animate-pulse"></div>
              )}

              {cameraError ? (
                <div className="p-6 text-center text-rose-400 space-y-2">
                  <VideoOff className="w-12 h-12 mx-auto text-rose-500" />
                  <p className="font-bold text-sm">{cameraError}</p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Ensure camera permissions are enabled in your browser address bar.
                  </p>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover transition-transform ${isMirrored ? 'scale-x-[-1]' : ''}`}
                  />

                  {/* Ocular Positioning Grid Reticle */}
                  <div className="absolute inset-0 border border-sky-500/20 pointer-events-none flex items-center justify-center">
                    <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-sky-400/50 border-dashed animate-pulse"></div>
                    <div className="absolute w-3 h-3 bg-sky-400 rounded-full"></div>
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/80 text-[10px] font-mono text-cyan-300 border border-cyan-500/40">
                      [POSITION EYE IN RETICLE]
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Capture CTA Bar */}
            {!cameraError && (
              <div className="bg-slate-900 p-4 flex items-center justify-center space-x-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={captureCameraSnapshot}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-white font-extrabold text-sm shadow-xl shadow-sky-500/30 flex items-center space-x-2 transition-transform active:scale-95"
                >
                  <Camera className="w-5 h-5" />
                  <span>Capture Ocular Photo</span>
                </button>
              </div>
            )}

          </div>
        )}

        {/* Drag & Drop Upload Zone */}
        {!selectedImage ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 group ${
              isDragOver
                ? 'border-sky-500 bg-sky-50/80 dark:bg-sky-950/40 scale-[1.01]'
                : 'border-slate-300 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 hover:bg-slate-50/60 dark:hover:bg-slate-900/40'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-md">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                Drag & Drop Patient Eye Image Here
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                or <span className="text-sky-600 dark:text-sky-400 font-semibold underline">browse file from device</span>
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full">
                <span>Supports JPG, PNG, WEBP or Live Webcam Capture</span>
              </div>
            </div>
          </div>
        ) : (
          /* Preview & Predict Action */
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900/5 dark:bg-slate-950 p-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              
              <div className="relative w-full md:w-64 h-64 rounded-xl overflow-hidden border border-sky-500/30 bg-black flex items-center justify-center group shadow-md">
                <img
                  src={selectedImage}
                  alt="Selected Patient Eye Scan"
                  className="w-full h-full object-contain"
                />
                
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={clearSelectedImage}
                    className="p-2.5 rounded-full bg-rose-600 text-white hover:bg-rose-500 transition-transform active:scale-90"
                    title="Remove Image"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-slate-900/80 backdrop-blur text-[10px] font-mono text-sky-400 border border-sky-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Photo Captured & Loaded</span>
                </div>
              </div>

              <div className="flex-1 text-left w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 font-mono">
                    {selectedPreset ? `Preset Scan: ${selectedPreset.name}` : `Patient ID: ${patientData?.patientId || 'Intake Record'}`}
                  </span>
                  <button
                    type="button"
                    onClick={clearSelectedImage}
                    className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Change Image / Re-take</span>
                  </button>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Ready to Detect Eye Disease
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Executing AI deep learning scan for <strong className="text-slate-800 dark:text-slate-200">{patientData?.fullName || 'Patient'}</strong> ({patientData?.affectedEye || 'Eye'}).
                </p>

                <button
                  type="button"
                  onClick={onPredict}
                  disabled={isScanning}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-white shadow-lg flex items-center justify-center space-x-3 transition-all transform active:scale-95 ${
                    isScanning
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 shadow-sky-500/25 border border-sky-400/30 hover:-translate-y-0.5'
                  }`}
                >
                  <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="text-base font-semibold">Detect Eye Disease & Generate Report</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
