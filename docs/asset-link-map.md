# Asset & Linkage Reference

This document enumerates every React entry under `app`, `components/common`, `components/layout`, and `components/sections`, and captures how each piece picks up CSS, JavaScript, and other linked assets across the project.

---

## Global Asset Loading (`app/layout.tsx`, `app/globals.css`)
- **CSS sources:** `app/layout.tsx` imports `./globals.css` and injects `<link>` tags for `/assets/css/bootstrap.css`, `swiper-bundle.css`, `magnific-popup.css`, `font-awesome-pro.css`, `spacing.css`, and `main.css`. All components inherit these styles.
- **Scripts:** No scripts are loaded here; runtime JS enters via `LegacyScripts` on the root page.
- **Globals:** `app/globals.css` establishes base typography, body background, placeholder styles, and header positioning tweaks used throughout the layout/section components.

## JavaScript Bundles (served via `LegacyScripts`)
`components/layout/LegacyScripts.tsx` mounts the complete legacy stack:
- **External CDNs:** GSAP core + `ScrollTrigger`, `ScrollToPlugin`, `ScrollSmoother` from `cdnjs`.
- **Local vendor scripts:** `/assets/js/vendor/jquery.js`, `bootstrap-bundle.js`, `plugin.js`, `three.js`, `hover-effect.umd.js`, `split-type.js`, `swiper-bundle.js`, `swiper-gl.js`, `effect-slicer.js`, `magnific-popup.js`, `nice-select.js`, `purecounter.js`, `isotope-pkgd.js`, `imagesloaded-pkgd.js`, `backtop.js`, `ajax-form.js`, `slider-init.js`, `main.js`, `tp-cursor.js`, plus module `/assets/js/distortion-img.js`.
- **Consumers:** Any component using `.swiper` carousels, hover distortions, accordions (`data-bs-toggle`), the snap slider, cursor effects, or back-to-top UI depend on this injection.

---

## `app/` Route Files
- **`app/page.tsx`**  
  - Imports all layout helpers (`Loader`, `MagicCursor`, `BackToTop`, `Offcanvas`, `Header`, `Footer`, `ClientRuntime`, `LoaderInit`, `SnapSliderInit`, `LegacyScripts`) plus every section under `components/sections`.  
  - **CSS/JS:** Relies on global CSS plus the script stack from `LegacyScripts`. `ClientRuntime`, `LoaderInit`, and `SnapSliderInit` require GSAP + jQuery from those scripts.

- **`app/about/page.tsx`, `app/contact/page.tsx`, `app/admin/page.tsx`, `app/products/page.tsx`**  
  - Each renders `Breadcrumb` + `ComingSoon`. Styling descends from globals + main asset CSS; the decorative backgrounds use `/assets/img/breadcrumb/thumb.jpg`.  
  - No direct script usage beyond Bootstrap/GSAP already present.

- **`app/products/[slug]/page.tsx`**  
  - Adds `notFound` handling and `generateStaticParams`. Uses the same `Breadcrumb`/`ComingSoon` combo with per-product copy.  
  - No unique assets; inherits the global stack.

- **`app/about|admin|contact|products` directories**  
  - Contain single `page.tsx` files only; no extra CSS modules or scripts.

---

## `components/common`
- **`Breadcrumb.tsx`**  
  - Uses `tp-breadcrumb-*` utility classes and `data-background="/assets/img/breadcrumb/thumb.jpg"`, which `ClientRuntime` resolves and falls back to the remote CDN if required.  
  - Typography/colors supplied by `font-awesome-pro.css`, `main.css`, `spacing.css`.

- **`ComingSoon.tsx`**  
  - Styled entirely through global + `main.css` classes (`tp-placeholder-*`). No scripts beyond potential scroll animations in `main.js`.

---

## `components/layout`
- **`Header.tsx`**  
  - Pure markup with an inline `desktopMenuHtml`. Dependent on `main.css`, `font-awesome-pro.css`, and header-specific classes defined in `/assets/css/spacing.css`. The sticky behavior comes from `main.js` + `backtop.js`.

- **`Footer.tsx`**  
  - Uses `data-background="/assets/img/footer/ai/bg-black.jpg"` (handled by `ClientRuntime`). Interactive elements (social hover, fade animations) rely on GSAP + `main.js`.

- **`Offcanvas.tsx`**  
  - Shares logo assets `/assets/img/logo/...`, uses `.popup-image` hooks consumed by `magnific-popup.js`, and classes targeted by `main.js` for toggling.

- **`Loader.tsx`** & **`LoaderInit.tsx`**  
  - `Loader` provides the SVG/DOM structure, while `LoaderInit` waits for jQuery + GSAP (from `LegacyScripts`) to animate the intro sequence and body `loaded` class.

- **`MagicCursor.tsx`**  
  - Renders `#magic-cursor`/`#ball`; behavior implemented in `/assets/js/tp-cursor.js`.

- **`BackToTop.tsx`**  
  - Provides the `.scrollToTop` node used by `/assets/js/backtop.js` to animate scroll progress. Icon fonts sourced from `font-awesome-pro.css`.

- **`ClientRuntime.tsx`**  
  - Pure client hook: normalizes `data-background`, `data-bg-color`, and `data-width` attributes and installs fallbacks for `/assets/img/**` references.

- **`SnapSliderInit.tsx`**  
  - Binds GSAP + ScrollTrigger (via `LegacyScripts`) to elements with `.tp-snap-slider-*` classes defined inside `PortfolioSection`.

- **`LegacyScripts.tsx`**  
  - See full list above; ensures correct loading order (jQuery ➝ Bootstrap ➝ plugins).

---

## `components/sections`
(All sections inherit global CSS and the asset bundle; only unique linkages are noted.)

- **`HeroSection.tsx`**  
  - Uses `data-background="/assets/img/hero/ai/bg-black.png"` and multiple `data-displacement`/`tp--hover-img` hooks, driven by `hover-effect.umd.js` & GSAP. Brand carousel uses Swiper classes, requiring `swiper-bundle.css/js`.

- **`AboutSection.tsx`**  
  - Several `data-img`/`data-bgcolor` attributes consumed by `ClientRuntime`. Buttons use shared `.tp-btn-ai` styles from `main.css`.

- **`BannerSection.tsx`**  
  - `.uncover_slice` elements align with `/assets/js/effect-slicer.js` and CSS in `main.css`.

- **`ServicesSection.tsx`**  
  - Leverages `data-delay`, `data-ease`, and `.tp--hover` classes targeted by GSAP sequences within `main.js`. Images pulled from `/assets/img/service/ai/*.jpg`.

- **`TextSliderSection.tsx`**  
  - Creates two Swiper instances (`.swiper-container`, `.swiper-wrapper`). Needs `swiper-bundle.css/js` and `slider-init.js` for autoplay direction logic.

- **`PortfolioSection.tsx`**  
  - Builds the snap-scrolling gallery; classes `.tp-snap-slider-*` are read by `SnapSliderInit.tsx`. Uses assets under `/assets/img/portfolio/ai/`.

- **`PricingSection.tsx`**  
  - Sets `data-background="/assets/img/pricing/pricing-black.png"`; the accordion-style CTAs depend on shared button styles. No extra JS beyond general GSAP fades.

- **`TestimonialSection.tsx`**  
  - Another Swiper slider (`.tp-testimonial-ai-slide-active`). Uses Font Awesome stars and noise overlays from `/assets/img/body/noise.png`. Navigation arrows are wired up by `slider-init.js`.

- **`FaqSection.tsx`**  
  - Uses Bootstrap accordion markup (`data-bs-toggle="collapse"`), drawing on `bootstrap.css` + `bootstrap-bundle.js`.

- **`CtaSection.tsx`**, **`BlogSection.tsx`**  
  - Heavy use of `tp_fade_anim` attributes, which GSAP sequences from `main.js`. CTA background uses `/assets/img/cta/ai/bg.jpg`; blog cards rely on `hover-effect.umd.js` data attributes.

- **`TextSliderSection.tsx`**  
  - Covered above; requires Swiper assets and `slider-init.js`.

- **`AboutSection.tsx`**, **`BannerSection.tsx`**, **`ServicesSection.tsx`**, **`PortfolioSection.tsx`**  
  - All utilize `data-background`, `data-displacement`, or `data-speed` attributes that `ClientRuntime` and the legacy plugins interpret.

---

## Public Asset References
- **CSS:** `/public/assets/css/*.css` (Bootstrap, Swiper, Magnific Popup, Font Awesome Pro, Spacing, Main). All injected globally by `app/layout.tsx`.
- **JS:** `/public/assets/js/**` as enumerated in `LegacyScripts.tsx`.
- **Static media:** Under `/public/assets/img/**`, `/public/assets/fonts/**`, and `/public/assets/js/**`. Components reference these via root-relative paths; `ClientRuntime` applies CDN fallbacks when files are missing locally.

---

### How to Trace a Component’s Styling/Scripts
1. Start with `app/layout.tsx` to see the base stylesheets.  
2. Check whether the component renders `data-*` attributes or `.swiper`/`.tp-fade_anim` classes—if so, expect dependencies on GSAP, Swiper, or custom plugins loaded by `LegacyScripts`.  
3. Image/video paths beginning with `/assets/` are served from `public/assets`; `ClientRuntime` ensures they have remote fallbacks.  
4. Bootstrap behaviors (`data-bs-toggle`) rely on `bootstrap-bundle.js` already queued by `LegacyScripts`.

This map should give you a single place to verify where every visual/interactive element draws its CSS and scripts from, and how each React file links to others in the tree.

