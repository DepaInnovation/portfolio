import { NextRequest, NextResponse } from 'next/server';
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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid project ID' }, { status: 400 });
    }

    const cleanId = id.trim().toLowerCase();
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .ilike('id', cleanId)
      .eq('published', true)
      .maybeSingle();

    if (!error && data) {
      return NextResponse.json({ success: true, data: enrichProject(data), source: 'supabase' });
    }

    // Fallback to local backup
    const backup = await fetchBackupData('projects');
    if (backup && Array.isArray(backup)) {
      const match = backup.find(
        (p) => String(p.id).toLowerCase() === cleanId && p.published !== false
      );
      if (match) {
        return NextResponse.json({ success: true, data: enrichProject(match), source: 'backup' });
      }
    }

    return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
  } catch (err: any) {
    console.error('[API /api/projects/[id]] Error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
