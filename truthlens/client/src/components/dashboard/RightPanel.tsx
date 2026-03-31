import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, AlertTriangle, ShieldCheck, Share2, ScanFace } from 'lucide-react';
import { AnalysisState, AnalysisResult } from '@/hooks/useAnalysisLogic';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface Props {
  appState: AnalysisState;
  result: AnalysisResult | null;
}

export default function RightPanel({ appState, result }: Props) {
  const isLoading = appState !== 'complete';

  const pieData = result ? [
    { name: 'AI Generated', value: result.aiConfidence },
    { name: 'Authentic', value: result.realConfidence }
  ] : [{ name: 'Scanning', value: 100 }];

  const COLORS = ['#ef4444', '#22c55e']; // Red for AI, Green for Real
  const SCAN_COLOR = ['#94a3b8'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Risk Score & Confidence Meter */}
      <Card className="col-span-1 md:col-span-2 shadow-sm border-slate-200 dark:border-slate-800 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <ScanFace className="w-8 h-8 text-blue-500 animate-bounce mb-3" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                AI Deep-Scan Engine Running...
              </p>
            </div>
          </div>
        )}
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1500}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={result ? COLORS[index % COLORS.length] : SCAN_COLOR[0]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {result ? `${Math.max(result.aiConfidence, result.realConfidence)}%` : '--'}
              </span>
              <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                Confidence
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Verdict</h3>
              <div className="flex items-center gap-3">
                {result?.riskScore === 'High Risk' ? (
                  <Badge variant="destructive" className="px-4 py-1.5 text-sm"><AlertTriangle className="w-4 h-4 mr-2" /> High Risk - AI Generated</Badge>
                ) : result?.riskScore === 'Low Risk' ? (
                  <Badge className="bg-green-500 hover:bg-green-600 px-4 py-1.5 text-sm"><ShieldCheck className="w-4 h-4 mr-2" /> Authentic Media</Badge>
                ) : (
                  <Badge variant="secondary" className="px-4 py-1.5 text-sm">Scanning...</Badge>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Indicators</h3>
              <div className="flex flex-wrap gap-2">
                {result ? result.manipulations.map((m, i) => (
                  <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-700">
                    {m}
                  </span>
                )) : (
                  <span className="text-sm text-slate-400">Waiting for results...</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Source Prediction */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Share2 className="w-4 h-4 text-purple-500" /> Source Origin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-2">
            {result ? result.sourcePrediction.map((p, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-slate-700 dark:text-slate-200">{p.platform}</span>
                  <span className="text-slate-500">{p.probability}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${p.probability}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-purple-500"
                  />
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-500 italic">Analyzing compression artifacts...</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for future module */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full min-h-[160px]">
          <Activity className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-3" />
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Advanced Face Mesh</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Unlock Pro to view detailed biometric inconsistencies.</p>
        </CardContent>
      </Card>
    </div>
  );
}
