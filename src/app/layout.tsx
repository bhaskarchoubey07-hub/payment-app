import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinOS | The Universal Financial Operating System",
  description: "Unified payments, AI financial intelligence, and global crypto rails for India.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <main className="main-content">
            {children}
          </main>
          
          {/* Mobile Bottom Navigation */}
          <nav className="mobile-nav glass">
            <Link href="/" className="nav-item">
              <span className="nav-icon">🏠</span>
              <span className="nav-label">Home</span>
            </Link>
            <Link href="/insights" className="nav-item">
              <span className="nav-icon">📊</span>
              <span className="nav-label">Insights</span>
            </Link>
            <Link href="/scan" className="nav-item qr-button">
              <div className="qr-inner">
                <span className="nav-icon">🔳</span>
              </div>
            </Link>
            <Link href="/lending" className="nav-item">
              <span className="nav-icon">💳</span>
              <span className="nav-label">Credit</span>
            </Link>
            <Link href="/admin" className="nav-item">
              <span className="nav-icon">👤</span>
              <span className="nav-label">Admin</span>
            </Link>
          </nav>
        </div>
      </body>
    </html>
  );
}
