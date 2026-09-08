import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Layers,
  Info,
  Maximize2
} from 'lucide-react';
import { MediaItem, MediaCategory } from '../types';
import { 
  uploadMediaItem, 
  processImageUpload, 
  MAX_FILE_SIZE_BYTES 
} from '../services/mediaService';

interface ImageUploaderProps {
  currentImageUrl?: string;
  onImageSelected: (item: MediaItem) => void;
  category?: MediaCategory;
  projectId?: string;
  projectName?: string;
  label?: string;
  helperText?: string;
  className?: string;
  compact?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImageUrl,
  onImageSelected,
  category = 'projecten',
  projectId,
  projectName,
  label = 'Afbeelding uploaden',
  helperText = 'Automatische conversie naar WebP (max. 2 MB) met 3 resolutievarianten (Thumbnail, Medium, Full).',
  className = '',
  compact = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    name: string;
    origSize: string;
    optSize: string;
    reduction: string;
    variants: string;
  } | null>(null);

  const handleFile = async (file: File) => {
    setErrorMessage(null);
    setSuccessInfo(null);

    // 1. Validation check
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const mbSize = (file.size / (1024 * 1024)).toFixed(2);
      setErrorMessage(`Bestand is te groot (${mbSize} MB). De maximale toegestane bestandsgrootte is 2.00 MB.`);
      return;
    }

    try {
      setIsProcessing(true);
      setUploadProgress(20);

      const origBytes = file.size;
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

      setUploadProgress(50);

      // Upload and optimize with WebP 3-variant generation
      const uploadedItem = await uploadMediaItem({
        file,
        name: file.name,
        category: (category as MediaCategory) || 'projecten',
        altText: cleanTitle,
        tags: [projectName || 'Nieuwbouw', category, 'WebP Geoptimaliseerd'],
        caption: `Geüpload voor ${projectName || 'Nieuwbouw Dronten'}`,
        projectId,
        projectName
      });

      setUploadProgress(100);

      const optBytes = uploadedItem.sizeBytes;
      const reduction = Math.max(0, Math.round(((origBytes - optBytes) / origBytes) * 100));

      setSuccessInfo({
        name: uploadedItem.name,
        origSize: `${(origBytes / 1024).toFixed(0)} KB`,
        optSize: `${(optBytes / 1024).toFixed(0)} KB`,
        reduction: `${reduction}% kleiner`,
        variants: 'Thumbnail (320px) • Medium (800px) • Full (1600px)'
      });

      onImageSelected(uploadedItem);
    } catch (err: any) {
      setErrorMessage(err.message || 'Er is een fout opgetreden bij het verwerken van de afbeelding.');
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-900 font-display">
            {label}
          </label>
          <span className="text-[11px] font-semibold text-[#8BB800] bg-[#C9F31D]/15 px-2 py-0.5 rounded-md">
            Max 2 MB • WebP Auto-convert
          </span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Upload Zone & Preview */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 ${
          isDragging
            ? 'border-[#C9F31D] bg-[#C9F31D]/10 ring-4 ring-[#C9F31D]/20 scale-[1.01]'
            : currentImageUrl
            ? 'border-slate-300 bg-slate-50 hover:border-slate-400'
            : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50/60'
        } p-4 sm:p-5 text-center`}
      >
        {/* If an image is currently selected/active */}
        {currentImageUrl && !isProcessing ? (
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden aspect-video max-h-48 mx-auto bg-slate-900 shadow-md group">
              <img
                src={currentImageUrl}
                alt="Voorbeeldweergave"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                <div className="flex items-center justify-between w-full text-white text-xs">
                  <span className="flex items-center gap-1 font-bold text-[#C9F31D]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Actieve afbeelding</span>
                  </span>
                  <span className="text-[10px] bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs font-mono text-slate-200">
                    WebP Resolutievarianten gereed
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold font-display flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
              >
                <Upload className="w-3.5 h-3.5 text-[#C9F31D]" />
                <span>Nieuwe foto uploaden</span>
              </button>
            </div>
          </div>
        ) : (
          /* Empty / Upload prompt state */
          <div className="space-y-3 py-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 mx-auto flex items-center justify-center shadow-xs">
              <ImageIcon className="w-6 h-6 text-slate-800" />
            </div>

            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 font-display">
                Sleep hier een afbeelding heen, of{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-slate-950 underline underline-offset-2 hover:text-black font-extrabold cursor-pointer"
                >
                  blader op uw apparaat
                </button>
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Ondersteunt JPG, PNG, WebP en AVIF (maximaal 2.00 MB per bestand)
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-[#080E1B] hover:bg-black text-white text-xs font-bold font-display flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
              >
                <Upload className="w-3.5 h-3.5 text-[#C9F31D]" />
                <span>Upload vanaf computer</span>
              </button>
            </div>
          </div>
        )}

        {/* Processing State Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center p-6 space-y-3 z-20">
            <div className="w-10 h-10 border-3 border-slate-200 border-t-[#C9F31D] rounded-full animate-spin" />
            <div className="text-center">
              <span className="text-xs font-bold text-slate-900 block font-display">
                Afbeelding optimaliseren & converteren naar WebP...
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Genereren van 3 varianten: Thumbnail (320px), Medium (800px) en Full HD (1600px)
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-950 transition-all duration-300 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Optimization Success Banner */}
      {successInfo && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950">{successInfo.name} succesvol geoptimaliseerd!</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-200/60 text-emerald-900 font-extrabold text-[10px]">
                {successInfo.reduction}
              </span>
            </div>
            <div className="text-[11px] text-emerald-800 flex flex-wrap gap-x-3 gap-y-0.5">
              <span>Origineel: <strong>{successInfo.origSize}</strong></span>
              <span>→ Geoptimaliseerd: <strong>{successInfo.optSize}</strong> (WebP)</span>
              <span>• Varianten: {successInfo.variants}</span>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-900 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block">Upload mislukt</span>
            <span className="text-[11px] text-red-700">{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-red-400 hover:text-red-700 cursor-pointer p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Helper text */}
      {helperText && !successInfo && !errorMessage && (
        <p className="text-[11px] text-slate-500 leading-normal flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{helperText}</span>
        </p>
      )}
    </div>
  );
};
