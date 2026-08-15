import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { AccessibilityControls } from "@/components/AccessibilityControls";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Citizenship Practice | USCIS Study App",
  description:
    "Simple USCIS practice for civics, reading, writing, and interview questions.",
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
                <span className="brand-mark__eyebrow">Simple study app</span>
                <span className="brand-mark__name">Citizenship Practice</span>
              </Link>

              <nav className="app-nav" aria-label="Primary">
                <Link href="/">Home</Link>
                <Link href="/civics-test">Civics</Link>
                <Link href="/reading-writing">Read & write</Link>
                <Link href="/interview">Interview</Link>
              </nav>
            </div>
          </header>

          <div className="app-toolbar">
            <AccessibilityControls />
          </div>

          <main className="app-main">{children}</main>

          <footer className="app-footer">
            <div className="app-footer__inner">
              <p>Simple practice for the USCIS test.</p>
              <p className="app-footer__note">Civics content follows the 2025 USCIS naturalization civics test.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
