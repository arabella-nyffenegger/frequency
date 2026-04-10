'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { TypeAnimation } from './TypeAnimationWrapper';

export default function OnboardingScreen() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleReducedMotionChange = (event: MediaQueryListEvent) => setIsReducedMotion(event.matches);
    mediaQuery.addEventListener('change', handleReducedMotionChange);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{
        width: '100%',
        maxWidth: '100vw',
        margin: 0,
        padding: 0,
        left: 0,
        right: 0,
        overflowX: isMobile ? 'auto' : 'hidden',
        overflowY: 'auto',
      }}
    >
      <div
        className="fixed inset-0 z-0 bg-white"
        style={{
          backgroundImage: "url('/landing-background.png')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: isMobile ? 'cover' : 'min(100vw, 1024px) auto',
        }}
      />

      <div className="pointer-events-none fixed top-4 left-0 right-0 z-20 flex justify-center">
        <div className="text-sm font-normal tracking-[0.35em] text-[#1d1033] uppercase">Frequency</div>
      </div>

      <button
        className="fixed top-4 left-4 z-30 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md bg-white/20 text-white backdrop-blur-sm sm:top-6 sm:left-6"
        onClick={() => setIsMenuVisible((v) => !v)}
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div
        className={`fixed top-16 sm:top-20 left-0 z-20 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg transition-all duration-300 ease-in-out sm:h-[calc(100vh-5rem)] ${
          isMenuVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 pt-4 sm:px-6 sm:pt-8">
          <nav className="flex flex-col space-y-4 sm:space-y-6">
            <Link
              href="/"
              className="flex min-h-[44px] items-center py-2 text-sm text-gray-900 transition-colors hover:text-gray-600 sm:text-base"
              onClick={() => setIsMenuVisible(false)}
            >
              Home
            </Link>
            <a
              href="mailto:a@learningfrequency.com"
              className="flex min-h-[44px] items-center py-2 text-sm text-gray-900 transition-colors hover:text-gray-600 sm:text-base"
              onClick={() => setIsMenuVisible(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>

      <div className="absolute top-0 right-0 z-20 flex items-center gap-2 p-2 sm:gap-4 sm:p-4 md:p-8">
        <button
          className="min-h-[44px] min-w-[44px] p-2 text-white transition-colors hover:text-gray-100"
          aria-label="Search"
        >
          <Search className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      <div className="fixed inset-0 z-20 flex flex-col items-center justify-center">
        <div className="pointer-events-auto flex flex-col items-center justify-center">
          <h1 className="mb-4 text-center text-3xl leading-tight font-semibold text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-2xl md:text-3xl lg:text-4xl">
            {isReducedMotion ? (
              'The Customer Activation API'
            ) : (
              <TypeAnimation
                sequence={['The Customer Activation API', 2000]}
                wrapper="span"
                speed={50}
                style={{ display: 'inline-block' }}
                repeat={0}
                cursor
              />
            )}
          </h1>
          <a
            href="mailto:a@learningfrequency.com"
            className="flex min-h-[44px] items-center justify-center rounded-lg bg-white/15 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:px-4 sm:text-sm"
          >
            Learn more
          </a>
        </div>
      </div>

    </div>
  );
}
