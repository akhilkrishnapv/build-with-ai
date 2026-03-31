import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, Video, Database } from 'lucide-react';
import { AnalysisResult } from '@/hooks/useAnalysisLogic';

interface Props {
  file: File | null;
  previewUrl: string | null;
  result: AnalysisResult | null;
}

export default function LeftPanel({ file, previewUrl, result }: Props) {
  if (!file || !previewUrl) return null;

  const isVideo = file.type.startsWith('video');

  return (
    <Card className="overflow-hidden shadow-sm border-slate-200 dark:border-slate-800">
      <div className="bg-slate-100 dark:bg-slate-900/50 p-4 flex justify-center items-center rounded-t-xl min-h-[300px]">
        {isVideo ? (
          <video 
            src={previewUrl} 
            controls 
            className="max-h-[400px] rounded-lg shadow-md object-contain"
          />
        ) : (
          <img 
            src={previewUrl} 
            alt="Uploaded media" 
            className="max-h-[400px] rounded-lg shadow-md object-contain"
          />
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isVideo ? <Video className="w-5 h-5 text-blue-500" /> : <ImageIcon className="w-5 h-5 text-blue-500" />}
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[200px]" title={file.name}>
              {file.name}
            </h3>
          </div>
          <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </Badge>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" /> Metadata Extraction
          </h4>
          
          {result ? (
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(result.metadata).map(([key, val]) => (
                <div key={key} className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">{key}</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200 truncate">{val}</p>
                </div>
              ))}
            </div>
          ) : (
             <div className="h-24 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 border-dashed">
                <p className="text-sm text-slate-400 animate-pulse">Scanning headers...</p>
             </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
