import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "USCIS Naturalization Test Practice",
  description: "Official 2008 Civics Test, Reading, and Writing practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="app-header">
          <h1>USCIS Naturalization Test</h1>
        </header>
        <main className="app-main">{children}</main>
      </body>
    </html>
  );
}
