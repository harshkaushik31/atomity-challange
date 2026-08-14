import React from "react";

function MainPageLoadingState() {
  return (
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
  );
}

export default MainPageLoadingState;
