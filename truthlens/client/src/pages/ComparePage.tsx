import React, { useState, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSettings } from '@/contexts/SettingsContext';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, CheckCircle2, SplitSquareHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import API from '@/services/api';

export default function ComparePage() {
  const { layout } = useSettings();
  const navigate = useNavigate();
  
  const [leftFile, setLeftFile] = useState<File | null>(null);
  const [rightFile, setRightFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [historySessions, setHistorySessions] = useState<any[]>([]);

  const fetchHistory = async () => {
    try {
       const { data } = await API.get('/compare');
       setHistorySessions(data);
    } catch(e) { console.error(e) }
  };

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const onDropLeft = useCallback((acceptedFiles: File[]) => { if(acceptedFiles[0]) setLeftFile(acceptedFiles[0]) }, []);
  const onDropRight = useCallback((acceptedFiles: File[]) => { if(acceptedFiles[0]) setRightFile(acceptedFiles[0]) }, []);

  const { getRootProps: getLeftRootProps, getInputProps: getLeftInput } = useDropzone({ onDrop: onDropLeft, maxFiles: 1, accept: {'image/*': ['.jpeg', '.jpg', '.png', '.webp'], 'video/*': ['.mp4']} });
  const { getRootProps: getRightRootProps, getInputProps: getRightInput } = useDropzone({ onDrop: onDropRight, maxFiles: 1, accept: {'image/*': ['.jpeg', '.jpg', '.png', '.webp'], 'video/*': ['.mp4']} });

  const handleCompare = async () => {
    if(!leftFile || !rightFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('media', leftFile);
    formData.append('media', rightFile);
    
    try {
      const { data } = await API.post('/compare', formData);
      setComparisonResult(data);
      fetchHistory(); // Refresh the list Below
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const maxWidthClass = {
    'narrow': 'max-w-4xl',
    'comfortable': 'max-w-6xl',
    'wide': 'max-w-full 2xl:max-w-[1600px]'
  }[layout];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onReset={() => navigate('/dashboard')} onNavigateHome={() => navigate('/')} />
      
      <main className={`flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all ${maxWidthClass}`}>
        <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">Dual Analysis</h2>
            <p className="text-muted-foreground text-sm">Compare two pieces of media side-by-side to cross-reference AI injection artifacts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div {...getLeftRootProps()} className={`relative group flex flex-col items-center justify-center w-full h-[400px] rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${leftFile ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-secondary'}`}>
              <input {...getLeftInput()} />
              {leftFile ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                   {leftFile.type.startsWith('video') ? <video src={URL.createObjectURL(leftFile)} className="absolute inset-0 w-full h-full object-cover opacity-60" /> : <img src={URL.createObjectURL(leftFile)} className="absolute inset-0 w-full h-full object-cover opacity-60" />}
                   <div className="z-10 bg-black/80 backdrop-blur-md p-4 rounded-xl flex items-center gap-3 text-white">
                      <CheckCircle2 className="text-green-400" />
                      <span className="font-semibold text-sm max-w-[200px] truncate">{leftFile.name}</span>
                   </div>
                 </div>
              ) : (
                <div className="text-center p-6"><UploadCloud className="w-10 h-10 text-muted-foreground mx-auto mb-3" /><p className="font-medium">Drop Base Media</p></div>
              )}
           </div>

           <div {...getRightRootProps()} className={`relative group flex flex-col items-center justify-center w-full h-[400px] rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${rightFile ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-secondary'}`}>
              <input {...getRightInput()} />
              {rightFile ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                   {rightFile.type.startsWith('video') ? <video src={URL.createObjectURL(rightFile)} className="absolute inset-0 w-full h-full object-cover opacity-60" /> : <img src={URL.createObjectURL(rightFile)} className="absolute inset-0 w-full h-full object-cover opacity-60" />}
                   <div className="z-10 bg-black/80 backdrop-blur-md p-4 rounded-xl flex items-center gap-3 text-white">
                      <CheckCircle2 className="text-green-400" />
                      <span className="font-semibold text-sm max-w-[200px] truncate">{rightFile.name}</span>
                   </div>
                 </div>
              ) : (
                <div className="text-center p-6"><UploadCloud className="w-10 h-10 text-muted-foreground mx-auto mb-3" /><p className="font-medium">Drop Comparison Media</p></div>
              )}
           </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
           <Button onClick={handleCompare} disabled={!leftFile || !rightFile || loading} size="lg" className="w-full max-w-sm font-bold text-lg h-14 bg-primary text-primary-foreground shadow-xl rounded-full">
              {loading ? 'Analyzing...' : <><SplitSquareHorizontal className="mr-2" /> Run Comparison Mapping</>}
           </Button>
        </div>

        {comparisonResult && (
          <Card className="mt-12">
             <CardContent className="p-8">
               <h3 className="text-xl font-bold mb-4 border-b border-border pb-2">Analysis Complete</h3>
               <p className="text-muted-foreground leading-relaxed font-medium">
                 {comparisonResult.comparisonSummary}
               </p>
             </CardContent>
          </Card>
        )}

        {historySessions.length > 0 && (
          <div className="mt-20">
             <h3 className="text-2xl font-bold mb-6 border-b border-border pb-2">Previous Comparisons</h3>
             <div className="grid grid-cols-1 gap-4">
               {historySessions.map(session => (
                 <Card key={session._id} className="bg-card hover:bg-secondary/20 transition-colors">
                   <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
                     <div className="flex gap-2 w-full md:w-auto overflow-hidden rounded-xl border border-border">
                        <img src={import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}${session.leftMediaUrl}` : `http://localhost:5000${session.leftMediaUrl}`} className="w-24 h-24 object-cover" />
                        <img src={import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}${session.rightMediaUrl}` : `http://localhost:5000${session.rightMediaUrl}`} className="w-24 h-24 object-cover" />
                     </div>
                     <div className="flex-1 text-sm text-foreground/80 leading-relaxed italic border-l-2 border-primary/50 pl-4 py-1">
                        "{session.comparisonSummary}"
                     </div>
                     <div className="text-xs text-muted-foreground w-full md:w-auto text-right font-mono">
                        {new Date(session.createdAt).toLocaleDateString()}
                     </div>
                   </CardContent>
                 </Card>
               ))}
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
