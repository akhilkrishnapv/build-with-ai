import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon, Video, FileWarning } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface DragDropZoneProps {
  onUpload: (file: File) => void;
}

export default function DragDropZone({ onUpload }: DragDropZoneProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size > 50 * 1024 * 1024) {
        setError("File size exceeds 50MB limit.");
        return;
      }
      onUpload(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.mov', '.webm']
    },
    maxFiles: 1,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...getRootProps()}
      className={cn(
        "relative group flex flex-col items-center justify-center w-full h-80 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden bg-white dark:bg-slate-900",
        isDragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50",
        isDragReject && "border-red-500 bg-red-50 dark:bg-red-900/20"
      )}
    >
      <input {...getInputProps()} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50 pointer-events-none" />

      <div className="z-10 flex flex-col items-center justify-center p-6 text-center">
        <div className={cn(
          "p-4 rounded-full mb-4 transition-colors duration-300",
          isDragActive ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600" : "bg-slate-100 dark:bg-slate-800 text-slate-500",
          isDragReject && "bg-red-100 dark:bg-red-900/40 text-red-600"
        )}>
          {isDragReject ? <FileWarning className="w-10 h-10" /> : <UploadCloud className="w-10 h-10" />}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
          {isDragActive ? "Drop media here..." : "Drag & drop media to scan"}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm mb-6">
          High-performance detection for AI manipulation.
        </p>

        <div className="flex gap-4 items-center justify-center text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
            <ImageIcon className="w-3.5 h-3.5" /> Images (JPG, PNG, WEBP)
          </span>
          <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
            <Video className="w-3.5 h-3.5" /> Videos (MP4, MOV)
          </span>
        </div>
        {error && (
          <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>
        )}
      </div>
    </motion.div>
  );
}
