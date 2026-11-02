import { NextResponse } from 'next/server';
import { getSupabaseServerClient, fetchBackupData, getStorageImageUrl } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

function enrichIslamPost(item: any) {
  let images_urls: string[] = [];
  if (Array.isArray(item.images)) {
    images_urls = item.images.map((img: string) => getStorageImageUrl(img));
  }
  return {
    ...item,
    images_urls,
  };
}

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('islam_posts')
      .select('id,sort_order,caption,category,images,alt_text,published')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const enriched = data.map(enrichIslamPost);
      return NextResponse.json(
        { success: true, data: enriched, source: 'supabase' },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          },
        }
      );
    }

    const backup = await fetchBackupData('islam_posts');
    if (backup && Array.isArray(backup)) {
      const filtered = backup
        .filter((item) => item.published !== false)
        .sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))
        .map(enrichIslamPost);
      return NextResponse.json({ success: true, data: filtered, source: 'backup' });
    }

    return NextResponse.json({ success: true, data: [], source: 'empty' });
  } catch (err: any) {
    console.error('[API /api/islam] Error:', err);
    const backup = await fetchBackupData('islam_posts');
    const enriched = (backup || []).map(enrichIslamPost);
    return NextResponse.json({ success: true, data: enriched, source: 'fallback_error' });
  }
}
