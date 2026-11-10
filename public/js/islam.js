
  
    // =====================================================================
    // DATA-DRIVEN ISLAM & REFLECTIONS LOADER (Supabase REST / Cache / Backup)
    // =====================================================================

    let POSTS = [];

    (function () {
      const STORAGE_KEY = 'islam-favorites';
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function resolveImageUrl(img) {
        if (!img || typeof img !== 'string') return '';
        const clean = img.trim();
        if (!clean) return '';
        if (/^https?:\/\//i.test(clean) || clean.startsWith('/') || clean.startsWith('data:')) {
          return clean;
        }
        return `https://fakucjlewuxhihbhsanu.supabase.co/storage/v1/object/public/site-images/${clean.replace(/^\/+/, '')}`;
      }

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

      // -----------------------------------------------------------------
      // FAVORITES LOCALSTORAGE (Safe read/write with error wrapping)
      // -----------------------------------------------------------------
      function getSavedFavorites() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (!raw) return [];
          const parsed = JSON.parse(raw);
          return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          console.warn('LocalStorage unavailable or blocked:', e);
          return [];
        }
      }

      function saveFavorites(favs) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
        } catch (e) {
          console.warn('LocalStorage save failed:', e);
        }
      }

      let favorites = new Set();
      let currentFilter = 'all'; // 'all' or 'favorites'
      let visibleLimit = 12;
      const BATCH_SIZE = 12;

      const favCountEl = document.getElementById('favCount');
      const postsGrid = document.getElementById('postsGrid');
      const emptyState = document.getElementById('emptyState');
      const emptyStateTitle = document.getElementById('emptyStateTitle');
      const emptyStateText = document.getElementById('emptyStateText');
      const filterBtnAll = document.getElementById('filterBtnAll');
      const filterBtnFav = document.getElementById('filterBtnFav');
      const loadMoreWrap = document.getElementById('loadMoreWrap');
      const loadMoreBtn = document.getElementById('loadMoreBtn');

      function updateFavoriteCount() {
        if (favCountEl) {
          favCountEl.textContent = favorites.size;
        }
      }

      function renderSkeletons() {
        if (!postsGrid) return;
        postsGrid.innerHTML = '';
        for (let i = 0; i < 6; i++) {
          const card = document.createElement('article');
          card.className = 'post-card is-skeleton';
          card.innerHTML = `
            <div class="post-header">
              <div class="post-user-info">
                <div class="skeleton-avatar"></div>
                <div style="flex: 1;">
                  <div class="skeleton-line short" style="height: 12px; margin-bottom: 6px;"></div>
                  <div class="skeleton-line short" style="height: 10px; width: 45%; margin-bottom: 0;"></div>
                </div>
              </div>
            </div>
            <div class="post-media-wrap is-skeleton"></div>
            <div class="post-footer">
              <div class="skeleton-line title" style="width: 24px; height: 24px; border-radius: 50%; margin-bottom: 8px;"></div>
              <div class="skeleton-line medium" style="height: 12px; margin-bottom: 4px;"></div>
              <div class="skeleton-line short" style="height: 12px; width: 60%; margin-bottom: 0;"></div>
            </div>
          `;
          postsGrid.appendChild(card);
        }
      }

      function renderError(msg) {
        if (!postsGrid) return;
        postsGrid.innerHTML = '';
        const errBox = document.createElement('div');
        errBox.className = 'fetch-error-container';
        errBox.innerHTML = `
          <div class="fetch-error-title">เกิดข้อผิดพลาดในการโหลดเธรด</div>
          <p class="fetch-error-msg">${msg || 'กรุณาลองใหม่อีกครั้ง'}</p>
          <button class="retry-btn" id="islamRetryBtn" type="button">Retry Loading</button>
        `;
        postsGrid.appendChild(errBox);
        const retryBtn = document.getElementById('islamRetryBtn');
        if (retryBtn) {
          retryBtn.addEventListener('click', () => loadIslamPosts());
        }
        if (emptyState) emptyState.style.display = 'none';
        if (loadMoreWrap) loadMoreWrap.style.display = 'none';
      }

      // -----------------------------------------------------------------
      // RENDER POST CARDS
      // -----------------------------------------------------------------
      function renderCards(animate = true) {
        if (!postsGrid) return;
        postsGrid.innerHTML = '';

        const matchingPosts = POSTS.filter(post => {
          if (currentFilter === 'favorites') {
            return favorites.has(post.id);
          }
          return true;
        });

        if (matchingPosts.length === 0) {
          if (emptyState) {
            emptyState.style.display = 'block';
            if (currentFilter === 'favorites') {
              if (emptyStateTitle) emptyStateTitle.textContent = 'ยังไม่มีโพสต์โปรด';
              if (emptyStateText) emptyStateText.textContent = 'กดหัวใจที่โพสต์ที่ชอบเพื่อบันทึกเก็บไว้ดูได้เลย';
            } else {
              if (emptyStateTitle) emptyStateTitle.textContent = 'กำลังเตรียมเธรดใหม่ เร็วๆ นี้';
              if (emptyStateText) emptyStateText.textContent = '';
            }
          }
          if (loadMoreWrap) loadMoreWrap.style.display = 'none';
          return;
        }

        if (emptyState) emptyState.style.display = 'none';

        const visiblePosts = matchingPosts.slice(0, visibleLimit);

        visiblePosts.forEach((post, index) => {
          const isFav = favorites.has(post.id);
          const slides = Array.isArray(post.images) ? post.images : [];
          const slideCount = slides.length || 1;
          const isMulti = slideCount > 1;
          const threadLabel = `Thread 0${index + 1}`;

          const card = document.createElement('article');
          card.className = 'post-card';
          card.id = `card-${post.id}`;
          card.setAttribute('data-id', post.id);

          // Header
          const header = document.createElement('div');
          header.className = 'post-header';

          const userInfo = document.createElement('div');
          userInfo.className = 'post-user-info';

          const avatar = document.createElement('div');
          avatar.className = 'post-avatar';
          avatar.textContent = 'R';
          userInfo.appendChild(avatar);

          const metaText = document.createElement('div');
          metaText.className = 'post-meta-text';

          const author = document.createElement('span');
          author.className = 'post-author';
          author.textContent = 'hannnn';
          metaText.appendChild(author);

          const cat = document.createElement('span');
          cat.className = 'post-category';
          cat.textContent = post.category || 'Islamic Reminder';
          metaText.appendChild(cat);

          userInfo.appendChild(metaText);
          header.appendChild(userInfo);

          card.appendChild(header);

          // Media Area (1:1 square)
          const firstImage = slides.length > 0 ? resolveImageUrl(slides[0]) : '';
          const mediaWrap = document.createElement('div');
          mediaWrap.className = 'post-media-wrap';
          mediaWrap.setAttribute('role', 'button');
          mediaWrap.setAttribute('tabindex', '0');
          mediaWrap.setAttribute('aria-label', `Open post: ${post.caption || ''}`);

          const placeholder = document.createElement('div');
          placeholder.className = 'post-placeholder';
          placeholder.innerHTML = `
            <span class="placeholder-badge">
              <svg class="spinner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
              <span>Loading...</span>
            </span>
          `;
          mediaWrap.appendChild(placeholder);

          if (firstImage) {
            const img = document.createElement('img');
            img.src = firstImage;
            img.alt = post.alt_text || post.alt || post.caption || 'Islamic reflection slide';
            img.loading = 'lazy';
            img.decoding = 'async';
            img.style.display = 'none';

            img.onload = () => {
              img.style.display = 'block';
            };
            img.onerror = () => {
              img.style.display = 'none';
            };
            if (img.complete && img.naturalWidth > 0) {
              img.style.display = 'block';
            }
            mediaWrap.appendChild(img);
          }

          if (isMulti) {
            const badge = document.createElement('div');
            badge.className = 'multi-slide-badge';
            badge.title = `${slideCount} slides`;
            badge.innerHTML = `
              <svg viewBox="0 0 24 24"><rect x="2" y="2" width="16" height="16" rx="2" stroke-width="2"></rect><path d="M6 18h14a2 2 0 0 0 2-2V6" stroke-width="2"></path></svg>
              <span>1/${slideCount}</span>
            `;
            mediaWrap.appendChild(badge);
          }

          card.appendChild(mediaWrap);

          // Footer
          const footer = document.createElement('div');
          footer.className = 'post-footer';

          const actionsRow = document.createElement('div');
          actionsRow.className = 'post-actions-row';

          const heartBtn = document.createElement('button');
          heartBtn.className = `heart-btn ${isFav ? 'is-active' : ''}`;
          heartBtn.setAttribute('data-post-id', post.id);
          heartBtn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');
          heartBtn.setAttribute('aria-pressed', isFav ? 'true' : 'false');
          heartBtn.innerHTML = `
            <svg viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          `;
          actionsRow.appendChild(heartBtn);
          footer.appendChild(actionsRow);

          // หน้ารวมไม่ต้องแสดงข้อความเธรด แต่จะไปแสดงเมื่อกดดูรายละเอียดใน Lightbox
          card.appendChild(footer);

          // Card click handler (opens detail lightbox, excluding heart button)
          card.addEventListener('click', (e) => {
            if (e.target.closest('.heart-btn')) return;
            openLightbox(post.id, 0);
          });
          card.addEventListener('keydown', (e) => {
            if (e.target.closest('.heart-btn')) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox(post.id, 0);
            }
          });

          // Heart button click handler
          heartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(post.id);
          });

          attachCursorHover(card);
          attachCursorHover(mediaWrap);
          attachCursorHover(heartBtn);

          postsGrid.appendChild(card);
        });

        // Toggle Load More button
        if (loadMoreWrap) {
          if (visibleLimit < matchingPosts.length) {
            loadMoreWrap.style.display = 'flex';
          } else {
            loadMoreWrap.style.display = 'none';
          }
        }

        if (animate) {
          initCardEntrance();
        } else {
          Array.from(postsGrid.querySelectorAll('.post-card')).forEach(c => c.classList.add('card-revealed'));
        }
      }

      if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
          visibleLimit += BATCH_SIZE;
          renderCards(false);
        });
      }

      // -----------------------------------------------------------------
      // ENTRANCE ANIMATION (IntersectionObserver with 60ms stagger)
      // -----------------------------------------------------------------
      function initCardEntrance() {
        const cards = Array.from(document.querySelectorAll('.post-card'));

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
          cards.forEach(card => card.classList.add('card-revealed'));
          return;
        }

        let pendingDelay = 0;
        let batchTimer = null;

        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const card = entry.target;
              obs.unobserve(card);

              const currentDelay = pendingDelay;
              pendingDelay += 60;
              if (batchTimer) clearTimeout(batchTimer);
              batchTimer = setTimeout(() => {
                pendingDelay = 0;
              }, 120);

              card.style.transitionDelay = `${currentDelay}ms`;
              card.classList.add('card-revealed');

              setTimeout(() => {
                card.style.transitionDelay = '';
              }, currentDelay + 550);
            }
          });
        }, {
          threshold: 0.08
        });

        cards.forEach(card => observer.observe(card));
      }

      // -----------------------------------------------------------------
      // TOGGLE FAVORITE
      // -----------------------------------------------------------------
      function toggleFavorite(postId) {
        const isFav = favorites.has(postId);
        if (isFav) {
          favorites.delete(postId);
        } else {
          favorites.add(postId);
        }

        // Save
        saveFavorites(Array.from(favorites));
        updateFavoriteCount();

        const newState = !isFav;

        // Sync card in grid
        const card = document.getElementById(`card-${postId}`);
        if (card) {
          const btn = card.querySelector('.heart-btn');
          if (btn) {
            btn.classList.toggle('is-active', newState);
            btn.setAttribute('aria-pressed', newState ? 'true' : 'false');
            btn.setAttribute('aria-label', newState ? 'Remove from favorites' : 'Add to favorites');

            if (!prefersReducedMotion) {
              btn.classList.remove('pop');
              void btn.offsetWidth;
              btn.classList.add('pop');
            }
          }

          // If currently in favorites view and unhearted, animate out with fade
          if (currentFilter === 'favorites' && !newState) {
            card.classList.add('removing');
            setTimeout(() => {
              renderCards(false);
            }, 200);
          }
        }

        // Sync lightbox if currently showing this post
        if (activeLightboxPost && activeLightboxPost.id === postId) {
          const lbHeart = document.getElementById('lightboxHeartBtn');
          if (lbHeart) {
            lbHeart.classList.toggle('is-active', newState);
            lbHeart.setAttribute('aria-pressed', newState ? 'true' : 'false');
            lbHeart.setAttribute('aria-label', newState ? 'Remove from favorites' : 'Add to favorites');

            if (!prefersReducedMotion) {
              lbHeart.classList.remove('pop');
              void lbHeart.offsetWidth;
              lbHeart.classList.add('pop');
            }
          }
        }
      }

      // -----------------------------------------------------------------
      // FILTER LOGIC (All vs Favorites)
      // -----------------------------------------------------------------
      function applyFilter(filterType) {
        currentFilter = filterType;
        visibleLimit = 12; // Reset pagination limit on filter switch

        filterBtnAll.classList.toggle('active', filterType === 'all');
        filterBtnAll.setAttribute('aria-selected', filterType === 'all' ? 'true' : 'false');

        filterBtnFav.classList.toggle('active', filterType === 'favorites');
        filterBtnFav.setAttribute('aria-selected', filterType === 'favorites' ? 'true' : 'false');

        renderCards(true);
      }

      filterBtnAll.addEventListener('click', () => applyFilter('all'));
      filterBtnFav.addEventListener('click', () => applyFilter('favorites'));

      function pruneAndSyncFavorites(validPosts) {
        const validIds = new Set(validPosts.map(p => p.id));
        let savedFavs = getSavedFavorites();

        // ค่าเริ่มต้น: ตั้งให้เธรด @kruknompang เป็นค่ากดใจไว้เสมอสำหรับผู้เข้าชม
        const SEED_KEY = 'islam-default-kru-v2';
        try {
          if (!localStorage.getItem(SEED_KEY)) {
            const kruPost = validPosts.find(p =>
              p.id === 'post-1793524892088' ||
              (p.category && p.category.toLowerCase().includes('kruknompang')) ||
              (p.caption && p.caption.includes('คุณครูขนมปัง'))
            );
            if (kruPost && !savedFavs.includes(kruPost.id)) {
              savedFavs.push(kruPost.id);
            }
            localStorage.setItem(SEED_KEY, 'true');
          }
        } catch (_) {}

        const prunedFavs = savedFavs.filter(id => validIds.has(id));
        favorites = new Set(prunedFavs);
        saveFavorites(prunedFavs);
        updateFavoriteCount();
      }

      async function loadIslamPosts() {
        // Instant render from cache if available to prevent layout jump
        let cached = null;
        try {
          const raw = localStorage.getItem('supabase_cache_islam');
          if (raw) cached = JSON.parse(raw);
        } catch (_) {}

        if (cached && Array.isArray(cached) && cached.length > 0) {
          POSTS = cached;
          pruneAndSyncFavorites(cached);
          visibleLimit = 12;
          renderCards(true);
        } else {
          renderSkeletons();
        }

        if (emptyState) emptyState.style.display = 'none';
        if (loadMoreWrap) loadMoreWrap.style.display = 'none';

        try {
          const res = await fetch('/api/islam');
          if (!res.ok) throw new Error('API error ' + res.status);
          const json = await res.json();
          const rawList = Array.isArray(json.data) ? json.data : [];
          const validPosts = [];

          rawList.forEach(item => {
            if (!item || typeof item !== 'object') return;
            if (!item.id || typeof item.id !== 'string') return;
            if (!item.category) return;
            if (item.published === false) return;
            const rawImages = Array.isArray(item.images) && item.images.length > 0
              ? item.images
              : (Array.isArray(item.images_urls) ? item.images_urls : []);
            item.images = rawImages.map(resolveImageUrl).filter(Boolean);
            validPosts.push(item);
          });

          validPosts.sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
          POSTS = validPosts;

          try {
            localStorage.setItem('supabase_cache_islam', JSON.stringify(validPosts));
          } catch (_) {}

          pruneAndSyncFavorites(validPosts);

          visibleLimit = 12;
          renderCards(true);

        } catch (err) {
          console.error('[API] Error loading islamPosts:', err);
          if (POSTS.length === 0) {
            renderError(err.message);
          }
        }
      }

      // Initial load
      loadIslamPosts();

      // -----------------------------------------------------------------
      // LIGHTBOX VIEWER
      // -----------------------------------------------------------------
      const lightboxModal = document.getElementById('lightboxModal');
      const lightboxCard = document.getElementById('lightboxCard');
      const lightboxMediaArea = document.getElementById('lightboxMediaArea');
      const lightboxSliderTrack = document.getElementById('lightboxSliderTrack');
      const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
      const lightboxCategory = document.getElementById('lightboxCategory');
      const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
      const lightboxNextBtn = document.getElementById('lightboxNextBtn');
      const lightboxSlideIndicator = document.getElementById('lightboxSlideIndicator');
      const lightboxHeartBtn = document.getElementById('lightboxHeartBtn');
      const lightboxDots = document.getElementById('lightboxDots');
      const lightboxCaption = document.getElementById('lightboxCaption');

      let activePostIndex = 0;
      let activeSlideIndex = 0;
      let activeLightboxPost = null;
      let previousActiveElement = null;

      function buildLightboxSlides(post) {
        const slides = post.images && post.images.length > 0 ? post.images : [];
        lightboxSliderTrack.innerHTML = '';
        lightboxSliderTrack.style.transition = 'none';

        if (slides.length === 0) {
          const slide = document.createElement('div');
          slide.className = 'lightbox-slide';
          slide.innerHTML = `
            <div class="post-placeholder">
              <span class="placeholder-badge">
                <span>Text Thread</span>
              </span>
            </div>
          `;
          lightboxSliderTrack.appendChild(slide);
        } else {
          slides.forEach((imgPath, i) => {
            const fullUrl = resolveImageUrl(imgPath);
            const slide = document.createElement('div');
            slide.className = 'lightbox-slide';

            const placeholder = document.createElement('div');
            placeholder.className = 'post-placeholder';
            placeholder.innerHTML = `
              <span class="placeholder-badge">
                <svg class="spinner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
                <span>Loading...</span>
              </span>
            `;
            slide.appendChild(placeholder);

            if (fullUrl) {
              const img = document.createElement('img');
              img.src = fullUrl;
              img.alt = post.alt_text || post.caption || `Slide ${i + 1}`;
              img.loading = i === 0 ? 'eager' : 'lazy';
              img.decoding = 'async';
              img.onload = () => { img.classList.add('loaded'); };
              img.onerror = () => { img.style.display = 'none'; };
              if (img.complete && img.naturalWidth > 0) {
                img.classList.add('loaded');
              }
              slide.appendChild(img);
            }
            lightboxSliderTrack.appendChild(slide);
          });
        }

        // Force reflow
        void lightboxSliderTrack.offsetWidth;
      }

      function openLightbox(postId, slideIndex = 0) {
        const pIndex = POSTS.findIndex(p => p.id === postId);
        if (pIndex === -1) return;

        previousActiveElement = document.activeElement;
        activePostIndex = pIndex;
        activeSlideIndex = slideIndex;

        buildLightboxSlides(POSTS[pIndex]);
        updateLightboxView(false);

        // Reset scroll position to top
        if (lightboxCard) lightboxCard.scrollTop = 0;

        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        lightboxCloseBtn.focus();
      }

      function closeLightbox() {
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
          previousActiveElement.focus();
        }
        activeLightboxPost = null;
      }

      function updateLightboxView(animate = true) {
        const post = POSTS[activePostIndex];
        activeLightboxPost = post;

        const slides = post.images && post.images.length > 0 ? post.images : [];
        const totalSlides = slides.length || 1;

        if (activeSlideIndex >= totalSlides) activeSlideIndex = 0;
        if (activeSlideIndex < 0) activeSlideIndex = totalSlides - 1;

        // Category & Caption
        lightboxCategory.textContent = post.category || 'Islamic Reminder';
        lightboxCaption.textContent = post.caption || '';
        lightboxCaption.style.display = (post.caption && post.caption.trim()) ? 'block' : 'none';

        // Smooth slide animation via CSS transform!
        if (!animate || prefersReducedMotion) {
          lightboxSliderTrack.style.transition = 'none';
        } else {
          lightboxSliderTrack.style.transition = 'transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)';
        }
        lightboxSliderTrack.style.transform = `translateX(-${activeSlideIndex * 100}%)`;

        // Slide indicator & Dots & Navigation buttons
        if (totalSlides > 1) {
          lightboxSlideIndicator.style.display = 'block';
          lightboxSlideIndicator.textContent = `${activeSlideIndex + 1}/${totalSlides}`;

          lightboxPrevBtn.style.display = activeSlideIndex > 0 ? 'flex' : 'none';
          lightboxNextBtn.style.display = activeSlideIndex < totalSlides - 1 ? 'flex' : 'none';

          lightboxDots.style.display = 'flex';
          lightboxDots.innerHTML = '';
          for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = `lightbox-dot ${i === activeSlideIndex ? 'active' : ''}`;
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', (e) => {
              e.stopPropagation();
              activeSlideIndex = i;
              updateLightboxView(true);
            });
            lightboxDots.appendChild(dot);
          }
        } else {
          lightboxSlideIndicator.style.display = 'none';
          lightboxDots.style.display = 'none';
          lightboxPrevBtn.style.display = 'none';
          lightboxNextBtn.style.display = 'none';
        }

        // Heart status
        const isFav = favorites.has(post.id);
        lightboxHeartBtn.classList.toggle('is-active', isFav);
        lightboxHeartBtn.setAttribute('aria-pressed', isFav ? 'true' : 'false');
        lightboxHeartBtn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');
      }

      function stepLightbox(direction) {
        const post = POSTS[activePostIndex];
        const slides = post.images && post.images.length > 0 ? post.images : [];
        const totalSlides = slides.length || 1;

        if (totalSlides <= 1) return;

        if (direction === 'next') {
          if (activeSlideIndex < totalSlides - 1) {
            activeSlideIndex++;
            updateLightboxView(true);
          }
        } else if (direction === 'prev') {
          if (activeSlideIndex > 0) {
            activeSlideIndex--;
            updateLightboxView(true);
          }
        }
      }

      // Touch swipe gestures for mobile
      let touchStartX = 0;
      let touchEndX = 0;

      lightboxMediaArea.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
          touchStartX = e.touches[0].clientX;
        }
      }, { passive: true });

      lightboxMediaArea.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches.length > 0) {
          touchEndX = e.changedTouches[0].clientX;
          const diff = touchEndX - touchStartX;
          if (Math.abs(diff) > 40) {
            if (diff < 0) {
              stepLightbox('next');
            } else {
              stepLightbox('prev');
            }
          }
        }
      }, { passive: true });

      lightboxNextBtn.addEventListener('click', () => stepLightbox('next'));
      lightboxPrevBtn.addEventListener('click', () => stepLightbox('prev'));
      lightboxCloseBtn.addEventListener('click', closeLightbox);

      lightboxHeartBtn.addEventListener('click', () => {
        if (activeLightboxPost) {
          toggleFavorite(activeLightboxPost.id);
        }
      });

      // Close when clicking outside modal card
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
          closeLightbox();
        }
      });

      // Keyboard navigation & Focus trap inside lightbox
      window.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;

        if (e.key === 'Escape') {
          e.preventDefault();
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          stepLightbox('next');
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          stepLightbox('prev');
        } else if (e.key === 'Tab') {
          // Trap focus
          const focusable = lightboxModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          const firstFocusable = focusable[0];
          const lastFocusable = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              e.preventDefault();
              lastFocusable.focus();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              e.preventDefault();
              firstFocusable.focus();
            }
          }
        }
      });

      // -----------------------------------------------------------------
      // INITIAL RENDER
      // -----------------------------------------------------------------
      renderCards();

      // -----------------------------------------------------------------
      // NAVBAR SCROLL & COLLAPSE (Matches home page & videos page)
      // -----------------------------------------------------------------
      const navbar = document.getElementById('navbar');
      const navTabBtn = document.getElementById('navTabBtn');
      const navCloseBtn = document.getElementById('navCloseBtn');
      let isManuallyExpanded = false;

      function updateNavbarOnScroll() {
        const scrollY = window.scrollY;
        if (scrollY <= 70) {
          navbar.classList.remove('collapsed', 'expanded');
          isManuallyExpanded = false;
        } else {
          if (!isManuallyExpanded) {
            navbar.classList.add('collapsed');
            navbar.classList.remove('expanded');
          }
        }
      }

      window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });
      updateNavbarOnScroll();

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

      if (navbar) {
        navbar.addEventListener('click', (e) => {
          if (e.target.closest('.nav-content')) return;
          if (navbar.classList.contains('collapsed') && !navbar.classList.contains('expanded')) {
            openNavWithBurst();
          }
        });
      }

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