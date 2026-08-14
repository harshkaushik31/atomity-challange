// src/components/Footer.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePreferReducedMotion";
import { GithubIcon, TwitterIcon, LinkedInIcon } from "@/icons/IconPack";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

const PRODUCT_LINKS: FooterLink[] = [
  {
    label: "Cost Allocation",
    href: "#cost-allocation",
  },
  {
    label: "Optimization Engine",
    href: "#calculator",
  },
  {
    label: "Governance & Alerts",
    href: "#governance",
  },
  {
    label: "Open Source Helm Chart",
    href: "#helm-chart",
  },
];

const RESOURCE_LINKS: FooterLink[] = [
  {
    label: "Documentation",
    href: "#documentation",
  },
  {
    label: "Kubernetes Cost Guide",
    href: "#cost-guide",
  },
  {
    label: "API Reference",
    href: "#api-reference",
  },
  {
    label: "Slack Community",
    href: "#community",
  },
];

const COMPANY_LINKS: FooterLink[] = [
  {
    label: "About Us",
    href: "#about",
  },
  {
    label: "Careers",
    href: "#careers",
  },
  {
    label: "Privacy Policy",
    href: "#privacy",
  },
  {
    label: "Contact Sales",
    href: "#contact",
  },
];

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div>
      <h3
        className="text-xs font-bold uppercase"
        style={{
          color: "var(--color-bg-primary)",
        }}
      >
        {title}
      </h3>

      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-xs transition-colors"
              style={{
                color: "var(--color-text-muted)",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.color =
                  "var(--color-accent-primary)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.color =
                  "var(--color-text-muted)";
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BrandMark() {
  return (
    <div
      className="h-4 w-4 rounded-full border-2"
      style={{
        borderColor: "var(--color-accent-primary)",
      }}
      aria-hidden="true"
    />
  );
}





export default function Footer() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: "var(--color-text-primary)",
        borderTopLeftRadius: "var(--radius-md)",
        borderTopRightRadius: "var(--radius-md)",
      }}
    >
      <div
        className="@container mx-auto w-full max-w-5xl px-4"
        style={{
          paddingBlockStart:
            "clamp(3rem, 2rem + 3vw, 4rem)",
          paddingBlockEnd:
            "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
        }}
      >
        {/* Main footer content */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 16 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-60px",
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: "easeOut",
          }}
          className="grid grid-cols-1 gap-10 @2xl:grid-cols-[1.5fr_1fr_1fr_1fr]"
        >
          {/* Brand */}
          <div className="max-w-xs">
            <a
              href="/"
              className="inline-flex items-center gap-2"
              aria-label="Kubecost home"
            >
              <BrandMark />

              <span
                className="text-sm font-bold"
                style={{
                  color: "var(--color-bg-primary)",
                }}
              >
                kubecost
              </span>
            </a>

            <p
              className="mt-3 max-w-xs text-xs leading-relaxed"
              style={{
                color: "var(--color-text-muted)",
              }}
            >
              Kubecost provides real-time cost visibility and
              insight for teams managing Kubernetes environments
              at scale.
            </p>

            {/* Social links */}
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://github.com/kubecost"
                target="_blank"
                rel="noreferrer"
                aria-label="Kubecost on GitHub"
                className="flex h-6 w-6 items-center justify-center rounded-md transition-colors"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--color-bg-card) 6%, transparent)",
                  color: "var(--color-text-muted)",
                }}
              >
                <GithubIcon />
              </a>

              <a
                href="https://twitter.com/kubecost"
                target="_blank"
                rel="noreferrer"
                aria-label="Kubecost on X"
                className="flex h-6 w-6 items-center justify-center rounded-md transition-colors"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--color-bg-card) 6%, transparent)",
                  color: "var(--color-text-muted)",
                }}
              >
                <TwitterIcon />
              </a>

              <a
                href="https://www.linkedin.com/company/kubecost/"
                target="_blank"
                rel="noreferrer"
                aria-label="Kubecost on LinkedIn"
                className="flex h-6 w-6 items-center justify-center rounded-md transition-colors"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--color-bg-card) 6%, transparent)",
                  color: "var(--color-text-muted)",
                }}
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Product */}
          <FooterColumn
            title="Product"
            links={PRODUCT_LINKS}
          />

          {/* Resources */}
          <FooterColumn
            title="Resources"
            links={RESOURCE_LINKS}
          />

          {/* Company */}
          <FooterColumn
            title="Company"
            links={COMPANY_LINKS}
          />
        </motion.div>

        {/* Divider */}
        <div
          className="mt-8 border-t"
          style={{
            borderColor:
              "color-mix(in srgb, var(--color-bg-card) 10%, transparent)",
          }}
        />

        {/* Bottom row */}
        <div className="flex flex-col gap-4 pt-5 @2xl:flex-row @2xl:items-center @2xl:justify-between">
          <p
            className="text-[11px]"
            style={{
              color: "var(--color-text-muted)",
            }}
          >
            © 2026 Kubecost Inc. All rights reserved.
          </p>

          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-5"
          >
            <a
              href="#security"
              className="text-[11px] transition-colors"
              style={{
                color: "var(--color-text-muted)",
              }}
            >
              Security
            </a>

            <a
              href="#terms"
              className="text-[11px] transition-colors"
              style={{
                color: "var(--color-text-muted)",
              }}
            >
              Terms of Service
            </a>

            <a
              href="#status"
              className="text-[11px] transition-colors"
              style={{
                color: "var(--color-text-muted)",
              }}
            >
              Status Page
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}