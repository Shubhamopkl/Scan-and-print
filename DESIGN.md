---
name: Precision Print Utility
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#824500'
  on-tertiary: '#ffffff'
  tertiary-container: '#a65900'
  on-tertiary-container: '#ffede1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3rem
    fontWeight: '800'
    lineHeight: 3.5rem
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '700'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '500'
    lineHeight: 1.75rem
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
  code-stat:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '700'
    lineHeight: 1.25rem
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies a modern, ultra-reliable utility aesthetic engineered for rapid, zero-friction document workflows. It serves two distinct archetypes: on-the-go kiosk users needing immediate, self-serve printing with zero ambiguity, and shop owners requiring dense, rapid-glance terminal telemetry. 

The aesthetic is built on high-utility tactile minimalism—functional, crisp, and robust. It removes decorative ornamentation in favor of purposeful contrast, explicit boundary definitions, instantaneous tactile feedback, and unmistakable state signals. The emotional response should be immediate trust, speed, and relief: "This machine works, my file is secure, and my print is dispensing."

## Colors

The palette balances intense utility blues with high-visibility operational signaling against stark, pristine slate surfaces:

- **Primary (`#2563EB` - Royal Cobalt):** Directs the primary interaction path (upload, print trigger, active navigation, focused input borders). Conveys enterprise-grade precision and digital reliability.
- **Secondary (`#059669` - Emerald Signal):** Reserved strictly for successful file parsing, printer readiness, payment validations (UPI/card), and dispensed jobs. Must stand out cleanly against neutral white backgrounds.
- **Tertiary (`#D97706` - Alert Amber):** High-priority operational warnings (low toner, tray empty, unsupported paper weight, connectivity lag). Demands immediate intervention without signaling outright failure.
- **Neutral (`#0F172A` - Slate Carbon):** The foundational ink for typography and structural anchors. The neutral ramp sits on clean slate grays (`#F8FAFC` base surface, `#F1F5F9` container fills, `#E2E8F0` structural borders), guaranteeing zero glare under bright convenience store or campus kiosk lighting.
- **Critical / Danger (`#DC2626` - Hardware Fault):** Reserved for paper jams, print queue cancellations, and payment rejections.

## Typography

The type scale marries the structural authority and contemporary geometric curves of **Plus Jakarta Sans** for primary display numbers, total costs, and flow headlines with the ultra-legible utilitarian character of **Inter** for forms, document parameters, and kiosk operational metadata.

- **Numerics & Currencies:** All pricing line items, page counters, and tray indicators utilize tabular figures (`font-variant-numeric: tabular-nums`) to prevent jittering during real-time page count calculations.
- **Kiosk Readability:** Under handheld sunlight or distance scanning, headlines and labels use tight letter spacing and strict medium-to-bold weights to avoid stroke degradation on lower-quality mobile screens.

## Layout & Spacing

The layout operates on an 8pt base grid within a fluid grid framework designed to scale between handheld mobile devices, self-service kiosk tablets, and desktop owner dashboards.

- **Mobile Kiosk Viewport (< 640px):** Single-column stack with dynamic viewport padding. Outer margins lock to `margin: 1rem` to maximize touch footprint. Bottom areas are reserved for sticky primary action trays (e.g., "Pay & Print") elevated with fixed thumbsafe heights (min 56px).
- **Tablet / Countertop Kiosk (640px - 1024px):** 6-column grid with `gutter: 1rem`. Document preview occupies the left 3 columns; configuration, duplex options, and payment checkout dock into the right 3 columns.
- **Owner Admin Portal (> 1024px):** 12-column grid with `margin-desktop: 2rem` and `gutter-desktop: 1.5rem`. Max container constraint of `1440px`. Telemetry widgets, tray capacities, and live queue lists adopt dense multi-card row arrangements.

## Elevation & Depth

Visual hierarchy employs crisp tonal surface layering paired with ultra-diffused, ambient slate shadows and micro-borders (`1px`). This avoids blurry visual mud and keeps interactions sharp under kiosk lighting.

- **Level 0 (Canvas Base):** Background canvas (`#F8FAFC`). Flat, non-elevated.
- **Level 1 (Card & Modular Panel):** Background surface (`#FFFFFF`), outline (`1px solid #E2E8F0`), shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.03)`. Used for file tiles, paper config blocks, and admin metric widgets.
- **Level 2 (Interactive Floating / Dropdowns / Popovers):** Elevated surface (`#FFFFFF`), outline (`1px solid #CBD5E1`), shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Modal / Sticky Kiosk Action Footer):** Elevated pinned trays (`#FFFFFF`), outline top (`1px solid #E2E8F0`), shadow: `0 -4px 12px 0 rgba(15, 23, 42, 0.06)`. Ensures the primary transaction action is uncoupled from page scroll.

## Shapes

The design system maintains a tactile, compact roundedness scale (`level 2`):

- **Default Components (Inputs, Buttons, Segmented Tabs):** `0.5rem` (8px). Delivers a modern, welcoming feel while retaining structural discipline.
- **Cards, Panels, Document Dropzones:** `rounded-lg` at `1rem` (16px). Creates distinct modular grouping without excessive pillowy bubble effects.
- **Full Modals & Bottom Sheets:** `rounded-xl` at `1.5rem` (24px) on top radii to establish physical containment.
- **Status Badges, Indicators, and Mini Chips:** Fully rounded / pill (`9999px`) to create an immediate visual contrast against geometric layout cards.

## Components

### Buttons & Touch Targets
- **Kiosk Target Sizing:** All primary actions require a minimum interactive bounding box of `48px` (height `52px` preferred on mobile web) to ensure zero tap-error on greasy or outdoors mobile screens.
- **Primary Print Action:** Solid `#2563EB` fill, white text, bold weight, subtle active press feedback (`transform: scale(0.98)`).
- **Secondary / Ghost:** White background, `1px solid #E2E8F0`, hover `#F8FAFC`, active `#F1F5F9`.
- **Success Confirm (Pay & Release):** Solid `#059669` fill with explicit payment icon (e.g., UPI, NFC contact symbol).

### Status Badges & Chips
- **Hardware / Job Badges:** Rounded-full pill styling with a dot pulse indicator.
  - *Ready / Online:* Background `#ECFDF5`, text `#065F46`, border `#A7F3D0`, dot `#059669`.
  - *Warning (Paper/Ink Low):* Background `#FFFBEB`, text `#92400E`, border `#FDE68A`, dot `#D97706`.
  - *Offline / Error:* Background `#FEF2F2`, text `#991B1B`, border `#FECACA`, dot `#DC2626`.
- **Print Option Chips (Color, B&W, Duplex):** Compact toggles with `0.5rem` radius. Inactive states feature `#F1F5F9` fill with muted text; active states feature `#2563EB` stroke (`1.5px`) with a light `#EFF6FF` tint.

### Inputs & Counter Controls
- **Page Selectors & Copies:** Stepper components featuring oversized `+` and `-` touch segments enclosing a central tabular numeric value.
- **File Upload / QR Dropzone:** `2px dashed #CBD5E1` border on `#F8FAFC` background. Dynamic hover/drag transitions to `#2563EB` border with a `#EFF6FF` wash.

### Cards & Pricing Breakdown
- **Print Job Summary Card:** White card (`rounded-lg`, Level 1 elevation). Houses file preview icon, name, total pages, breakdown (Pages × Unit Cost + Tax), and dynamic totals formatted in large `display-lg-mobile` tabular figures.
- **Kiosk Device Health Card (Admin Portal):** Compact container featuring a visual tray progress bar (0–100%), estimated sheets remaining, and network ping indicator.