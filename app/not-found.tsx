'use client';

import React from 'react';
import '@/app/styles/not-found.css';
import { notFoundHtml } from '@/lib/html/notFoundHtml';

export default function NotFound() {
  return <div dangerouslySetInnerHTML={{ __html: notFoundHtml }} />;
}
