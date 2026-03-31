import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSettings } from '@/contexts/SettingsContext';
import { useNavigate } from 'react-router-dom';
import API from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { FileWarning, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HistoryPage() {
  const { layout } = useSettings();
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchHistory = async () => {
    try {
      const { data } = await API.get('/history');
      setHistory(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/history/${id}`);
      setHistory(history.filter(item => item._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const maxWidthClass = {
    'narrow': 'max-w-4xl',
    'comfortable': 'max-w-6xl',
    'wide': 'max-w-full 2xl:max-w-[1600px]'
  }[layout];

  const filteredHistory = history.filter(h => h.fileName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onReset={() => navigate('/dashboard')} onNavigateHome={() => navigate('/')} />
      
      <main className={`flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all ${maxWidthClass}`}>
        <div className="mb-6 flex justify-between items-end">
           <div>
              <h2 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">Scan History</h2>
              <p className="text-muted-foreground text-sm">Review your previously uploaded media analyses.</p>
           </div>
           
           <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search files..."
                className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
           </div>
        </div>

        {loading ? (
           <p className="text-muted-foreground animate-pulse text-sm">Fetching immutable scan records...</p>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border border-dashed border-border mt-8">
            <FileWarning className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium text-foreground">No History Found</p>
            <p className="text-sm text-muted-foreground mt-1">Upload media in the dashboard to populate your scan records.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map((item) => (
              <Card key={item._id} className="overflow-hidden hover:border-primary/50 transition-colors">
                 <div className="h-40 bg-zinc-900 overflow-hidden flex items-center justify-center relative group">
                    {item.fileType.includes('video') ? (
                      <video src={import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}${item.fileUrl}` : `http://localhost:5000${item.fileUrl}`} className="w-full h-full object-cover opacity-80" />
                    ) : (
                      <img src={import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}${item.fileUrl}` : `http://localhost:5000${item.fileUrl}`} className="w-full h-full object-cover opacity-80" />
                    )}
                    <button 
                       onClick={() => handleDelete(item._id)}
                       className="absolute top-2 right-2 bg-black/50 hover:bg-destructive text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
                    >
                       <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
                 <CardContent className="p-4 bg-card flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-sm truncate" title={item.fileName}>{item.fileName}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                       <span className={`text-xs px-2 py-1 rounded-sm font-semibold border ${item.riskLevel === 'High Risk' ? 'bg-red-500/10 text-red-500 border-red-500/20' : item.riskLevel === 'Medium Risk' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                          {item.riskLevel}
                       </span>
                       <span className="text-xs font-bold font-mono text-foreground/80">{item.aiProbability}% AI</span>
                    </div>
                 </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
