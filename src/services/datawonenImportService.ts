// Service for importing and validating Datawonen, CBS and local project CSV/Excel datasets
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export interface ImportedDataset {
  id: string;
  filename: string;
  uploadedAt: string;
  rowCount: number;
  columns: string[];
  sampleData: Record<string, any>[];
  status: 'valid' | 'warning' | 'error';
  errorMessage?: string;
  downloadUrl?: string;
}

class DatawonenImportService {
  // Parse CSV text string naar JSON records
  parseCsv(csvContent: string): { columns: string[]; rows: Record<string, any>[] } {
    const lines = csvContent.trim().split(/\r\n|\n/);
    if (lines.length === 0) return { columns: [], rows: [] };

    // Bepaal scheidingsteken (komma of puntkomma)
    const delimiter = lines[0].includes(';') ? ';' : ',';
    const columns = lines[0].split(delimiter).map(c => c.trim().replace(/^["']|["']$/g, ''));

    const rows: Record<string, any>[] = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = lines[i].split(delimiter).map(v => v.trim().replace(/^["']|["']$/g, ''));
      const row: Record<string, any> = {};
      columns.forEach((col, idx) => {
        let val: any = values[idx] ?? '';
        // Converteer getallen indien mogelijk
        if (val !== '' && !isNaN(Number(val.replace(',', '.')))) {
          val = Number(val.replace(',', '.'));
        }
        row[col] = val;
      });
      rows.push(row);
    }

    return { columns, rows };
  }

  // Upload CSV naar Firebase Cloud Storage en bewaar metadata
  async uploadDatasetFile(file: File): Promise<ImportedDataset> {
    const fileId = `dataset-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const storageRef = ref(storage, `data-imports/${fileId}`);

    let downloadUrl = '';
    try {
      const snapshot = await uploadBytes(storageRef, file);
      downloadUrl = await getDownloadURL(snapshot.ref);
    } catch (err) {
      console.warn('Firebase Storage offline or permission skipped, keeping local representation:', err);
    }

    const text = await file.text();
    const { columns, rows } = this.parseCsv(text);

    return {
      id: fileId,
      filename: file.name,
      uploadedAt: new Date().toISOString(),
      rowCount: rows.length,
      columns,
      sampleData: rows.slice(0, 5),
      status: rows.length > 0 ? 'valid' : 'warning',
      downloadUrl: downloadUrl || undefined
    };
  }

  // Valideer of een dataset voldoet aan de DataWonen standaard
  validateDatawonenFormat(columns: string[]): { isValid: boolean; missingFields: string[] } {
    const required = ['projectnaam', 'kern', 'woningen', 'status', 'type'];
    const normalizedCols = columns.map(c => c.toLowerCase());
    const missing = required.filter(r => !normalizedCols.some(c => c.includes(r)));
    return {
      isValid: missing.length === 0,
      missingFields: missing
    };
  }
}

export const datawonenImportService = new DatawonenImportService();
