# Atomity - Frontend Engineering Challenge

Live Link - https://atomity-challange.vercel.app/

A responsive Next.js/React implementation of a cloud-optimization
product experience, built around **real-time multi-cloud resource
visibility, cost optimization, and ROI projection**.

The project was created for the Atomity Frontend Engineering Challenge,
where the goal is to interpret a feature from the supplied product video
and turn the concept into a polished, animated, responsive web
experience rather than producing a pixel-perfect copy.

## Overview

The interface presents a cloud optimization dashboard-style experience
with:

-   Multi-cloud resource visualization
-   AWS, Google Cloud, Azure, and On-Premise provider nodes
-   A centralized resource utilization chart
-   Animated connector paths between cloud providers and the chart
-   Dynamic API-driven metrics
-   ROI / annual savings projection
-   Enterprise Kubernetes governance feature cards
-   Responsive layouts for desktop, tablet, and mobile
-   Scroll-triggered animations with reduced-motion support
-   A reusable component architecture built from scratch

The design uses a restrained green/white visual system to communicate
infrastructure, efficiency, and cost reduction while keeping the
dashboard readable and lightweight.

------------------------------------------------------------------------

## Feature Chosen - B 0:45 - 0:55

## References
![alt text](<Screenshot 2026-08-13 160748.png>)
![alt text](<Screenshot 2026-08-13 160804.png>)

### Multi-Cloud Resource Visibility & Cost Optimization

The implementation focuses on the concept of giving users a **single
visual overview of Kubernetes resources across multiple cloud
environments**.

The central visualization combines:

-   CPU
-   GPU
-   RAM
-   Persistent Volumes
-   Network
-   Cloud

The surrounding provider nodes represent:

-   AWS
-   Google Cloud
-   Azure
-   On-Premise

Instead of directly reproducing the supplied product video, the feature
was interpreted as a more complete product section with dynamic data,
animated relationships between providers and resources, and supporting
ROI information.

This follows the challenge's requirement to use the reference material
as inspiration rather than creating a pixel-perfect copy.

------------------------------------------------------------------------

## Key Features

### 1. Multi-Cloud Resource Visualization

The main feature section places a resource chart in the center and
cloud-provider nodes around it.

Each provider has its own reusable `ProviderNode` component, allowing
the visual structure and node data to remain separate from the page
layout.

The chart receives its data dynamically rather than relying on hardcoded
chart values.

### 2. Animated Connector System

The cloud nodes are connected to the central chart with dynamically
calculated SVG paths.

The connector system:

-   Measures the provider and chart positions
-   Converts them into a shared coordinate system
-   Generates the connector paths dynamically
-   Uses dotted SVG strokes
-   Animates the path entrance
-   Recalculates on resize
-   Avoids hardcoded screen coordinates

This makes the visualization resilient when the layout changes.

### 3. Dynamic ROI Projection

The ROI section converts API-derived values into an annual savings
projection.

The calculation is based on:

-   Monthly cloud spend
-   Active Kubernetes clusters
-   Estimated cloud-cost reduction

The resulting values are rendered dynamically in the ROI interface
instead of being permanently embedded into the UI.

### 4. Enterprise Kubernetes Governance

The page also includes supporting governance features such as:

-   Granular allocation
-   Budgets & alerts
-   On-premise security

Each feature is represented using a reusable card component rather than
keeping all cards inside one monolithic section.

### 5. Responsive Design

The layout adapts across:

-   Desktop: `1280px+`
-   Tablet: `768px`
-   Mobile: `375px`

Container queries are used where appropriate so components can respond
to the space available to them rather than relying entirely on viewport
width.

------------------------------------------------------------------------

# Tech Stack

## Core

-   **Next.js**
-   **React**
-   **TypeScript**

## Styling

-   **Tailwind CSS**
-   CSS custom properties / design tokens
-   Modern CSS features such as:
    -   Container queries
    -   `color-mix()`
    -   Logical sizing properties
    -   Responsive utility classes

## Animation

-   **Framer Motion**

Framer Motion is used for:

-   Scroll-triggered entrances
-   Staggered animations
-   SVG path animation
-   Scale and opacity transitions
-   Reduced-motion handling

## Data

-   Public REST API
-   Custom data-fetching hook
-   UI-specific data transformation

------------------------------------------------------------------------

# Project Structure

The project follows a component-oriented structure so that individual
visual elements remain reusable and understandable.

``` text
src/
├── app/
│   ├── global.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── AnimatedCard.tsx
│   ├── BarChart.tsx
│   ├── CostSavingsCard.tsx
│   ├── FeatureCard.tsx
│   ├── FeatureSection.tsx
│   ├── Footer.tsx
│   ├── ProviderNode.tsx
│   ├── ROICalculatorSection.tsx
|   ├── MainPageErrorState.tsx
|   ├── MainPageLoadingState.tsx
|   ├── GovernanceCard.tsx
|   ├── GovernanceSection.tsx
|   ├── Navbar.tsx
│   └── HeroSection.tsx
│
├── hooks/
│   ├── useApiData.ts
│   └── usePreferReducedMotion.ts
│
├── icons/
│   └── IconPack.tsx
│
├── tokens/
│   └── color.ts
│
└── lib/
    └── polygon.ts
```

The exact structure may evolve as components are added, but the main
principle is to keep data fetching, reusable UI, animation behavior, and
page composition separate.

------------------------------------------------------------------------

# Component Architecture

The UI is intentionally built from small components instead of using a
large monolithic page component.

### `FeatureSection`

Responsible for the overall multi-cloud visualization.

It coordinates:

-   Provider nodes
-   Central chart
-   Connector SVG
-   Responsive layout
-   Measurement and resize handling

### `ProviderNode`

Represents an individual cloud provider.

The same component is reused for:

-   AWS
-   Google Cloud
-   Azure
-   On-Premise

Provider-specific information is passed as props.

### `BarChart`

Responsible for displaying resource utilization.

The chart accepts structured data through props:

``` ts
BarChartDatum[]
```

This keeps the visualization independent from the API layer.

### `FeatureCard`

Reusable card component for the enterprise governance section.

The content is passed as data rather than duplicating the card markup.

### `ROISection`

Responsible for the ROI projection experience.

It consumes transformed data and presents:

-   Monthly cloud spend
-   Active clusters
-   Reduction percentage
-   Projected savings

### `CostSavingsCard`

Displays individual cost-saving metrics and visualizes the relationship
between resource usage and savings.

### `AnimatedCard`

Provides shared animation behavior for cards that appear when they enter
the viewport.

------------------------------------------------------------------------

# Design Token Architecture

The project uses CSS custom properties as the primary design-token
layer.

Instead of scattering raw colors throughout components, the interface
references semantic variables such as:

``` css
var(--color-bg-primary)
var(--color-bg-card)
var(--color-text-primary)
var(--color-text-muted)
var(--color-accent-primary)
var(--color-border-primary)
```

This makes it possible to change the visual system without rewriting
individual components.

The token approach also keeps the green accent system consistent across:

-   Borders
-   Provider polygons
-   Chart bars
-   Buttons
-   Badges
-   Connector lines
-   Highlighted values

Where appropriate, modern CSS functions such as `color-mix()` are used
to derive subtle variations from the existing token system.

------------------------------------------------------------------------

# Data Fetching

The application does not rely entirely on hardcoded dashboard values.

API data is fetched through a dedicated data layer and then transformed
into the structures expected by the visual components.

For example, ROI values are derived from fetched records rather than
being directly embedded inside the ROI component.

A simplified transformation looks like:

``` ts
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
```

This keeps the presentation layer independent from the raw API response.

------------------------------------------------------------------------

# Loading & Error Handling

The data layer is designed around the normal asynchronous states of a
public API:

``` text
Loading
   ↓
Success ──→ Transform API data ──→ Render UI
   │
   └──────→ Error state
```

This prevents the UI from assuming that data is immediately available.

Components can therefore render appropriate states while the API request
is in progress or if the request fails.

------------------------------------------------------------------------

# Caching Strategy

The API data is isolated inside the data-fetching layer rather than
being requested directly by every visual component.

This prevents individual sections from independently issuing the same
request and provides a single source of truth for the fetched data.

The intended behavior is:

``` text
Initial visit
     ↓
Fetch API data
     ↓
Store/reuse fetched result
     ↓
Render sections
     ↓
Reuse cached data on subsequent renders
```

This follows the challenge requirement that navigation or component
re-renders should not result in unnecessary repeated network requests.

------------------------------------------------------------------------

# Animation Approach

Animation is treated as part of the product experience rather than
decoration.

## Scroll-triggered entrances

Sections and cards use viewport-based animation so content enters as the
user reaches it.

Typical transitions include:

``` text
opacity: 0 → 1
translateY: 12px → 0
scale: 0.95 → 1
```

These transitions use eased timing rather than large bounce effects.

## Staggering

Related elements use small delays so they appear sequentially instead of
simultaneously.

For example:

``` text
Provider 1
    ↓
Provider 2
    ↓
Chart
    ↓
Supporting metrics
```

## SVG connector animation

The provider-to-chart connectors use animated SVG paths.

The paths are calculated from actual element positions, allowing the
animation to remain aligned with the layout.

## Reduced motion

The project uses a `usePrefersReducedMotion` hook to respect the user's
system accessibility preference.

When reduced motion is enabled, animations are simplified or removed.

------------------------------------------------------------------------

# Responsive Strategy

The page is designed around the content rather than a single fixed
viewport.

### Desktop

The main visualization uses a three-column arrangement:

``` text
AWS / GCP    →    Resource Chart    ←    Azure / On-Premise
```

### Tablet

The spacing and provider layout adapt to the available container width.

### Mobile

The provider nodes and chart transition into a vertically stacked layout
so the visualization remains readable instead of compressing the desktop
composition.

Container queries are used where they provide a better component-level
breakpoint than global viewport breakpoints.

------------------------------------------------------------------------

# Accessibility

The implementation includes several accessibility considerations:

-   Semantic `<section>` elements
-   Accessible section headings
-   Visually hidden headings where appropriate
-   Decorative SVGs marked with `aria-hidden`
-   Reduced-motion support
-   Readable color contrast
-   Native interactive elements where interaction is required

The goal is to ensure that the visual presentation does not become a
barrier for users who have motion or accessibility preferences.

------------------------------------------------------------------------

# Why These Libraries?

## Next.js

Next.js provides the application structure, routing, React integration,
and production-ready build/deployment workflow.

## TypeScript

TypeScript is used to make data structures explicit and catch mismatches
between API data and component props during development.

## Framer Motion

Framer Motion was chosen because the project relies heavily on:

-   Scroll-triggered animation
-   Staggered transitions
-   SVG path animation
-   Reduced-motion handling

It allows these behaviors to remain close to the components they
animate.

## Tailwind CSS

Tailwind provides responsive utilities and container-query support while
keeping the component styles close to the markup.

The project still uses semantic CSS variables for the main visual tokens
instead of scattering raw color values throughout components.

------------------------------------------------------------------------

# Important Design Decisions

## 1. Interpretation instead of pixel-perfect copying

The supplied challenge explicitly asks for an interpretation of the
reference rather than a direct reproduction.

The implementation therefore uses the reference's core idea ---
centralized cloud-resource visibility --- while adding:

-   Dynamic data
-   Responsive behavior
-   Animated provider relationships
-   ROI projection
-   Governance information
-   Reusable components

## 2. Dynamic SVG connectors

The provider connections could have been implemented using static CSS
lines.

Instead, the paths are calculated from the actual DOM positions.

This makes the visualization more robust when:

-   The browser is resized
-   The chart dimensions change
-   Content changes
-   Responsive breakpoints change

## 3. Reusable provider component

AWS, Azure, GCP, and On-Premise share the same visual concept.

Instead of four separate implementations, they use the same
`ProviderNode` component with different configuration.

## 4. Token-based styling

The green visual language is centralized through CSS variables so the
entire product can be restyled without modifying every component.



------------------------------------------------------------------------

# Running Locally

## Prerequisites

-   Node.js 18+
-   npm, pnpm, or yarn

## Installation

Clone the repository:

``` bash
git clone https://github.com/harshkaushik31/atomity-challange.git
cd atomity-feature
```

Install dependencies:

``` bash
pnpm install
```

or:

``` bash
npm install
```


## Development

Run the development server:

``` bash
pnpm dev
```

or:

``` bash
npm run dev
```

Then open:

``` text
http://localhost:3000
```

------------------------------------------------------------------------

# Production Build

Build the project:

``` bash
pnpm build
```

Run the production server:

``` bash
pnpm start
```

------------------------------------------------------------------------

# Deployment

The project is deployed using a Vercel

## Live Demo

**Live URL:** `https://atomity-challange.vercel.app/`

## Repository

**GitHub:** `https://github.com/harshkaushik31/atomity-challange`


------------------------------------------------------------------------

# Submission

### GitHub Repository

`https://github.com/harshkaushik31/atomity-challange`

### Live Demo

`https://atomity-challange.vercel.app/`

------------------------------------------------------------------------

# Notes

The implementation prioritizes:

-   Clear component architecture
-   Dynamic data
-   Animation quality
-   Responsive behavior
-   Modern CSS
-   Accessibility
-   Product-oriented visual design

The supplied challenge brief emphasizes focused scope, reusable
components, thoughtful animation, API-driven content, caching,
responsive design, accessibility, and clear documentation. This README
documents the implementation against those goals.

------------------------------------------------------------------------

## License

This project was created as part of a frontend engineering challenge.

