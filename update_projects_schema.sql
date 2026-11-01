-- ============================================================================
-- SQL SCRIPT: ADD DETAIL FIELDS & UPDATE 7 SHOWCASE PROJECTS
-- Run this in Supabase Dashboard -> SQL Editor
-- (Uses ALTER TABLE and UPDATE only; never drops or recreates existing tables)
-- ============================================================================

-- 1. ADD NEW DETAIL COLUMNS TO public.projects
ALTER TABLE public.projects 
  ADD COLUMN IF NOT EXISTS problem TEXT,
  ADD COLUMN IF NOT EXISTS my_role TEXT,
  ADD COLUMN IF NOT EXISTS tech TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS awards JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS media JSONB DEFAULT '[]'::jsonb;

-- Ensure media is initialized to empty array where null
UPDATE public.projects SET media = '[]'::jsonb WHERE media IS NULL;
UPDATE public.projects SET awards = '[]'::jsonb WHERE awards IS NULL;
UPDATE public.projects SET tech = '{}' WHERE tech IS NULL;

-- 2. UPDATE PROJECT: D-kebun
UPDATE public.projects
SET
  problem = 'ต้องการสร้างตลาดซื้อขายให้เกษตรกรในพื้นที่สามจังหวัดชายแดนภาคใต้ ผ่านเว็บไซต์ส่งเสริมตลาดออร์แกนิกทางการเกษตรในรูปแบบ Digital Marketing',
  my_role = 'เป็นโครงงานชิ้นแรกของผม ได้เรียนรู้การพัฒนาเว็บไซต์ตั้งแต่เริ่มต้น ฝึกออกแบบ UX/UI ให้ใช้งานง่ายสำหรับกลุ่มเป้าหมาย รวมถึงเขียนโค้ดและจัดการโครงสร้างเว็บไซต์ ซึ่งเป็นพื้นฐานที่ทำให้ผมสนใจด้านการพัฒนาซอฟต์แวร์มากขึ้น',
  tech = ARRAY['Website', 'UX/UI', 'Digital Marketing'],
  awards = '[
    {
      "level": "National",
      "title": "เหรียญเงิน",
      "detail": "I New Gen Award 2024 จัดโดยสำนักงานการวิจัยแห่งชาติ (วช.)"
    }
  ]'::jsonb,
  media = '[]'::jsonb
WHERE LOWER(title) = LOWER('D-kebun');

-- 3. UPDATE PROJECT: WS smart control
UPDATE public.projects
SET
  problem = 'ผมเห็นปัญหาการขาดแคลนน้ำ การใช้น้ำอย่างสิ้นเปลือง และภาวะโลกร้อน จึงอยากเพิ่มความคุ้มค่าและประสิทธิภาพในการใช้ทรัพยากรน้ำ',
  my_role = 'นำ AI Machine Learning ประเภทพยากรณ์ข้อมูล มาคำนวณปริมาณน้ำที่เหมาะสมของพืชแต่ละชนิดในแต่ละช่วงอายุ จากภาพถ่ายดาวเทียม Sentinel-2 และ Landsat 7, 8 และ 9 โดยวิเคราะห์และคำนวณค่า Kc (สัมประสิทธิ์พืช) จากนั้นพัฒนาแอปพลิเคชันเพื่อให้เกษตรกรทุกคนใช้งานได้',
  tech = ARRAY['Machine Learning', 'Satellite Data', 'Application'],
  awards = '[
    {
      "level": "National",
      "title": "รองชนะเลิศอันดับ 2",
      "detail": "Thailand Junior Water Prize (TJWP) 2024 จัดโดย สสวท. ได้รับคัดเลือก 1 ใน 36 ทีมทั่วประเทศ"
    },
    {
      "level": "Regional",
      "title": "ผ่านรอบข้อเสนอโครงการ",
      "detail": "Young Scientist Competition (YSC) 2026 สาขาวิทยาการคอมพิวเตอร์ ได้รับคัดเลือก 1 ใน 195 โครงการ"
    }
  ]'::jsonb,
  media = '[]'::jsonb
WHERE LOWER(title) = LOWER('WS smart control');

-- 4. UPDATE PROJECT: BCS DETECTOR
UPDATE public.projects
SET
  problem = 'ต้องการเพิ่มประสิทธิภาพและความแม่นยำของการตรวจความสมบูรณ์ของเม็ดเลือด (Complete Blood Count) ในการวินิจฉัยผู้ป่วยของโรงพยาบาลชุมชน',
  my_role = 'พัฒนาระบบประมวลผลภาพด้วย AI ที่ตรวจจับและจำแนกชนิดและระยะของเม็ดเลือดขาวจากภาพกล้องจุลทรรศน์ ด้วยเทคนิค CNN และ K-NN โดยใช้ภาพถ่ายเซลล์จากโรงพยาบาลศูนย์ยะลา และเพิ่มข้อมูลด้วย Data Augmentation ระหว่างทำได้ศึกษาประเภทของ AI วิธีเพิ่มความแม่นยำของโมเดล และฝึกเขียนโค้ดเชื่อมต่อฮาร์ดแวร์กับซอฟต์แวร์',
  tech = ARRAY['CNN', 'K-NN', 'Object Detection', 'Image Classification', 'Data Augmentation'],
  awards = '[
    {
      "level": "International",
      "title": "Platinum (ระดับสูงสุด)",
      "detail": "Malaysia International Gifted Olympiad จัดแบบออนไลน์ มีทีมเข้าร่วมกว่า 1,800 ทีม จาก 8 ประเทศ"
    },
    {
      "level": "National",
      "title": "เหรียญทอง",
      "detail": "I New Gen Award 2025 จัดโดยสำนักงานการวิจัยแห่งชาติ (วช.)"
    },
    {
      "level": "National",
      "title": "เหรียญเงิน",
      "detail": "Thailand Halal Scientist Competition & Halal Innovation 2025"
    },
    {
      "level": "Regional",
      "title": "เหรียญเงิน",
      "detail": "YRU Invention and Invention Award 2025"
    },
    {
      "level": "Area",
      "title": "เหรียญทองชนะเลิศ",
      "detail": "โครงงานคอมพิวเตอร์ประเภทซอฟต์แวร์ ระดับ ม.ปลาย งานศิลปหัตถกรรมนักเรียน ครั้งที่ 72"
    }
  ]'::jsonb,
  media = '[]'::jsonb
WHERE LOWER(title) = LOWER('BCS DETECTOR');

-- 5. UPDATE PROJECT: SAFETY LOCK
UPDATE public.projects
SET
  problem = 'ต้องการเสริมความปลอดภัยให้นักท่องเที่ยวและส่งเสริมอุตสาหกรรมท่องเที่ยว ด้วยนวัตกรรมป้องกันภัยคุกคามพร้อมระบบช่วยเหลือเร่งด่วน',
  my_role = 'ออกแบบพวงกุญแจที่เชื่อมต่อกับแอปพลิเคชันเพื่อติดตามตำแหน่งปัจจุบัน หากอยู่ในสถานการณ์อันตราย ผู้ใช้กดปุ่มหรือดึงสลักเพื่อส่งสัญญาณขอความช่วยเหลือไปยังสถานีตำรวจในบริเวณใกล้เคียง',
  tech = ARRAY['Application', 'Location Tracking', 'Hardware'],
  awards = '[
    {
      "level": "National",
      "title": "เหรียญเงิน",
      "detail": "I New Gen Award 2025 จัดโดยสำนักงานการวิจัยแห่งชาติ (วช.)"
    },
    {
      "level": "Regional",
      "title": "เข้าร่วม",
      "detail": "Southern Inventor Award 2025 ระดับมัธยมศึกษา จัดโดย วช. ร่วมกับมหาวิทยาลัยทักษิณ"
    }
  ]'::jsonb,
  media = '[]'::jsonb
WHERE LOWER(title) = LOWER('SAFETY LOCK');

-- 6. UPDATE PROJECT: KOREA
UPDATE public.projects
SET
  problem = 'ได้รับคัดเลือกเป็นตัวแทนยุวชนประเทศไทยไปแข่งขันหุ่นยนต์นานาชาติ ณ เมืองชอนัน สาธารณรัฐเกาหลี',
  my_role = 'ได้พัฒนาทักษะการเขียนโค้ดอย่างเป็นระบบ เรียนรู้การจัดลำดับความสำคัญของโค้ดและการออกแบบอัลกอริทึมให้มีประสิทธิภาพ และแลกเปลี่ยนเทคนิคการออกแบบและประกอบหุ่นยนต์กับทีมนานาชาติ

ในสนามซูโม (Push-Push) ได้ออกแบบและสร้างหุ่นยนต์ตามข้อกำหนด เขียนโปรแกรมควบคุมการเคลื่อนที่ และวิเคราะห์จุดแข็งจุดอ่อนของคู่แข่งเพื่อปรับกลยุทธ์ระหว่างแข่ง ส่วนสนาม Robotics Challenge ได้ใช้ IR Sensor ตรวจจับและอ่านค่าเส้นทาง ปรับความไวให้เหมาะกับสนาม และแก้ปัญหาเฉพาะหน้าเมื่อหุ่นยนต์ออกนอกเส้นทาง',
  tech = ARRAY['Robotics', 'Fire-Fighting Robot', 'Sumo Robot', 'IR Sensor'],
  awards = '[
    {
      "level": "International",
      "title": "THE BEST 2 รายการ",
      "detail": "หุ่นยนต์ป้องกันไฟป่าและหุ่นยนต์ซูโม ในงาน IYRC 2025 ณ เมืองชอนัน สาธารณรัฐเกาหลี"
    },
    {
      "level": "National",
      "title": "รองชนะเลิศอันดับ 1",
      "detail": "หุ่นยนต์ซูโม (Push-Push) รุ่นซีเนียร์ STEM Education Robot Competition โดยศูนย์วิทยาศาสตร์เพื่อการศึกษารังสิต"
    },
    {
      "level": "Provincial",
      "title": "เหรียญเงิน",
      "detail": "Robotics Challenge ทั่วไป มหกรรมการแข่งขันทักษะวิชาการ ปีการศึกษา 2566 จังหวัดยะลา"
    }
  ]'::jsonb,
  media = '[]'::jsonb
WHERE LOWER(title) = LOWER('KOREA');

-- 7. UPDATE PROJECT: POSN
UPDATE public.projects
SET
  problem = NULL,
  my_role = 'เข้าอบรมโอลิมปิกวิชาการ (สอวน.) สาขาฟิสิกส์ ค่าย 1 ศูนย์โรงเรียนพัทลุง ปีการศึกษา 2566 เป็นประตูเบิกทางให้ผมสนใจฟิสิกส์ ได้เรียนรู้การคิดอย่างเป็นระบบ ได้ประสบการณ์ใหม่และเพื่อนใหม่ที่เก่งๆ ทำให้รู้ว่ายังมีคนที่เก่งกว่าเราอีกมาก และเป็นแรงผลักดันให้ผมมุ่งมั่นพัฒนาตัวเอง',
  tech = ARRAY['Physics'],
  awards = '[
    {
      "level": "Participation",
      "title": "เข้าร่วมการอบรม",
      "detail": "สอวน. สาขาฟิสิกส์ ค่าย 1"
    }
  ]'::jsonb,
  media = '[]'::jsonb
WHERE LOWER(title) = LOWER('POSN');

-- 8. UPDATE PROJECT: PRE POSN
UPDATE public.projects
SET
  problem = NULL,
  my_role = 'ผ่านการเข้าค่ายพรีโอลิมปิกวิชาการสำหรับนักเรียนในพื้นที่จังหวัดชายแดนภาคใต้ รายวิชาฟิสิกส์ จัดโดยสำนักงานคณะกรรมการส่งเสริมการศึกษาเอกชน',
  tech = ARRAY['Physics'],
  awards = '[
    {
      "level": "Participation",
      "title": "ผ่านการเข้าค่าย",
      "detail": "พรีโอลิมปิกวิชาการ สาขาฟิสิกส์"
    }
  ]'::jsonb,
  media = '[]'::jsonb
WHERE LOWER(title) = LOWER('PRE POSN');
