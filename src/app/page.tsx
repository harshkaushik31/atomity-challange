// src/app/page.tsx
"use client";

import { useApiData } from "@/hooks/useApiData";
import FeatureSection from "@/components/FeatureSection";
import CostSavingsCard from "@/components/CostSavingCard";
import HeroSection from "@/components/HeroSection";
import ROICalculatorSection from "@/components/ROICalculatorSection";
import GovernanceSection from "@/components/GovernanceSection";
import Footer from "@/components/Footer";

export default function Home() {
  const { data, isLoading, isError, error, refetch, isFetching } = useApiData();

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)]">
      {isLoading && (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-screen flex-col items-center justify-center gap-3"
        >
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "var(--color-accent-primary)",
              borderRightColor: "var(--color-accent-primary)",
            }}
          />
          <span className="text-sm text-[var(--color-text-muted)]">
            Loading resource data…
          </span>
        </div>
      )}

      {isError && (
        <div
          role="alert"
          className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center"
        >
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            Couldn&apos;t load resource data.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            {(error as Error)?.message ?? "Something went wrong."}
          </p>
          <button
            onClick={() => refetch()}
            className="rounded-[var(--radius-full)] border px-4 py-2 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-hexagon-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ borderColor: "var(--color-border-primary)" }}
          >
            Try again
          </button>
        </div>
      )}

      {data && (
        <>
          <HeroSection />
          <FeatureSection resourceMetrics={data.resourceMetrics} />
          <CostSavingsCard savings={data.savings} />
          <ROICalculatorSection />
          <GovernanceSection />
          <Footer />
          {/* Subtle indicator for background refetches (e.g. after window refocus) */}
          {isFetching && (
            <span className="sr-only" role="status" aria-live="polite">
              Refreshing data…
            </span>
          )}
        </>
      )}
    </main>
  );
}