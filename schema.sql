-- ============================================================================
-- SUPABASE SCHEMA & SEED SCRIPT (PORTFOLIO PUBLIC READ-ONLY SITE)
-- ============================================================================
-- INSTRUCTIONS FOR SUPABASE SQL EDITOR:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Select your project (fakucjlewuxhihbhsanu)
-- 3. Click "SQL Editor" in the left navigation sidebar
-- 4. Click "New query", paste this entire script, and click "Run" (or Ctrl/Cmd + Enter)
-- 5. All 3 tables will be created, secured with RLS (public read-only), and the
--    7 real projects will be seeded in exact order.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. TABLE: projects
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,                       -- Stable unique slug (e.g. 'd-kebun')
  sort_order INTEGER DEFAULT 0,              -- Controls visual display order
  published BOOLEAN DEFAULT true,            -- Only published=true is visible to public
  created_at TIMESTAMPTZ DEFAULT now(),      -- Timestamp of creation
  title TEXT NOT NULL,                       -- Project display title
  description TEXT,                          -- Thai description text
  category TEXT NOT NULL,                    -- Category (e.g. 'Projects', 'Robotics', 'Academic')
  tags TEXT[] DEFAULT '{}',                  -- Array of tags (e.g. ['Website', 'UX/UI'])
  link_url TEXT,                             -- Optional external link (https://...)
  image_path TEXT,                           -- Optional filename/path in bucket 'site-images'
  award TEXT,                                -- Legacy award field
  problem TEXT,                              -- Background / problem statement
  my_role TEXT,                              -- What I did / role statement
  tech TEXT[] DEFAULT '{}',                  -- Array of technologies used
  awards JSONB DEFAULT '[]'::jsonb,          -- List of awards {level, title, detail}
  media JSONB DEFAULT '[]'::jsonb            -- List of media items {type, path/url, caption}
);

-- ----------------------------------------------------------------------------
-- 2. TABLE: videos
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.videos (
  id TEXT PRIMARY KEY,                       -- Stable unique slug (e.g. 'calc-limits-continuity')
  sort_order INTEGER DEFAULT 0,              -- Controls visual display order
  published BOOLEAN DEFAULT true,            -- Only published=true is visible to public
  created_at TIMESTAMPTZ DEFAULT now(),      -- Timestamp of creation
  title TEXT NOT NULL,                       -- Video title
  description TEXT,                          -- Brief video description
  category TEXT NOT NULL,                    -- Category (e.g. 'Calculus', 'Computer')
  duration TEXT,                             -- Duration string (e.g. '18:45')
  series_label TEXT,                         -- Series / Topic label (e.g. 'Limits and Continuity')
  video_url TEXT NOT NULL,                   -- YouTube link (watch?v= or youtu.be)
  thumbnail_path TEXT                        -- Optional custom cover path in bucket 'site-images'
);

-- ----------------------------------------------------------------------------
-- 3. TABLE: islam_posts
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.islam_posts (
  id TEXT PRIMARY KEY,                       -- Stable unique slug (e.g. 'islam-post-01')
  sort_order INTEGER DEFAULT 0,              -- Controls visual display order
  published BOOLEAN DEFAULT true,            -- Only published=true is visible to public
  created_at TIMESTAMPTZ DEFAULT now(),      -- Timestamp of creation
  caption TEXT DEFAULT '',                   -- Optional reflection caption
  category TEXT NOT NULL,                    -- Subcategory / theme
  images TEXT[] DEFAULT '{}',                -- Array of file paths in bucket 'site-images'
  alt_text TEXT                              -- Accessibility text
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) & PUBLIC READ-ONLY POLICIES
-- ============================================================================
-- Protect tables against unauthorized write/update/delete operations.
-- Public visitors (anon) and authenticated users can ONLY SELECT published rows.

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.islam_posts ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies with the same name before recreating
DROP POLICY IF EXISTS "Public read published projects" ON public.projects;
DROP POLICY IF EXISTS "Public read published videos" ON public.videos;
DROP POLICY IF EXISTS "Public read published islam_posts" ON public.islam_posts;

-- Allow anon and authenticated to SELECT published rows only
CREATE POLICY "Public read published projects"
  ON public.projects
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Public read published videos"
  ON public.videos
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Public read published islam_posts"
  ON public.islam_posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Explicitly grant SELECT permissions in case PostgREST schema cache needs it
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT SELECT ON public.videos TO anon, authenticated;
GRANT SELECT ON public.islam_posts TO anon, authenticated;

-- ============================================================================
-- SEED DATA: 7 REAL PROJECTS ONLY
-- (Videos and Islam posts are NOT seeded; all mock cards are removed)
-- ============================================================================
INSERT INTO public.projects (id, sort_order, published, title, description, category, tags, link_url, image_path, award)
VALUES
  (
    'd-kebun',
    1,
    true,
    'D-kebun',
    'เว็บไซต์ส่งเสริมตลาดเกษตรอินทรีย์ สร้างช่องทางขายให้เกษตรกรสามจังหวัดชายแดนภาคใต้',
    'Projects',
    ARRAY['Website', 'UX/UI', 'Digital Marketing'],
    NULL,
    NULL,
    'National Silver, I New Gen Award 2024'
  ),
  (
    'ws-smart-control',
    2,
    true,
    'WS smart control',
    'AI คำนวณความต้องการน้ำของพืชจากภาพถ่ายดาวเทียม พร้อมแอปให้เกษตรกรใช้งาน',
    'Projects',
    ARRAY['Machine Learning', 'Satellite Data', 'Application'],
    NULL,
    NULL,
    'National Runner-up 2, TJWP 2024'
  ),
  (
    'bcs-detector',
    3,
    true,
    'BCS DETECTOR',
    'AI ประมวลผลภาพ ตรวจจับระยะและชนิดของเม็ดเลือดขาว ช่วยตรวจเม็ดเลือดในโรงพยาบาลชุมชน',
    'Projects',
    ARRAY['CNN', 'K-NN', 'Image Processing'],
    NULL,
    NULL,
    'International Platinum, National Gold'
  ),
  (
    'safety-lock',
    4,
    true,
    'SAFETY LOCK',
    'พวงกุญแจนิรภัยเชื่อมแอป ติดตามตำแหน่ง กดปุ่มขอความช่วยเหลือจากสถานีตำรวจใกล้เคียง',
    'Projects',
    ARRAY['Application', 'Location Tracking', 'Hardware'],
    NULL,
    NULL,
    'National Silver, I New Gen Award'
  ),
  (
    'korea',
    5,
    true,
    'KOREA',
    'ตัวแทนยุวชนไทยแข่งหุ่นยนต์นานาชาติ IYRC 2025 ที่เกาหลีใต้ ได้รางวัล THE BEST 2 รายการ',
    'Robotics',
    ARRAY['Robotics', 'Fire-Fighting Robot', 'Sumo Robot'],
    NULL,
    NULL,
    'THE BEST 2 awards, IYRC 2025'
  ),
  (
    'posn',
    6,
    true,
    'POSN',
    'ค่ายโอลิมปิกวิชาการ สอวน. สาขาฟิสิกส์ ค่าย 1 ศูนย์โรงเรียนพัทลุง ปี 2566',
    'Academic',
    ARRAY['Physics', 'POSN'],
    NULL,
    NULL,
    NULL
  ),
  (
    'pre-posn',
    7,
    true,
    'PRE POSN',
    'ค่ายพรีโอลิมปิกวิชาการสาขาฟิสิกส์ สำหรับนักเรียนจังหวัดชายแดนภาคใต้',
    'Academic',
    ARRAY['Physics', 'Pre-POSN'],
    NULL,
    NULL,
    NULL
  )
ON CONFLICT (id) DO UPDATE SET
  sort_order = EXCLUDED.sort_order,
  published = EXCLUDED.published,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  award = EXCLUDED.award;

-- ============================================================================
-- NOTE: Videos and Islam posts tables start completely EMPTY.
-- If you previously seeded mock videos and want to clear them, run:
--   DELETE FROM public.videos;
-- ============================================================================

-- ============================================================================
-- ADMIN ACCESS POLICIES (Run in Supabase SQL Editor for Admin Portal)
-- ============================================================================
-- Allows logged-in authenticated users (Admin) full access to create, edit,
-- and delete items across projects, videos, and islam_posts.

DROP POLICY IF EXISTS "Admin full access projects" ON public.projects;
DROP POLICY IF EXISTS "Admin full access videos" ON public.videos;
DROP POLICY IF EXISTS "Admin full access islam_posts" ON public.islam_posts;

CREATE POLICY "Admin full access projects"
  ON public.projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access videos"
  ON public.videos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access islam_posts"
  ON public.islam_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure public storage bucket 'site-images' exists and allow authenticated uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public read site-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload site-images" ON storage.objects;

CREATE POLICY "Public read site-images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'site-images');

CREATE POLICY "Admin upload site-images"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (bucket_id = 'site-images')
  WITH CHECK (bucket_id = 'site-images');

-- Grant all permissions to authenticated users
GRANT ALL ON public.projects TO authenticated;
GRANT ALL ON public.videos TO authenticated;
GRANT ALL ON public.islam_posts TO authenticated;

-- ============================================================================
-- 4. TABLE: anonymous_messages (Inbox for "Anonymas to me" feature)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.anonymous_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  sender_tag TEXT DEFAULT '💭 ทั่วไป',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.anonymous_messages ENABLE ROW LEVEL SECURITY;

-- Allow public (anyone) to send an anonymous message:
DROP POLICY IF EXISTS "Public can insert anonymous_messages" ON public.anonymous_messages;
CREATE POLICY "Public can insert anonymous_messages"
  ON public.anonymous_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow logged-in Admin full access (read, delete, update):
DROP POLICY IF EXISTS "Admin full access anonymous_messages" ON public.anonymous_messages;
CREATE POLICY "Admin full access anonymous_messages"
  ON public.anonymous_messages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

GRANT INSERT ON public.anonymous_messages TO anon;
GRANT ALL ON public.anonymous_messages TO authenticated;



