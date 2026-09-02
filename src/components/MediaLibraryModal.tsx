import React, { useState, useEffect, useMemo } from 'react';
import {
  FolderOpen,
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Check,
  Trash2,
  ExternalLink,
  Info,
  Maximize2,
  Tag,
  Calendar,
  HardDrive,
  Copy,
  Layers,
  Sparkles,
  X,
  Plus,
  Edit2,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MediaItem, MediaCategory } from '../types';
import { 
  getAllMediaItems, 
  uploadMediaItem, 
  deleteMediaItem, 
  updateMediaItemMetadata,
  MAX_FILE_SIZE_BYTES 
} from '../services/mediaService';
import { PROJECTS_DATA } from '../data/mockData';

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage?: (item: MediaItem) => void;
  initialCategory?: MediaCategory | 'alle';
  targetProjectId?: string;
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  initialCategory = 'alle',
  targetProjectId
}) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(targetProjectId || 'alle');
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isUploading, setIsUploading] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // New Upload Form modal/drawer state
  const [showUploadDrawer, setShowUploadDrawer] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState<MediaCategory>('projecten');
  const [uploadAltText, setUploadAltText] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadTags, setUploadTags] = useState('');
  const [uploadProjId, setUploadProjId] = useState<string>(targetProjectId || '');
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Edit metadata modal state
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);

  // Load items from Firestore / Cache on open
  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen]);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const data = await getAllMediaItems();
      setItems(data);
      if (data.length > 0 && !activeItem) {
        setActiveItem(data[0]);
      }
    } catch (e) {
      console.error('Error fetching media:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCat = selectedCategory === 'alle' || item.category === selectedCategory;
      const matchProj = selectedProjectId === 'alle' || item.projectId === selectedProjectId;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.altText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.projectName && item.projectName.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchProj && matchSearch;
    });
  }, [items, selectedCategory, selectedProjectId, searchQuery]);

  // Handle File selection for upload drawer
  const handleSelectUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE_BYTES) {
        const mb = (file.size / (1024 * 1024)).toFixed(2);
        setUploadError(`Bestand is te groot (${mb} MB). Maximum is 2.00 MB.`);
        return;
      }
      setUploadFile(file);
      setUploadName(file.name.replace(/\.[^/.]+$/, ''));
      setUploadAltText(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      const objectUrl = URL.createObjectURL(file);
      setUploadPreview(objectUrl);
    }
  };

  const handlePerformUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    try {
      setIsUploading(true);
      setUploadError(null);

      const matchedProj = PROJECTS_DATA.find(p => p.id === uploadProjId);
      const tagList = uploadTags.split(',').map(t => t.trim()).filter(Boolean);

      const newItem = await uploadMediaItem({
        file: uploadFile,
        name: uploadName,
        category: uploadCategory,
        altText: uploadAltText,
        caption: uploadCaption,
        tags: tagList,
        projectId: uploadProjId || undefined,
        projectName: matchedProj?.title,
        uploadedBy: 'Beheerder Dronten'
      });

      setItems(prev => [newItem, ...prev]);
      setActiveItem(newItem);
      setShowUploadDrawer(false);
      setUploadFile(null);
      setUploadPreview(null);
      showNotice(`✓ "${newItem.name}" succesvol geüpload in WebP formaat met 3 resolutievarianten!`);
    } catch (err: any) {
      setUploadError(err.message || 'Upload mislukt.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (!window.confirm(`Weet u zeker dat u "${item.name}" wilt verwijderen uit de bibliotheek?`)) {
      return;
    }
    try {
      await deleteMediaItem(item.id);
      setItems(prev => prev.filter(i => i.id !== item.id));
      if (activeItem?.id === item.id) {
        setActiveItem(null);
      }
      showNotice(`Afbeelding "${item.name}" is verwijderd.`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      const updated = await updateMediaItemMetadata(editingItem.id, {
        name: editingItem.name,
        category: editingItem.category,
        altText: editingItem.altText,
        caption: editingItem.caption,
        tags: editingItem.tags,
        projectId: editingItem.projectId,
        projectName: PROJECTS_DATA.find(p => p.id === editingItem.projectId)?.title
      });

      setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
      if (activeItem?.id === updated.id) {
        setActiveItem(updated);
      }
      setEditingItem(null);
      showNotice('Metadata succesvol bijgewerkt.');
    } catch (e) {
      console.error(e);
    }
  };

  const copyUrlToClipboard = (url: string, label: string) => {
    navigator.clipboard.writeText(url);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-hidden">
      <div className="bg-[#080E1B] text-slate-100 rounded-3xl w-full max-w-7xl h-[92vh] max-h-[920px] shadow-2xl border border-white/10 flex flex-col overflow-hidden relative">
        
        {/* TOP HEADER */}
        <header className="px-6 py-4 bg-[#0A1224] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9F31D] text-slate-950 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(201,243,29,0.3)]">
              <FolderOpen className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
                  Centrale Mediabibliotheek
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C9F31D]/15 text-[#C9F31D] border border-[#C9F31D]/30 uppercase font-display">
                  Firebase Cloud Storage + WebP
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Beheer, optimaliseer en selecteer foto’s met automatische 3-varianten generatie (Thumbnail, Medium, Full).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowUploadDrawer(true)}
              className="px-4 py-2 rounded-full bg-[#C9F31D] hover:bg-[#BFE51A] text-slate-950 text-xs font-bold font-display flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(201,243,29,0.25)] hover:scale-105 transition-all"
            >
              <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Nieuwe afbeelding uploaden</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer transition-colors"
              title="Sluiten"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* FILTER & SEARCH TOOLBAR */}
        <div className="px-6 py-3 bg-[#060B14] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Zoek op bestandsnaam, tag of project..."
                className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
              {[
                { id: 'alle', label: 'Alle' },
                { id: 'projecten', label: 'Projecten' },
                { id: 'participatie', label: 'Participatie' },
                { id: 'locaties', label: 'Locaties' },
                { id: 'documenten', label: 'Docs & Kaarten' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#C9F31D] text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Project Filter */}
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#0A1224] border border-white/10 text-xs text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
            >
              <option value="alle">Alle projecten / algemeen</option>
              {PROJECTS_DATA.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* View mode toggle & item counter */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">
              {filteredItems.length} {filteredItems.length === 1 ? 'afbeelding' : 'afbeeldingen'}
            </span>

            <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Rasterweergave"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Lijstweergave"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={loadMedia}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Verversen"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* MAIN SPLIT VIEW (GALLERY ON LEFT, DETAIL INSPECTOR ON RIGHT) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT: GALLERY AREA */}
          <div className="flex-1 p-6 overflow-y-auto bg-[#070D18]">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-3 text-slate-400">
                <div className="w-8 h-8 border-2 border-white/20 border-t-[#C9F31D] rounded-full animate-spin" />
                <span className="text-xs">Mediabestanden laden uit Cloud Storage...</span>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Geen afbeeldingen gevonden</h3>
                  <p className="text-xs text-slate-400 max-w-sm mt-1">
                    Er zijn geen mediabestanden die voldoen aan het zoekfilter. Upload een nieuwe afbeelding of pas de filters aan.
                  </p>
                </div>
                <button
                  onClick={() => setShowUploadDrawer(true)}
                  className="px-4 py-2 rounded-xl bg-[#C9F31D] text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-display"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload direct afbeelding</span>
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* GRID VIEW */
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => {
                  const isSelected = activeItem?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveItem(item)}
                      onDoubleClick={() => onSelectImage && onSelectImage(item)}
                      className={`group relative rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-[#C9F31D] bg-[#0E1B33] ring-2 ring-[#C9F31D]/40 shadow-[0_0_20px_rgba(201,243,29,0.15)] scale-[1.02]'
                          : 'border-white/10 bg-[#0A1224] hover:border-white/25 hover:bg-[#0D1830]'
                      }`}
                    >
                      {/* Image Thumbnail Preview */}
                      <div className="aspect-4/3 overflow-hidden bg-slate-950 relative">
                        <img
                          src={item.variants.thumbnail.url || item.url}
                          alt={item.altText}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        {/* Overlay badges */}
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                          <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-[10px] font-bold text-white uppercase font-display border border-white/10">
                            {item.category}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="px-1.5 py-0.5 rounded-md bg-[#C9F31D]/90 text-slate-950 text-[9px] font-extrabold font-mono">
                            WebP
                          </span>
                        </div>
                      </div>

                      {/* Image info bar */}
                      <div className="p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white truncate max-w-[140px]" title={item.name}>
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {(item.sizeBytes / 1024).toFixed(0)} KB
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          {item.projectName || item.altText}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="space-y-2">
                {filteredItems.map((item) => {
                  const isSelected = activeItem?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveItem(item)}
                      onDoubleClick={() => onSelectImage && onSelectImage(item)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-[#C9F31D] bg-[#0E1B33] ring-1 ring-[#C9F31D]/40'
                          : 'border-white/10 bg-[#0A1224] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-white/10">
                          <img
                            src={item.variants.thumbnail.url || item.url}
                            alt={item.altText}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 text-[9px] font-bold uppercase">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {item.projectName ? `Project: ${item.projectName} • ` : ''}
                            {item.altText}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
                        <span className="font-mono">{(item.sizeBytes / 1024).toFixed(0)} KB</span>
                        <span>{new Date(item.uploadedAt).toLocaleDateString('nl-NL')}</span>
                        {onSelectImage && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectImage(item);
                            }}
                            className="px-3 py-1 rounded-xl bg-[#C9F31D] text-slate-950 text-xs font-bold hover:bg-[#BFE51A]"
                          >
                            Kiezen
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: DETAIL INSPECTOR & ACTIONS */}
          <aside className="w-80 sm:w-96 bg-[#09101F] border-l border-white/10 p-5 overflow-y-auto flex flex-col justify-between shrink-0">
            {activeItem ? (
              <div className="space-y-5">
                {/* Preview Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-white/10 shadow-lg group">
                  <img
                    src={activeItem.variants.medium.url || activeItem.url}
                    alt={activeItem.altText}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <a
                    href={activeItem.variants.full.url || activeItem.url}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-xs backdrop-blur-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Open Full Resolution"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Primary Select Action */}
                {onSelectImage && (
                  <button
                    type="button"
                    onClick={() => onSelectImage(activeItem)}
                    className="w-full py-3 rounded-2xl bg-[#C9F31D] hover:bg-[#BFE51A] text-slate-950 font-extrabold text-sm font-display flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,243,29,0.3)] cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Selecteer deze afbeelding</span>
                  </button>
                )}

                {/* Metadata & Technical specs */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-white uppercase tracking-wider text-[11px] font-display">
                      Details & Specificaties
                    </span>
                    <button
                      onClick={() => setEditingItem(activeItem)}
                      className="text-[#C9F31D] hover:underline text-[11px] font-bold flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Bewerk info</span>
                    </button>
                  </div>

                  <div className="space-y-2 text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Bestandsnaam</span>
                      <span className="font-mono text-white break-all">{activeItem.name}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Formaat</span>
                        <span className="text-white font-semibold">WebP (Compressed)</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Grootte (Full)</span>
                        <span className="text-white font-mono">{(activeItem.sizeBytes / 1024).toFixed(0)} KB</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Alt-tekst (SEO / A11y)</span>
                      <span className="text-slate-200">{activeItem.altText}</span>
                    </div>

                    {activeItem.caption && (
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Onderschrift</span>
                        <span className="text-slate-300 italic">{activeItem.caption}</span>
                      </div>
                    )}

                    {activeItem.projectName && (
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Gekoppeld Project</span>
                        <span className="text-[#C9F31D] font-bold">{activeItem.projectName}</span>
                      </div>
                    )}

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Tags</span>
                      <div className="flex flex-wrap gap-1">
                        {activeItem.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resolutievanten & Copy URLs */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white flex items-center gap-1.5 font-display">
                      <Layers className="w-3.5 h-3.5 text-[#C9F31D]" />
                      <span>Gegenereerde Resolutievarianten</span>
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {[
                      { key: 'thumbnail', label: 'Thumbnail (320px)', variant: activeItem.variants.thumbnail },
                      { key: 'medium', label: 'Medium (800px)', variant: activeItem.variants.medium },
                      { key: 'full', label: 'Full HD (1600px)', variant: activeItem.variants.full }
                    ].map((v) => (
                      <div
                        key={v.key}
                        className="flex items-center justify-between p-2 rounded-xl bg-white/5 text-xs"
                      >
                        <div>
                          <span className="font-semibold text-slate-200 block text-[11px]">{v.label}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {v.variant.width}x{v.variant.height}px • {(v.variant.sizeBytes / 1024).toFixed(0)} KB
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyUrlToClipboard(v.variant.url, v.key)}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-[10px] font-bold font-display flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copyFeedback === v.key ? 'Gekopieerd!' : 'Kopieer URL'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delete button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleDelete(activeItem)}
                    className="w-full py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Verwijder uit bibliotheek</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-4">
                <Info className="w-8 h-8 mb-2" />
                <span className="text-xs">Selecteer een afbeelding uit de lijst om de details, varianten en URL’s te bekijken.</span>
              </div>
            )}
          </aside>
        </div>

        {/* ========================================================= */}
        {/* MODAL / DRAWER: NIEUWE AFBEELDING UPLOADEN MET WEBP CONVERT */}
        {/* ========================================================= */}
        {showUploadDrawer && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#0A1224] rounded-3xl p-6 max-w-xl w-full border border-white/15 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#C9F31D] text-slate-950 flex items-center justify-center font-bold">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-display">Nieuwe afbeelding uploaden</h3>
                    <p className="text-[11px] text-slate-400">Automatische WebP optimalisatie met max. 2 MB harde limiet</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUploadDrawer(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePerformUpload} className="space-y-3.5">
                {/* File picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Selecteer afbeeldingsbestand (JPG, PNG, WebP) *
                  </label>
                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={handleSelectUploadFile}
                    className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C9F31D] file:text-slate-950 hover:file:bg-[#BFE51A] file:cursor-pointer cursor-pointer"
                  />
                  {uploadError && (
                    <p className="text-xs text-red-400 mt-1 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{uploadError}</span>
                    </p>
                  )}
                </div>

                {/* Preview if chosen */}
                {uploadPreview && (
                  <div className="relative rounded-xl overflow-hidden max-h-36 bg-slate-950 aspect-video mx-auto border border-white/10">
                    <img src={uploadPreview} alt="Upload preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Titel / Bestandsnaam *</label>
                    <input
                      type="text"
                      required
                      value={uploadName}
                      onChange={(e) => setUploadName(e.target.value)}
                      placeholder="Bijv. Waterrijk Fase 2 Vogelvlucht"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#C9F31D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Categorie *</label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value as MediaCategory)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#060B14] border border-white/10 text-xs text-white focus:ring-2 focus:ring-[#C9F31D]"
                    >
                      <option value="projecten">Projecten (Artist Impressions)</option>
                      <option value="participatie">Participatie & Werksessies</option>
                      <option value="locaties">Locaties & Omgeving</option>
                      <option value="documenten">Documenten & Plankaarten</option>
                      <option value="algemeen">Algemeen</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Gekoppeld Project (Optioneel)</label>
                  <select
                    value={uploadProjId}
                    onChange={(e) => setUploadProjId(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#060B14] border border-white/10 text-xs text-white focus:ring-2 focus:ring-[#C9F31D]"
                  >
                    <option value="">Geen specifiek project (Algemeen)</option>
                    {PROJECTS_DATA.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.kern})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Alt-tekst (voor toegankelijkheid & SEO)</label>
                  <input
                    type="text"
                    value={uploadAltText}
                    onChange={(e) => setUploadAltText(e.target.value)}
                    placeholder="Beschrijf beknopt wat er op de afbeelding te zien is"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#C9F31D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tags (komma-gescheiden)</label>
                  <input
                    type="text"
                    value={uploadTags}
                    onChange={(e) => setUploadTags(e.target.value)}
                    placeholder="water, hanzekwartier, nieuwbouw, duurzaam"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#C9F31D]"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadDrawer(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading || !uploadFile}
                    className="px-5 py-2 rounded-xl bg-[#C9F31D] hover:bg-[#BFE51A] disabled:opacity-50 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-display"
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Converteren & Uploaden...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload & Genereer Varianten</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL: METADATA BEWERKEN                                  */}
        {/* ========================================================= */}
        {editingItem && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#0A1224] rounded-3xl p-6 max-w-lg w-full border border-white/15 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white font-display">Metadata bewerken</h3>
                <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveMetadata} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Naam</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:ring-2 focus:ring-[#C9F31D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Categorie</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as MediaCategory })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#060B14] border border-white/10 text-xs text-white focus:ring-2 focus:ring-[#C9F31D]"
                  >
                    <option value="projecten">Projecten</option>
                    <option value="participatie">Participatie</option>
                    <option value="locaties">Locaties</option>
                    <option value="documenten">Documenten</option>
                    <option value="algemeen">Algemeen</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Alt-tekst</label>
                  <input
                    type="text"
                    value={editingItem.altText}
                    onChange={(e) => setEditingItem({ ...editingItem, altText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:ring-2 focus:ring-[#C9F31D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Onderschrift / Toelichting</label>
                  <textarea
                    rows={2}
                    value={editingItem.caption || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:ring-2 focus:ring-[#C9F31D] resize-none"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#C9F31D] text-slate-950 rounded-xl text-xs font-bold font-display"
                  >
                    Opslaan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TOAST ACTION NOTICE */}
        {actionNotice && (
          <div className="absolute bottom-4 left-6 z-50 animate-slideUp">
            <div className="bg-[#0B1528] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#C9F31D]/40 flex items-center gap-2.5 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#C9F31D] shrink-0" />
              <span>{actionNotice}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
