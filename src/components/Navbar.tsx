// src/components/Navbar.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = ["Overview", "Multi-Cloud", "Optimization", "Calculator", "Enterprise"];

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-1.03-.01-1.87-2.78.61-3.37-1.21-3.37-1.21-.45-1.17-1.11-1.48-1.11-1.48-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{
        backgroundColor: "var(--color-bg-primary)",
        borderColor: "var(--color-border-primary)",
      }}
    >
      <nav
        aria-label="Main navigation"
        className="@container mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
      >
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo.svg" alt="" width={28} height={28} priority />
          <span className="text-xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
            kubecost
          </span>
        </a>

        <ul className="hidden items-center gap-8 @4xl:flex">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium transition-colors hover:text-[var(--color-accent-primary)]"
                style={{ color: "var(--color-text-muted)" }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 @4xl:flex">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-[var(--radius-full)] border px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-bg-hexagon-muted)]"
            style={{ borderColor: "var(--color-border-primary)", color: "var(--color-text-primary)" }}
          >
            <GithubIcon />
            Star on GitHub
          </a>

          <motion.a
            href="#get-started"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="rounded-[var(--radius-full)] px-5 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--color-accent-primary)" }}
          >
            Get Started Free
          </motion.a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          className="flex items-center justify-center rounded-md p-2 @4xl:hidden"
          style={{ color: "var(--color-text-primary)" }}
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="border-t px-6 py-4 @4xl:hidden"
          style={{ borderColor: "var(--color-border-primary)" }}
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                <GithubIcon />
                Star on GitHub
              </a>
            </li>
            <li>
              <a
                href="#get-started"
                className="inline-block rounded-[var(--radius-full)] px-5 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: "var(--color-accent-primary)" }}
              >
                Get Started Free
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}