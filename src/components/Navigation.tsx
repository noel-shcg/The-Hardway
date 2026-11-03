'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

function NavigationContent() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/login', { method: 'GET' });
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/login', { method: 'DELETE' });
    setIsLoggedIn(false);
    router.push('/');
    router.refresh();
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-navy text-cream p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-cream-dark transition-colors">
          The Hardway
        </Link>
        <button
          type="button"
          className="md:hidden text-cream text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
        <div className={`${menuOpen ? 'flex' : 'hidden'} absolute top-16 left-0 right-0 bg-navy p-4 flex-col gap-4 md:static md:flex md:flex-row md:p-0 items-center z-20`}>
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
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-cream-dark hover:text-cream transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link 
              href="/login"
              className="bg-cream text-navy px-4 py-2 rounded-lg hover:bg-cream-dark transition-colors"
            >
              Login
            </Link>
          )}
          <ThemeToggle />
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
