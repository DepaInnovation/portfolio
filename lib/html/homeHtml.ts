export const homeHtml = `

  <!-- Custom Cursor Elements (Desktop only) -->
  <div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>
  <div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>

  <!-- ================================================================= -->
  <!-- FLOATING NAVIGATION BAR                                           -->
  <!-- ================================================================= -->
  <nav class="navbar" id="navbar" aria-label="Main Navigation">
    <!-- Collapsed TAB button -->
    <button class="nav-tab-btn" id="navTabBtn" aria-label="Open Navigation Bar">
      <span class="tab-dot"></span>
      <span>TAB</span>
    </button>

    <!-- Full Navbar Content -->
    <div class="nav-content" id="navContent">
      <a href="#hero" class="nav-brand" title="Back to top">
        <span class="brand-dot"></span>
        <span>PORTFOLIO</span>
      </a>
      <ul class="nav-links">
        <li><a href="#about" class="nav-link">About</a></li>
        <li><a href="#skills" class="nav-link">Skills</a></li>
        <li><a href="#projects" class="nav-link">Projects</a></li>
        <li><a href="#video" class="nav-link">Videos</a></li>
        <li><a href="/islam" class="nav-link">Islam</a></li>
      </ul>
      <button class="nav-close-btn" id="navCloseBtn" title="Close Menu" aria-label="Collapse Navigation">✕</button>
    </div>
  </nav>

  <main id="main-content">
    <!-- =============================================================== -->
    <!-- HERO SECTION (First Screen)                                     -->
    <!-- 3 rows of endlessly scrolling faint letter "N" in seamless loop  -->
    <!-- =============================================================== -->
    <header class="hero" id="hero">
      <div class="hero-marquee-container" aria-hidden="true">
        <!-- ROW 1: Moves LEFT (Repeating 11-letter unit: H A and 9 N's) -->
        <div class="marquee-row">
          <div class="marquee-track">
            <span class="letter-n">H A N N N N N N H A N N N N N N H A N N N N N N &nbsp;</span>
            <span class="letter-n">H A N N N N N N H A N N N N N N H A N N N N N N &nbsp;</span>
          </div>
        </div>
        <!-- ROW 2: Moves RIGHT -->
        <div class="marquee-row">
          <div class="marquee-track">
            <span class="letter-n">N N N N N N N N N N N N&nbsp;</span>
            <span class="letter-n">N N N N N N N N N N N N&nbsp;</span>
          </div>
        </div>
        <!-- ROW 3: Moves LEFT -->
        <div class="marquee-row">
          <div class="marquee-track">
            <span class="letter-n">N N N N N N N N N N N N&nbsp;</span>
            <span class="letter-n">N N N N N N N N N N N N&nbsp;</span>
          </div>
        </div>
      </div>

      <!-- Foreground Content (Matched precisely to user's Image 1) -->
      <div class="hero-content">

        <div class="hero-title-group">
          <h1 class="hero-title" id="heroTitle">PROTFOLIDA</h1>
          <div class="hero-cat-wrap">
            <img src="/image/cat-cropped.png" alt="Coding cat" class="hero-cat-img" draggable="false" />
          </div>
        </div>

        <div class="hero-pill-badge">
          <span class="hero-pill-dot"></span>
          <span class="hero-pill-text">www.riifhannnnnnnnnnnnnnnnnnnnn@handsome.com</span>
        </div>
        <p class="hero-sub-note" id="heroEasterEgg">click for go to real website</p>
      </div>

      <a href="#about" class="scroll-down" aria-label="Scroll down to About section">
        <span>SCROLL DOWN</span>
        <span class="scroll-down-arrow">↓</span>
      </a>
    </header>

    <!-- =============================================================== -->
    <!-- GRAPH PAPER WRAPPER (Everything below hero has graph paper grid)-->
    <!-- =============================================================== -->
    <div class="graph-paper-bg">

      <!-- ============================================================= -->
      <!-- SECTION 1: ABOUT                                              -->
      <!-- ============================================================= -->
      <section class="section" id="about">
        <div class="section-header reveal">
          <h2 class="section-tag">00 // About me</h2>
        </div>

        <div class="about-card reveal delay-1">
          <!-- Top Area: Two Columns (Avatar on left, Bio on right) -->
          <div class="about-hero">
            <div class="about-avatar-frame" id="aboutAvatarBtn" role="button" tabindex="0"
              aria-label="View full portrait photo" title="Click to view full photo">
              <img src="/image/IMG_1330.jpg" alt="Rifhan portrait" class="about-avatar-img" />
              <div class="about-avatar-zoom-hint" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="7"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>

            <div class="about-content">
              <h3 class="about-name">Rifhan Ardae</h3>
              <div class="about-sub">rifhan bin abdulhalim ardae </div>

              <p class="about-bio" id="aboutBio">
                This little boy had a dream: that one day, when he grew up, he would become someone who could help the
                people around him, whether through action, heart, or words. But as he grew older, that pure dream slowly
                faded away. Then, on an ordinary day, that flame was lit again, with the wish to pass on and share what
                he knows, even though he doesn’t know much. This website is one of the things that little boy has always
                wanted to build. I hope everyone takes away some knowledge and experience, big or small. 🙌🏻
              </p>

              <div class="about-chips" role="group" aria-label="Language selector">
                <button type="button" class="about-chip active" data-bio-lang="en" aria-pressed="true">English</button>
                <button type="button" class="about-chip" data-bio-lang="ms" aria-pressed="false">Melayu</button>
                <button type="button" class="about-chip" data-bio-lang="th" aria-pressed="false">Thai</button>
              </div>
            </div>
          </div>

          <!-- Dashed Divider -->
          <hr class="about-divider" />

          <!-- Quiet Pill Buttons (Clubs | TVM | University) -->
          <div class="about-pills-row" role="tablist" aria-label="Roles and Education tabs">
            <button class="about-pill" role="tab" id="tab-clubs" aria-controls="panel-clubs" aria-selected="false"
              aria-expanded="false" tabindex="0">Clubs</button>
            <button class="about-pill" role="tab" id="tab-tvm" aria-controls="panel-tvm" aria-selected="false"
              aria-expanded="false" tabindex="-1">TVM</button>
            <button class="about-pill" role="tab" id="tab-university" aria-controls="panel-university"
              aria-selected="false" aria-expanded="false" tabindex="-1">PSU</button>
          </div>

          <!-- Expandable Panels (Hidden by default on page load) -->
          <div class="about-panels-wrap">
            <!-- Clubs Panel -->
            <div class="about-panel" id="panel-clubs" role="tabpanel" aria-labelledby="tab-clubs" hidden>
              <ul class="about-list">
                <li class="about-item">
                  <div class="about-item-main">
                    <strong class="about-item-title">President</strong>
                    <span class="about-item-sep">—</span>
                    <a href="https://www.instagram.com/tvm_robotech.official/" target="_blank" rel="noopener noreferrer"
                      class="about-item-sub">ROBOTECH</a>
                  </div>
                  <span class="about-item-meta">G.6</span>
                </li>
                <li class="about-item">
                  <div class="about-item-main">
                    <strong class="about-item-title">Content Lead</strong>
                    <span class="about-item-sep">—</span>
                    <a href="https://www.instagram.com/official_engguide/" target="_blank" rel="noopener noreferrer"
                      class="about-item-sub">ENGGUIDE</a>
                  </div>
                  <span class="about-item-meta">G.14</span>
                </li>
                <li class="about-item">
                  <div class="about-item-main">
                    <strong class="about-item-title">Physics Staff</strong>
                    <span class="about-item-sep">—</span>
                    <a href="https://www.instagram.com/piipannong_club/" target="_blank" rel="noopener noreferrer"
                      class="about-item-sub">Piipannong club</a>
                  </div>
                  <span class="about-item-meta">G.3</span>
                </li>
                <li class="about-item">
                  <div class="about-item-main">
                    <strong class="about-item-title">Media Staff</strong>
                    <span class="about-item-sep">—</span>
                    <a href="https://www.instagram.com/astro_learners/" target="_blank" rel="noopener noreferrer"
                      class="about-item-sub">Islamic Astronomy Center</a>
                  </div>
                  <span class="about-item-meta">G.20</span>
                </li>
              </ul>
            </div>

            <!-- TVM Panel -->
            <div class="about-panel" id="panel-tvm" role="tabpanel" aria-labelledby="tab-tvm" hidden>
              <ul class="about-list">
                <li class="about-item">
                  <div class="about-item-main">
                    <strong class="about-item-title">Smart Innovation Creator</strong>
                    <span class="about-item-sep">—</span>
                    <a href="https://www.facebook.com/thamavityamulniti" target="_blank" rel="noopener noreferrer"
                      class="about-item-sub">Thamavitya Mulniti School</a>
                  </div>
                  <span class="about-item-meta">G.1</span>
                </li>
                <li class="about-item">
                  <div class="about-item-main">
                    <strong class="about-item-title">Science Math Potential Program</strong>
                    <span class="about-item-sep">—</span>
                    <a href="https://www.facebook.com/thamavityamulniti" target="_blank" rel="noopener noreferrer"
                      class="about-item-sub">Thamavitya Mulniti School</a>
                  </div>
                  <span class="about-item-meta">G.8</span>
                </li>
              </ul>
            </div>

            <!-- University Panel -->
            <div class="about-panel" id="panel-university" role="tabpanel" aria-labelledby="tab-university" hidden>
              <ul class="about-list">
                <li class="about-item">
                  <div class="about-item-main">
                    <strong class="about-item-title">Computer Science</strong>
                    <span class="about-item-sep">—</span>
                    <a href="https://www.psu.ac.th/" target="_blank" rel="noopener noreferrer"
                      class="about-item-sub">Prince of Songkla University</a>
                  </div>
                  <span class="about-item-meta">G.36</span>
                </li>
                <li class="about-item">
                  <div class="about-item-main">
                    <strong class="about-item-title"><a href="https://www.ipst.ac.th/" target="_blank"
                        rel="noopener noreferrer" class="about-item-title-link">PSMT</a></strong>
                    <span class="about-item-sep">—</span>
                    <a href="https://www.ipst.ac.th/" target="_blank" rel="noopener noreferrer"
                      class="about-item-sub">Promotion of Science and Mathematics Teachers Project</a>
                  </div>
                  <span class="about-item-meta">G.28</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 2: SKILLS                                             -->
      <!-- ============================================================= -->
      <section class="section" id="skills">
        <div class="section-header reveal">
          <h2 class="section-tag">01 // SKILLS</h2>
        </div>

        <div class="skills-container reveal delay-1">
          <span class="skills-note">// KOR TUM PEN YU KHEI NII</span>

          <!-- ========================================================= -->
          <!-- EDIT YOUR SKILLS LIST HERE                                -->
          <!-- ========================================================= -->
          <div class="skills-grid">
            <div class="skill-badge"><span class="skill-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <circle cx="12" cy="5" r="2"></circle>
                  <path d="M12 7v4"></path>
                  <line x1="8" y1="16" x2="8.01" y2="16"></line>
                  <line x1="16" y1="16" x2="16.01" y2="16"></line>
                </svg></span> Robotics &amp; Automation</div>
            <div class="skill-badge"><span class="skill-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-linecap="round" stroke-linejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                  <line x1="9" y1="1" x2="9" y2="4"></line>
                  <line x1="15" y1="1" x2="15" y2="4"></line>
                  <line x1="9" y1="20" x2="9" y2="23"></line>
                  <line x1="15" y1="20" x2="15" y2="23"></line>
                  <line x1="20" y1="9" x2="23" y2="9"></line>
                  <line x1="20" y1="14" x2="23" y2="14"></line>
                  <line x1="1" y1="9" x2="4" y2="9"></line>
                  <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg></span> Embedded Systems &amp; IoT</div>
            <div class="skill-badge"><span class="skill-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg></span> AI &amp; Computer Vision</div>
            <div class="skill-badge"><span class="skill-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v6"></path>
                  <path d="M8 8v4a4 4 0 0 0 8 0V8"></path>
                  <line x1="10" y1="2" x2="10" y2="4"></line>
                  <line x1="14" y1="2" x2="14" y2="4"></line>
                  <line x1="12" y1="16" x2="12" y2="22"></line>
                </svg></span> Circuit &amp; Hardware Design</div>
            <div class="skill-badge"><span class="skill-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="4 17 10 11 4 5"></polyline>
                  <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg></span> C / C++ &amp; Python</div>
            <div class="skill-badge"><span class="skill-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                  </path>
                </svg></span> Full-Stack &amp; Real-Time Web</div>
            <div class="skill-badge"><span class="skill-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"></ellipse>
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)"></ellipse>
                </svg></span> Physics &amp; Calculus</div>
            <div class="skill-badge"><span class="skill-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                  <path d="M2 2l7.586 7.586"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </svg></span> UX/UI</div>
            <div class="skill-badge"><span class="skill-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg></span> Video Media</div>
            <div class="skill-badge"><span class="skill-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z">
                  </path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg></span> 3D Model</div>
          </div>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 3: PROJECTS (with live category filtering)             -->
      <!-- ============================================================= -->
      <section class="section" id="projects">
        <span id="showcase" style="position: absolute; margin-top: -80px;" aria-hidden="true"></span>
        <div class="section-header reveal">
          <h2 class="section-tag">02 // SHOWCASE</h2>
        </div>

        <!-- Filter Buttons (Dynamically generated from Supabase / backup.json) -->
        <div class="filter-bar reveal delay-1" id="projectFilterBar" role="group"
          aria-label="Filter projects by category">
        </div>

        <!-- Projects Grid (Dynamically rendered from Supabase / backup.json with skeleton placeholders) -->
        <div class="projects-grid" id="projectsGrid">
        </div>

        <!-- View More Link (Right-aligned, gray, borderless, underlined) -->
        <div class="projects-view-more-wrap" id="viewMoreWrap" style="display: none;">
          <button class="view-more-btn" id="viewMoreBtn" aria-label="View more projects">view more</button>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 4: VIDEO (Calculus & Computer Channels)               -->
      <!-- ============================================================= -->
      <section class="section" id="video">
        <div class="section-header reveal">
          <h2 class="section-tag">03 // VIDEO</h2>
        </div>

        <div class="video-channels-grid reveal delay-1">
          <!-- 1. CALCULUS CHANNEL CARD -->
          <article class="video-channel-card">
            <div>
              <div class="channel-header">
                <div class="channel-icon-wrap" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M18 7V4H6l6 8-6 8h12v-3"></path>
                  </svg>
                </div>
              </div>
              <h3 class="channel-title">Calculus 1 </h3>
              <p class="channel-desc">
                ฮาวทูเรียนแคลแบบคนเกลียดแคล
              </p>
              <span class="channel-subcategories-label">// TOPICS</span>
              <div class="channel-pills-wrap">
                <a href="/video?cat=calculus" class="channel-pill-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M3 17l6-6 4 4 8-8"></path>
                    <path d="M14 7h7v7"></path>
                  </svg>
                  <span>Limits and Continuity</span>
                </a>
                <a href="/video?cat=calculus" class="channel-pill-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <line x1="4" y1="20" x2="20" y2="4"></line>
                    <polyline points="14 4 20 4 20 10"></polyline>
                  </svg>
                  <span>Derivatives</span>
                </a>
                <a href="/video?cat=calculus" class="channel-pill-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M15 3a3 3 0 0 0-3 3v12a3 3 0 0 1-3 3"></path>
                  </svg>
                  <span>Integrals</span>
                </a>
              </div>
            </div>
            <a href="/video?cat=calculus" class="channel-action-btn" aria-label="Go directly to Calculus videos">
              <span>Learn Calculus</span>
              <span>→</span>
            </a>
          </article>

          <!-- 2. COMPUTER CHANNEL CARD -->
          <article class="video-channel-card">
            <div>
              <div class="channel-header">
                <div class="channel-icon-wrap" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
              </div>
              <h3 class="channel-title">Computer &amp; Project</h3>
              <p class="channel-desc">
                ฮาวทูเรียนคอมแบบคนที่เกลียดคอมมากกว่าแคล
              </p>
              <span class="channel-subcategories-label">// TOPICS</span>
              <div class="channel-pills-wrap">
                <a href="/video?cat=robotics" class="channel-pill-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                    <circle cx="12" cy="5" r="2"></circle>
                    <path d="M12 7v4"></path>
                  </svg>
                  <span>Robotics</span>
                </a>
                <a href="/video?cat=ai" class="channel-pill-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>AI &amp; Vision</span>
                </a>
                <a href="/video?cat=iot" class="channel-pill-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span>Web &amp; IoT</span>
                </a>
                <a href="/video?cat=programming" class="channel-pill-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  <span>Programming</span>
                </a>
              </div>
            </div>
            <a href="/video?cat=computer" class="channel-action-btn" aria-label="Explore all Computer videos">
              <span>Learn Computer</span>
              <span>→</span>
            </a>
          </article>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- FOOTER                                                        -->
      <!-- ============================================================= -->
      <footer class="site-footer" id="contact">
        <div class="footer-inner">
          <p class="footer-title">NO DM FOR WORK I WANNA SLEEP ONLY</p>
          <div class="footer-links" role="list">
            <a href="https://www.facebook.com/whoyouknowwho" target="_blank" rel="noopener noreferrer"
              class="footer-link" aria-label="Facebook" title="Facebook: @whoyouknowwho">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                aria-hidden="true">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
              </svg>
            </a>
            <a href="https://line.me/ti/p/~rifhanardae" target="_blank" rel="noopener noreferrer" class="footer-link"
              aria-label="LINE" title="LINE: @rifhanardae">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <!-- Speech bubble outline with clean white background -->
                <path
                  d="M22.5 10.314c0-4.821-4.701-8.742-10.5-8.742S1.5 5.493 1.5 10.314c0 4.311 3.736 7.922 8.783 8.608.342.073.808.231.926.529.105.27.069.687.033.968l-.143.915c-.039.27-.21 1.064.918.578 1.13-.483 6.052-3.654 8.257-6.25 1.942-2.227 2.226-4.404 2.226-4.664z"
                  fill="#ffffff" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
                  stroke-linejoin="round" />
                <!-- LINE brand text in theme gray -->
                <path
                  d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629"
                  fill="currentColor" />
              </svg>
            </a>
            <a href="https://www.instagram.com/riifhannnnnnnnnnnnnnnnnnnnnnn/" target="_blank" rel="noopener noreferrer"
              class="footer-link" aria-label="Instagram" title="Instagram: @riifhannnnnnnnnnnnnnnnnnnnnnn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                aria-hidden="true">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M16.5 7.5l0 .01" />
              </svg>
            </a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer"
              class="footer-link" aria-label="GitHub" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                aria-hidden="true">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
              </svg>
            </a>
            <a href="mailto:rifhanardae8@gmail.com" class="footer-link" aria-label="Email"
              title="Email: rifhanardae8@gmail.com">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                aria-hidden="true">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                <path d="M3 7l9 6l9 -6" />
              </svg>
            </a>
          </div>

          <!-- Anonymous Message Trigger Button ("anonymas to me") -->
          <div class="anon-trigger-wrap">
            <button type="button" class="anon-trigger-btn" id="anonTriggerBtn"
              aria-label="Send anonymous message to Rifhan" title="Send anonymous message to Rifhan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>you to me</span>
            </button>
          </div>
        </div>
      </footer>

    </div><!-- End of .graph-paper-bg -->

    <!-- ================================================================= -->
    <!-- EASTER EGG POPUP MODAL ("POR MENG TUI")                           -->
    <!-- ================================================================= -->
    <div class="easter-modal-overlay" id="easterModal" role="dialog" aria-modal="true" style="display: none;">
      <div class="easter-modal-card">
        <div class="easter-modal-header">
          <span class="easter-modal-tag">// SYSTEM ALERT</span>
          <button class="easter-modal-close" id="easterModalClose" aria-label="Close modal">✕</button>
        </div>
        <div class="easter-modal-body">
          <h3 class="easter-modal-title">
            STOP CLICKING!
            <span class="easter-modal-sub">หยุดกดได้แล้วว</span>
          </h3>
        </div>
        <div class="easter-modal-footer">
          <button class="easter-modal-btn" id="easterModalOkBtn" type="button">OK, I'LL STOP</button>
        </div>
      </div>
    </div>

    <!-- ================================================================= -->
    <!-- AVATAR FULL PHOTO LIGHTBOX MODAL                                  -->
    <!-- ================================================================= -->
    <div class="avatar-modal-overlay" id="avatarModal" role="dialog" aria-modal="true" aria-hidden="true"
      style="display: none;">
      <div class="avatar-modal-card">
        <div class="avatar-modal-header">
          <div class="avatar-modal-meta">
            <span class="avatar-modal-dot"></span>
            <span class="avatar-modal-title">Kid Version</span>
          </div>
          <button class="avatar-modal-close" id="avatarModalClose" aria-label="Close photo">✕</button>
        </div>
        <div class="avatar-modal-body">
          <div class="avatar-modal-img-wrap">
            <img src="/image/IMG_1330.jpg" alt="Rifhan portrait full photo" class="avatar-modal-img" />
          </div>
        </div>
        <div class="avatar-modal-footer">
          <span>Upin Ipin</span>
          <span>23 April 2008</span>
        </div>
      </div>
    </div>

    <!-- ================================================================= -->
    <!-- ANONYMOUS MESSAGE MODAL ("ANONYMAS TO ME")                         -->
    <!-- ================================================================= -->
    <div class="anon-modal-overlay" id="anonModal" role="dialog" aria-modal="true" aria-hidden="true"
      style="display: none;">
      <div class="anon-modal-card">
        <div class="anon-modal-header">
          <div class="anon-modal-meta">
            <span class="anon-modal-dot"></span>
            <span class="anon-modal-title">// YOU TO ME</span>
          </div>
          <button class="anon-modal-close" id="anonModalClose" aria-label="Close modal">✕</button>
        </div>
        <form class="anon-modal-body" id="anonMessageForm">
          <!-- Honeypot anti-spam field: hidden from real users, bots fill this and get rejected -->
          <div style="position: absolute; left: -9999px; top: -9999px; opacity: 0; pointer-events: none;"
            aria-hidden="true">
            <input type="text" name="hp_check" id="anonHoneypot" tabindex="-1" autocomplete="off">
          </div>
          <div class="anon-textarea-wrap">
            <textarea class="anon-textarea" id="anonMessageText" rows="4" maxlength="600" required
              placeholder="พิมพ์ข้อความที่อยากบอกที่นี่ได้เลย..."></textarea>
            <div class="anon-char-count"><span id="anonCharCount">0</span>/600</div>
          </div>
          <div class="anon-form-actions">
            <button type="submit" class="anon-submit-btn" id="anonSubmitBtn">
              <span>ส่งข้อความแบบไม่ระบุตัวตน</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </form>
        <div class="anon-success-state" id="anonSuccessState" style="display: none;">
          <h4 class="anon-success-title">ส่งข้อความเรียบร้อยแล้ว!</h4>
          <p class="anon-success-desc">ข้อความถูกส่งเรียบร้อยแล้ว ขอบคุณมากครับ :)
          </p>
          <button type="button" class="anon-success-btn" id="anonSuccessCloseBtn">success</button>
        </div>
      </div>
    </div>
  </main>

  <!-- ================================================================= -->
  <!-- SUPABASE PUBLIC CLIENT CONFIGURATION & REST HELPER                 -->
  <!-- ================================================================= -->
  

  <!-- ================================================================= -->
  <!-- VANILLA JAVASCRIPT (Interactive Features & Animations)            -->
  <!-- ================================================================= -->
  
`;
