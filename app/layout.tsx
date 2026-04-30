import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Demo",
  description: "A small Next.js demo app for integration testing"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="shell">
          <nav className="nav" aria-label="Primary navigation">
            <Link className="brand" href="/">
              Next.js Demo
            </Link>
            <div className="links">
              <Link href="/about">About</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/items/alpha">Item</Link>
            </div>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
