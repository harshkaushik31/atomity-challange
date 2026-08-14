"use client";

interface MainPageErrorStateProps {
  error: Error | null;
  refetch: () => void;
}

function MainPageErrorState({
  error,
  refetch,
}: MainPageErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center"
    >
      <p className="text-sm font-medium text-[var(--color-text-primary)]">
        Couldn&apos;t load resource data.
      </p>

      <p className="text-xs text-[var(--color-text-muted)]">
        {error?.message ?? "Something went wrong."}
      </p>

      <button
        type="button"
        onClick={refetch}
        className="rounded-[var(--radius-full)] border px-4 py-2 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-hexagon-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          borderColor:
            "var(--color-border-primary)",
        }}
      >
        Try again
      </button>
    </div>
  );
}

export default MainPageErrorState;