'use client';

import React, { Suspense, useEffect } from 'react';
import Script from 'next/script';
import '@/app/styles/project.css';
import { projectHtml } from '@/lib/html/projectHtml';

function ProjectContent() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as any).initProject === 'function') {
      (window as any).initProject();
    }
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: projectHtml }} />
      <Script
        src="/js/project.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && typeof (window as any).initProject === 'function') {
            (window as any).initProject();
          }
        }}
      />
    </>
  );
}

export default function ProjectPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading project...</div>}>
      <ProjectContent />
    </Suspense>
  );
}

