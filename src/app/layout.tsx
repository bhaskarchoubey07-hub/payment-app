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

        <style jsx global>{`
          .app-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            position: relative;
          }
          
          .main-content {
            flex: 1;
            padding-bottom: 80px; /* Space for mobile nav */
          }
          
          .mobile-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 70px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 10px;
            z-index: 1000;
            border-top: 1px solid var(--glass-border);
            border-radius: 24px 24px 0 0;
          }
          
          .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            color: var(--text-secondary);
            cursor: pointer;
            transition: var(--transition);
          }
          
          .nav-item.active {
            color: var(--primary);
          }
          
          .nav-icon {
            font-size: 1.25rem;
          }
          
          .nav-label {
            font-size: 0.7rem;
            font-weight: 500;
          }
          
          .qr-button {
            position: relative;
            bottom: 20px;
          }
          
          .qr-inner {
            background: var(--primary);
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px var(--primary-glow);
            color: white;
            font-size: 1.5rem;
            transition: var(--transition);
          }
          
          .qr-inner:hover {
            transform: scale(1.1);
          }

          @media (min-width: 768px) {
             /* Add desktop sidebar styles if needed later */
          }
        `}</style>
      </body>
    </html>
  );
}
