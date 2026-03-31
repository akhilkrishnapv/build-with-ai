import { useState, useCallback } from 'react';
import API from '@/services/api';

export type AnalysisState = 'idle' | 'uploading' | 'scanning_metadata' | 'analyzing_ai' | 'source_prediction' | 'complete';

export interface AnalysisResult {
  _id?: string;
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

  const startAnalysis = useCallback(async (uploadedFile: File) => {
    setFile(uploadedFile);
    setPreviewUrl(URL.createObjectURL(uploadedFile));
    setAppState('uploading');

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Simulate analysis steps
    await sleep(1000);
    setAppState('scanning_metadata');
    
    await sleep(1500);
    setAppState('analyzing_ai');
    
    await sleep(1500);
    setAppState('source_prediction');
    
    await sleep(1500);
    
    const isAI = Math.random() > 0.5;
    const aiConf = isAI ? 92 : 14;
    const realConf = 100 - aiConf;
    const riskScore = isAI ? 'High Risk' : 'Low Risk';
    const explanation = isAI 
      ? 'Analysis indicates significant probability of generative AI creation. Subsurface scattering and pupil reflections are unnatural.'
      : 'No significant markers of generative AI found. Natural noise patterns preserved across the frame.';

    const formData = new FormData();
    formData.append('media', uploadedFile);
    formData.append('aiProbability', String(aiConf));
    formData.append('realProbability', String(realConf));
    formData.append('detectedPlatform', isAI ? 'Twitter' : 'Unknown');
    formData.append('explanation', explanation);

    let dbRecordId = undefined;
    try {
       // Attempt to strictly save to MongoDB via API backend
       const { data } = await API.post('/history', formData);
       dbRecordId = data._id;
    } catch (e) {
       console.log('Guest user or network offline, analysis proceeding purely locally.');
    }

    setResult({
      _id: dbRecordId,
      aiConfidence: aiConf,
      realConfidence: realConf,
      riskScore,
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
      explanation
    });
    
    setAppState('complete');
  }, []);

  const reset = useCallback(() => {
    setAppState('idle');
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
  }, []);

  return { appState, file, previewUrl, result, startAnalysis, reset };
}
