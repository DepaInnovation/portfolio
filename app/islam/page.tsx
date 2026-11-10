'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import '@/app/styles/islam.css';
import { islamHtml } from '@/lib/html/islamHtml';

export default function IslamPage() {
  useEffect(() => {
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: islamHtml }} />
      <Script
        src="/js/islam.js?v=20261110_5"
        strategy="afterInteractive"
      />
    </>
  );
}

