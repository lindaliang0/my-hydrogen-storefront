import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { useRef } from "react";
import { useSiluaReveal } from "~/utils/silua";

interface SiluaTalismansProps extends HydrogenComponentProps {
  anchorId: string;
  num: string;
  title: string;
  desc: string;
}

function SiluaTalismans(props: SiluaTalismansProps) {
  const { anchorId, num, title, desc, children, ...rest } = props;
  const rootRef = useRef<HTMLElement>(null);
  useSiluaReveal(rootRef);

  return (
    <section
      {...rest}
      ref={rootRef}
      className="silua-home silua-section talismans dark-section"
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

      <div className="talisman-grid">{children}</div>
    </section>
  );
}

export default SiluaTalismans;

export const schema = createSchema({
  type: "silua-talismans",
  title: "Silua - Four Talismans",
  limit: 1,
  childTypes: ["silua-talisman-item"],
  settings: [
    {
      group: "Section header",
      inputs: [
        {
          type: "text",
          name: "anchorId",
          label: "Anchor ID",
          defaultValue: "collection",
        },
        {
          type: "text",
          name: "num",
          label: "Section number",
          defaultValue: "ii. The Collection",
        },
        {
          type: "richtext",
          name: "title",
          label: "Title",
          defaultValue: "Four <em>talismans.</em><br/>Four intentions.",
        },
        {
          type: "textarea",
          name: "desc",
          label: "Description",
          defaultValue:
            "Symbols that have guided seekers for millennia — now, they guide you.",
        },
      ],
    },
  ],
  presets: {
    anchorId: "collection",
    num: "ii. The Collection",
    title: "Four <em>talismans.</em><br/>Four intentions.",
    desc: "Symbols that have guided seekers for millennia — now, they guide you.",
    children: [
      {
        type: "silua-talisman-item",
        num: "i.",
        cn: "平安扣",
        name: "The Peace Circle",
        tag: "The anchor of stillness.",
        desc: "A minimalist mandala. Trace the outer rim, find the still point, breathe. Peace isn't a destination — it's a center you already possess.",
        image: {
          url: "/app/assets/silua/bracelet-peace-circle.jpg",
          altText: "The Peace Circle bracelet",
        },
        url: "#",
      },
      {
        type: "silua-talisman-item",
        num: "ii.",
        cn: "葫芦",
        name: "Wu Lou",
        tag: "The vessel of vitality.",
        desc: "Your energy is your most sacred asset. A portable reminder to protect the flame — to stay fueled, not just busy.",
        image: {
          url: "/app/assets/silua/product-wulou.jpg",
          altText: "Wu Lou charm",
        },
        url: "#",
      },
      {
        type: "silua-talisman-item",
        num: "iii.",
        cn: "莲花",
        name: "Lotus",
        tag: "The emergence pendant.",
        desc: "In the darkest water, roots grow furiously. Your challenges aren't obstacles — they're your nutrients. Bloom in any uncertainty.",
        image: {
          url: "/app/assets/silua/product-lotus.jpg",
          altText: "Lotus pendant",
        },
        url: "#",
      },
      {
        type: "silua-talisman-item",
        num: "iv.",
        cn: "貔貅",
        name: "Pi Xiu",
        tag: "The magnet for abundance.",
        desc: "Prosperity follows the frequency of confidence. A vibrational attractor — the certainty that there is, and always will be, enough.",
        image: {
          url: "/app/assets/silua/product-pixiu.jpg",
          altText: "Pi Xiu bracelet",
        },
        url: "#",
      },
    ],
  },
});
