import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { useRef } from "react";
import { useSiluaReveal } from "~/utils/silua";

interface SiluaBestsellersProps extends HydrogenComponentProps {
  anchorId: string;
  num: string;
  title: string;
  desc: string;
}

function SiluaBestsellers(props: SiluaBestsellersProps) {
  const { anchorId, num, title, desc, children, ...rest } = props;
  const rootRef = useRef<HTMLElement>(null);
  useSiluaReveal(rootRef);

  return (
    <section
      {...rest}
      ref={rootRef}
      className="silua-home silua-section bestsellers"
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

      <div className="best-grid">{children}</div>
    </section>
  );
}

export default SiluaBestsellers;

export const schema = createSchema({
  type: "silua-bestsellers",
  title: "Silua - Bestsellers",
  limit: 1,
  childTypes: ["silua-bestseller-item"],
  settings: [
    {
      group: "Section header",
      inputs: [
        {
          type: "text",
          name: "anchorId",
          label: "Anchor ID",
          defaultValue: "bestsellers",
        },
        {
          type: "text",
          name: "num",
          label: "Section number",
          defaultValue: "iii. Bestsellers",
        },
        {
          type: "richtext",
          name: "title",
          label: "Title",
          defaultValue: "Worn by those who have <em>learned to pause.</em>",
        },
        {
          type: "textarea",
          name: "desc",
          label: "Description",
          defaultValue: "The three pieces most often chosen as a first Silua.",
        },
      ],
    },
  ],
  presets: {
    anchorId: "bestsellers",
    num: "iii. Bestsellers",
    title: "Worn by those who have <em>learned to pause.</em>",
    desc: "The three pieces most often chosen as a first Silua.",
    children: [
      {
        type: "silua-bestseller-item",
        badge: "signature",
        badgeLabel: "Signature",
        meta: "Bracelet · 平安扣",
        metaRight: "The Peace Circle",
        name: "Rose Quartz & South Red Agate",
        cn: "寂静之锚 · Anchor of Stillness",
        material:
          'South red agate beads, hand-carved rose quartz rosette, jade guardian bead, gold-plated signature "S" tag. 316L medical-grade steel, PVD 18K gold.',
        price: "$248",
        oldPrice: "$298",
        image: {
          url: "/app/assets/silua/bracelet-red-rose.jpg",
          altText: "Rose Quartz & South Red Agate bracelet",
        },
        url: "#",
      },
      {
        type: "silua-bestseller-item",
        badge: "gold",
        badgeLabel: "Bestseller",
        meta: "Bracelet · 平安扣",
        metaRight: "Woodland Edition",
        name: "Green Jade Peace Circle",
        cn: "静止之圆 · Portable Mandala",
        material:
          "Genuine Hetian jade circle, milk crystal beads, twin agate accents.",
        price: "$198",
        image: {
          url: "/app/assets/silua/bracelet-peace-circle.jpg",
          altText: "Green Jade Peace Circle bracelet",
        },
        url: "#",
      },
      {
        type: "silua-bestseller-item",
        badge: "new",
        badgeLabel: "New",
        meta: "Charm · 签名吊牌",
        metaRight: 'Signature "S"',
        name: "The Silua Signature Tag",
        cn: "灵魂标识 · Physical Fingerprint",
        material:
          "The physical fingerprint of Silua. 316L steel, PVD 18K vacuum gold plate, polished mirror finish.",
        price: "$98",
        image: {
          url: "/app/assets/silua/silua-tag.jpg",
          altText: "The Silua Signature Tag",
        },
        url: "#",
      },
    ],
  },
});
