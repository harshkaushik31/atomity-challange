"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useApiData } from "@/hooks/useApiData";
import { usePrefersReducedMotion } from "@/hooks/usePreferReducedMotion";

interface SliderProps {
  id: string;
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  prefersReducedMotion: boolean;
}

function CalculatorSlider({
  id,
  label,
  value,
  displayValue,
  min,
  max,
  step,
  onChange,
  prefersReducedMotion,
}: SliderProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor={id}
          className="text-sm font-bold"
          style={{
            color: "var(--color-accent-primary-light)",
          }}
        >
          {label}
        </label>

        <output
          htmlFor={id}
          className="text-sm font-semibold tabular-nums"
          style={{
            color: "var(--color-accent-primary)",
          }}
        >
          {displayValue}
        </output>
      </div>

      <div className="relative mt-4">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="roi-slider w-full"
          aria-label={label}
        />
      </div>

      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none mt-2 h-px"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        />
      )}
    </div>
  );
}

export default function ROISection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useApiData();

  // The initial values come from the API
  const initialMonthlySpend = data?.roi?.monthlyCloudSpend ?? 0;
  const initialClusters = data?.roi?.activeClusters ?? 0;
  const reductionRate = data?.roi?.reductionRate ?? 0;

  const [monthlySpend, setMonthlySpend] = useState<number | null>(null);
  const [clusters, setClusters] = useState<number | null>(null);

  const currentMonthlySpend =
    monthlySpend ?? initialMonthlySpend;

  const currentClusters =
    clusters ?? initialClusters;

  const annualSavings = useMemo(() => {
    return (
      currentMonthlySpend *
      12 *
      reductionRate
    );
  }, [
    currentMonthlySpend,
    reductionRate,
  ]);

  const formattedSpend = currentMonthlySpend.toLocaleString(
    "en-US"
  );

  const formattedSavings = annualSavings.toLocaleString(
    "en-US",
    {
      maximumFractionDigits: 0,
    }
  );

  const formattedReduction = Math.round(
    reductionRate * 100
  );

  const sectionAnimation = prefersReducedMotion
    ? {
        initial: { opacity: 1, y: 0 },
        whileInView: { opacity: 1, y: 0 },
      }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
      };

// loading state
  if (isLoading) {
    return (
      <section
        id="calculator"
        aria-labelledby="roi-heading"
        className="relative overflow-hidden"
        style={{
          backgroundColor: "var(--color-text-primary)",
        }}
      >
        <div
          className="@container mx-auto flex min-h-[32rem] w-full max-w-6xl items-center justify-center px-4"
        >
          <div
            role="status"
            className="flex items-center gap-3 text-sm"
            style={{
              color: "var(--color-accent-primary)",
            }}
          >
            <span
              className="h-5 w-5 animate-spin rounded-full border-2 border-transparent"
              style={{
                borderTopColor:
                  "var(--color-accent-primary)",
                borderRightColor:
                  "var(--color-accent-primary)",
              }}
            />

            Loading ROI projection...
          </div>
        </div>
      </section>
    );
  }

// error state
  if (isError || !data) {
    return (
      <section
        id="calculator"
        aria-labelledby="roi-heading"
        className="relative overflow-hidden"
        style={{
          backgroundColor: "var(--color-text-primary)",
        }}
      >
        <div className="mx-auto flex min-h-[32rem] max-w-6xl items-center justify-center px-4">
          <div
            role="alert"
            className="rounded-2xl border px-6 py-5 text-center"
            style={{
              borderColor:
                "var(--color-border-primary)",
              backgroundColor:
                "var(--color-bg-card)",
            }}
          >
            <p
              className="text-sm font-semibold"
              style={{
                color: "var(--color-text-primary)",
              }}
            >
              Unable to load ROI projection.
            </p>

            <p
              className="mt-2 text-xs"
              style={{
                color: "var(--color-text-muted)",
              }}
            >
              {(error as Error)?.message ??
                "Something went wrong while loading the data."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="calculator"
      aria-labelledby="roi-heading"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-text-primary)",
      }}
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 82% 50%, color-mix(in srgb, var(--color-accent-primary) 14%, transparent), transparent 42%), radial-gradient(circle at 15% 75%, color-mix(in srgb, var(--color-accent-primary) 8%, transparent), transparent 38%)",
        }}
      />

      <div
        className="@container relative mx-auto w-full max-w-6xl px-4"
        style={{
          paddingBlock:
            "clamp(5rem, 4rem + 5vw, 8rem)",
        }}
      >
        {/* Heading */}
        <motion.div
          {...sectionAnimation}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            duration: prefersReducedMotion
              ? 0.2
              : 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-accent-primary) 45%, transparent)",
              color:
                "var(--color-accent-primary)",
              backgroundColor:
                "color-mix(in srgb, var(--color-accent-primary) 7%, transparent)",
            }}
          >
            ROI Projection Engine
          </span>

          <h2
            id="roi-heading"
            className="mt-5 font-extrabold leading-[1.05] tracking-tight"
            style={{
              fontSize:
                "clamp(2rem, 1.4rem + 3vw, 3.5rem)",
              color: "var(--color-bg-primary)",
            }}
          >
            Calculate Your Annual Savings
          </h2>

          <p
            className="mt-4 max-w-2xl"
            style={{
              fontSize:
                "var(--font-size-lg)",
              color:
                "var(--color-accent-primary-light)",
            }}
          >
            Organizations using Kubecost average
            30-50% reductions in cloud spend.
          </p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          initial={
            prefersReducedMotion
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
              : {
                  opacity: 0,
                  y: 32,
                  scale: 0.98,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            margin: "-60px",
          }}
          transition={{
            duration: prefersReducedMotion
              ? 0.2
              : 0.7,
            ease: [0.16, 1, 0.3, 1],
            delay: prefersReducedMotion
              ? 0
              : 0.15,
          }}
          className="mx-auto mt-14 max-w-4xl rounded-3xl border p-5 sm:p-8"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-text-primary) 82%, var(--color-bg-primary))",
            borderColor:
              "color-mix(in srgb, var(--color-accent-primary) 38%, transparent)",
          }}
        >
          <div className="grid grid-cols-1 gap-8 @3xl:grid-cols-[1fr_1fr] @3xl:gap-10">
            {/* Inputs */}
            <div className="flex flex-col justify-center">
              <CalculatorSlider
                id="monthly-cloud-spend"
                label="Monthly K8s Cloud Spend"
                value={currentMonthlySpend}
                displayValue={`$${formattedSpend}`}
                min={5000}
                max={100000}
                step={1000}
                onChange={setMonthlySpend}
                prefersReducedMotion={
                  prefersReducedMotion
                }
              />

              <div className="mt-8">
                <CalculatorSlider
                  id="active-clusters"
                  label="Active Kubernetes Clusters"
                  value={currentClusters}
                  displayValue={`${currentClusters} Clusters`}
                  min={1}
                  max={100}
                  step={1}
                  onChange={setClusters}
                  prefersReducedMotion={
                    prefersReducedMotion
                  }
                />
              </div>

              {/* Feature note */}
              <div
                className="mt-9 flex items-center gap-2 text-xs"
                style={{
                  color:
                    "var(--color-accent-primary-light)",
                }}
              >
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold"
                  style={{
                    borderColor:
                      "var(--color-accent-primary)",
                    color:
                      "var(--color-accent-primary)",
                  }}
                >
                  ✓
                </span>

                <span>
                  Includes idle node cleanup,
                  right-sizing &amp; spot orchestration.
                </span>
              </div>
            </div>

            {/* Result */}
            <motion.div
              key={annualSavings}
              initial={
                prefersReducedMotion
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      opacity: 0.7,
                      scale: 0.98,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: prefersReducedMotion
                  ? 0
                  : 0.25,
                ease: "easeOut",
              }}
              className="flex flex-col justify-between rounded-2xl border p-6 sm:p-8"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-accent-primary) 5%, var(--color-text-primary))",
                borderColor:
                  "color-mix(in srgb, var(--color-accent-primary) 28%, transparent)",
              }}
            >
              <div className="text-center">
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{
                    color:
                      "var(--color-accent-primary)",
                  }}
                >
                  Projected Annual Savings
                </p>

                <motion.p
                  key={formattedSavings}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 5 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration:
                      prefersReducedMotion
                        ? 0
                        : 0.2,
                  }}
                  className="mt-4 font-extrabold leading-none tracking-tight tabular-nums"
                  style={{
                    fontSize:
                      "clamp(2.75rem, 2rem + 3vw, 4rem)",
                    color:
                      "var(--color-bg-primary)",
                  }}
                >
                  ${formattedSavings}
                </motion.p>

                <p
                  className="mt-3 text-xs font-semibold"
                  style={{
                    color:
                      "var(--color-accent-primary-light)",
                  }}
                >
                  Estimated {formattedReduction}% overall
                  reduction in cloud bill
                </p>
              </div>

              <motion.a
                href="#get-started"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.02 }
                }
                whileTap={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 0.98 }
                }
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                }}
                className="mt-7 flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-sm font-bold"
                style={{
                  backgroundColor:
                    "var(--color-accent-primary)",
                  color:
                    "var(--color-text-primary)",
                }}
              >
                Start Free Trial &amp; Save
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Native range styling */}
      <style jsx>{`
        .roi-slider {
          appearance: none;
          width: 100%;
          height: 7px;
          border-radius: 9999px;
          outline: none;
          cursor: pointer;
          background: color-mix(
            in srgb,
            var(--color-accent-primary) 18%,
            transparent
          );
        }

        .roi-slider::-webkit-slider-thumb {
          appearance: none;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          border: 0;
          background: var(--color-accent-primary);
          cursor: pointer;
        }

        .roi-slider::-moz-range-thumb {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          border: 0;
          background: var(--color-accent-primary);
          cursor: pointer;
        }

        .roi-slider:focus-visible {
          outline: 2px solid var(--color-accent-primary);
          outline-offset: 4px;
        }
      `}</style>
    </section>
  );
}