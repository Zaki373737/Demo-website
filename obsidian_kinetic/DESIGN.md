---
name: Obsidian Kinetic
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#c2caad'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#8c9479'
  outline-variant: '#434933'
  surface-tint: '#a0d800'
  primary: '#ffffff'
  on-primary: '#253600'
  primary-container: '#b7f700'
  on-primary-container: '#506e00'
  inverse-primary: '#4b6700'
  secondary: '#dcb8ff'
  on-secondary: '#480081'
  secondary-container: '#7701d0'
  on-secondary-container: '#dcb7ff'
  tertiary: '#ffffff'
  on-tertiary: '#233240'
  tertiary-container: '#d4e4f7'
  on-tertiary-container: '#576676'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b7f700'
  primary-fixed-dim: '#a0d800'
  on-primary-fixed: '#141f00'
  on-primary-fixed-variant: '#374e00'
  secondary-fixed: '#efdbff'
  secondary-fixed-dim: '#dcb8ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6700b5'
  tertiary-fixed: '#d4e4f7'
  tertiary-fixed-dim: '#b8c8da'
  on-tertiary-fixed: '#0d1d2a'
  on-tertiary-fixed-variant: '#394857'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 80px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is engineered for a premium influencer marketing agency, balancing the gravitas of an enterprise consultancy with the high-energy pulse of digital creators. The brand personality is "Sophisticated Catalyst"—expert, tech-forward, and authoritative.

The aesthetic utilizes **Glassmorphism** and **Bento-style layouts** to organize complex data into digestible, premium modules. High-contrast transitions between deep obsidian surfaces and crisp light-mode sections delineate between "Strategy" (Dark) and "Results" (Light). The visual language relies on smooth gradients, subtle depth, and precise execution to evoke a sense of high-trust and elite performance.

## Colors

The palette is anchored by **Obsidian** (#0F0F12) for deep backgrounds and **Cyber Lime** (#BDFF00) as the primary high-energy accent for CTAs and critical data points. **Electric Violet** (#8A2BE2) serves as a secondary accent for gradients and interactive states, providing a tech-forward "neon" vibration against dark surfaces.

- **Primary:** Cyber Lime. Used for conversion points and success states.
- **Secondary:** Electric Violet. Used for brand flourishes and hover states.
- **Neutrals:** A scale of deep charcoals. Surfaces use semi-transparent variants to facilitate glassmorphism.
- **Contrast:** Off-white text and surfaces are used in specific "Light Mode" sections to provide visual relief and highlight case studies.

## Typography

This design system uses **Plus Jakarta Sans** for headlines to provide a modern, slightly rounded, yet professional character. **Inter** is utilized for body copy to ensure maximum legibility across data-heavy dashboards. 

For technical details and metadata (e.g., "Follower Count" or "Engagement Rate"), **JetBrains Mono** is introduced to reinforce the tech-forward, analytical nature of the agency. High-contrast scaling is essential: display text should be massive and tightly tracked to create an editorial feel.

## Layout & Spacing

The layout follows a **12-column fluid grid** for desktop, transitioning to a **4-column grid** for mobile. The "Bento Box" philosophy dictates that content is grouped into distinct modules with consistent 24px gutters.

Large sections of negative space (64px+) should be used between major brand narratives to maintain a premium, uncluttered feel. Components should utilize internal padding based on an 8px scale (16px, 24px, 32px) to ensure mathematical harmony across the interface.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Glassmorphism** rather than traditional drop shadows. 

1.  **Base Layer:** Obsidian (#0F0F12).
2.  **Surface Layer:** Semi-transparent charcoal with a 12px backdrop blur and a 1px subtle inner stroke (white at 10% opacity) to define edges.
3.  **Accent Depth:** Glows are created using low-opacity Electric Violet or Cyber Lime radial gradients positioned behind cards, simulating a light source beneath the "glass."
4.  **Interactive States:** Elements "lift" by increasing the backdrop blur intensity and the brightness of the inner stroke.

## Shapes

The shape language is "Substantial Roundedness." Standard UI components (buttons, inputs) use a **0.5rem (8px)** corner radius. Larger containers and Bento cards use **1.5rem (24px)** to create a friendly, modern containerized look. 

Buttons should never be fully pill-shaped unless they are secondary tags; primary actions maintain the 8px radius to feel more "architectural" and stable.

## Components

- **Buttons:** Primary buttons use Cyber Lime with black text for maximum punch. Secondary buttons are ghost-style with a 1px Violet stroke and a subtle blur background.
- **Bento Cards:** Use a background of #1A1A1E at 80% opacity with a `backdrop-filter: blur(10px)`. Include a very thin, top-weighted linear gradient border to simulate light hitting the top edge.
- **Inputs:** Dark-themed with a subtle bottom-border only, becoming Cyber Lime on focus.
- **Chips/Badges:** Small JetBrains Mono text inside 4px rounded boxes with low-opacity fills of the accent colors.
- **Charts:** High-contrast line graphs using Electric Violet with a "glow" effect (drop-shadow with spread and color tint).
- **Influencer Profiles:** Circular avatars with a dual-tone gradient ring (Violet to Lime) to indicate "Active" or "Trending" status.