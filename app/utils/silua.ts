import type { WeaverseImage } from "@weaverse/hydrogen";
import { useEffect, type RefObject } from "react";
import peaceCircle from "~/assets/silua/bracelet-peace-circle.jpg";
import redRose from "~/assets/silua/bracelet-red-rose.jpg";
import heroBg from "~/assets/silua/hero-bg-full.jpg";
import lotus from "~/assets/silua/product-lotus.jpg";
import pixiu from "~/assets/silua/product-pixiu.jpg";
import wulou from "~/assets/silua/product-wulou.jpg";
import siluaTag from "~/assets/silua/silua-tag.jpg";
import storyMountain from "~/assets/silua/story-mountain.jpg";

/**
 * Maps local dev asset file names to their bundled (Vite-imported) URLs.
 * In production these imports resolve to hashed URLs (e.g.
 * `/assets/hero-bg-full-Cl_2ixF0.jpg`), while `/app/assets/silua/...` paths
 * 404 in the Oxygen worker.
 */
const SILUA_ASSET_MAP: Record<string, string> = {
  "bracelet-peace-circle.jpg": peaceCircle,
  "bracelet-red-rose.jpg": redRose,
  "hero-bg-full.jpg": heroBg,
  "product-lotus.jpg": lotus,
  "product-pixiu.jpg": pixiu,
  "product-wulou.jpg": wulou,
  "silua-tag.jpg": siluaTag,
  "story-mountain.jpg": storyMountain,
};

/**
 * Normalize a Weaverse image setting into a plain URL string.
 * Image inputs can resolve to either a string or a WeaverseImage object.
 *
 * Local dev asset paths (e.g. `/app/assets/silua/hero-bg-full.jpg`) are only
 * served by the Vite dev server; they 404 in production. Map them to their
 * bundled `import` URL (hashed in production). Shopify CDN / external URLs
 * pass through unchanged. Unknown local paths return `undefined` so callers
 * fall back to their own bundled default.
 */
export function getImageUrl(
  image: WeaverseImage | string | undefined | null,
): string | undefined {
  if (!image) return undefined;
  const url = typeof image === "string" ? image : image.url;
  if (!url) return undefined;
  if (url.startsWith("/app/assets/silua/")) {
    const file = url.slice("/app/assets/silua/".length).split("?")[0];
    return SILUA_ASSET_MAP[file];
  }
  return url;
}

/**
 * Reveal-on-scroll for every `.reveal` block inside the given root element.
 * The Silua design CSS hides `.reveal` blocks until `.in` is added, so every
 * Silua section that uses reveal animations must run this hook on mount.
 */
export function useSiluaReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const revealElements = Array.from(
      root.querySelectorAll<HTMLElement>(".reveal"),
    );

    if (reduceMotion) {
      revealElements.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

const ROMAN_NUMERALS = [
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
  "viii",
  "ix",
  "x",
];

/** Small helper used to auto-number feature lists (i., ii., iii., ...). */
export function romanize(index: number): string {
  return ROMAN_NUMERALS[index - 1] ?? String(index);
}
