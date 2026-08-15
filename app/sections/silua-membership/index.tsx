import {
  createSchema,
  type HydrogenComponentProps,
  type WeaverseImage,
} from "@weaverse/hydrogen";
import type { CSSProperties } from "react";
import { useRef } from "react";
import storyMountainFallback from "~/assets/silua/story-mountain.jpg";
import { getImageUrl, useSiluaReveal } from "~/utils/silua";

interface SiluaMembershipProps extends HydrogenComponentProps {
  anchorId: string;
  num: string;
  title: string;
  desc: string;
  bgImage: WeaverseImage | string;
  introTitle: string;
  introDesc: string;
  perksHeading: string;
  perks: string;
}

function SiluaMembership(props: SiluaMembershipProps) {
  const {
    anchorId,
    num,
    title,
    desc,
    bgImage,
    introTitle,
    introDesc,
    perksHeading,
    perks,
    children,
    ...rest
  } = props;
  const rootRef = useRef<HTMLElement>(null);
  useSiluaReveal(rootRef);

  const bgUrl = getImageUrl(bgImage) ?? storyMountainFallback;
  const perkItems = perks
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section
      {...rest}
      ref={rootRef}
      className="silua-home silua-section membership"
      style={{ "--membership-bg": `url(${bgUrl})` } as CSSProperties}
      {...(anchorId ? { id: anchorId } : {})}
    >
      <div className="section-header reveal">
        <div className="section-num">{num}</div>
        <div className="section-title-row">
          <h2
            className="section-title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="section-desc">{desc}</p>
        </div>
      </div>

      <div className="member-grid">
        <div className="member-intro reveal">
          <h2 dangerouslySetInnerHTML={{ __html: introTitle }} />
          <p>{introDesc}</p>
          <div className="member-perks">
            <h5>{perksHeading}</h5>
            <ul>
              {perkItems.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="tier-list reveal">{children}</div>
      </div>
    </section>
  );
}

export default SiluaMembership;

export const schema = createSchema({
  type: "silua-membership",
  title: "Silua - Circle Membership",
  limit: 1,
  childTypes: ["silua-tier"],
  settings: [
    {
      group: "Section header",
      inputs: [
        {
          type: "text",
          name: "anchorId",
          label: "Anchor ID",
          defaultValue: "membership",
        },
        {
          type: "text",
          name: "num",
          label: "Section number",
          defaultValue: "v. Circle Silua",
        },
        {
          type: "richtext",
          name: "title",
          label: "Title",
          defaultValue: "A quiet <em>circle</em> for those who return.",
        },
        {
          type: "textarea",
          name: "desc",
          label: "Description",
          defaultValue:
            "Membership isn't a discount — it's a deeper relationship with the ritual.",
        },
      ],
    },
    {
      group: "Background",
      inputs: [
        {
          type: "image",
          name: "bgImage",
          label: "Background image",
        },
      ],
    },
    {
      group: "Intro",
      inputs: [
        {
          type: "richtext",
          name: "introTitle",
          label: "Intro title",
          defaultValue: "Silua<br/><em>Circle.</em>",
        },
        {
          type: "textarea",
          name: "introDesc",
          label: "Intro description",
          defaultValue:
            "Membership at Silua is a threshold, not a transaction. Each tier deepens your relationship with the mountain, the ritual, and the atelier behind every piece.",
        },
        {
          type: "text",
          name: "perksHeading",
          label: "Perks heading",
          defaultValue: "What every member receives",
        },
        {
          type: "textarea",
          name: "perks",
          label: "Perks (one per line)",
          defaultValue:
            "Complimentary Resonance Ritual on every piece\nSilua Journal — quarterly print letters\nMembers-only atelier drops & pre-releases\nComplimentary re-attunement every 12 months\nInvitations to Silua salons & meditation circles",
        },
      ],
    },
  ],
  presets: {
    anchorId: "membership",
    num: "v. Circle Silua",
    title: "A quiet <em>circle</em> for those who return.",
    desc: "Membership isn't a discount — it's a deeper relationship with the ritual.",
    bgImage: {
      url: "/app/assets/silua/story-mountain.jpg",
      altText: "Silua membership background",
    },
    introTitle: "Silua<br/><em>Circle.</em>",
    introDesc:
      "Membership at Silua is a threshold, not a transaction. Each tier deepens your relationship with the mountain, the ritual, and the atelier behind every piece.",
    perksHeading: "What every member receives",
    perks:
      "Complimentary Resonance Ritual on every piece\nSilua Journal — quarterly print letters\nMembers-only atelier drops & pre-releases\nComplimentary re-attunement every 12 months\nInvitations to Silua salons & meditation circles",
    children: [
      {
        type: "silua-tier",
        name: "Novice",
        cn: "寂 · The Threshold",
        benefits:
          "Journal subscription · 10% first-piece courtesy · early access to seasonal drops · complimentary gift wrap.",
        price: "Free",
        per: "On sign-up",
        cta: "Join Silently",
      },
      {
        type: "silua-tier",
        name: "Attuned",
        cn: "露 · The Companion",
        benefits:
          "Everything in Novice · 15% year-round · quarterly Ritual Box · complimentary engraving · access to Silua salons & meditation circles.",
        price: "$48",
        per: "Per year",
        cta: "Enter the Circle",
        featured: true,
        badge: "Most Chosen",
      },
      {
        type: "silua-tier",
        name: "Luminary",
        cn: "雅 · The Keeper",
        benefits:
          "Everything in Attuned · 20% year-round · private curator concierge · first access to limited editions · annual atelier retreat invitation.",
        price: "By Invitation",
        per: "Or $248 / year",
        cta: "Request Access",
      },
    ],
  },
});
