import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

// In-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 6;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & rate limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ip = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please wait a few minutes before sending another message.',
        },
        { status: 429 }
      );
    }

    // 2. Parse and validate body
    const body = await req.json();
    const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';
    const rawTag = typeof body.sender_tag === 'string' ? body.sender_tag.trim() : '';

    if (!rawMessage) {
      return NextResponse.json(
        { success: false, error: 'Message content cannot be empty.' },
        { status: 400 }
      );
    }

    if (rawMessage.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Message exceeds maximum length of 2000 characters.' },
        { status: 400 }
      );
    }

    // 3. Basic sanitization
    const sanitizedMessage = rawMessage.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '');
    const sanitizedTag = rawTag.slice(0, 50).replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '');

    const payload = {
      message: sanitizedMessage,
      sender_tag: sanitizedTag || 'anonymous',
      created_at: new Date().toISOString(),
      is_read: false,
    };

    // 4. Save to Supabase
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from('anonymous_messages').insert([payload] as any);

    if (error) {
      console.error('[API /api/messages] Supabase insert error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to record message. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been delivered anonymously and safely!',
    });
  } catch (err: any) {
    console.error('[API /api/messages] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: 'Server error occurred.' },
      { status: 500 }
    );
  }
}
