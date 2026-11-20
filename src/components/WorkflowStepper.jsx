import React from 'react';
import { UserCheck, Eye, FileCheck, CheckCircle2, ChevronRight } from 'lucide-react';

export default function WorkflowStepper({ currentStep, setStep, isPatientFilled, isPredicted }) {
  const steps = [
    {
      id: 1,
      title: 'Patient Details',
      desc: 'Enter demographics & symptoms',
      icon: UserCheck,
      isAccessible: true,
      isCompleted: isPatientFilled
    },
    {
      id: 2,
      title: 'Eye Scan & Detection',
      desc: 'Upload/Camera & run AI',
      icon: Eye,
      isAccessible: isPatientFilled,
      isCompleted: isPredicted
    },
    {
      id: 3,
      title: 'Patient Diagnostic Report',
      desc: 'Review summary & print report',
      icon: FileCheck,
      isAccessible: isPatientFilled && isPredicted,
      isCompleted: isPredicted
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-6">
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative">
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const canClick = step.isAccessible;

            return (
              <button
                key={step.id}
                onClick={() => canClick && setStep(step.id)}
                disabled={!canClick}
                className={`relative flex items-center p-3 rounded-xl transition-all duration-300 text-left ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 ring-2 ring-sky-400/40'
                    : step.isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                    : canClick
                    ? 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800'
                    : 'bg-slate-100/50 dark:bg-slate-900/30 text-slate-400 dark:text-slate-600 opacity-60 cursor-not-allowed'
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg mr-3 shrink-0 flex items-center justify-center ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : step.isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {step.isCompleted && !isActive ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] font-mono font-bold uppercase opacity-80">
                      Step 0{step.id}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold truncate">
                    {step.title}
                  </h4>
                  <p className="text-[10px] opacity-75 truncate hidden sm:block">
                    {step.desc}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-600 hidden sm:block ml-1" />
                )}
              </button>
            );
          })}

        </div>
      </div>
    </div>
  );
}
