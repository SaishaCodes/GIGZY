import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gigzy - Hyperlocal Micro-Task Ecosystem',
  description: 'Student-powered micro-task marketplace. Post tasks, earn money, build community.',
  keywords: ['gig economy', 'student jobs', 'micro-tasks', 'local services', 'errands'],
  authors: [{ name: 'Gigzy Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#0a0f14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#151c24',
              color: '#f0f0f0',
              border: '1px solid #2f3b4a',
            },
            success: {
              style: {
                background: '#0f1419',
                border: '1px solid #00d4a8',
              },
            },
            error: {
              style: {
                background: '#0f1419',
                border: '1px solid #ef4444',
              },
            },
          }}
        />
      </body>
    </html>
  );
}