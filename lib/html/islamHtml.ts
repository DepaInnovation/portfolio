export const islamHtml = `
  <!-- Custom Cursor Elements (Desktop only) -->
  <div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>
  <div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>

  <!-- FLOATING NAVIGATION BAR (Matches home page & videos page) -->
  <nav class="navbar" id="navbar" aria-label="Main Navigation">
    <!-- Collapsed TAB button -->
    <button class="nav-tab-btn" id="navTabBtn" aria-label="Open Navigation Bar">
      <span class="tab-dot"></span>
      <span>TAB</span>
    </button>

    <!-- Full Navbar Content -->
    <div class="nav-content" id="navContent">
      <a href="/" class="nav-brand" title="Back to Portfolio">
        <span class="brand-dot"></span>
        <span>PORTFOLIO</span>
      </a>
      <ul class="nav-links">
        <li><a href="/#about" class="nav-link">About</a></li>
        <li><a href="/#skills" class="nav-link">Skills</a></li>
        <li><a href="/#projects" class="nav-link">Projects</a></li>
        <li><a href="/video" class="nav-link">Videos</a></li>
        <li><a href="/islam" class="nav-link active">Threads</a></li>
      </ul>
      <button class="nav-close-btn" id="navCloseBtn" title="Close Menu" aria-label="Collapse Navigation">✕</button>
    </div>
  </nav>

  <!-- MAIN GRAPH PAPER AREA -->
  <div class="graph-paper-bg">
    <div class="container">

      <!-- PAGE HEADING & SUBTITLE -->
      <section class="header-section">
        <h1 class="main-title">Islamic Threads
        </h1>
        <p class="main-subtitle">
          Threads, reminders, and reflections from the journey of faith and wisdom @instagram
        </p>
      </section>

      <!-- FILTER BAR (All vs Favorites) -->
      <section class="filter-wrapper" aria-label="Posts Filter">
        <div class="filter-pills-bar" role="tablist">
          <button class="filter-pill-btn active" id="filterBtnAll" role="tab" aria-selected="true" data-filter="all">
            <span>All</span>
          </button>
          <button class="filter-pill-btn" id="filterBtnFav" role="tab" aria-selected="false" data-filter="favorites">
            <span class="fav-icon-mini" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </span>
            <span>Favorites (<span id="favCount">0</span>)</span>
          </button>
        </div>
      </section>

      <!-- POSTS GRID -->
      <main class="posts-grid" id="postsGrid" aria-label="Instagram-style posts grid">
        <!-- Rendered dynamically from data/site-data.json with skeleton placeholders -->
      </main>

      <!-- LOAD MORE -->
      <div class="load-more-wrap" id="loadMoreWrap" style="display: none;">
        <button class="load-more-btn" id="loadMoreBtn" type="button">Load more</button>
      </div>

      <!-- EMPTY STATE -->
      <div class="empty-state" id="emptyState" role="status" style="display: none;">
        <div class="empty-state-icon" id="emptyStateIcon">
          <svg viewBox="0 0 24 24">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <h3 class="empty-state-title" id="emptyStateTitle">กำลังเตรียมเธรดใหม่ เร็วๆ นี้</h3>
        <p class="empty-state-text" id="emptyStateText"></p>
      </div>

      <!-- PAGE FOOTER -->
      <footer class="page-footer">
        <p>&bull; ALLAH ALWAYS WITH YOU &bull;</p>
      </footer>

    </div>
  </div>

  <!-- LIGHTBOX MODAL -->
  <div class="lightbox-overlay" id="lightboxModal" role="dialog" aria-modal="true" aria-hidden="true"
    aria-label="Post Lightbox Viewer">
    <div class="lightbox-card" id="lightboxCard">
      <!-- Lightbox Header -->
      <div class="lightbox-header">
        <div class="post-user-info">
          <div class="post-avatar">R</div>
          <div class="post-meta-text">
            <span class="post-author">hannnn</span>
            <span class="post-category" id="lightboxCategory">@</span>
          </div>
        </div>
        <button class="lightbox-close-btn" id="lightboxCloseBtn" aria-label="Close viewer">✕</button>
      </div>

      <!-- Lightbox Media Area -->
      <div class="lightbox-media-area" id="lightboxMediaArea">
        <div class="lightbox-slider-track" id="lightboxSliderTrack"></div>

        <!-- Nav Arrows (Only visible if thread has more than 1 image) -->
        <button class="lightbox-nav-btn prev" id="lightboxPrevBtn" aria-label="Previous slide" style="display: none;">
          <svg viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button class="lightbox-nav-btn next" id="lightboxNextBtn" aria-label="Next slide" style="display: none;">
          <svg viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <!-- Slide indicator (e.g. 1/3) -->
        <div class="lightbox-slide-indicator" id="lightboxSlideIndicator" style="display: none;">1/1</div>
      </div>

      <!-- Lightbox Footer -->
      <div class="lightbox-footer">
        <div class="lightbox-actions">
          <button class="heart-btn" id="lightboxHeartBtn" aria-label="Add to favorites" aria-pressed="false">
            <svg viewBox="0 0 24 24">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <div class="lightbox-dots" id="lightboxDots" style="display: none;"></div>
        </div>
        <p class="lightbox-caption" id="lightboxCaption">Caption goes here</p>
      </div>
    </div>
  </div>

  <!-- SUPABASE PUBLIC CLIENT CONFIGURATION & REST HELPER -->
  

  <!-- JAVASCRIPT LOGIC -->
  
`;
