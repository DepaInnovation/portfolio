
  
    (function () {
      // =====================================================================
      // DATA-DRIVEN VIDEOS LOADER (Supabase REST / Cache / Backup fallback)
      // =====================================================================

      const mainFilterBar = document.getElementById('mainFilterBar');
      const videosGrid = document.getElementById('videosGrid');
      const emptyState = document.getElementById('emptyState');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      let allVideos = [];
      let currentMainCat = 'all';
      let currentFilterToken = null;

      // =====================================================================
      // CUSTOM MOUSE CURSOR EFFECT (Matches /)
      // =====================================================================
      const cursorDot = document.getElementById('cursorDot');
      const cursorRing = document.getElementById('cursorRing');
      const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

      function attachCursorHover(el) {
        if (!el || isTouchDevice || !cursorDot) return;
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      }

      if (!isTouchDevice && cursorDot && cursorRing) {
        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;

        window.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        }, { passive: true });

        function animateCursor() {
          ringX += (mouseX - ringX) * 0.18;
          ringY += (mouseY - ringY) * 0.18;
          cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
          requestAnimationFrame(animateCursor);
        }
        requestAnimationFrame(animateCursor);

        // Attach hover on initial static interactive elements
        document.querySelectorAll('a, button, input, [role="button"], [role="tab"]').forEach(attachCursorHover);
      }

      function getCategoryIconSvg(cat) {
        const lower = String(cat || '').toLowerCase().trim();
        if (lower === 'calculus') {
          return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 7V4H6l6 8-6 8h12v-3" /></svg>`;
        }
        if (lower === 'computer' || lower.includes('robot') || lower.includes('code')) {
          return `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
        }
        // Generic default category icon
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
      }

      function renderSkeletons() {
        if (!videosGrid) return;
        videosGrid.innerHTML = '';
        for (let i = 0; i < 6; i++) {
          const card = document.createElement('article');
          card.className = 'video-card is-skeleton';
          card.innerHTML = `
            <div class="video-thumbnail-wrap skeleton-thumb"></div>
            <div class="video-info">
              <div class="skeleton-line short"></div>
              <div class="skeleton-line title"></div>
              <div class="skeleton-line medium"></div>
              <div class="skeleton-line medium" style="width: 75%;"></div>
            </div>
          `;
          videosGrid.appendChild(card);
        }
      }

      function renderError(msg) {
        if (!videosGrid) return;
        videosGrid.innerHTML = '';
        const errBox = document.createElement('div');
        errBox.className = 'fetch-error-container';
        errBox.innerHTML = `
          <div class="fetch-error-title">เกิดข้อผิดพลาดในการโหลดวิดีโอ</div>
          <p class="fetch-error-msg">${msg || 'กรุณาลองใหม่อีกครั้ง'}</p>
          <button class="retry-btn" id="videosRetryBtn" type="button">Retry Loading</button>
        `;
        videosGrid.appendChild(errBox);
        const retryBtn = document.getElementById('videosRetryBtn');
        if (retryBtn) {
          retryBtn.addEventListener('click', () => loadVideos());
        }
        if (emptyState) emptyState.style.display = 'none';
      }

      function buildVideoCard(item) {
        const card = document.createElement('article');
        card.className = 'video-card card-revealed';
        card.setAttribute('data-category', String(item.category || '').toLowerCase().trim());

        // Thumbnail wrap
        const thumbWrap = document.createElement('div');
        thumbWrap.className = 'video-thumbnail-wrap';
        thumbWrap.setAttribute('role', 'button');
        thumbWrap.setAttribute('tabindex', '0');
        thumbWrap.setAttribute('aria-label', `Watch ${item.title || 'video'}`);

        const thumbUrl = window.SupabaseApp
          ? window.SupabaseApp.getVideoThumbnail(item.video_url || item.url, item.thumbnail_path || item.thumbnail)
          : '';
        if (thumbUrl) {
          const img = document.createElement('img');
          img.className = 'video-thumbnail-img';
          img.src = thumbUrl;
          img.alt = item.title || 'Video thumbnail';
          img.loading = 'lazy';
          img.decoding = 'async';
          thumbWrap.appendChild(img);
        }

        const playBtn = document.createElement('div');
        playBtn.className = 'play-btn-circle';
        playBtn.setAttribute('aria-label', 'Play video');
        playBtn.innerHTML = `
          <svg viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        `;
        thumbWrap.appendChild(playBtn);

        if (item.duration) {
          const durTag = document.createElement('span');
          durTag.className = 'duration-tag';
          durTag.textContent = String(item.duration);
          thumbWrap.appendChild(durTag);
        }

        card.appendChild(thumbWrap);

        // Video Info
        const info = document.createElement('div');
        info.className = 'video-info';

        const badge = document.createElement('span');
        badge.className = 'v-badge';
        badge.innerHTML = `
          <span class="icon-svg">${getCategoryIconSvg(item.category)}</span>
        `;
        const badgeText = document.createTextNode(` ${item.category || ''}`);
        badge.appendChild(badgeText);
        info.appendChild(badge);

        const titleEl = document.createElement('h3');
        titleEl.className = 'video-title';
        titleEl.textContent = item.title || '';
        info.appendChild(titleEl);

        const descEl = document.createElement('p');
        descEl.className = 'video-desc';
        descEl.textContent = item.description || '';
        info.appendChild(descEl);

        const footer = document.createElement('div');
        footer.className = 'video-footer';

        const meta = document.createElement('span');
        meta.className = 'video-meta';
        meta.textContent = item.series_label || item.seriesLabel || '';
        footer.appendChild(meta);

        const ctaBtn = document.createElement('button');
        ctaBtn.className = 'watch-cta-btn';
        ctaBtn.type = 'button';
        ctaBtn.innerHTML = `Watch <span class="cta-arrow">→</span>`;
        footer.appendChild(ctaBtn);

        info.appendChild(footer);
        card.appendChild(info);

        // Click action: open in new tab (rel="noopener noreferrer")
        const safeUrl = window.SupabaseApp
          ? window.SupabaseApp.sanitizeUrl(item.video_url || item.url)
          : '';
        const handleWatch = (e) => {
          if (e) e.stopPropagation();
          if (safeUrl) {
            window.open(safeUrl, '_blank', 'noopener,noreferrer');
          } else {
            console.warn('[Video] Missing or invalid YouTube URL for item:', item);
          }
        };

        thumbWrap.addEventListener('click', handleWatch);
        thumbWrap.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleWatch();
          }
        });

        ctaBtn.addEventListener('click', handleWatch);

        attachCursorHover(card);
        attachCursorHover(thumbWrap);
        attachCursorHover(ctaBtn);

        return card;
      }

      function triggerPillSpring(btn) {
        if (prefersReducedMotion) return;
        btn.classList.remove('pill-spring');
        void btn.offsetWidth;
        btn.classList.add('pill-spring');
        btn.addEventListener('animationend', () => {
          btn.classList.remove('pill-spring');
        }, { once: true });
      }

      function filterVideos(isInitial = false) {
        if (!videosGrid) return;
        const cards = Array.from(videosGrid.querySelectorAll('.video-card:not(.is-skeleton)'));

        const checkMatches = (card) => {
          const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
          return currentMainCat === 'all' || cardCat === currentMainCat;
        };

        if (prefersReducedMotion || isInitial) {
          let visibleCount = 0;
          cards.forEach(card => {
            const matches = checkMatches(card);
            if (matches) {
              card.style.display = 'flex';
              card.classList.add('card-revealed');
              card.style.opacity = '';
              card.style.transform = '';
              card.style.transition = '';
              visibleCount++;
            } else {
              card.style.display = 'none';
            }
          });
          if (emptyState) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
          return;
        }

        const token = {};
        currentFilterToken = token;

        const cardsToHide = [];
        const cardsToShow = [];

        cards.forEach(card => {
          const isCurrentlyVisible = card.style.display !== 'none';
          const matches = checkMatches(card);

          if (isCurrentlyVisible && !matches) {
            cardsToHide.push(card);
          } else if (matches) {
            cardsToShow.push(card);
          }
        });

        cardsToHide.forEach(card => {
          card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
        });

        const fadeOutDuration = cardsToHide.length > 0 ? 200 : 0;

        setTimeout(() => {
          if (currentFilterToken !== token) return;

          cardsToHide.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('card-revealed');
            card.style.opacity = '';
            card.style.transform = '';
            card.style.transition = '';
          });

          if (emptyState) {
            emptyState.style.display = cardsToShow.length === 0 ? 'block' : 'none';
          }

          cardsToShow.forEach((card, idx) => {
            card.style.display = 'flex';
            card.classList.remove('card-revealed');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out, box-shadow 0.2s ease';

            setTimeout(() => {
              if (currentFilterToken !== token) return;
              card.classList.add('card-revealed');
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';

              setTimeout(() => {
                if (currentFilterToken !== token) return;
                card.style.opacity = '';
                card.style.transform = '';
                card.style.transition = '';
              }, 550);
            }, idx * 60);
          });
        }, fadeOutDuration);
      }

      function renderCategoryButtons(categoriesMap, totalPublished) {
        if (!mainFilterBar) return;
        mainFilterBar.innerHTML = '';

        const filterWrapper = document.querySelector('.filter-wrapper');
        if (totalPublished === 0) {
          if (filterWrapper) filterWrapper.style.display = 'none';
          if (emptyState) emptyState.style.display = 'block';
          return;
        } else {
          if (filterWrapper) filterWrapper.style.display = '';
        }

        // "All" button with live count
        const allBtn = document.createElement('button');
        allBtn.className = 'filter-tab-btn active';
        allBtn.setAttribute('data-cat', 'all');
        allBtn.innerHTML = `
          <span class="icon-svg"><svg viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg></span>
          <span>All (${totalPublished})</span>
        `;
        attachCursorHover(allBtn);
        mainFilterBar.appendChild(allBtn);

        // Dynamic categories buttons with live count
        categoriesMap.forEach((count, cat) => {
          const btn = document.createElement('button');
          btn.className = 'filter-tab-btn';
          btn.setAttribute('data-cat', cat.toLowerCase());
          btn.innerHTML = `
            <span class="icon-svg">${getCategoryIconSvg(cat)}</span>
            <span>${cat} (${count})</span>
          `;
          attachCursorHover(btn);
          mainFilterBar.appendChild(btn);
        });

        const filterBtns = mainFilterBar.querySelectorAll('.filter-tab-btn');
        filterBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            triggerPillSpring(btn);
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentMainCat = (btn.getAttribute('data-cat') || 'all').toLowerCase();

            const url = new URL(window.location);
            if (currentMainCat === 'all') {
              url.searchParams.delete('cat');
            } else {
              url.searchParams.set('cat', currentMainCat);
            }
            window.history.replaceState({}, '', url);

            filterVideos();
          });
        });

        // Sync with existing URL query param
        const urlParams = new URLSearchParams(window.location.search);
        const catParam = (urlParams.get('cat') || '').toLowerCase();
        if (catParam && catParam !== 'all') {
          const matchingBtn = Array.from(filterBtns).find(b => (b.getAttribute('data-cat') || '').toLowerCase() === catParam);
          if (matchingBtn) {
            filterBtns.forEach(b => b.classList.remove('active'));
            matchingBtn.classList.add('active');
            currentMainCat = catParam;
          }
        }
      }

      function populateVideosUI(videosList) {
        // Build dynamic categories preserving first appearance
        const categoriesMap = new Map();
        videosList.forEach(v => {
          const cat = String(v.category || '').trim();
          if (cat) {
            categoriesMap.set(cat, (categoriesMap.get(cat) || 0) + 1);
          }
        });

        renderCategoryButtons(categoriesMap, videosList.length);

        // Render video cards
        videosGrid.innerHTML = '';
        videosList.forEach(item => {
          const cardEl = buildVideoCard(item);
          videosGrid.appendChild(cardEl);
        });

        if (videosList.length === 0) {
          if (emptyState) emptyState.style.display = 'block';
        } else {
          filterVideos(true);
        }
      }

      async function loadVideos() {
        // Instant render from cache if available to prevent layout jump
        const cached = window.SupabaseApp ? window.SupabaseApp.getCache('supabase_cache_videos') : null;
        if (cached && Array.isArray(cached) && cached.length > 0) {
          allVideos = cached;
          populateVideosUI(cached);
        } else {
          renderSkeletons();
        }

        if (mainFilterBar) mainFilterBar.innerHTML = '';
        if (emptyState) emptyState.style.display = 'none';

        try {
          const res = await fetch('/api/videos');
          if (!res.ok) throw new Error('API error ' + res.status);
          const json = await res.json();
          const rawList = Array.isArray(json.data) ? json.data : [];
          const validVideos = [];

          rawList.forEach(item => {
            if (!item || typeof item !== 'object') return;
            if (!item.id || typeof item.id !== 'string') return;
            if (!item.title || !item.category || (!item.video_url && !item.url)) return;
            if (item.published === false) return;
            validVideos.push(item);
          });

          validVideos.sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
          allVideos = validVideos;

          populateVideosUI(validVideos);

        } catch (err) {
          console.error('[API] Error loading videos:', err);
          if (allVideos.length === 0) {
            renderError(err.message);
          }
        }
      }

      // Initial load
      loadVideos();
      // ---------------------------------------------------------------
      // Navbar Scroll Collapse to "TAB" & Expand on Click (Matches home page)
      // ---------------------------------------------------------------
      const navbar = document.getElementById('navbar');
      const navTabBtn = document.getElementById('navTabBtn');
      const navCloseBtn = document.getElementById('navCloseBtn');
      let isManuallyExpanded = false;

      function updateNavbarOnScroll() {
        const scrollY = window.scrollY;

        // When scrolled to top (<= 70px): automatically full again
        if (scrollY <= 70) {
          navbar.classList.remove('collapsed', 'expanded');
          isManuallyExpanded = false;
        } else {
          // When scrolled down: collapse to TAB unless manually expanded
          if (!isManuallyExpanded) {
            navbar.classList.add('collapsed');
            navbar.classList.remove('expanded');
          }
        }
      }

      window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });
      updateNavbarOnScroll();

      // Click TAB button: tactile punch & shockwave then glide and expand to center
      function openNavWithBurst() {
        if (navbar.classList.contains('expanded')) return;
        navTabBtn.classList.add('burst-active');

        setTimeout(() => {
          isManuallyExpanded = true;
          navbar.classList.add('expanded');
          navTabBtn.classList.remove('burst-active');
        }, 90);
      }

      if (navTabBtn) {
        navTabBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openNavWithBurst();
        });
      }

      // Also expand if user clicks anywhere on the collapsed bar (ignore clicks inside nav-content)
      if (navbar) {
        navbar.addEventListener('click', (e) => {
          if (e.target.closest('.nav-content')) return;

          if (navbar.classList.contains('collapsed') && !navbar.classList.contains('expanded')) {
            openNavWithBurst();
          }
        });
      }

      // Close button inside expanded menu
      if (navCloseBtn) {
        navCloseBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          isManuallyExpanded = false;
          navbar.classList.remove('expanded');
          if (window.scrollY > 70) {
            navbar.classList.add('collapsed');
          }
        });
      }

    })();