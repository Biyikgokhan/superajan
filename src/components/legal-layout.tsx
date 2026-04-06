"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 pt-32 pb-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">
            {subtitle}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-accent md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            Son güncelleme: {lastUpdated}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="legal-content mt-12 border-t border-border pt-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
