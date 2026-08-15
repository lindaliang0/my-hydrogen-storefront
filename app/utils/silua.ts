import type { WeaverseImage } from "@weaverse/hydrogen";
import { useEffect, type RefObject } from "react";

/**
 * Normalize a Weaverse image setting into a plain URL string.
 * Image inputs can resolve to either a string or a WeaverseImage object.
 */
export function getImageUrl(
  image: WeaverseImage | string | undefined | null,
): string | undefined {
  if (!image) return undefined;
  return typeof image === "string" ? image : image.url;
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
