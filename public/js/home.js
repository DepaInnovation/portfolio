// Client-side interactions for Home Page
(function() {
  function initHome() {
    (function () {
      'use strict';

      // ===============================================================
      // 0. WEB AUDIO SOUND ENGINE (Zero-asset, instant response)
      // ===============================================================
      let audioCtx = null;
      function getAudioContext() {
        if (!audioCtx) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) {
            audioCtx = new AudioContextClass();
          }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        return audioCtx;
      }

      // 0.1 Tactile Tab / Pill Click Sound (Crisp physical switch)
      function playTabClickSound() {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // Mechanical body tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(780, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.038);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);

        // High tactile snap transient
        const snapOsc = ctx.createOscillator();
        const snapGain = ctx.createGain();
        snapOsc.type = 'sine';
        snapOsc.frequency.setValueAtTime(2400, now);
        snapOsc.frequency.exponentialRampToValueAtTime(700, now + 0.012);

        snapGain.gain.setValueAtTime(0.1, now);
        snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

        snapOsc.connect(snapGain);
        snapGain.connect(ctx.destination);
        snapOsc.start(now);
        snapOsc.stop(now + 0.015);
      }

      // 0.2 Cute Cat Meow Sound (Procedural Vocal Formants)
      let lastMeowTime = 0;
      function playCatMeow(pitchMultiplier = 1) {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const dur = 0.46;

        // Random subtle pitch offset for natural lifelike variation
        const baseFreq = (410 + (Math.random() * 50 - 25)) * pitchMultiplier;

        // Rich harmonic vocal oscillator
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';

        // Characteristic "M-E-E-O-W" pitch slide
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.85, now + 0.14);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, now + dur);

        // LFO for throat vibrato
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(6.5, now);
        lfoGain.gain.setValueAtTime(15, now);
        lfo.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + dur);

        // Bandpass formant filter simulating mouth opening & closing
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.setValueAtTime(2.2, now);
        filter.frequency.setValueAtTime(820, now);
        filter.frequency.exponentialRampToValueAtTime(1600, now + 0.16);
        filter.frequency.exponentialRampToValueAtTime(720, now + dur);

        // Amplitude envelope (gentle onset, swell, soft decay)
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.24, now + 0.07);
        gain.gain.exponentialRampToValueAtTime(0.18, now + 0.25);
        gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + dur);
        lastMeowTime = performance.now();
      }

      // 0.3 Funny High-Pitched Cat Screech / Frenzy Scream (For rapid shaking)
      function playCatScream() {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const dur = 0.24 + Math.random() * 0.07;

        // High frantic screech frequency
        const startFreq = 860 + Math.random() * 180;
        const peakFreq = startFreq * (1.85 + Math.random() * 0.35);

        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.linearRampToValueAtTime(peakFreq, now + dur * 0.42);
        osc.frequency.exponentialRampToValueAtTime(startFreq * 0.82, now + dur);

        // Frantic fast wobble vibrato
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(17, now);
        lfoGain.gain.setValueAtTime(38, now);
        lfo.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + dur);

        // Piercing cartoon formant filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.setValueAtTime(3.8, now);
        filter.frequency.setValueAtTime(1550, now);
        filter.frequency.linearRampToValueAtTime(2600, now + dur * 0.45);
        filter.frequency.exponentialRampToValueAtTime(1100, now + dur);

        // Punchy volume envelope
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.28, now + 0.035);
        gain.gain.exponentialRampToValueAtTime(0.18, now + dur * 0.65);
        gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + dur);
        lastMeowTime = performance.now();
      }

      // 0.4 Epic Explosion Sound ("BOOM! / ตู้ม!")
      function playExplosionSound() {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const dur = 1.35;

        // 1. Noise shockwave blast
        const bufferSize = Math.floor(ctx.sampleRate * dur);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        // Filter: sweeping from 1400Hz down to 40Hz with resonance
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.Q.setValueAtTime(4, now);
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.exponentialRampToValueAtTime(45, now + dur);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.55, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        whiteNoise.start(now);
        whiteNoise.stop(now + dur);

        // 2. Heavy sub-bass rumble impact (Chest-thumping punch)
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(155, now);
        subOsc.frequency.exponentialRampToValueAtTime(28, now + 0.5);

        subGain.gain.setValueAtTime(0.6, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(now);
        subOsc.stop(now + 0.55);

        // 3. Initial explosive crack
        const crackOsc = ctx.createOscillator();
        const crackGain = ctx.createGain();
        crackOsc.type = 'sawtooth';
        crackOsc.frequency.setValueAtTime(110, now);
        crackOsc.frequency.exponentialRampToValueAtTime(25, now + 0.22);

        crackGain.gain.setValueAtTime(0.35, now);
        crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

        crackOsc.connect(crackGain);
        crackGain.connect(ctx.destination);
        crackOsc.start(now);
        crackOsc.stop(now + 0.25);
      }

      // 0.5 WWW Easter Egg Click Sound (Ascending pops & Explosion on final step)
      function playWwwSound(isFinal, step = 0) {
        if (isFinal) {
          playExplosionSound();
          return;
        }
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // Playful cartoon spring/pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const startF = 320 + (step + 1) * 85;
        osc.frequency.setValueAtTime(startF, now);
        osc.frequency.exponentialRampToValueAtTime(startF * 2.1, now + 0.13);

        gain.gain.setValueAtTime(0.24, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      }

      // Global Tab Click Sound Listener
      document.addEventListener('click', (e) => {
        const tabEl = e.target.closest('.nav-link, .about-pill, .about-chip, .filter-btn, [role="tab"], .skill-badge');
        if (tabEl) {
          playTabClickSound();
        }
      });

      // ---------------------------------------------------------------
      // 0.5 Custom Mouse Cursor Engine & Hover Attachment
      // ---------------------------------------------------------------
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

        // Smooth physics-like lerp for the trailing ring
        function animateCursor() {
          ringX += (mouseX - ringX) * 0.18;
          ringY += (mouseY - ringY) * 0.18;
          cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
          requestAnimationFrame(animateCursor);
        }
        requestAnimationFrame(animateCursor);

        // Grow cursor when hovering over interactive elements
        const interactiveElements = 'a, button, .hero-pill-badge, .hero-pill-text, .project-card, .skill-badge, .contact-link-card, .filter-btn, .about-pill, .view-more-btn, .anon-trigger-btn, .avatar-wrapper';
        document.querySelectorAll(interactiveElements).forEach((el) => {
          attachCursorHover(el);
        });

        // Universal delegation so any interactive element automatically expands the cursor
        document.addEventListener('mouseover', (e) => {
          if (e.target && e.target.closest && e.target.closest('a, button, .hero-pill-badge:not(.is-disabled), .project-card, .skill-badge, .contact-link-card, .filter-btn, .about-pill, .view-more-btn, .anon-trigger-btn, .avatar-wrapper, [role="button"], input, textarea, select')) {
            document.body.classList.add('cursor-hover');
          }
        }, { passive: true });

        document.addEventListener('mouseout', (e) => {
          if (e.target && e.target.closest && e.target.closest('a, button, .hero-pill-badge:not(.is-disabled), .project-card, .skill-badge, .contact-link-card, .filter-btn, .about-pill, .view-more-btn, .anon-trigger-btn, .avatar-wrapper, [role="button"], input, textarea, select')) {
            if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest('a, button, .hero-pill-badge:not(.is-disabled), .project-card, .skill-badge, .contact-link-card, .filter-btn, .about-pill, .view-more-btn, .anon-trigger-btn, .avatar-wrapper, [role="button"], input, textarea, select')) {
              document.body.classList.remove('cursor-hover');
            }
          }
        }, { passive: true });
      }

      // ---------------------------------------------------------------
      // 1. Dynamic Footer Year
      // ---------------------------------------------------------------
      const yearEl = document.getElementById('currentYear');
      if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
      }

      // ---------------------------------------------------------------
      // 1.1 About Bio Language Switcher (Thai | Melayu | English)
      // ---------------------------------------------------------------
      const bioTexts = {
        th: 'เด็กน้อยคนนี้มีความฝันว่าสักวัน เมื่อโตขึ้น เขาอยากเป็นคนที่สามารถช่วยเหลือคนรอบตัวได้ ช่วยเหลือทั้งด้วยกาย ใจ หรือวาจา แต่พอโตขึ้นความฝันสุดแสนจะบริสุทธิ์นี้ ก็ได้มอดดับลงไป. ในวันสุดแสนจะธรรมดา ไฟดวงนี้กลับลุกติดขึ้นมาอีกครั้ง ด้วยเจตนาที่อยากจะส่งต่อและเผยแพร่ความรู้ของตัวเองแม้ตัวเองจะมีความรู้น้อยก็ตาม ดังนั่นเว็บไซต์นี้ จะเป็นหนึ่งในสิ่งที่เด็กน้อยคนนั้นอยากทำมาตลอด หวังว่าทุกท่าน จะได้รับความรู้และประสบการณ์ไม่มากก็น้อยนะครับ🙌🏻',
        ms: 'Budak kecil ini mempunyai satu impian: suatu hari nanti, apabila dewasa, dia ingin menjadi seseorang yang dapat membantu orang di sekelilingnya, sama ada dengan tenaga, hati, mahupun kata-kata. Namun, apabila semakin dewasa, impian yang suci itu perlahan-lahan malap dan padam. Sehinggalah pada suatu hari yang biasa-biasa sahaja, api itu menyala semula, dengan niat untuk menyampaikan dan berkongsi ilmu yang dimilikinya, walaupun ilmunya tidak seberapa. Laman web ini merupakan salah satu perkara yang budak kecil itu sentiasa ingin lakukan. Semoga semua yang berkunjung memperoleh ilmu dan pengalaman, sedikit sebanyak. 🙌🏻',
        en: "This little boy had a dream: that one day, when he grew up, he would become someone who could help the people around him, whether through action, heart, or words. But as he grew older, that pure dream slowly faded away. Then, on an ordinary day, that flame was lit again, with the wish to pass on and share what he knows, even though he doesn’t know much. This website is one of the things that little boy has always wanted to build. I hope everyone takes away some knowledge and experience, big or small. 🙌🏻"
      };

      const aboutBioEl = document.getElementById('aboutBio');
      const bioLangBtns = document.querySelectorAll('.about-chip[data-bio-lang]');

      bioLangBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const lang = btn.getAttribute('data-bio-lang');
          if (!lang || !bioTexts[lang] || !aboutBioEl) return;
          if (btn.classList.contains('active')) return;

          bioLangBtns.forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');

          aboutBioEl.style.opacity = '0';
          setTimeout(() => {
            aboutBioEl.textContent = bioTexts[lang];
            aboutBioEl.style.opacity = '1';
          }, 180);
        });
      });

      // ---------------------------------------------------------------
      // 1.2 About Avatar Full Photo Lightbox Modal
      // ---------------------------------------------------------------
      const aboutAvatarBtn = document.getElementById('aboutAvatarBtn');
      const avatarModal = document.getElementById('avatarModal');
      const avatarModalClose = document.getElementById('avatarModalClose');

      function showAvatarModal() {
        if (!avatarModal) return;
        if (typeof playTabClickSound === 'function') {
          playTabClickSound();
        }
        avatarModal.style.display = 'flex';
        void avatarModal.offsetWidth;
        avatarModal.classList.add('is-active');
        avatarModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (avatarModalClose) avatarModalClose.focus();
      }

      function hideAvatarModal() {
        if (!avatarModal) return;
        avatarModal.classList.remove('is-active');
        avatarModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        setTimeout(() => {
          avatarModal.style.display = 'none';
        }, 240);
        if (aboutAvatarBtn) aboutAvatarBtn.focus();
      }

      if (aboutAvatarBtn) {
        aboutAvatarBtn.addEventListener('click', showAvatarModal);
        aboutAvatarBtn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showAvatarModal();
          }
        });
        if (typeof attachCursorHover === 'function') {
          attachCursorHover(aboutAvatarBtn);
        }
      }

      if (avatarModalClose) {
        avatarModalClose.addEventListener('click', hideAvatarModal);
        if (typeof attachCursorHover === 'function') {
          attachCursorHover(avatarModalClose);
        }
      }

      if (avatarModal) {
        avatarModal.addEventListener('click', (e) => {
          if (e.target === avatarModal) {
            hideAvatarModal();
          }
        });
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && avatarModal && avatarModal.classList.contains('is-active')) {
          hideAvatarModal();
        }
      });

      // ---------------------------------------------------------------
      // 1.3 Anonymous Message Feature ("anonymas to me")
      // ---------------------------------------------------------------
      const anonTriggerBtn = document.getElementById('anonTriggerBtn');
      const anonModal = document.getElementById('anonModal');
      const anonModalClose = document.getElementById('anonModalClose');
      const anonMessageForm = document.getElementById('anonMessageForm');
      const anonMessageText = document.getElementById('anonMessageText');
      const anonCharCount = document.getElementById('anonCharCount');
      const anonSubmitBtn = document.getElementById('anonSubmitBtn');
      const anonSuccessState = document.getElementById('anonSuccessState');
      const anonSuccessCloseBtn = document.getElementById('anonSuccessCloseBtn');

      function showAnonModal() {
        if (!anonModal) return;
        if (typeof playTabClickSound === 'function') {
          playTabClickSound();
        }
        anonModal.style.display = 'flex';
        void anonModal.offsetWidth;
        anonModal.classList.add('is-active');
        anonModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (anonMessageForm) anonMessageForm.style.display = 'flex';
        if (anonSuccessState) anonSuccessState.style.display = 'none';
        if (anonMessageText) {
          anonMessageText.value = '';
          if (anonCharCount) anonCharCount.textContent = '0';
          setTimeout(() => anonMessageText.focus(), 100);
        }
      }

      function hideAnonModal() {
        if (!anonModal) return;
        anonModal.classList.remove('is-active');
        anonModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        setTimeout(() => {
          anonModal.style.display = 'none';
        }, 220);
        if (anonTriggerBtn) anonTriggerBtn.focus();
      }

      if (anonTriggerBtn) {
        anonTriggerBtn.addEventListener('click', showAnonModal);
        attachCursorHover(anonTriggerBtn);
      }

      if (anonModalClose) {
        anonModalClose.addEventListener('click', hideAnonModal);
        attachCursorHover(anonModalClose);
      }

      if (anonSuccessCloseBtn) {
        anonSuccessCloseBtn.addEventListener('click', hideAnonModal);
        attachCursorHover(anonSuccessCloseBtn);
      }

      if (anonModal) {
        anonModal.addEventListener('click', (e) => {
          if (e.target === anonModal) {
            hideAnonModal();
          }
        });
      }

      if (anonMessageText && anonCharCount) {
        anonMessageText.addEventListener('input', () => {
          anonCharCount.textContent = anonMessageText.value.length;
        });
      }

      if (anonMessageForm) {
        anonMessageForm.addEventListener('submit', async (e) => {
          e.preventDefault();

          // 1. Anti-bot honeypot check: If the hidden field has any value, simulate success without sending
          const hpField = document.getElementById('anonHoneypot');
          if (hpField && hpField.value.trim() !== '') {
            console.warn('[Anti-bot] Honeypot triggered, submission ignored silently.');
            if (anonMessageForm) anonMessageForm.style.display = 'none';
            if (anonSuccessState) anonSuccessState.style.display = 'flex';
            return;
          }

          // 2. Anti-spam Rate Limiting: 30-second cooldown per client
          const COOLDOWN_KEY = 'last_anon_msg_timestamp';
          const COOLDOWN_MS = 30000;
          const lastSentTime = parseInt(localStorage.getItem(COOLDOWN_KEY) || '0', 10);
          const now = Date.now();
          if (now - lastSentTime < COOLDOWN_MS) {
            const waitSeconds = Math.ceil((COOLDOWN_MS - (now - lastSentTime)) / 1000);
            alert(`กรุณารออีก ${waitSeconds} วินาทีก่อนส่งข้อความใหม่อีกครั้งครับ (ระบบป้องกันสแปม)`);
            return;
          }

          const text = (anonMessageText ? anonMessageText.value : '').trim();
          if (!text || text.length > 600) {
            alert('กรุณากรอกข้อความความยาว 1-600 ตัวอักษรครับ');
            return;
          }

          const selectedTagEl = anonMessageForm.querySelector('input[name="anonTag"]:checked');
          const tag = selectedTagEl ? selectedTagEl.value : '💭 ทั่วไป';

          if (anonSubmitBtn) {
            anonSubmitBtn.disabled = true;
            anonSubmitBtn.innerHTML = '<span>กำลังส่งข้อความ...</span>';
          }

          const payload = {
            message: text,
            sender_tag: tag,
            created_at: new Date().toISOString(),
            is_read: false
          };

          try {
            const res = await fetch('/api/messages', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
            });

            if (!res.ok) {
              const errData = await res.json().catch(() => ({}));
              console.warn('[Supabase Anon Message]', errData);
              const localList = JSON.parse(localStorage.getItem('local_anon_messages') || '[]');
              localList.unshift(payload);
              localStorage.setItem('local_anon_messages', JSON.stringify(localList));
            }
          } catch (err) {
            console.error('[Anon Message Send Error]', err);
            const localList = JSON.parse(localStorage.getItem('local_anon_messages') || '[]');
            localList.unshift(payload);
            localStorage.setItem('local_anon_messages', JSON.stringify(localList));
          } finally {
            localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
            if (anonSubmitBtn) {
              anonSubmitBtn.disabled = false;
              anonSubmitBtn.innerHTML = `<span>ส่งข้อความแบบไม่ระบุตัวตน</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
            }
            if (anonMessageForm) anonMessageForm.style.display = 'none';
            if (anonSuccessState) anonSuccessState.style.display = 'flex';
          }
        });
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && anonModal && anonModal.classList.contains('is-active')) {
          hideAnonModal();
        }
      });

      // ---------------------------------------------------------------
      // 2. About Section Pills (Clubs | TVM | University)
      //    Hidden by default, toggle on/off, keyboard accessible
      // ---------------------------------------------------------------
      const aboutPills = Array.from(document.querySelectorAll('.about-pill'));
      const aboutPanels = Array.from(document.querySelectorAll('.about-panel'));

      function closeAboutTabs() {
        aboutPills.forEach((p) => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
          p.setAttribute('aria-expanded', 'false');
        });
        aboutPanels.forEach((panel) => {
          panel.hidden = true;
        });
      }

      function openAboutTab(pill) {
        const targetPanelId = pill.getAttribute('aria-controls');
        const targetPanel = document.getElementById(targetPanelId);

        aboutPills.forEach((p) => {
          const isCurrent = (p === pill);
          p.classList.toggle('active', isCurrent);
          p.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
          p.setAttribute('aria-expanded', isCurrent ? 'true' : 'false');
          p.setAttribute('tabindex', isCurrent ? '0' : '-1');
        });

        aboutPanels.forEach((panel) => {
          panel.hidden = (panel !== targetPanel);
        });
      }

      aboutPills.forEach((pill, index) => {
        pill.addEventListener('click', () => {
          const isActive = pill.classList.contains('active');
          if (isActive) {
            closeAboutTabs();
            pill.setAttribute('tabindex', '0');
          } else {
            openAboutTab(pill);
          }
        });

        pill.addEventListener('keydown', (e) => {
          let targetIndex = null;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            targetIndex = (index + 1) % aboutPills.length;
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            targetIndex = (index - 1 + aboutPills.length) % aboutPills.length;
          } else if (e.key === 'Home') {
            e.preventDefault();
            targetIndex = 0;
          } else if (e.key === 'End') {
            e.preventDefault();
            targetIndex = aboutPills.length - 1;
          }

          if (targetIndex !== null) {
            aboutPills[targetIndex].focus();
            aboutPills.forEach((p, i) => {
              p.setAttribute('tabindex', i === targetIndex ? '0' : '-1');
            });
          }
        });
      });

      // ---------------------------------------------------------------
      // 2.5. Skill Badges Interactive Sticker Toggle
      //      Clicking any skill badge toggles its vibrant pastel color
      // ---------------------------------------------------------------
      const skillBadges = document.querySelectorAll('.skill-badge');
      skillBadges.forEach((badge) => {
        badge.setAttribute('role', 'button');
        badge.setAttribute('tabindex', '0');
        badge.setAttribute('aria-pressed', 'false');

        const toggleBadge = () => {
          const isNowActive = badge.classList.toggle('active');
          badge.setAttribute('aria-pressed', isNowActive ? 'true' : 'false');
        };

        badge.addEventListener('click', toggleBadge);
        badge.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleBadge();
            if (typeof playTabClickSound === 'function') {
              playTabClickSound();
            }
          }
        });
      });

      // =====================================================================
      // 4. SUPABASE DATA LOADER FOR SHOWCASE & HOME VIDEO TOPICS
      // =====================================================================
      const projectFilterBar = document.getElementById('projectFilterBar');
      const projectsGrid = document.getElementById('projectsGrid');
      const viewMoreWrap = document.getElementById('viewMoreWrap');
      const viewMoreBtn = document.getElementById('viewMoreBtn');

      let allProjects = [];
      let currentCategory = 'all';
      let visibleLimit = 6;
      const BATCH_SIZE = 6;

      function renderSkeletons() {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';
        for (let i = 0; i < 6; i++) {
          const sk = document.createElement('article');
          sk.className = 'project-card is-skeleton';
          sk.innerHTML = `
            <div style="width: 100%;">
              <div class="skeleton-line short"></div>
              <div class="skeleton-line title"></div>
              <div class="skeleton-line medium"></div>
              <div class="skeleton-line medium" style="width: 80%;"></div>
            </div>
            <div class="project-tools" style="width: 100%; margin-top: 18px;">
              <div class="skeleton-line pill"></div>
              <div class="skeleton-line pill"></div>
            </div>
          `;
          projectsGrid.appendChild(sk);
        }
      }

      function renderError(msg) {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';
        const errBox = document.createElement('div');
        errBox.className = 'fetch-error-container';
        errBox.innerHTML = `
          <div class="fetch-error-title">Unable to Load Projects</div>
          <p class="fetch-error-msg">${msg || 'Please check your connection or Supabase settings.'}</p>
          <button class="retry-btn" id="projectsRetryBtn">Retry Loading</button>
        `;
        projectsGrid.appendChild(errBox);
        const retryBtn = document.getElementById('projectsRetryBtn');
        if (retryBtn) {
          attachCursorHover(retryBtn);
          retryBtn.addEventListener('click', () => loadProjects());
        }
        if (viewMoreWrap) viewMoreWrap.style.display = 'none';
      }

      function buildProjectCard(item) {
        const card = document.createElement('a');
        card.className = 'project-card';
        card.href = `/project?id=${encodeURIComponent(item.id)}`;
        card.setAttribute('data-category', String(item.category || '').toLowerCase());
        card.setAttribute('aria-label', `View details for ${item.title || 'project'}`);

        const innerTop = document.createElement('div');

        const cardTop = document.createElement('div');
        cardTop.className = 'card-top';
        const catBadge = document.createElement('span');
        catBadge.className = 'card-category';
        catBadge.textContent = item.category || 'Project';
        cardTop.appendChild(catBadge);
        innerTop.appendChild(cardTop);

        const safeImg = item.image_url || '';
        if (safeImg) {
          const img = document.createElement('img');
          img.className = 'project-card-img';
          img.src = safeImg;
          img.alt = item.title || 'Project image';
          img.loading = 'lazy';
          img.decoding = 'async';
          innerTop.appendChild(img);
        }

        const titleEl = document.createElement('h3');
        titleEl.className = 'project-title';
        titleEl.textContent = item.title || '';
        innerTop.appendChild(titleEl);

        const descEl = document.createElement('p');
        descEl.className = 'project-desc';
        descEl.textContent = item.description || '';
        innerTop.appendChild(descEl);

        card.appendChild(innerTop);

        const toolsWrap = document.createElement('div');
        toolsWrap.className = 'project-tools';
        if (Array.isArray(item.tags)) {
          item.tags.slice(0, 3).forEach((tag) => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tool-tag';
            tagEl.textContent = String(tag);
            toolsWrap.appendChild(tagEl);
          });
        }
        card.appendChild(toolsWrap);

        attachCursorHover(card);
        return card;
      }

      function updateProjectView(animateAll = false) {
        if (!projectsGrid) return;
        const cards = Array.from(projectsGrid.querySelectorAll('.project-card:not(.is-skeleton)'));

        const matchingCards = cards.filter((card) => {
          const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
          return currentCategory === 'all' || cardCat === currentCategory;
        });

        let visibleIndex = 0;
        cards.forEach((card) => {
          const matchIndex = matchingCards.indexOf(card);
          const isMatching = matchIndex !== -1;
          const withinLimit = isMatching && matchIndex < visibleLimit;

          if (withinLimit) {
            const wasHidden = card.style.display === 'none';
            card.style.display = 'flex';

            if (animateAll || wasHidden) {
              card.classList.remove('pop-in');
              void card.offsetWidth;
              card.classList.add('pop-in');
              card.style.animationDelay = `${visibleIndex * 0.05}s`;
              card.onanimationend = () => {
                card.classList.remove('pop-in');
                card.style.animationDelay = '';
              };
            }
            visibleIndex++;
          } else {
            card.style.display = 'none';
            card.classList.remove('pop-in');
          }
        });

        if (viewMoreWrap) {
          if (visibleLimit < matchingCards.length) {
            viewMoreWrap.style.display = 'flex';
          } else {
            viewMoreWrap.style.display = 'none';
          }
        }
      }

      function renderCategoryButtons(categoriesMap, totalPublished) {
        if (!projectFilterBar) return;
        projectFilterBar.innerHTML = '';

        const allBtn = document.createElement('button');
        allBtn.className = 'filter-btn active';
        allBtn.setAttribute('data-filter', 'all');
        allBtn.textContent = 'All';
        attachCursorHover(allBtn);
        projectFilterBar.appendChild(allBtn);

        const PREFERRED_CAT_ORDER = ['projects', 'robotics', 'academic', 'other'];
        const sortedCats = Array.from(categoriesMap.keys()).sort((a, b) => {
          const idxA = PREFERRED_CAT_ORDER.indexOf(String(a).toLowerCase().trim());
          const idxB = PREFERRED_CAT_ORDER.indexOf(String(b).toLowerCase().trim());
          const posA = idxA === -1 ? 999 : idxA;
          const posB = idxB === -1 ? 999 : idxB;
          return posA - posB;
        });

        sortedCats.forEach((cat) => {
          const btn = document.createElement('button');
          btn.className = 'filter-btn';
          btn.setAttribute('data-filter', cat.toLowerCase());
          btn.textContent = cat;
          attachCursorHover(btn);
          projectFilterBar.appendChild(btn);
        });

        const filterBtns = projectFilterBar.querySelectorAll('.filter-btn');
        filterBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            currentCategory = (btn.getAttribute('data-filter') || 'all').toLowerCase();
            visibleLimit = BATCH_SIZE;
            updateProjectView(true);
          });
        });
      }

      function populateProjectsUI(projectsList) {
        // Build dynamic categories list preserving order of first appearance
        const categoriesMap = new Map();
        projectsList.forEach((p) => {
          const cat = String(p.category || '').trim();
          if (cat) {
            categoriesMap.set(cat, (categoriesMap.get(cat) || 0) + 1);
          }
        });

        renderCategoryButtons(categoriesMap, projectsList.length);

        // Populate projects grid
        projectsGrid.innerHTML = '';
        projectsList.forEach((item) => {
          const cardEl = buildProjectCard(item);
          projectsGrid.appendChild(cardEl);
        });

        visibleLimit = BATCH_SIZE;
        updateProjectView(true);
      }

      async function loadProjects() {
        try {
          const cached = localStorage.getItem('local_cache_projects');
          if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              allProjects = parsed;
              populateProjectsUI(parsed);
            }
          } else {
            renderSkeletons();
          }
        } catch(e) {
          renderSkeletons();
        }

        try {
          const res = await fetch('/api/projects');
          if (!res.ok) throw new Error('HTTP error ' + res.status);
          const json = await res.json();
          const rawList = Array.isArray(json.data) ? json.data : [];
          const validProjects = [];

          rawList.forEach((item) => {
            if (!item || typeof item !== 'object') return;
            if (!item.id || typeof item.id !== 'string') return;
            if (!item.title || !item.category) return;
            if (item.published === false) return;
            validProjects.push(item);
          });

          validProjects.sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
          allProjects = validProjects;
          try {
            localStorage.setItem('local_cache_projects', JSON.stringify(validProjects));
          } catch(e) {}

          populateProjectsUI(validProjects);

        } catch (err) {
          console.error('[API] Error loading projects:', err);
          if (allProjects.length === 0) {
            renderError(err.message);
          }
        }
      }

      // View More click handler
      if (viewMoreBtn) {
        attachCursorHover(viewMoreBtn);
        viewMoreBtn.addEventListener('click', () => {
          visibleLimit += BATCH_SIZE;
          updateProjectView(false);
        });
      }

      // Initial load
      loadProjects();

      // Channel Topic Pills Cursor Hover (Static Showcase Tags)
      document.querySelectorAll('.channel-pill-btn').forEach((pill) => {
        attachCursorHover(pill);
      });

      // ---------------------------------------------------------------
      // 4. Scroll Reveal for Sections (Fade & Slide in)
      // ---------------------------------------------------------------
      const reveals = document.querySelectorAll('.reveal');
      if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach((el) => revealObserver.observe(el));
      } else {
        // Fallback for older browsers
        reveals.forEach((el) => el.classList.add('is-visible'));
      }

      // ---------------------------------------------------------------
      // 5. ScrollSpy: Highlight Active Nav Link While Scrolling
      // ---------------------------------------------------------------
      const spySections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');

      function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 220;
        let currentSectionId = '';

        // If at the very bottom of the page, activate the last section
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60) {
          currentSectionId = 'video';
        } else {
          spySections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              currentSectionId = section.getAttribute('id');
            }
          });
        }

        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (currentSectionId && href === `#${currentSectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }

      window.addEventListener('scroll', updateActiveNavLink, { passive: true });
      window.addEventListener('resize', updateActiveNavLink, { passive: true });
      updateActiveNavLink();

      // ---------------------------------------------------------------
      // 6. Smooth Scroll for Navigation Links
      // ---------------------------------------------------------------
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');
          if (!targetId || targetId === '#') return;
          if (targetId === '#hero') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            const navOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = Math.max(0, elementPosition - navOffset);
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      });

      // ---------------------------------------------------------------
      // 7. Navbar Scroll Collapse to "TAB" & Expand on Click
      // ---------------------------------------------------------------
      const navbar = document.getElementById('navbar');
      const navTabBtn = document.getElementById('navTabBtn');
      const navCloseBtn = document.getElementById('navCloseBtn');
      const navLinksList = document.querySelectorAll('.nav-link');
      let isManuallyExpanded = false;

      function updateNavbarOnScroll() {
        const scrollY = window.scrollY;

        // When scrolled to the very top (<= 70px): automatically full again
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
      navbar.addEventListener('click', (e) => {
        if (e.target.closest('.nav-content')) return;

        if (navbar.classList.contains('collapsed') && !navbar.classList.contains('expanded')) {
          openNavWithBurst();
        }
      });

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

      // Brand link: smooth scroll to top and collapse if scrolled
      const navBrand = document.querySelector('.nav-brand');
      if (navBrand) {
        navBrand.addEventListener('click', (e) => {
          e.stopPropagation();
          if (window.scrollY > 70) {
            isManuallyExpanded = false;
            navbar.classList.remove('expanded');
            navbar.classList.add('collapsed');
          }
        });
      }

      // Clicking any nav link collapses it back smoothly without jumping
      navLinksList.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent click from bubbling to navbar!
          if (window.scrollY > 70) {
            isManuallyExpanded = false;
            navbar.classList.remove('expanded');
            navbar.classList.add('collapsed');
          }
        });
      });

      // Clicking outside the navbar collapses it back to TAB if scrolled down
      document.addEventListener('click', (e) => {
        if (window.scrollY > 70 && isManuallyExpanded) {
          if (!navbar.contains(e.target)) {
            isManuallyExpanded = false;
            navbar.classList.remove('expanded');
            navbar.classList.add('collapsed');
          }
        }
      });

      // Keyboard Shortcut: Pressing physical 'Tab' key triggers the TAB button like it was clicked!
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          if (e.repeat) return;

          // If collapsed & closed: play tactile punch & shockwave then expand
          if (navbar.classList.contains('collapsed') && !navbar.classList.contains('expanded')) {
            openNavWithBurst();
          }
          // If expanded: collapse back to TAB button
          else if (navbar.classList.contains('expanded')) {
            isManuallyExpanded = false;
            navbar.classList.remove('expanded');
            navbar.classList.add('collapsed');
          }
          // If at top of page (full navbar): collapse into TAB button with tactile punch
          else {
            isManuallyExpanded = false;
            navbar.classList.add('collapsed');
            navbar.classList.remove('expanded');
            navTabBtn.classList.add('burst-active');
            setTimeout(() => {
              navTabBtn.classList.remove('burst-active');
            }, 280);
          }
        } else if (e.key === 'Escape' && navbar.classList.contains('expanded')) {
          isManuallyExpanded = false;
          navbar.classList.remove('expanded');
          if (window.scrollY > 70) {
            navbar.classList.add('collapsed');
          }
        }
      });

      // ---------------------------------------------------------------
      // 8. Draggable Hero Cat with Spring-Back to Origin
      // ---------------------------------------------------------------
      const catWrap = document.querySelector('.hero-cat-wrap') || document.querySelector('.hero-cat-img');
      if (catWrap) {
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let currentTranslateX = 0;
        let currentTranslateY = 0;
        let lastX = 0;
        let lastY = 0;
        let lastMoveTime = 0;
        let returnTimeout = null;
        let dragDistSinceMeow = 0;

        catWrap.ondragstart = (e) => {
          e.preventDefault();
          return false;
        };

        function onPointerDown(e) {
          if (e.button !== undefined && e.button !== 0) return;
          e.preventDefault();

          if (returnTimeout) {
            clearTimeout(returnTimeout);
            returnTimeout = null;
          }

          isDragging = true;
          catWrap.classList.remove('is-returning');
          catWrap.classList.add('is-dragging');

          // Play cute meow on grab
          playCatMeow(1.0);
          dragDistSinceMeow = 0;

          const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
          const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);

          startX = clientX - currentTranslateX;
          startY = clientY - currentTranslateY;
          lastX = clientX;
          lastY = clientY;
          lastMoveTime = performance.now();

          // Initial fast drag spin
          catWrap.style.setProperty('--cat-spin-duration', '0.45s');

          if (e.pointerId && catWrap.setPointerCapture) {
            try { catWrap.setPointerCapture(e.pointerId); } catch (_) { }
          }

          window.addEventListener('pointermove', onPointerMove, { passive: false });
          window.addEventListener('mousemove', onPointerMove, { passive: false });
          window.addEventListener('touchmove', onPointerMove, { passive: false });

          window.addEventListener('pointerup', onPointerUp);
          window.addEventListener('mouseup', onPointerUp);
          window.addEventListener('touchend', onPointerUp);
          window.addEventListener('pointercancel', onPointerUp);
        }

        function onPointerMove(e) {
          if (!isDragging) return;
          e.preventDefault();

          const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
          const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
          if (clientX === undefined || clientY === undefined) return;

          currentTranslateX = clientX - startX;
          currentTranslateY = clientY - startY;

          // Calculate movement velocity to spin even faster when dragged quickly
          const now = performance.now();
          const dt = Math.max(16, now - lastMoveTime);
          const dist = Math.hypot(clientX - lastX, clientY - lastY);
          const speed = dist / dt; // pixels per ms

          // Play cat sound while dragging around:
          // If shaking/flicking rapidly back & forth, trigger funny cat screams rapidly!
          dragDistSinceMeow += dist;
          const isShakingFast = (speed > 0.85 || dist > 26);

          if (isShakingFast) {
            // Rapid funny cat screech with short cooldown (~170ms)
            if (dragDistSinceMeow > 50 && (now - lastMeowTime > 170)) {
              playCatScream();
              dragDistSinceMeow = 0;
            }
          } else {
            // Gentle playful meow when dragged smoothly
            if (dragDistSinceMeow > 280 && (now - lastMeowTime > 600)) {
              playCatMeow(1.15);
              dragDistSinceMeow = 0;
            }
          }

          lastX = clientX;
          lastY = clientY;
          lastMoveTime = now;

          // When moving faster, rotation speed increases (duration drops down to 0.15s)
          const dynamicDuration = Math.max(0.14, Math.min(0.45, 0.45 - speed * 0.18));
          catWrap.style.setProperty('--cat-spin-duration', `${dynamicDuration.toFixed(3)}s`);

          catWrap.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(1.15)`;
        }

        function onPointerUp(e) {
          if (!isDragging) return;
          isDragging = false;

          if (e && e.pointerId && catWrap.releasePointerCapture) {
            try { catWrap.releasePointerCapture(e.pointerId); } catch (_) { }
          }

          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('mousemove', onPointerMove);
          window.removeEventListener('touchmove', onPointerMove);

          window.removeEventListener('pointerup', onPointerUp);
          window.removeEventListener('mouseup', onPointerUp);
          window.removeEventListener('touchend', onPointerUp);
          window.removeEventListener('pointercancel', onPointerUp);

          // If was dragged significantly, play a soft landing meow
          if (Math.hypot(currentTranslateX, currentTranslateY) > 60) {
            playCatMeow(0.92);
          }

          catWrap.classList.remove('is-dragging');
          catWrap.classList.add('is-returning');

          // Spring back to origin
          catWrap.style.transform = 'translate(0px, 0px) scale(1)';

          currentTranslateX = 0;
          currentTranslateY = 0;

          const cleanupReturn = () => {
            catWrap.classList.remove('is-returning');
            catWrap.style.transform = '';
            catWrap.style.removeProperty('--cat-spin-duration');
            catWrap.removeEventListener('transitionend', cleanupReturn);
          };

          catWrap.addEventListener('transitionend', cleanupReturn);
          returnTimeout = setTimeout(cleanupReturn, 700);
        }

        catWrap.addEventListener('pointerdown', onPointerDown);
        catWrap.addEventListener('mousedown', onPointerDown);
        catWrap.addEventListener('touchstart', onPointerDown, { passive: false });
      }

      // Multi-step Easter egg sequence on hero pill click
      const easterEggMessages = [
        "just kiding this's real website",
        "Bro, why are you pressing it again?",
        "Bro, that's enough already.",
        "You're never gonna quit, are you?",
        "I told you to stop.",
        "I said ENOUGH!!!",
        "Ughhhh.",
        "Damn it.",
        "You pest.",
        "Holy shit!!!"
      ];

      const heroPill = document.querySelector('.hero-pill-badge');
      const eggBtn = document.getElementById('heroEasterEgg');
      const easterModal = document.getElementById('easterModal');
      const easterModalClose = document.getElementById('easterModalClose');
      const easterModalOkBtn = document.getElementById('easterModalOkBtn');
      let easterStep = -1;
      let isEasterCompleted = false;

      function showEasterModal() {
        if (!easterModal) return;
        playExplosionSound();
        easterModal.style.display = 'flex';
        void easterModal.offsetWidth; // trigger reflow
        easterModal.classList.add('is-active');

        // เมื่อ // SYSTEM ALERT ปรากฏ: แก้ไข PROTFOLIDA -> PORTFOLIO และลบรอยหยักแดงออก
        const heroTitle = document.getElementById('heroTitle') || document.querySelector('.hero-title');
        if (heroTitle) {
          heroTitle.textContent = 'PORTFOLIO';
          heroTitle.classList.add('is-corrected');
        }

        // ปิดฟีเจอร์กดคลิกไม่ให้กดได้อีก และเปลี่ยนข้อความด้านล่างเป็น "welcome to portfolio website"
        isEasterCompleted = true;
        if (eggBtn) {
          eggBtn.textContent = 'welcome to portfolio website';
          eggBtn.classList.remove('egg-bounce', 'is-revealed');
        }
        if (heroPill) {
          heroPill.classList.add('is-disabled');
          heroPill.classList.remove('pill-clicked');
        }
        document.body.classList.remove('cursor-hover');
      }

      function hideEasterModal() {
        if (!easterModal) return;
        easterModal.classList.remove('is-active');
        setTimeout(() => {
          easterModal.style.display = 'none';
        }, 220);
      }

      if (easterModalClose) {
        easterModalClose.addEventListener('click', hideEasterModal);
      }
      if (easterModalOkBtn) {
        easterModalOkBtn.addEventListener('click', hideEasterModal);
      }
      if (easterModal) {
        easterModal.addEventListener('click', (e) => {
          if (e.target === easterModal) {
            hideEasterModal();
          }
        });
      }
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && easterModal && easterModal.style.display !== 'none') {
          hideEasterModal();
        }
      });

      function triggerEasterEgg() {
        // หากเคยแจ้งเตือน SYSTEM ALERT แล้ว จะไม่สามารถคลิกได้อีก
        if (isEasterCompleted) return;

        // 1. Pill spring animation
        if (heroPill) {
          heroPill.classList.remove('pill-clicked');
          void heroPill.offsetWidth; // trigger reflow
          heroPill.classList.add('pill-clicked');
          setTimeout(() => {
            heroPill.classList.remove('pill-clicked');
          }, 450);
        }

        // 2. Advance step
        easterStep++;

        if (easterStep < easterEggMessages.length) {
          const currentText = easterEggMessages[easterStep];
          if (eggBtn) {
            eggBtn.classList.remove('egg-bounce');
            void eggBtn.offsetWidth;
            eggBtn.classList.add('egg-bounce');
            eggBtn.textContent = currentText;
            eggBtn.classList.add('is-revealed');
          }

          // If reached final message ("Holy shit!!!"), show popup with explosion!
          if (easterStep === easterEggMessages.length - 1) {
            setTimeout(showEasterModal, 300);
          } else {
            playWwwSound(false, easterStep);
          }
        } else {
          showEasterModal();
        }
      }

      if (heroPill) {
        heroPill.addEventListener('click', triggerEasterEgg);
      }
      if (eggBtn) {
        eggBtn.addEventListener('click', triggerEasterEgg);
      }

    })();

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHome);
  } else {
    initHome();
  }
  window.initHome = initHome;
})();