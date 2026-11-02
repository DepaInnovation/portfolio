export const videoHtml = `
  <!-- Custom Cursor Elements (Desktop only) -->
  <div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>
  <div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>

  <!-- FLOATING NAVIGATION BAR (Matches home page tabbar) -->
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
        <li><a href="index.html#about" class="nav-link">About</a></li>
        <li><a href="index.html#skills" class="nav-link">Skills</a></li>
        <li><a href="index.html#projects" class="nav-link">Projects</a></li>
        <li><a href="/video" class="nav-link active">Videos</a></li>
        <li><a href="/islam" class="nav-link">Islam</a></li>
      </ul>
      <button class="nav-close-btn" id="navCloseBtn" title="Close Menu" aria-label="Collapse Navigation">✕</button>
    </div>
  </nav>

  <div class="graph-paper-bg">
    <div class="container">

      <!-- MINIMAL HEADER -->
      <section class="header-section">
        <h1 class="main-title">STUDY WITH ME</h1>
        <p class="main-subtitle">
          ma study with me ma
        </p>
      </section>

      <!-- FILTER CONTROLS (Dynamically generated from Supabase / backup.json) -->
      <section class="filter-wrapper" aria-label="Video Filter">
        <div class="main-filter-bar" id="mainFilterBar" role="tablist">
        </div>
      </section>

      <!-- VIDEOS GRID (Dynamically rendered with skeleton loading) -->
      <main class="videos-grid" id="videosGrid">
      </main>

      <!-- EMPTY STATE -->
      <div class="empty-state" id="emptyState" style="display: none;">
        <h3>กำลังเตรียมคลิปใหม่ เร็วๆ นี้</h3>
      </div>

      <!-- FOOTER -->
      <footer class="page-footer">
        <p>&bull; STUDYGRAM &bull;</p>
      </footer>

    </div>
  </div>

  <!-- VIDEO PLAYER MODAL -->
  <div class="modal-overlay" id="videoModal" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="modal-card">
      <div class="modal-top">
        <span class="modal-top-title">// VIDEO PLAYER</span>
        <button class="modal-close-btn" id="modalCloseBtn" aria-label="Close video player">✕</button>
      </div>
      <div class="modal-screen" id="modalScreen">
        <div class="modal-placeholder-screen">
          <div class="icon-svg" style="width: 48px; height: 48px; margin-bottom: 8px;">
            <svg viewBox="0 0 24 24">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          </div>
          <h4 id="modalScreenTitle">Video Showcase</h4>
          <p id="modalScreenDur"
            style="font-family: var(--font-mono); font-size: 0.85rem; color: #a1a1aa; margin-top: 4px;">Duration: --:--
          </p>
        </div>
      </div>
      <div class="modal-body">
        <h3 class="modal-title" id="modalTitle">Video Title</h3>
        <p class="modal-desc" id="modalDesc">Video Description</p>
      </div>
    </div>
  </div>

  <!-- SUPABASE PUBLIC CLIENT CONFIGURATION & REST HELPER -->
  

  <!-- JAVASCRIPT LOGIC -->
  
`;
