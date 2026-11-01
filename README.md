# 🎨 Rifhan's Portfolio & Showcase

> Personal portfolio and project showcase featuring Engineering, Computer Science, Robotics, Video Lectures, and Reflections. Built with clean HTML5, Vanilla CSS, Vanilla JavaScript, and Supabase.

---

## ⚡ Tech Stack & Architecture

- **Frontend:** Pure HTML5, Vanilla CSS (Modern Sketchbook / Neo-Brutalist Theme), Vanilla JS
- **Backend / Database:** [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security - RLS)
- **Icons & Assets:** Curated SVG icons + custom illustrations
- **Security:**
  - Content Security Headers (`_headers`, `vercel.json`)
  - Row Level Security (RLS) policies on all tables
  - Anti-bot Honeypot & Client-side Rate Limiting on anonymous message submissions
  - Sanitized DOM rendering to prevent XSS

---

## 📂 Project Structure

```
PORT_PROFILE/
├── index.html              # Main landing & showcase page
├── project.html            # Deep-dive project details & awards
├── video.html              # Video lectures & demos
├── islam.html              # Reflections & thread gallery
├── 404.html                # Custom error page
├── config.js               # Supabase public configuration
├── schema.sql              # Database schema & RLS setup
├── _headers                # Cloudflare Pages / Netlify security headers
├── vercel.json             # Vercel deployment configuration
├── robots.txt              # SEO crawler instructions
├── sitemap.xml             # Search engine sitemap
├── admin/                  # Secure admin portal
│   └── index.html
├── data/
│   └── site-data.json      # Offline fallback data
└── image/                  # Media assets & profile photos
```

---

## 🚀 Deployment

### Deploy with Vercel
1. Import this repository in [Vercel Dashboard](https://vercel.com/new).
2. Root directory: `./`
3. Click **Deploy**.

---

## 📄 License
Created with ❤️ by Rifhan. All rights reserved.
