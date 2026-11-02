'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import '@/app/styles/video.css';
import { videoHtml } from '@/lib/html/videoHtml';

export default function VideoPage() {
  useEffect(() => {
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: videoHtml }} />
      <Script
        src="/js/video.js"
        strategy="afterInteractive"
      />
    </>
  );
}
