"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/#ozellikler", label: "Özellikler", hash: true },
  { href: "/iletisim", label: "İletişim", hash: false },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-accent transition-opacity hover:opacity-70"
        >
          superajan
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.hash ? (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="https://app.superajan.com/login"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            Giriş
          </Link>
          <Link
            href="https://app.superajan.com/login"
            className="rounded-full border border-accent px-5 py-2 text-sm text-accent transition-all hover:bg-accent hover:text-background"
          >
            Başlayın
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-accent"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-6 bg-accent"
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-accent"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) =>
                link.hash ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                href="https://app.superajan.com/login"
                onClick={() => setMenuOpen(false)}
                className="text-lg text-muted transition-colors hover:text-accent"
              >
                Giriş
              </Link>
              <Link
                href="https://app.superajan.com/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-block rounded-full border border-accent px-5 py-2 text-center text-accent transition-all hover:bg-accent hover:text-background"
              >
                Başlayın
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
