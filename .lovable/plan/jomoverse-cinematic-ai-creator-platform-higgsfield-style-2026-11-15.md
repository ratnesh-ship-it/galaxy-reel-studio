# JOMOVERSE – Cinematic AI Creator Platform (Higgsfield-style)

## Visual direction
- Deep-space dark theme: near-black navy background, nebula glows in electric violet-magenta and cyan, warm gold accent for CTAs.
- Animated starfield + drifting galaxy nebula backgrounds, floating astronaut hero art, glassy cards with glowing borders.
- Typography: bold condensed display font (Bebas Neue / Syne style) + clean body font. Large cinematic headlines, Higgsfield-like grid of video-style tiles with hover zoom.

## Pages (each its own page, shared top nav + footer)
- **Home** – hero ("Launch Your First AI Film..."), astronaut floating over galaxy, two CTAs; Join JOMOVERSE (Brands vs Creators split); Creative Universe tiles (6 categories); How it Works (4 steps on an orbit line); Showcase grid; Community teaser; final CTA.
- **Discover Creators** – grid of sample creator cards (invented placeholder names/specialities), filter chips by speciality.
- **AI Films & Ads** – showcase gallery by the 6 categories.
- **For Brands** – benefits + Brand Registration form (all 8 fields from the PDF).
- **For Creators** – benefits + Creator Registration form (all 8 fields).
- **Community** – features grid + CTA.
- **About Us** – vision, brand promise, positioning.
- **Login / Sign Up** – visual page only for now.

## Images
Generate ~8 cinematic images: astronaut hero, galaxy/nebula backdrop, and showcase tiles (brand film, product commercial, fashion film, music video, short film, animation).

## Not included in this step
Forms show a success message but don't save submissions yet, and login is visual only. Saving registrations and real accounts can be added next with Lovable Cloud.

## Technical details
- TanStack routes: index, creators, showcase, brands, join-creator, community, about, login; each with own head() metadata.
- Tokens in src/styles.css (oklch), CSS star/nebula animations, react-hook-form-free simple controlled forms with zod validation, sonner toasts.
