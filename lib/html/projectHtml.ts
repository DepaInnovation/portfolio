export const projectHtml = `
  <!-- Custom Mouse Cursor Elements -->
  <div class="cursor-dot" id="cursorDot"></div>
  <div class="cursor-ring" id="cursorRing"></div>

  <div class="graph-paper-bg">
    <div class="container">
      <!-- TOP NAVIGATION -->
      <nav class="top-nav">
        <a href="index.html#showcase" class="back-btn" id="backToShowcaseBtn">
          ← Back to Showcase
        </a>
      </nav>

      <!-- SKELETON CONTAINER (Shown while loading) -->
      <div id="skeletonContainer" class="project-detail-card">
        <div class="header-top-row">
          <div class="skeleton-box" style="width: 90px; height: 26px;"></div>
        </div>
        <div class="skeleton-box" style="width: 75%; height: 46px; margin: 16px 0 14px;"></div>
        <div class="skeleton-box" style="width: 100%; height: 24px; margin-bottom: 20px;"></div>
        <div style="display: flex; gap: 8px; margin-bottom: 30px;">
          <div class="skeleton-box" style="width: 70px; height: 24px; border-radius: 999px;"></div>
          <div class="skeleton-box" style="width: 85px; height: 24px; border-radius: 999px;"></div>
          <div class="skeleton-box" style="width: 60px; height: 24px; border-radius: 999px;"></div>
        </div>
        <div class="skeleton-box" style="width: 160px; height: 22px; margin-bottom: 14px;"></div>
        <div class="skeleton-box" style="width: 100%; height: 70px; margin-bottom: 28px;"></div>
        <div class="skeleton-box" style="width: 160px; height: 22px; margin-bottom: 14px;"></div>
        <div class="skeleton-box" style="width: 100%; height: 90px;"></div>
      </div>

      <!-- MAIN PROJECT CONTAINER (Populated dynamically) -->
      <div id="projectContent" style="display: none;">
        <article class="project-detail-card fade-in-element" id="mainCard">
          <!-- HEADER -->
          <header class="project-header">
            <div class="header-top-row">
              <span class="category-badge" id="pCategory">Projects</span>
              <a href="#" target="_blank" rel="noopener noreferrer" class="project-external-link" id="pExternalLink" style="display: none;">
                <span>Visit Project</span>
                <span>↗</span>
              </a>
            </div>
            <h1 class="project-title" id="pTitle">Project Title</h1>
            <p class="project-description" id="pDescription"></p>
            <div class="tag-chips-container" id="pTags"></div>
          </header>

          <!-- BACKGROUND (from problem) -->
          <section class="detail-section fade-in-element" id="sectionBackground" style="display: none;">
            <h2 class="section-label">// BACKGROUND</h2>
            <div class="prose-content" id="pProblem"></div>
          </section>

          <!-- DETAILS (from my_role) -->
          <section class="detail-section fade-in-element" id="sectionWhatIDid" style="display: none;">
            <h2 class="section-label">// DETAILS</h2>
            <div class="prose-content" id="pMyRole"></div>
          </section>

          <!-- AWARDS (from awards) -->
          <section class="detail-section fade-in-element" id="sectionAwards" style="display: none;">
            <h2 class="section-label">// AWARDS</h2>
            <div class="awards-list" id="pAwardsList"></div>
          </section>

          <!-- GALLERY (from media) -->
          <section class="detail-section fade-in-element" id="sectionGallery" style="display: none;">
            <h2 class="section-label">// GALLERY</h2>
            <div class="gallery-grid" id="pGalleryGrid"></div>
          </section>
        </article>

        <!-- BOTTOM NAVIGATION (Previous & Next following sort_order) -->
        <nav class="bottom-nav fade-in-element" aria-label="Project Navigation">
          <a href="#" class="nav-project-btn nav-prev" id="prevProjectBtn">
            <span class="nav-direction-label">← Previous</span>
            <span class="nav-project-title" id="prevProjectTitle">-</span>
          </a>
          <a href="#" class="nav-project-btn nav-next" id="nextProjectBtn">
            <span class="nav-direction-label">Next →</span>
            <span class="nav-project-title" id="nextProjectTitle">-</span>
          </a>
        </nav>
      </div>

      <!-- NOT FOUND STATE -->
      <div id="notFoundState" class="error-card fade-in-element" style="display: none;">
        <span class="error-badge">[404] NOT FOUND</span>
        <h1 class="error-title">ไม่พบผลงานนี้</h1>
        <p class="error-text">
          ขออภัย ไม่พบข้อมูลผลงานที่ท่านต้องการ หรือผลงานนี้ยังไม่ได้รับการเผยแพร่
        </p>
        <a href="index.html#showcase" class="back-btn">
          ← กลับสู่หน้า Showcase
        </a>
      </div>
    </div>
  </div>

  <!-- LIGHTBOX MODAL (Image viewer matching Islam page) -->
  <div class="lightbox-overlay" id="lightboxModal" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Image Lightbox Viewer">
    <div class="lightbox-card" id="lightboxCard">
      <div class="lightbox-header">
        <span class="lightbox-title-text" id="lightboxTitle">Gallery Viewer</span>
        <button class="lightbox-close-btn" id="lightboxCloseBtn" aria-label="Close viewer">✕</button>
      </div>

      <div class="lightbox-media-area" id="lightboxMediaArea">
        <div class="lightbox-slider-track" id="lightboxSliderTrack"></div>

        <button class="lightbox-nav-btn prev" id="lightboxPrevBtn" aria-label="Previous slide" style="display: none;">
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button class="lightbox-nav-btn next" id="lightboxNextBtn" aria-label="Next slide" style="display: none;">
          <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>

        <div class="lightbox-slide-indicator" id="lightboxSlideIndicator" style="display: none;">1/1</div>
      </div>

      <div class="lightbox-footer" id="lightboxFooter">
        <p class="lightbox-caption" id="lightboxCaption"></p>
      </div>
    </div>
  </div>

  <!-- SUPABASE PUBLIC CLIENT CONFIGURATION & REST HELPER -->
  

  
`;
