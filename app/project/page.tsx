'use client';

import React, { Suspense, useEffect } from 'react';
import Script from 'next/script';
import '@/app/styles/project.css';
import { projectHtml } from '@/lib/html/projectHtml';

function ProjectContent() {
  useEffect(() => {
    // If project.js defined an init function or dispatch event
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: projectHtml }} />
      <Script
        src="/js/project.js"
        strategy="afterInteractive"
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

