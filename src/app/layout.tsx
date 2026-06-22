import "./globals.css";

/**
 * Root layout — Passe les enfants directement.
 * La structure HTML (html/body) est fournie par [locale]/layout.tsx
 * ou par studio/layout.tsx selon la route.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
