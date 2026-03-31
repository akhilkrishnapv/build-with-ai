import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSettings } from '@/contexts/SettingsContext';
import { useNavigate } from 'react-router-dom';
import API from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportsPage() {
  const { layout } = useSettings();
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const { data } = await API.get('/reports');
      setReports(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const maxWidthClass = {
    'narrow': 'max-w-4xl',
    'comfortable': 'max-w-6xl',
    'wide': 'max-w-full 2xl:max-w-[1600px]'
  }[layout];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onReset={() => navigate('/dashboard')} onNavigateHome={() => navigate('/')} />
      
      <main className={`flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all ${maxWidthClass}`}>
        <div className="mb-6 flex justify-between items-end border-b border-border pb-6">
           <div>
              <h2 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">Published Reports</h2>
              <p className="text-muted-foreground text-sm">Access and export PDF executive summaries of your investigations.</p>
           </div>
           
           <Button variant="outline"><Search className="w-4 h-4 mr-2" /> Filter Database</Button>
        </div>

        {loading ? (
           <p className="text-muted-foreground animate-pulse text-sm">Querying document clusters...</p>
        ) : reports.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-xl border border-dashed border-border mt-8 shadow-sm">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-xl font-bold text-foreground">No reports generated</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">Reports are created automatically when an advanced scan finishes in the main dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report) => (
              <Card key={report._id} className="hover:border-primary/40 transition-all group">
                 <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <h4 className="font-bold text-lg text-foreground">{report.title}</h4>
                          <p className="text-xs font-mono text-muted-foreground mt-1 tracking-wider uppercase">{new Date(report.createdAt).toISOString()}</p>
                       </div>
                       <Button variant="secondary" size="icon" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors rounded-full shadow-sm">
                          <Download className="w-4 h-4" />
                       </Button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed border-l-2 border-border pl-3">
                       {report.content}
                    </p>
                 </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
