'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

function NavigationContent() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-navy text-cream p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-cream-dark transition-colors">
          The Hardway
        </Link>
        <div className="flex gap-6">
          <Link 
            href="/" 
            className={`hover:text-cream-dark transition-colors ${isActive('/') ? 'font-bold' : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/blog" 
            className={`hover:text-cream-dark transition-colors ${isActive('/blog') || pathname.startsWith('/blog/') ? 'font-bold' : ''}`}
          >
            Blog
          </Link>
          <Link 
            href="/fleet" 
            className={`hover:text-cream-dark transition-colors ${isActive('/fleet') || pathname.startsWith('/fleet/') ? 'font-bold' : ''}`}
          >
            Fleet
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function Navigation() {
  return (
    <Suspense fallback={<nav className="bg-navy text-cream p-4"><div className="max-w-7xl mx-auto">Loading...</div></nav>}>
      <NavigationContent />
    </Suspense>
  );
}
