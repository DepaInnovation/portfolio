import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';
const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET || 'site-images';

let supabaseClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseServerClient() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Missing Supabase environment variables (SUPABASE_URL, SUPABASE_KEY).');
  }
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return supabaseClient;
}

export function getStorageImageUrl(imagePath?: string | null): string {
  if (!imagePath || typeof imagePath !== 'string') return '';
  const cleanPath = imagePath.trim();
  if (!cleanPath) return '';
  if (/^https?:\/\//i.test(cleanPath)) {
    return cleanPath;
  }
  const cleanRelative = cleanPath.replace(/^\/+/, '');
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${cleanRelative}`;
}

export async function fetchBackupData(tableName: string): Promise<any[] | null> {
  try {
    const backupFilePath = path.join(process.cwd(), 'public', 'data', 'backup.json');
    const content = await fs.readFile(backupFilePath, 'utf-8');
    const json = JSON.parse(content);
    if (json && Array.isArray(json[tableName])) {
      return json[tableName];
    }
    return null;
  } catch (err) {
    console.warn('[Server Backup] Failed to read backup.json:', err);
    return null;
  }
}

