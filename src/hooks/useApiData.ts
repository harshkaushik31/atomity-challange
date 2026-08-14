// src/hooks/useApiData.ts
"use client";

import { useQuery } from "@tanstack/react-query";

// ---- Types -----------------------------------------------------------

interface DummyProduct {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  discountPercentage: number;
}

interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface ResourceMetric {
  label: string; // "CPU" | "GPU" | "RAM" | "PV" | "Network" | "Cloud"
  value: number; // normalized 0-100 for bar height
}

export interface SavingsMetrics {
  cpuUsage: string;
  cpuRequest: string;
  memoryUsage: string;
  memoryRequest: string;
  estimatedSavings: string;
}

export interface AtomityData {
  resourceMetrics: ResourceMetric[];
  savings: SavingsMetrics;
  roi?: ROIData; // Optional ROI data, can be added later if needed
}

export interface ROIData {
  monthlyCloudSpend: number;
  activeClusters: number;
  reductionRate: number;
}

// ---- Fetch function ----------------------------------------------------

const RESOURCE_LABELS = ["CPU", "GPU", "RAM", "PV", "Network", "Cloud"] as const;

async function fetchAtomityData(): Promise<AtomityData> {
  const res = await fetch("https://dummyjson.com/products?limit=6&skip=10");

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
  }

  const data: DummyProductsResponse = await res.json();

  // Map product ratings (0-5 scale) onto bar heights (0-100 scale)
  // to drive the CPU/GPU/RAM/PV/Network/Cloud bars in the diagram.
  const resourceMetrics: ResourceMetric[] = data.products.map((product, i) => ({
    label: RESOURCE_LABELS[i] ?? `Metric ${i + 1}`,
    value: Math.round((product.rating / 5) * 100),
  }));

  // Derive the savings-card numbers from a couple of product fields
  // so they still feel "data-driven" rather than hardcoded.
  const first = data.products[0];
  const second = data.products[1];

  const savings: SavingsMetrics = {
    cpuUsage: `${Math.round((first?.stock ?? 0) % 100)} M`,
    cpuRequest: `${Math.round(((first?.stock ?? 0) % 100) * 10)} M`,
    memoryUsage: `${Math.round(second?.price ?? 0)} MiB`,
    memoryRequest: `${Math.round((second?.price ?? 0) / 100)} GiB`,
    estimatedSavings: `$${(
      (first?.discountPercentage ?? 0) *
      (second?.price ?? 1)
    ).toFixed(1)}/mo`,
  };

  const roi: ROIData = {
  monthlyCloudSpend: Math.round(
    (first?.price ?? 0) * 1000
  ),
  activeClusters: Math.max(
    1,
    Math.round((first?.stock ?? 0) / 10)
  ),
  reductionRate:
    Math.min(
      50,
      Math.max(
        30,
        second?.discountPercentage ?? 35
      )
    ) / 100,
};

  return { resourceMetrics, savings, roi };
}

// ---- Hook ----------------------------------------------------------------

export function useApiData() {
  return useQuery({
    queryKey: ["atomity-data"],
    queryFn: fetchAtomityData,
  });
}