import { NextResponse } from 'next/server';
import { getSupabaseServerClient, fetchBackupData, getStorageImageUrl } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

function enrichProject(item: any) {
  const image_url = getStorageImageUrl(item.image_path || item.image);
  let enrichedMedia = item.media;
  if (Array.isArray(item.media)) {
    enrichedMedia = item.media.map((m: any) => ({
      ...m,
      url: getStorageImageUrl(m.path || m.url),
    }));
  }
  return {
    ...item,
    image_url,
    media: enrichedMedia,
  };
}

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('projects')
      .select('id,sort_order,title,description,category,tags,link_url,image_path,award,problem,my_role,tech,awards,media,published')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const enriched = data.map(enrichProject);
      return NextResponse.json(
        { success: true, data: enriched, source: 'supabase' },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          },
        }
      );
    }

    // Fallback to local backup
    const backup = await fetchBackupData('projects');
    if (backup && Array.isArray(backup)) {
      const filtered = backup
        .filter((item) => item.published !== false)
        .sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))
        .map(enrichProject);
      return NextResponse.json({ success: true, data: filtered, source: 'backup' });
    }

    return NextResponse.json({ success: true, data: [], source: 'empty' });
  } catch (err: any) {
    console.error('[API /api/projects] Error:', err);
    const backup = await fetchBackupData('projects');
    const enriched = (backup || []).map(enrichProject);
    return NextResponse.json({
      success: true,
      data: enriched,
      source: 'fallback_error',
    });
  }
}
