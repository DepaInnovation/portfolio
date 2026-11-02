
    (function () {
      'use strict';

      /* -----------------------------------------------------------------
         CUSTOM MOUSE CURSOR
         ----------------------------------------------------------------- */
      const cursorDot = document.getElementById('cursorDot');
      const cursorRing = document.getElementById('cursorRing');
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let ringX = mouseX;
      let ringY = mouseY;
      let isHovering = false;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorDot) {
          cursorDot.style.left = `${mouseX}px`;
          cursorDot.style.top = `${mouseY}px`;
        }
      });

      function renderCursor() {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        if (cursorRing) {
          cursorRing.style.left = `${ringX}px`;
          cursorRing.style.top = `${ringY}px`;
        }
        requestAnimationFrame(renderCursor);
      }
      requestAnimationFrame(renderCursor);

      function updateCursorHoverListeners() {
        const hoverTargets = document.querySelectorAll('a, button, input, textarea, select, .gallery-thumb-wrap, .award-row');
        hoverTargets.forEach((el) => {
          if (el.dataset.cursorBound) return;
          el.dataset.cursorBound = 'true';
          el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
          el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
      }

      /* -----------------------------------------------------------------
         SCROLL FADE-IN OBSERVER
         ----------------------------------------------------------------- */
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function setupScrollFadeIn() {
        if (prefersReducedMotion) {
          document.querySelectorAll('.fade-in-element').forEach(el => el.classList.add('is-visible'));
          return;
        }

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in-element').forEach(el => observer.observe(el));
      }

      /* -----------------------------------------------------------------
         HELPERS & FORMATTERS
         ----------------------------------------------------------------- */
      // Render text into paragraphs safely using textContent; blank line starts new paragraph
      function renderParagraphs(container, rawText) {
        container.innerHTML = '';
        if (!rawText || typeof rawText !== 'string' || !rawText.trim()) return;

        const chunks = rawText.split(/\n\s*\n/);
        chunks.forEach((chunk) => {
          const trimmed = chunk.trim();
          if (!trimmed) return;
          const p = document.createElement('p');
          const lines = trimmed.split('\n');
          lines.forEach((line, idx) => {
            if (idx > 0) p.appendChild(document.createElement('br'));
            p.appendChild(document.createTextNode(line));
          });
          container.appendChild(p);
        });
      }

      // Extract YouTube Video ID
      function getYouTubeId(url) {
        if (!url || typeof url !== 'string') return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        return match ? match[1] : null;
      }

      // Award level sort priority
      const LEVEL_ORDER = {
        'international': 1,
        'national': 2,
        'regional': 3,
        'provincial': 4,
        'area': 5,
        'participation': 6
      };

      // Pastel color palettes for tags and tech chips
      const PASTEL_PALETTES = [
        { bg: '#fef3c7', text: '#78350f' }, // pastel butter/yellow
        { bg: '#dcfce7', text: '#14532d' }, // pastel mint/green
        { bg: '#e0f2fe', text: '#0369a1' }, // pastel sky/blue
        { bg: '#ede9fe', text: '#5b21b6' }, // pastel lavender/purple
        { bg: '#ffe4e6', text: '#9f1239' }, // pastel rose/pink
        { bg: '#ffedd5', text: '#9a3412' }, // pastel peach/orange
        { bg: '#ccfbf1', text: '#115e59' }, // pastel teal
        { bg: '#fce7f3', text: '#831843' }  // pastel blossom
      ];

      function getPastelColor(str) {
        if (!str || typeof str !== 'string') return PASTEL_PALETTES[0];
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const idx = Math.abs(hash) % PASTEL_PALETTES.length;
        return PASTEL_PALETTES[idx];
      }

      // Clean SVG icons for awards (No emojis!)
      const AWARD_ICONS = {
        international: '<svg class="award-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
        national: '<svg class="award-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-2c-.55 0-1-.45-1-1v-2.34"></path><path d="M18 4H6v7a6 6 0 0 0 12 0V4z"></path></svg>',
        regional: '<svg class="award-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
        provincial: '<svg class="award-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
        area: '<svg class="award-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>',
        participation: '<svg class="award-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
      };

      /* -----------------------------------------------------------------
         LIGHTBOX STATE & CONTROLS
         ----------------------------------------------------------------- */
      const lightboxModal = document.getElementById('lightboxModal');
      const lightboxCard = document.getElementById('lightboxCard');
      const lightboxSliderTrack = document.getElementById('lightboxSliderTrack');
      const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
      const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
      const lightboxNextBtn = document.getElementById('lightboxNextBtn');
      const lightboxSlideIndicator = document.getElementById('lightboxSlideIndicator');
      const lightboxCaption = document.getElementById('lightboxCaption');
      const lightboxFooter = document.getElementById('lightboxFooter');
      const lightboxTitle = document.getElementById('lightboxTitle');

      let galleryImages = []; // List of { src, caption }
      let currentSlideIndex = 0;
      let prevFocusedElement = null;

      function openLightbox(index) {
        if (!galleryImages || galleryImages.length === 0) return;
        currentSlideIndex = Math.max(0, Math.min(index, galleryImages.length - 1));
        prevFocusedElement = document.activeElement;

        // Build slides
        lightboxSliderTrack.innerHTML = '';
        galleryImages.forEach((imgItem) => {
          const slide = document.createElement('div');
          slide.className = 'lightbox-slide';
          const img = document.createElement('img');
          img.src = imgItem.src;
          img.alt = imgItem.caption || 'Project Showcase Image';
          slide.appendChild(img);
          lightboxSliderTrack.appendChild(slide);
        });

        updateLightboxSlide(false);

        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lightboxCloseBtn.focus();
      }

      function closeLightbox() {
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (prevFocusedElement && typeof prevFocusedElement.focus === 'function') {
          prevFocusedElement.focus();
        }
      }

      function updateLightboxSlide(animate = true) {
        const total = galleryImages.length;
        if (total === 0) return;

        if (currentSlideIndex >= total) currentSlideIndex = 0;
        if (currentSlideIndex < 0) currentSlideIndex = total - 1;

        if (!animate || prefersReducedMotion) {
          lightboxSliderTrack.style.transition = 'none';
        } else {
          lightboxSliderTrack.style.transition = 'transform 0.35s cubic-bezier(0.2, 0, 0, 1)';
        }
        lightboxSliderTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

        const curItem = galleryImages[currentSlideIndex];
        if (curItem && curItem.caption && curItem.caption.trim()) {
          lightboxCaption.textContent = curItem.caption.trim();
          lightboxFooter.style.display = 'block';
        } else {
          lightboxCaption.textContent = '';
          lightboxFooter.style.display = 'none';
        }

        if (total > 1) {
          lightboxSlideIndicator.style.display = 'block';
          lightboxSlideIndicator.textContent = `${currentSlideIndex + 1}/${total}`;
          lightboxPrevBtn.style.display = currentSlideIndex > 0 ? 'flex' : 'none';
          lightboxNextBtn.style.display = currentSlideIndex < total - 1 ? 'flex' : 'none';
        } else {
          lightboxSlideIndicator.style.display = 'none';
          lightboxPrevBtn.style.display = 'none';
          lightboxNextBtn.style.display = 'none';
        }
      }

      lightboxPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentSlideIndex > 0) {
          currentSlideIndex--;
          updateLightboxSlide(true);
        }
      });

      lightboxNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentSlideIndex < galleryImages.length - 1) {
          currentSlideIndex++;
          updateLightboxSlide(true);
        }
      });

      lightboxCloseBtn.addEventListener('click', closeLightbox);
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
      });

      window.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
          currentSlideIndex--;
          updateLightboxSlide(true);
        }
        if (e.key === 'ArrowRight' && currentSlideIndex < galleryImages.length - 1) {
          currentSlideIndex++;
          updateLightboxSlide(true);
        }
      });

      /* -----------------------------------------------------------------
         RENDER PROJECT DETAILS
         ----------------------------------------------------------------- */
      function renderProject(project, allProjects) {
        // Dynamic title
        document.title = `${project.title || 'Project'} | Portfolio`;

        // Category
        const pCategory = document.getElementById('pCategory');
        pCategory.textContent = project.category || 'Project';

        // Title
        const pTitle = document.getElementById('pTitle');
        pTitle.textContent = project.title || '';

        // One-line Description
        const pDesc = document.getElementById('pDescription');
        if (project.description && project.description.trim()) {
          pDesc.textContent = project.description.trim();
          pDesc.style.display = 'block';
        } else {
          pDesc.style.display = 'none';
        }

        // Tags (Pastel Colors - uses tags or tech)
        const pTags = document.getElementById('pTags');
        pTags.innerHTML = '';
        const tags = (Array.isArray(project.tags) && project.tags.length > 0)
          ? project.tags
          : (Array.isArray(project.tech) ? project.tech : []);
        if (tags.length > 0) {
          tags.forEach(t => {
            if (!t || !t.trim()) return;
            const chip = document.createElement('span');
            chip.className = 'tag-chip';
            chip.textContent = t.trim();
            const pastel = getPastelColor(t.trim());
            chip.style.backgroundColor = pastel.bg;
            chip.style.color = pastel.text;
            pTags.appendChild(chip);
          });
          pTags.style.display = 'flex';
        } else {
          pTags.style.display = 'none';
        }

        // External Link (e.g. GitHub / Demo)
        const pLink = document.getElementById('pExternalLink');
        if (project.link_url && project.link_url.trim()) {
          pLink.href = project.link_url.trim();
          pLink.style.display = 'inline-flex';
        } else {
          pLink.style.display = 'none';
        }

        // 1. BACKGROUND (from problem)
        const secBackground = document.getElementById('sectionBackground');
        const pProblem = document.getElementById('pProblem');
        if (project.problem && typeof project.problem === 'string' && project.problem.trim()) {
          renderParagraphs(pProblem, project.problem);
          secBackground.style.display = 'block';
        } else {
          secBackground.style.display = 'none';
        }

        // 2. WHAT I DID (from my_role)
        const secWhatIDid = document.getElementById('sectionWhatIDid');
        const pMyRole = document.getElementById('pMyRole');
        if (project.my_role && typeof project.my_role === 'string' && project.my_role.trim()) {
          renderParagraphs(pMyRole, project.my_role);
          secWhatIDid.style.display = 'block';
        } else {
          secWhatIDid.style.display = 'none';
        }

        // 3. AWARDS (from awards jsonb)
        // One row per award: small bordered level label, award title, smaller gray detail text.
        // Sorted by level: International, National, Regional, Provincial, Area, Participation.
        // International = Shimmering Rainbow Gradient; National = Gold Gradient; No emojis, clean SVG icons!
        const secAwards = document.getElementById('sectionAwards');
        const pAwardsList = document.getElementById('pAwardsList');
        pAwardsList.innerHTML = '';

        let awardsArray = Array.isArray(project.awards) ? [...project.awards] : [];
        if (awardsArray.length > 0) {
          awardsArray.sort((a, b) => {
            const orderA = LEVEL_ORDER[String(a.level || '').toLowerCase().trim()] || 99;
            const orderB = LEVEL_ORDER[String(b.level || '').toLowerCase().trim()] || 99;
            return orderA - orderB;
          });

          awardsArray.forEach(award => {
            if (!award || (!award.title && !award.detail)) return;
            const levelKey = String(award.level || '').toLowerCase().trim();
            const row = document.createElement('div');
            row.className = `award-row level-${levelKey}`;

            const badge = document.createElement('span');
            badge.className = `award-level-badge badge-${levelKey}`;

            // Add SVG Icon (NOT emoji!)
            const iconSvg = AWARD_ICONS[levelKey] || AWARD_ICONS.participation;
            badge.innerHTML = `${iconSvg}<span>${award.level || 'Award'}</span>`;
            row.appendChild(badge);

            const contentWrap = document.createElement('div');
            contentWrap.className = 'award-row-content';

            if (award.title) {
              const titleEl = document.createElement('span');
              titleEl.className = 'award-row-title';
              titleEl.textContent = award.title;
              contentWrap.appendChild(titleEl);
            }

            if (award.detail) {
              const detailEl = document.createElement('span');
              detailEl.className = 'award-row-detail';
              detailEl.textContent = award.detail;
              contentWrap.appendChild(detailEl);
            }

            row.appendChild(contentWrap);
            pAwardsList.appendChild(row);
          });

          secAwards.style.display = pAwardsList.children.length > 0 ? 'block' : 'none';
        } else {
          secAwards.style.display = 'none';
        }

        // 5. GALLERY (from media jsonb)
        const secGallery = document.getElementById('sectionGallery');
        const pGalleryGrid = document.getElementById('pGalleryGrid');
        pGalleryGrid.innerHTML = '';
        galleryImages = [];

        const mediaList = Array.isArray(project.media) ? project.media : [];
        let imageSlideIndex = 0;

        mediaList.forEach(item => {
          if (!item || typeof item !== 'object') return;
          const type = (item.type || '').toLowerCase();
          const targetUrl = item.url || item.path;
          if (!targetUrl) return;

          if (type === 'youtube') {
            const videoId = getYouTubeId(targetUrl);
            const thumbUrl = videoId
              ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" fill="%23111"><rect width="320" height="200"/></svg>';

            const card = document.createElement('div');
            card.className = 'gallery-item gallery-item-youtube';

            const link = document.createElement('a');
            link.className = 'gallery-thumb-wrap';
            link.href = targetUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', `Watch ${item.caption || project.title} on YouTube (opens in new tab)`);

            const img = document.createElement('img');
            img.className = 'gallery-thumb-img';
            img.src = thumbUrl;
            img.alt = item.caption || 'YouTube Video Thumbnail';
            img.loading = 'lazy';

            const playBtn = document.createElement('div');
            playBtn.className = 'youtube-play-btn';
            playBtn.innerHTML = '<svg viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>';

            const badge = document.createElement('span');
            badge.className = 'youtube-badge';
            badge.textContent = 'YouTube ↗';

            link.appendChild(img);
            link.appendChild(playBtn);
            link.appendChild(badge);
            card.appendChild(link);

            if (item.caption && item.caption.trim()) {
              const cap = document.createElement('div');
              cap.className = 'gallery-caption';
              cap.textContent = item.caption.trim();
              card.appendChild(cap);
            }

            pGalleryGrid.appendChild(card);

          } else {
            // Type === 'image'
            const fullSrc = targetUrl;
            const currentImgIdx = imageSlideIndex;
            galleryImages.push({
              src: fullSrc,
              caption: item.caption || ''
            });
            imageSlideIndex++;

            const card = document.createElement('div');
            card.className = 'gallery-item';

            const wrap = document.createElement('div');
            wrap.className = 'gallery-thumb-wrap';
            wrap.setAttribute('role', 'button');
            wrap.setAttribute('tabindex', '0');
            wrap.setAttribute('aria-label', `View image: ${item.caption || project.title}`);

            const img = document.createElement('img');
            img.className = 'gallery-thumb-img';
            img.src = fullSrc;
            img.alt = item.caption || 'Project Showcase Image';
            img.loading = 'lazy';

            wrap.appendChild(img);
            wrap.addEventListener('click', () => openLightbox(currentImgIdx));
            wrap.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(currentImgIdx);
              }
            });

            card.appendChild(wrap);

            if (item.caption && item.caption.trim()) {
              const cap = document.createElement('div');
              cap.className = 'gallery-caption';
              cap.textContent = item.caption.trim();
              card.appendChild(cap);
            }

            pGalleryGrid.appendChild(card);
          }
        });

        secGallery.style.display = pGalleryGrid.children.length > 0 ? 'block' : 'none';

        // 6. BOTTOM NAVIGATION (Previous & Next following sort_order)
        const sortedProjects = [...allProjects].sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
        const currentIndex = sortedProjects.findIndex(p => p.id === project.id);

        const prevBtn = document.getElementById('prevProjectBtn');
        const prevTitle = document.getElementById('prevProjectTitle');
        const nextBtn = document.getElementById('nextProjectBtn');
        const nextTitle = document.getElementById('nextProjectTitle');

        if (currentIndex > 0) {
          const prevProj = sortedProjects[currentIndex - 1];
          prevBtn.href = `/project?id=${encodeURIComponent(prevProj.id)}`;
          prevTitle.textContent = prevProj.title || 'Previous';
          prevBtn.style.display = 'inline-flex';
        } else {
          prevBtn.style.display = 'none';
        }

        if (currentIndex !== -1 && currentIndex < sortedProjects.length - 1) {
          const nextProj = sortedProjects[currentIndex + 1];
          nextBtn.href = `/project?id=${encodeURIComponent(nextProj.id)}`;
          nextTitle.textContent = nextProj.title || 'Next';
          nextBtn.style.display = 'inline-flex';
        } else {
          nextBtn.style.display = 'none';
        }

        const bottomNav = document.querySelector('.bottom-nav');
        if (bottomNav) {
          bottomNav.style.display = (currentIndex > 0 || (currentIndex !== -1 && currentIndex < sortedProjects.length - 1)) ? 'flex' : 'none';
        }

        // Reveal content and hide skeletons
        document.getElementById('skeletonContainer').style.display = 'none';
        document.getElementById('projectContent').style.display = 'block';

        updateCursorHoverListeners();
        setupScrollFadeIn();
      }

      function showNotFound() {
        document.title = 'ไม่พบผลงานนี้ | Portfolio';
        document.getElementById('skeletonContainer').style.display = 'none';
        document.getElementById('projectContent').style.display = 'none';
        const notFound = document.getElementById('notFoundState');
        notFound.style.display = 'block';
        setTimeout(() => notFound.classList.add('is-visible'), 50);
        updateCursorHoverListeners();
      }

      /* -----------------------------------------------------------------
         INIT & DATA FETCHING
         ----------------------------------------------------------------- */
      async function init() {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = (urlParams.get('id') || '').trim();

        if (!projectId) {
          showNotFound();
          return;
        }

        // 1. Try instant localStorage cache
        const cacheKey = 'supabase_cache_projects_detail';
        const cached = window.SupabaseApp ? window.SupabaseApp.getCache(cacheKey) : null;
        let foundProject = null;

        if (cached && Array.isArray(cached) && cached.length > 0) {
          foundProject = cached.find(p => p.id === projectId && p.published !== false);
          if (foundProject) {
            renderProject(foundProject, cached);
          }
        }

        // 2. Fetch live data from internal Next.js API
        try {
          const res = await fetch('/api/projects');
          if (!res.ok) throw new Error('API error ' + res.status);
          const json = await res.json();
          const list = Array.isArray(json.data) ? json.data : [];
          const validProjects = list.filter(p => p && p.id && p.published !== false);
          validProjects.sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));

          const match = validProjects.find(p => p.id === projectId);
          if (match) {
            renderProject(match, validProjects);
          } else {
            showNotFound();
          }
        } catch (err) {
          console.warn('[Project Detail] Error loading project data:', err.message);
          if (!foundProject) {
            showNotFound();
          }
        }
      }

      document.addEventListener('DOMContentLoaded', init);
    })();