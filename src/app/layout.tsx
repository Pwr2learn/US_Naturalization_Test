import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civics Companion | USCIS Naturalization Study App",
  description:
    "A calm, practical study app for the civics test, English practice, and N-400 interview preparation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="site-shell">
          <header className="app-header">
            <div className="app-header__inner">
              <Link href="/" className="brand-mark">
                <span className="brand-mark__eyebrow">Study with confidence</span>
                <span className="brand-mark__name">Civics Companion</span>
              </Link>

              <nav className="app-nav" aria-label="Primary">
                <Link href="/">Home</Link>
                <Link href="/civics-test">Civics test</Link>
                <Link href="/reading-writing">Reading & writing</Link>
                <Link href="/interview">Interview</Link>
              </nav>
            </div>
          </header>

          <main className="app-main">{children}</main>

          <footer className="app-footer">
            <div className="app-footer__inner">
              <p>Civics Companion is built to make studying feel calmer, clearer, and easier to stick with.</p>
              <p className="app-footer__note">
                Practice content is based on the 2008 USCIS naturalization test structure.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
