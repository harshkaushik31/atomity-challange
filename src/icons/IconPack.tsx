// The Github, Twitter and other brand icons are not in the lucide react icon library, so I defined them here in a separate file. They are used in the footer of the main page.

// github icon
export function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2.25a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.64.07-.63.07-.63 1 .07 1.53 1.04 1.53 1.04.9 1.54 2.35 1.1 2.92.84.09-.66.35-1.1.63-1.36-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.03a9.3 9.3 0 0 1 5.01 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.39.2 2.42.1 2.67.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.93.68 1.88v2.79c0 .27.18.58.69.48A10 10 0 0 0 12 2.25Z" />
    </svg>
  );
}

// twitter icon
export function TwitterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.2l-4.8-6.2L6.8 22H3.7l7.2-8.3L3.1 2h6.3l4.3 5.7L18.9 2Zm-1.1 17.9h1.7L8.6 4H6.8l11 15.9Z" />
    </svg>
  );
}

// linkedin icon
export function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.2 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.3 9h3.8v11.7H3.3V9Zm6.2 0H13v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.8 0 4.5 2.5 4.5 5.8v6.2h-3.8V15c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v5.8H9.5V9Z" />
    </svg>
  );
}

// cloud icon
export function CloudIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.5 18a4.5 4.5 0 0 1-.4-8.98A5.5 5.5 0 0 1 16.9 7.1 4 4 0 0 1 17.5 15H17"
        stroke="#FF9900"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 18h11"
        stroke="#FF9900"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// globe icon
export function GlobeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" stroke="#0078D4" strokeWidth="1.8" />
      <path
        d="M4 12h16M12 3.5c2.5 2.3 2.5 15 0 17M12 3.5c-2.5 2.3-2.5 15 0 17"
        stroke="#0078D4"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// cluster icon
export function ClusterIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="3" fill="#4285F4" />
      <circle cx="16" cy="8" r="3" fill="#34A853" />
      <circle cx="12" cy="16" r="3" fill="#FBBC05" />
    </svg>
  );
}

// server icon
export function ServerIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="5"
        width="16"
        height="6"
        rx="1.5"
        stroke="var(--color-text-muted)"
        strokeWidth="1.6"
      />
      <rect
        x="4"
        y="13"
        width="16"
        height="6"
        rx="1.5"
        stroke="var(--color-text-muted)"
        strokeWidth="1.6"
      />
      <circle cx="7.5" cy="8" r="0.8" fill="var(--color-text-muted)" />
      <circle cx="7.5" cy="16" r="0.8" fill="var(--color-text-muted)" />
    </svg>
  );
}

// arrow down icon
export function ArrowDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 4v16M12 20l-6-6M12 20l6-6"
        stroke="var(--color-accent-primary)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
