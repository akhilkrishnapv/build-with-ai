import React from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import TimelineView from './TimelineView';
import { AnalysisState, AnalysisResult } from '@/hooks/useAnalysisLogic';
import { motion } from 'framer-motion';

interface Props {
  appState: AnalysisState;
  file: File | null;
  previewUrl: string | null;
  result: AnalysisResult | null;
}

export default function ResultsDashboard({ appState, file, previewUrl, result }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8"
    >
      {/* Left panel: Media & Metadata */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <LeftPanel file={file} previewUrl={previewUrl} result={result} />
        {appState === 'complete' && result && (
          <Card className="shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" /> Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {result.explanation}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right panel: Analysis & Scoring */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <RightPanel appState={appState} result={result} />
        <TimelineView appState={appState} />
      </div>
    </motion.div>
  );
}

// Inline imports added for the small summary module to avoid a whole new file
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
