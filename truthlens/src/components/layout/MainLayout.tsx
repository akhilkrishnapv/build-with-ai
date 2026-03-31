import React from 'react';
import Navbar from './Navbar';
import DragDropZone from '@/components/upload/DragDropZone';
import ResultsDashboard from '@/components/dashboard/ResultsDashboard';
import { useAnalysisLogic } from '@/hooks/useAnalysisLogic';
import { useSettings } from '@/contexts/SettingsContext';

interface Props {
  onNavigateHome: () => void;
}

export default function MainLayout({ onNavigateHome }: Props) {
  const { appState, file, previewUrl, result, startAnalysis, reset } = useAnalysisLogic();
  const { layout } = useSettings();

  const maxWidthClass = {
    'narrow': 'max-w-4xl',
    'comfortable': 'max-w-6xl',
    'wide': 'max-w-full 2xl:max-w-[1600px]'
  }[layout];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onReset={reset} onNavigateHome={onNavigateHome} />
      
      <main className={`flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ease-in-out ${maxWidthClass}`}>
        {appState === 'idle' ? (
          <div className="max-w-4xl mx-auto mt-12 sm:mt-20">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4 tracking-tight drop-shadow-sm">
                Verify Media Authenticity
              </h2>
              <p className="text-muted-foreground font-medium max-w-2xl mx-auto text-lg leading-relaxed">
                Upload any image or video to instantly detect deepfakes, generative AI tampering, and digital manipulation using enterprise-grade scanning.
              </p>
            </div>
            <DragDropZone onUpload={startAnalysis} />
          </div>
        ) : (
          <ResultsDashboard 
            appState={appState} 
            file={file} 
            previewUrl={previewUrl} 
            result={result} 
          />
        )}
      </main>
    </div>
  );
}
