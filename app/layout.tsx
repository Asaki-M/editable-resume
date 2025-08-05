import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '~/styles/globals.css';
import { Toaster } from '~/components/ui/sonner';
import { ThemeProvider } from '~/components/provider/themeProvider';
import { SWRProvider } from '~/components/provider/swrProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const THEME_COLORS = [
  { media: '(prefers-color-scheme: light)', color: 'white' },
  { media: '(prefers-color-scheme: dark)', color: '#141414' },
];

export const metadata: Metadata = {
  title: {
    default: '简历编辑器',
    template: '%s | 简历编辑器',
  },
  description: '在线简历编辑器，轻松制作专业简历',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: THEME_COLORS,
};

export function generateViewport() {
  return {
    themeColor: THEME_COLORS,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                (function() {
                  var savedTheme = localStorage.getItem('theme')
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                  var theme = savedTheme || 'system'
                  var resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme
                  document.documentElement.classList.add(resolved)
                  document.documentElement.style.colorScheme = resolved
                })()
              } catch(e) { console.error(e) }
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <SWRProvider>
            {children}
            <Toaster />
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
