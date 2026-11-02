'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import '@/app/styles/home.css';
import { homeHtml } from '@/lib/html/homeHtml';

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as any).initHome === 'function') {
      (window as any).initHome();
    }
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: homeHtml }} />
      <Script
        src="/js/home.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && typeof (window as any).initHome === 'function') {
            (window as any).initHome();
          }
        }}
      />
    </>
  );
}

