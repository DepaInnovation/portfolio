export const notFoundHtml = `
  <div class="error-card">
    <div class="badge-error">
      <span class="badge-dot"></span>
      <span>ERROR // 404_PAGE_NOT_FOUND</span>
    </div>

    <img src="/image/cat-cropped.png" alt="Lost Cat" class="error-img" onerror="this.style.display='none'">

    <div class="error-code">404</div>
    <h1 class="error-title">ดูเหมือนว่าหน้านี้จะไม่มีอยู่จริง</h1>
    <p class="error-desc">
      หน้าที่คุณกำลังตามหาอาจถูกย้าย ลบออกไปแล้ว หรือพิมพ์ URL ไม่ถูกต้องครับ
    </p>

    <a href="/" class="btn-home">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
      <span>กลับสู่หน้าแรก (Home)</span>
    </a>

    <div class="footer-note">PORTFOLIO // RIFHAN</div>
  </div>
`;
