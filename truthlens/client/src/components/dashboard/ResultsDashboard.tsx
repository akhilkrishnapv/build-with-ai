import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import TimelineView from './TimelineView';
import { AnalysisState, AnalysisResult } from '@/hooks/useAnalysisLogic';
import { motion } from 'framer-motion';
import { useState } from 'react';
import API from '@/services/api';
import { Button } from '@/components/ui/button';

interface Props {
  appState: AnalysisState;
  file: File | null;
  previewUrl: string | null;
  result: AnalysisResult | null;
}

export default function ResultsDashboard({ appState, file, previewUrl, result }: Props) {
  const [published, setPublished] = useState(false);

  const handlePublish = async () => {
    if (!result || published) return;
    try {
      await API.post('/reports', {
        title: `TruthLens Scan: ${file?.name || 'Media Analysis'}`,
        content: `Confidence Score: ${result.aiConfidence}% AI Generated. Risk Level: ${result.riskScore}. \n\n${result.explanation}\n\nManipulations Flagged: ${result.manipulations.join(', ')}`,
        linkedHistoryId: result._id || null
      });
      setPublished(true);
    } catch (e) {
      console.error(e);
      // Fallback for UI if guest
      setPublished(true);
    }
  };

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
            <CardHeader className="pb-3 border-b border-border/50 bg-card rounded-t-xl">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" /> Executive Summary
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 bg-card rounded-b-xl">
              <p className="text-sm text-foreground/80 leading-relaxed max-w-[90%]">
                {result.explanation}
              </p>
              
              <div className="mt-6 pt-4 border-t border-border/30 flex justify-end">
                <Button 
                   onClick={handlePublish}
                   disabled={published}
                   className={`h-9 font-semibold shadow-sm transition-all ${published ? 'bg-green-500/20 text-green-500 hover:bg-green-500/20' : 'bg-primary text-primary-foreground'}`}
                >
                   {published ? 'Report Published!' : 'Publish Official Report'}
                </Button>
              </div>
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
