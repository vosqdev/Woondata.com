import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebase';
import { MediaItem, MediaCategory, ImageVariant } from '../types';

// Constants
export const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB strict limit
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];

const MEDIA_COLLECTION = 'media_items';
const LOCAL_STORAGE_KEY = 'dronten_media_library_v1';

// Starter / Curated Media Assets for immediate use in Dronten Projects
export const DEFAULT_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'media-waterrijk-1',
    name: 'Waterrijk Dronten - Watervilla Vogelvlucht.webp',
    category: 'projecten',
    mimeType: 'image/webp',
    sizeBytes: 384000,
    uploadedAt: '2026-08-20T10:30:00.000Z',
    uploadedBy: 'Van Wijnen Projectontwikkeling',
    projectId: 'waterrijk-dronten',
    projectName: 'Waterrijk Dronten (Hanzekwartier)',
    tags: ['Waterrijk', 'Hanzekwartier', 'Watervilla', 'Aan het water', 'Duurzaam'],
    altText: 'Artist impression van royale watervilla’s aan de open vaarroute in Waterrijk Dronten',
    caption: 'Fase 2a - Luxe watervilla’s met eigen aanlegsteiger en A++++ bodemwarmtepomp',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    variants: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=320&q=70',
        width: 320,
        height: 213,
        sizeBytes: 24000
      },
      medium: {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        width: 800,
        height: 533,
        sizeBytes: 112000
      },
      full: {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
        width: 1600,
        height: 1067,
        sizeBytes: 384000
      }
    }
  },
  {
    id: 'media-hanzekwartier-2',
    name: 'Dok van Dronten - Station & Plein.webp',
    category: 'projecten',
    mimeType: 'image/webp',
    sizeBytes: 420000,
    uploadedAt: '2026-08-22T14:15:00.000Z',
    uploadedBy: 'BPD Gebiedsontwikkeling',
    projectId: 'dok-van-dronten',
    projectName: 'Dok van Dronten (Hanzekwartier)',
    tags: ['Stationslocatie', 'Appartementen', 'Hanzelijn', 'Starters', 'Mobiliteitshub'],
    altText: 'Het Dok van Dronten stationskwartier met appartementencomplex en levendige plint',
    caption: 'Modern wooncomplex met 120 appartementen op 2 minuten loopafstand van Station Dronten',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    variants: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=320&q=70',
        width: 320,
        height: 213,
        sizeBytes: 28000
      },
      medium: {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        width: 800,
        height: 533,
        sizeBytes: 135000
      },
      full: {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
        width: 1600,
        height: 1067,
        sizeBytes: 420000
      }
    }
  },
  {
    id: 'media-havenkwartier-3',
    name: 'Havenkwartier - Kadewoningen & Terrassen.webp',
    category: 'locaties',
    mimeType: 'image/webp',
    sizeBytes: 310000,
    uploadedAt: '2026-08-25T09:00:00.000Z',
    uploadedBy: 'Gemeente Dronten Woonteam',
    projectId: 'havenkwartier-dronten',
    projectName: 'Havenkwartier Dronten',
    tags: ['Haven', 'Kade', 'Kerneiland', 'Recreatie', 'Horeca', 'Water'],
    altText: 'Transformatie van het havengebied tot sfeervol maritiem woonkwartier',
    caption: 'Wonen aan de Lage Vaart met wandelpromenade en aanlegsteigers voor sloepen',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    variants: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=320&q=70',
        width: 320,
        height: 213,
        sizeBytes: 21000
      },
      medium: {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        width: 800,
        height: 533,
        sizeBytes: 98000
      },
      full: {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        width: 1600,
        height: 1067,
        sizeBytes: 310000
      }
    }
  },
  {
    id: 'media-participatie-inwoners-4',
    name: 'Participatie Bijeenkomst Dronten - Werksessie.webp',
    category: 'participatie',
    mimeType: 'image/webp',
    sizeBytes: 275000,
    uploadedAt: '2026-08-28T16:40:00.000Z',
    uploadedBy: 'Participatiecoördinator Dronten',
    tags: ['Participatie', 'Werksessie', 'Woonwensen', 'Co-creatie', 'Inwoners'],
    altText: 'Inwoners en stedenbouwkundigen tijdens ontwerpatelier Gebiedsontwikkeling Dronten',
    caption: 'Co-creatie sessie waarin inwoners hun wensen voor groenstructuren inbrengen',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    variants: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=320&q=70',
        width: 320,
        height: 213,
        sizeBytes: 19000
      },
      medium: {
        url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
        width: 800,
        height: 533,
        sizeBytes: 89000
      },
      full: {
        url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
        width: 1600,
        height: 1067,
        sizeBytes: 275000
      }
    }
  },
  {
    id: 'media-buitengebied-groen-5',
    name: 'Wisentbos & Groene Structuren Dronten-Zuid.webp',
    category: 'locaties',
    mimeType: 'image/webp',
    sizeBytes: 440000,
    uploadedAt: '2026-08-29T11:20:00.000Z',
    uploadedBy: 'Gemeente Dronten Groenbeheer',
    tags: ['Wisentbos', 'Dronten-Zuid', 'Natuur', 'Polderlandschap', 'Wadi'],
    altText: 'Prachtig groen polderbos met wandel- en fietspaden langs de plangebieden',
    caption: 'Wisentbos: directe ecologische zone grenzend aan Zuiderweide en De Manege',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    variants: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=320&q=70',
        width: 320,
        height: 213,
        sizeBytes: 26000
      },
      medium: {
        url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
        width: 800,
        height: 533,
        sizeBytes: 140000
      },
      full: {
        url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85',
        width: 1600,
        height: 1067,
        sizeBytes: 440000
      }
    }
  }
];

// Helper: Resize and compress an image file to WebP at given max dimension & quality
export async function createWebPVariant(
  file: File | Blob,
  maxWidth: number,
  quality = 0.82
): Promise<{ blob: Blob; dataUrl: string; width: number; height: number; sizeBytes: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let targetWidth = img.width;
      let targetHeight = img.height;

      if (targetWidth > maxWidth) {
        targetHeight = Math.round((targetHeight * maxWidth) / targetWidth);
        targetWidth = maxWidth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context niet beschikbaar'));
        return;
      }

      // Smooth scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Export as WebP format with fallback
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('WebP conversie mislukt'));
            return;
          }
          const dataUrl = canvas.toDataURL('image/webp', quality);
          resolve({
            blob,
            dataUrl,
            width: targetWidth,
            height: targetHeight,
            sizeBytes: blob.size
          });
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Afbeelding kon niet worden geladen'));
    };

    img.src = objectUrl;
  });
}

// Process a user upload: Validate 2MB limit, generate 3 WebP variants (Thumbnail, Medium, Full)
export async function processImageUpload(file: File): Promise<{
  thumbnail: { blob: Blob; dataUrl: string; width: number; height: number; sizeBytes: number };
  medium: { blob: Blob; dataUrl: string; width: number; height: number; sizeBytes: number };
  full: { blob: Blob; dataUrl: string; width: number; height: number; sizeBytes: number };
}> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const mbSize = (file.size / (1024 * 1024)).toFixed(2);
    throw new Error(`Bestand is te groot (${mbSize} MB). De maximale toegestane bestandsgrootte is 2.00 MB.`);
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|avif|gif)$/i)) {
    throw new Error('Ongeldig bestandsformaat. Upload een JPG, PNG, WebP of AVIF afbeelding.');
  }

  // Generate 3 WebP variants
  const [thumbnail, medium, full] = await Promise.all([
    createWebPVariant(file, 320, 0.75), // Thumbnail: 320px
    createWebPVariant(file, 800, 0.82), // Medium: 800px
    createWebPVariant(file, 1600, 0.88) // Full: max 1600px
  ]);

  return { thumbnail, medium, full };
}

// Local Storage Fallback Cache Helper
function getLocalMedia(): MediaItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return DEFAULT_MEDIA_ITEMS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MEDIA_ITEMS;
  } catch (e) {
    return DEFAULT_MEDIA_ITEMS;
  }
}

function saveLocalMedia(items: MediaItem[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
}

// Fetch all media items from Firestore (with automatic fallback to local storage & defaults)
export async function getAllMediaItems(): Promise<MediaItem[]> {
  try {
    const q = query(collection(db, MEDIA_COLLECTION));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const items: MediaItem[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data() as MediaItem);
      });
      // Sort newest first
      items.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
      saveLocalMedia(items);
      return items;
    } else {
      // Seed default items into Firestore so database is populated
      for (const item of DEFAULT_MEDIA_ITEMS) {
        try {
          await setDoc(doc(db, MEDIA_COLLECTION, item.id), item);
        } catch (err) {
          // ignore seeding error if permissions not yet open
        }
      }
      return getLocalMedia();
    }
  } catch (error) {
    console.warn('Firestore fetch media items fell back to local storage cache:', error);
    return getLocalMedia();
  }
}

// Save or upload a new MediaItem with Firebase Storage & Firestore
export async function uploadMediaItem(params: {
  file: File;
  name: string;
  category: MediaCategory;
  altText: string;
  tags?: string[];
  caption?: string;
  projectId?: string;
  projectName?: string;
  uploadedBy?: string;
}): Promise<MediaItem> {
  const { file, name, category, altText, tags = [], caption, projectId, projectName, uploadedBy } = params;

  // 1. Process client-side WebP optimization with 3 variants & 2MB check
  const processed = await processImageUpload(file);
  const mediaId = `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const cleanName = name.trim().endsWith('.webp') ? name.trim() : `${name.trim().replace(/\.[^/.]+$/, '')}.webp`;

  let thumbUrl = processed.thumbnail.dataUrl;
  let medUrl = processed.medium.dataUrl;
  let fullUrl = processed.full.dataUrl;

  // 2. Attempt to upload variants to Firebase Cloud Storage
  try {
    const fullStorageRef = ref(storage, `media/${category}/${mediaId}-full.webp`);
    const thumbStorageRef = ref(storage, `media/${category}/${mediaId}-thumb.webp`);
    const medStorageRef = ref(storage, `media/${category}/${mediaId}-med.webp`);

    const [fullSnap, thumbSnap, medSnap] = await Promise.all([
      uploadBytes(fullStorageRef, processed.full.blob, { contentType: 'image/webp' }),
      uploadBytes(thumbStorageRef, processed.thumbnail.blob, { contentType: 'image/webp' }),
      uploadBytes(medStorageRef, processed.medium.blob, { contentType: 'image/webp' })
    ]);

    const [remoteFullUrl, remoteThumbUrl, remoteMedUrl] = await Promise.all([
      getDownloadURL(fullSnap.ref),
      getDownloadURL(thumbSnap.ref),
      getDownloadURL(medSnap.ref)
    ]);

    fullUrl = remoteFullUrl;
    thumbUrl = remoteThumbUrl;
    medUrl = remoteMedUrl;
  } catch (storageErr) {
    console.warn('Firebase Storage upload warning (using data URLs / cache fallback):', storageErr);
  }

  const mediaItem: MediaItem = {
    id: mediaId,
    name: cleanName,
    category,
    mimeType: 'image/webp',
    sizeBytes: processed.full.sizeBytes,
    uploadedAt: new Date().toISOString(),
    uploadedBy: uploadedBy || 'Projectbeheerder Dronten',
    projectId,
    projectName,
    tags: tags.filter(t => t.trim().length > 0),
    altText: altText.trim() || cleanName,
    caption: caption?.trim(),
    url: fullUrl,
    variants: {
      thumbnail: {
        url: thumbUrl,
        width: processed.thumbnail.width,
        height: processed.thumbnail.height,
        sizeBytes: processed.thumbnail.sizeBytes
      },
      medium: {
        url: medUrl,
        width: processed.medium.width,
        height: processed.medium.height,
        sizeBytes: processed.medium.sizeBytes
      },
      full: {
        url: fullUrl,
        width: processed.full.width,
        height: processed.full.height,
        sizeBytes: processed.full.sizeBytes
      }
    }
  };

  // 3. Save metadata record to Firestore
  try {
    await setDoc(doc(db, MEDIA_COLLECTION, mediaId), mediaItem);
  } catch (firestoreErr) {
    console.warn('Firestore doc write fallback to localStorage:', firestoreErr);
  }

  // Update local cache
  const current = getLocalMedia();
  saveLocalMedia([mediaItem, ...current]);

  return mediaItem;
}

// Delete media item from Firestore, Storage and Local Cache
export async function deleteMediaItem(mediaId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, MEDIA_COLLECTION, mediaId));
  } catch (err) {
    console.warn('Firestore delete error:', err);
  }

  try {
    const thumbRef = ref(storage, `media/${mediaId}-thumb.webp`);
    await deleteObject(thumbRef);
  } catch (e) {
    // optional cleanup ignore
  }

  const current = getLocalMedia();
  const updated = current.filter(item => item.id !== mediaId);
  saveLocalMedia(updated);
}

// Update media item metadata (tags, altText, caption, name, category)
export async function updateMediaItemMetadata(
  mediaId: string, 
  updates: Partial<Pick<MediaItem, 'name' | 'category' | 'altText' | 'caption' | 'tags' | 'projectId' | 'projectName'>>
): Promise<MediaItem> {
  const current = getLocalMedia();
  const index = current.findIndex(i => i.id === mediaId);
  if (index === -1) throw new Error('Media item niet gevonden');

  const updatedItem: MediaItem = {
    ...current[index],
    ...updates
  };

  try {
    await setDoc(doc(db, MEDIA_COLLECTION, mediaId), updatedItem, { merge: true });
  } catch (err) {
    console.warn('Firestore update metadata error:', err);
  }

  current[index] = updatedItem;
  saveLocalMedia(current);

  return updatedItem;
}
