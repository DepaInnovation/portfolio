// =============================================================================
// CONFIG.JS — SUPABASE PUBLIC CONFIGURATION & DATA CLIENT
// =============================================================================
//
// 1. HOW TO CONFIGURE SUPABASE:
//    - SUPABASE_URL: Your Supabase Project URL (e.g. 'https://your-project.supabase.co')
//    - SUPABASE_PUBLISHABLE_KEY: Your new publishable key (starts with 'sb_publishable_')
//      NOTE: This key is NOT a JWT. It MUST be sent ONLY in the "apikey" request header.
//      Never send it as an "Authorization: Bearer" token.
//      Never use or mention any secret / service_role key anywhere in the client code!
//
// 2. HOW TO RUN THE SQL SCRIPT:
//    - Open your Supabase Dashboard -> SQL Editor -> New Query.
//    - Paste the contents of "schema.sql" and click "Run".
//    - This creates 'projects', 'videos', and 'islam_posts' tables, enables RLS,
//      sets public read policies, and seeds the 7 real showcase projects.
//
// 3. HOW TO ADD A NEW ROW FROM SUPABASE TABLE EDITOR:
//    - Go to Supabase Dashboard -> Table Editor -> Select a table:
//      * projects: id, title, description, category, tags (e.g. {"Website","UX/UI"}),
//                  published (true), sort_order (number), image_path (optional).
//      * videos: id, title, description, category, duration, series_label,
//                video_url (YouTube link), published (true), thumbnail_path (optional).
//      * islam_posts: id, caption, category, images (e.g. {"slide1.jpg","slide2.jpg"}),
//                     published (true), alt_text (optional).
//    - Any newly published row will appear on the site automatically.
//
// =============================================================================

const SUPABASE_URL = 'https://fakucjlewuxhihbhsanu.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_OfEEl4p2-U2BBA7OFxgr9g_tG0dtGTZ';

const SupabaseApp = (function () {
  'use strict';

  // Config object with safe defaults
  const config = {
    url: (typeof SUPABASE_URL === 'string' && SUPABASE_URL.trim())
      ? SUPABASE_URL.trim().replace(/\/+$/, '')
      : 'https://fakucjlewuxhihbhsanu.supabase.co',
    publishableKey: (typeof SUPABASE_PUBLISHABLE_KEY === 'string' && SUPABASE_PUBLISHABLE_KEY.trim())
      ? SUPABASE_PUBLISHABLE_KEY.trim()
      : 'sb_publishable_OfEEl4p2-U2BBA7OFxgr9g_tG0dtGTZ',
    bucketName: 'site-images',
    timeoutMs: 6000 // 6-second timeout before fallback
  };

  /**
   * Strictly sanitize URL to only allow valid http or https protocols.
   */
  function sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return '';
  }

  /**
   * Build image URL from public Supabase Storage bucket 'site-images'
   * Format: {URL}/storage/v1/object/public/site-images/{path}
   */
  function getStorageImageUrl(imagePath) {
    if (!imagePath || typeof imagePath !== 'string') return '';
    const trimmed = imagePath.trim();
    if (!trimmed) return '';

    // If it's already an absolute http(s) URL
    if (/^https?:\/\//i.test(trimmed)) return trimmed;

    // Clean leading slashes
    const cleanPath = trimmed.replace(/^\/+/, '');
    return `${config.url}/storage/v1/object/public/${config.bucketName}/${cleanPath}`;
  }

  /**
   * Extract YouTube 11-character video ID from watch?v= or youtu.be links
   */
  function getYouTubeVideoId(url) {
    if (!url || typeof url !== 'string') return '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : '';
  }

  /**
   * Get thumbnail for a video:
   * 1. If thumbnail_path is provided, use bucket image.
   * 2. Else fallback to YouTube auto-generated high quality cover.
   */
  function getVideoThumbnail(videoUrl, thumbnailPath) {
    if (thumbnailPath) {
      const bucketThumb = getStorageImageUrl(thumbnailPath);
      if (bucketThumb) return bucketThumb;
    }
    const ytId = getYouTubeVideoId(videoUrl);
    if (ytId) {
      return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    }
    return '';
  }

  /**
   * Safe localStorage get wrapper
   */
  function getCache(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('[Cache] Unable to read localStorage for key:', key, e);
      return null;
    }
  }

  /**
   * Safe localStorage set wrapper
   */
  function setCache(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('[Cache] Unable to save to localStorage:', key, e);
    }
  }

  /**
   * Fetch fallback data from data/backup.json
   */
  async function fetchBackupData(tableName) {
    try {
      const res = await fetch('data/backup.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error(`Backup HTTP ${res.status}`);
      const json = await res.json();
      if (!json) throw new Error('Empty backup file');
      if (Array.isArray(json[tableName])) {
        return json[tableName];
      }
      return [];
    } catch (err) {
      console.warn('[Backup] Failed to fetch data/backup.json:', err);
      return null;
    }
  }

  /**
   * Fetch table data from Supabase REST endpoint with:
   * - apikey header ONLY (NO Authorization: Bearer header)
   * - AbortController 6-second timeout
   * - LocalStorage cache & data/backup.json fallback
   *
   * @param {string} tableName - e.g. 'projects', 'videos', 'islam_posts'
   * @param {string} queryParams - PostgREST query string e.g. 'select=*&published=eq.true'
   * @param {string} cacheKey - localStorage key for caching
   * @returns {Promise<{ data: Array, source: 'supabase'|'cache'|'backup' }>}
   */
  async function loadTableData(tableName, queryParams, cacheKey) {
    const endpoint = `${config.url}/rest/v1/${tableName}?${queryParams}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.timeoutMs);

    let supabaseError = null;

    try {
      // Send ONLY 'apikey', never 'Authorization: Bearer' for publishable key
      const res = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'apikey': config.publishableKey,
          'Accept': 'application/json'
        },
        signal: controller.signal
      });

      clearTimeout(timer);

      if (!res.ok) {
        throw new Error(`Supabase REST HTTP ${res.status}: ${res.statusText}`);
      }

      const rawData = await res.json();

      if (!Array.isArray(rawData)) {
        throw new Error(`Invalid response structure for table ${tableName}`);
      }

      // Save successful response in cache
      if (cacheKey) {
        setCache(cacheKey, rawData);
      }

      return { data: rawData, source: 'supabase' };

    } catch (err) {
      clearTimeout(timer);
      supabaseError = err;
      console.warn(`[SupabaseApp] Fetch error or timeout for "${tableName}":`, err.message);

      // 1. Try localStorage cache
      if (cacheKey) {
        const cached = getCache(cacheKey);
        if (cached && Array.isArray(cached) && cached.length > 0) {
          console.info(`[SupabaseApp] Using cached data for "${tableName}" (${cached.length} items)`);
          return { data: cached, source: 'cache' };
        }
      }

      // 2. Try data/backup.json
      const backupRows = await fetchBackupData(tableName);
      if (backupRows && Array.isArray(backupRows)) {
        console.info(`[SupabaseApp] Using data/backup.json fallback for "${tableName}" (${backupRows.length} items)`);
        return { data: backupRows, source: 'backup' };
      }

      // 3. Both failed: throw error with clear message
      throw new Error(`Could not load ${tableName}: ${supabaseError.message}`);
    }
  }

  return {
    config,
    sanitizeUrl,
    getStorageImageUrl,
    getYouTubeVideoId,
    getVideoThumbnail,
    getCache,
    setCache,
    loadTableData
  };
})();

// Export globally for browser usage
window.SupabaseApp = SupabaseApp;
window.SUPABASE_URL = SupabaseApp.config.url;
window.SUPABASE_PUBLISHABLE_KEY = SupabaseApp.config.publishableKey;
