import { useState, useCallback } from 'react';

export type AnalysisState = 'idle' | 'uploading' | 'scanning_metadata' | 'analyzing_ai' | 'source_prediction' | 'complete';

export interface AnalysisResult {
  aiConfidence: number;
  realConfidence: number;
  riskScore: 'Low Risk' | 'Medium Risk' | 'High Risk';
  sourcePrediction: { platform: string; probability: number }[];
  manipulations: string[];
  metadata: Record<string, string>;
  explanation: string;
}

export function useAnalysisLogic() {
  const [appState, setAppState] = useState<AnalysisState>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const startAnalysis = useCallback((uploadedFile: File) => {
    setFile(uploadedFile);
    setPreviewUrl(URL.createObjectURL(uploadedFile));
    setAppState('uploading');

    // MOCK TIMELINE PROGRESSION
    setTimeout(() => {
      setAppState('scanning_metadata');
      setTimeout(() => {
        setAppState('analyzing_ai');
        setTimeout(() => {
          setAppState('source_prediction');
          setTimeout(() => {
            // MOCK RESULT
            const isAI = Math.random() > 0.5;
            setResult({
              aiConfidence: isAI ? 92 : 14,
              realConfidence: isAI ? 8 : 86,
              riskScore: isAI ? 'High Risk' : 'Low Risk',
              sourcePrediction: [
                { platform: 'Twitter', probability: 78 },
                { platform: 'TikTok', probability: 15 },
              ],
              manipulations: isAI ? ['Face Inconsistency', 'Lighting Anomalies', 'Metadata Stripped'] : ['Compression Artifacts'],
              metadata: {
                'File Type': uploadedFile.type,
                'Size': (uploadedFile.size / 1024 / 1024).toFixed(2) + ' MB',
                'Color Space': 'sRGB',
                'Device': 'Unknown',
              },
              explanation: isAI 
                ? 'Analysis indicates significant probability of generative AI creation. Subsurface scattering and pupil reflections are unnatural.'
                : 'No significant markers of generative AI found. Natural noise patterns preserved across the frame.'
            });
            setAppState('complete');
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1000);
  }, []);

  const reset = useCallback(() => {
    setAppState('idle');
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
  }, []);

  return { appState, file, previewUrl, result, startAnalysis, reset };
}
