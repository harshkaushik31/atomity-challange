"use client";

import { useApiData } from "@/hooks/useApiData";
import FeatureSection from "@/components/FeatureSection";
import CostSavingsCard from "@/components/CostSavingCard";
import HeroSection from "@/components/HeroSection";
import ROICalculatorSection from "@/components/ROICalculatorSection";
import GovernanceSection from "@/components/GovernanceSection";
import Footer from "@/components/Footer";
import MainPageErrorState  from "@/components/MainPageErrorState";
import MainPageLoadingState from "@/components/MainPageLoadingState";

export default function Home() {
  const { data, isLoading, isError, error, refetch, isFetching } = useApiData();

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)]">
      {isLoading && (
        <MainPageLoadingState/>
      )}

      {isError && (
        <MainPageErrorState error={error} refetch={refetch} />
      )}

      {data && (
        <>
          <HeroSection />
          <FeatureSection resourceMetrics={data.resourceMetrics} />
          <CostSavingsCard savings={data.savings} />
          <ROICalculatorSection />
          <GovernanceSection />
          <Footer />

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