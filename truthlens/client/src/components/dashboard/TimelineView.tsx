import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Loader2, Download } from 'lucide-react';
import { AnalysisState } from '@/hooks/useAnalysisLogic';
import { motion } from 'framer-motion';

interface Props {
  appState: AnalysisState;
}

const steps = [
  { id: 'uploading', label: 'Upload Received' },
  { id: 'scanning_metadata', label: 'Metadata Scanned' },
  { id: 'analyzing_ai', label: 'AI Detection Completed' },
  { id: 'source_prediction', label: 'Source Prediction Completed' },
];

export default function TimelineView({ appState }: Props) {
  const isComplete = appState === 'complete';
  const currentIndex = steps.findIndex(s => s.id === appState);
  
  // If complete, currentIndex is -1 (not found), but we should treat it as max length
  const activeIndex = isComplete ? steps.length : (currentIndex >= 0 ? currentIndex : 0);

  return (
    <Card className="shadow-sm border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-semibold flex items-center justify-between">
          <span>Analysis Progress</span>
          {isComplete && <span className="text-xs text-green-500 font-medium">100% Complete</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="relative pl-6 border-l border-slate-200 dark:border-slate-800 space-y-6 mb-6">
          {steps.map((step, index) => {
            const isPast = index < activeIndex;
            const isCurrent = index === activeIndex;

            return (
              <motion.div 
                key={step.id} 
                className="relative"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[33px] top-1/2 -translate-y-1/2 bg-white dark:bg-slate-900">
                  {isPast ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                  )}
                </div>

                {/* Content */}
                <div>
                  <h4 className={`text-sm font-medium ${isPast ? 'text-slate-900 dark:text-slate-200' : isCurrent ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-500'}`}>
                    {step.label}
                  </h4>
                  {isCurrent && (
                    <p className="text-xs text-slate-500 mt-1">Processing layers against trained models...</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
      {isComplete && (
        <CardFooter className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="outline" className="w-full text-slate-600">
            <Download className="w-4 h-4 mr-2" />
            Export PDF Report
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
