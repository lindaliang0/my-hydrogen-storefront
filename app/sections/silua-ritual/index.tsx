import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { useRef } from "react";
import { useSiluaReveal } from "~/utils/silua";

interface SiluaRitualProps extends HydrogenComponentProps {
  eyebrow: string;
  title: string;
  sub: string;
  linkLabel: string;
  linkUrl: string;
}

function SiluaRitual(props: SiluaRitualProps) {
  const { eyebrow, title, sub, linkLabel, linkUrl, ...rest } = props;
  const rootRef = useRef<HTMLElement>(null);
  useSiluaReveal(rootRef);

  return (
    <section {...rest} ref={rootRef} className="silua-home ritual-strip">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h3 dangerouslySetInnerHTML={{ __html: title }} />
      {sub && <p className="sub">{sub}</p>}
      <a href={linkUrl} className="ritual-link">
        {linkLabel} →
      </a>
    </section>
  );
}

export default SiluaRitual;

export const schema = createSchema({
  type: "silua-ritual",
  title: "Silua - Ritual Strip",
  limit: 1,
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "eyebrow",
          label: "Eyebrow",
          defaultValue: "The Mindful Activation",
        },
        {
          type: "richtext",
          name: "title",
          label: "Title",
          defaultValue:
            "Every Silua piece begins as a journey<br/><em>from mountain to mind.</em>",
        },
        {
          type: "textarea",
          name: "sub",
          label: "Description",
          defaultValue:
            "True calm isn't manufactured — it's awakened. Each gemstone is attuned in a natural acoustic sanctuary, absorbing the rhythm of nature and low-frequency temple resonance.",
        },
        {
          type: "text",
          name: "linkLabel",
          label: "Link label",
          defaultValue: "Discover the Resonance Ritual",
        },
        {
          type: "url",
          name: "linkUrl",
          label: "Link URL",
          defaultValue: "#",
        },
      ],
    },
  ],
  presets: {
    eyebrow: "The Mindful Activation",
    title:
      "Every Silua piece begins as a journey<br/><em>from mountain to mind.</em>",
    sub: "True calm isn't manufactured — it's awakened. Each gemstone is attuned in a natural acoustic sanctuary, absorbing the rhythm of nature and low-frequency temple resonance.",
    linkLabel: "Discover the Resonance Ritual",
    linkUrl: "#",
  },
});
