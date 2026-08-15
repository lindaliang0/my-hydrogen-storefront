import {
  createSchema,
  type HydrogenComponentProps,
  type WeaverseImage,
} from "@weaverse/hydrogen";
import { useRef } from "react";
import heroBgFallback from "~/assets/silua/hero-bg-full.jpg";
import { getImageUrl, useSiluaReveal } from "~/utils/silua";

interface SiluaHeroProps extends HydrogenComponentProps {
  image: WeaverseImage | string;
  eyebrow: string;
  title: string;
  sub: string;
  cta1Label: string;
  cta1Url: string;
  cta2Label: string;
  cta2Url: string;
  marqueeText: string;
  bottomVolumeLabel: string;
  bottomVolumeValue: string;
  bottomOriginLabel: string;
  bottomOriginValue: string;
  bottomRitualLabel: string;
  bottomRitualValue: string;
}

function SiluaHero(props: SiluaHeroProps) {
  const {
    image,
    eyebrow,
    title,
    sub,
    cta1Label,
    cta1Url,
    cta2Label,
    cta2Url,
    marqueeText,
    bottomVolumeLabel,
    bottomVolumeValue,
    bottomOriginLabel,
    bottomOriginValue,
    bottomRitualLabel,
    bottomRitualValue,
    ...rest
  } = props;
  const rootRef = useRef<HTMLElement>(null);
  useSiluaReveal(rootRef);

  const bgUrl = getImageUrl(image) ?? heroBgFallback;
  const marqueeItems = marqueeText
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <section {...rest} ref={rootRef} className="silua-home hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${bgUrl})` }} />

      <div className="hero-content">
        <div className="hero-inner reveal">
          {eyebrow && (
            <div className="hero-meta">
              <span className="eyebrow" style={{ color: "var(--clay-light)" }}>
                {eyebrow}
              </span>
            </div>
          )}
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          {sub && <p className="hero-sub">{sub}</p>}
          <div className="hero-cta-row">
            <a href={cta1Url} className="hero-cta">
              {cta1Label}
            </a>
            <a href={cta2Url} className="hero-cta ghost">
              {cta2Label}
            </a>
          </div>
        </div>
      </div>

      {marqueeItems.length > 0 && (
        <div className="hero-marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div>
      )}

      <div className="hero-bottom-bar">
        <div className="hero-bottom-bar-inner">
          <div className="grouped">
            <div>
              <span className="label">{bottomVolumeLabel}</span>
              <span className="value">{bottomVolumeValue}</span>
            </div>
            <div>
              <span className="label">{bottomOriginLabel}</span>
              <span className="value">{bottomOriginValue}</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className="label">{bottomRitualLabel}</span>
            <span className="value">{bottomRitualValue}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SiluaHero;

export const schema = createSchema({
  type: "silua-hero",
  title: "Silua - Hero Banner",
  limit: 1,
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "eyebrow",
          label: "Eyebrow",
          defaultValue: "丝露雅 · Mindful Activation · Volume I / MMXXVI",
        },
        {
          type: "richtext",
          name: "title",
          label: "Title",
          defaultValue: "Find Your <em>Inner</em><br/>Silua.",
        },
        {
          type: "textarea",
          name: "sub",
          label: "Subtitle",
          defaultValue:
            "Silence meets moonlight — a tangible reminder that gentle strength is still strength. Worn as a quiet companion, not a promise.",
        },
      ],
    },
    {
      group: "Buttons",
      inputs: [
        {
          type: "text",
          name: "cta1Label",
          label: "Primary button label",
          defaultValue: "Enter the Collection",
        },
        {
          type: "url",
          name: "cta1Url",
          label: "Primary button link",
          defaultValue: "#collection",
        },
        {
          type: "text",
          name: "cta2Label",
          label: "Secondary button label",
          defaultValue: "Read our Story",
        },
        {
          type: "url",
          name: "cta2Url",
          label: "Secondary button link",
          defaultValue: "#story",
        },
      ],
    },
    {
      group: "Image",
      inputs: [
        {
          type: "image",
          name: "image",
          label: "Background image",
        },
      ],
    },
    {
      group: "Marquee & info bar",
      inputs: [
        {
          type: "textarea",
          name: "marqueeText",
          label: "Marquee items (one per line)",
          defaultValue:
            "Silence + Luna = Silua\n· 寂静月光 ·\nFind Your Inner Silua\n· 丝露雅 ·\nThe Quiet Light That Guides You Home\n· 寂静月光 ·\nSilence + Luna = Silua\n· 丝露雅 ·",
        },
        {
          type: "text",
          name: "bottomVolumeLabel",
          label: "Volume label",
          defaultValue: "Volume",
        },
        {
          type: "text",
          name: "bottomVolumeValue",
          label: "Volume value",
          defaultValue: "I / MMXXVI",
        },
        {
          type: "text",
          name: "bottomOriginLabel",
          label: "Origin label",
          defaultValue: "Origin",
        },
        {
          type: "text",
          name: "bottomOriginValue",
          label: "Origin value",
          defaultValue: "Deep Valley · China",
        },
        {
          type: "text",
          name: "bottomRitualLabel",
          label: "Ritual label",
          defaultValue: "Ritual",
        },
        {
          type: "text",
          name: "bottomRitualValue",
          label: "Ritual value",
          defaultValue: "Resonance Attunement",
        },
      ],
    },
  ],
  presets: {
    eyebrow: "丝露雅 · Mindful Activation · Volume I / MMXXVI",
    title: "Find Your <em>Inner</em><br/>Silua.",
    sub: "Silence meets moonlight — a tangible reminder that gentle strength is still strength. Worn as a quiet companion, not a promise.",
    cta1Label: "Enter the Collection",
    cta1Url: "#collection",
    cta2Label: "Read our Story",
    cta2Url: "#story",
    image: {
      url: "/app/assets/silua/hero-bg-full.jpg",
      altText: "Silua hero background",
    },
    marqueeText:
      "Silence + Luna = Silua\n· 寂静月光 ·\nFind Your Inner Silua\n· 丝露雅 ·\nThe Quiet Light That Guides You Home\n· 寂静月光 ·\nSilence + Luna = Silua\n· 丝露雅 ·",
    bottomVolumeLabel: "Volume",
    bottomVolumeValue: "I / MMXXVI",
    bottomOriginLabel: "Origin",
    bottomOriginValue: "Deep Valley · China",
    bottomRitualLabel: "Ritual",
    bottomRitualValue: "Resonance Attunement",
  },
});
