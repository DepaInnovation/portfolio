import { NextResponse } from 'next/server';
import { getSupabaseServerClient, fetchBackupData, getStorageImageUrl } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

function getYouTubeId(url: string): string {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : '';
}

function enrichVideo(item: any) {
  let thumbnail_url = '';
  if (item.thumbnail_path) {
    thumbnail_url = getStorageImageUrl(item.thumbnail_path);
  } else {
    const ytId = getYouTubeId(item.video_url || '');
    if (ytId) {
      thumbnail_url = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    }
  }
  return {
    ...item,
    thumbnail_url,
  };
}

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('videos')
      .select('id,sort_order,title,description,category,duration,series_label,video_url,thumbnail_path,published')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const enriched = data.map(enrichVideo);
      return NextResponse.json(
        { success: true, data: enriched, source: 'supabase' },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );
    }

    const backup = await fetchBackupData('videos');
    if (backup && Array.isArray(backup)) {
      const filtered = backup
        .filter((item) => item.published !== false)
        .sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))
        .map(enrichVideo);
      return NextResponse.json({ success: true, data: filtered, source: 'backup' });
    }

    return NextResponse.json({ success: true, data: [], source: 'empty' });
  } catch (err: any) {
    console.error('[API /api/videos] Error:', err);
    const backup = await fetchBackupData('videos');
    const enriched = (backup || []).map(enrichVideo);
    return NextResponse.json({ success: true, data: enriched, source: 'fallback_error' });
  }
}
