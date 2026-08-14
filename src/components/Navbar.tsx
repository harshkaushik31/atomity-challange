// src/components/Navbar.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { GithubIcon } from "@/icons/IconPack";

const NAV_LINKS = ["Overview", "Multi-Cloud", "Optimization", "Calculator", "Enterprise"];



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