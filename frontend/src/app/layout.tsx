import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'College Discovery Platform',
  description: 'Find and compare top colleges easily.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <nav className="bg-blue-600 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 font-bold text-2xl tracking-tight">
                <Link href="/">UniFinder</Link>
              </div>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
                <Link href="/colleges" className="hover:text-blue-200 transition-colors">Colleges</Link>
                <Link href="/compare" className="hover:text-blue-200 transition-colors">Compare</Link>
                <Link href="/predictor" className="hover:text-blue-200 transition-colors">Predictor</Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} UniFinder. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
