import type { Metadata, Viewport } from 'next';
import React from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://rifhan.pongity.com'),
  title: 'Portfolio | Home',
  description:
    'Personal portfolio of a computer science student and robotics enthusiast. Clean, playful monochrome sketchbook design.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/image/cat-cropped.png', type: 'image/png' },
    ],
    shortcut: '/image/cat-cropped.png',
    apple: '/image/cat-cropped.png',
  },
  openGraph: {
    type: 'website',
    title: 'riifhan is so handsome nah',
    description:
      'Personal portfolio of a computer science student and robotics enthusiast. Clean, playful monochrome sketchbook design.',
    images: [{ url: '/image/cat-cropped.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'riifhan is so handsome nah',
    description:
      'Personal portfolio of a computer science student and robotics enthusiast. Clean, playful monochrome sketchbook design.',
    images: ['/image/cat-cropped.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@700;800;900&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
