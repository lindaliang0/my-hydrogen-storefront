import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { useRef } from "react";
import { useSiluaReveal } from "~/utils/silua";

interface SiluaVoicesProps extends HydrogenComponentProps {
  anchorId: string;
  num: string;
  title: string;
  desc: string;
}

function SiluaVoices(props: SiluaVoicesProps) {
  const { anchorId, num, title, desc, children, ...rest } = props;
  const rootRef = useRef<HTMLElement>(null);
  useSiluaReveal(rootRef);

  return (
    <section
      {...rest}
      ref={rootRef}
      className="silua-home silua-section voices"
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

      <div className="voices-grid">{children}</div>
    </section>
  );
}

export default SiluaVoices;

export const schema = createSchema({
  type: "silua-voices",
  title: "Silua - Voices",
  limit: 1,
  childTypes: ["silua-voice-item"],
  settings: [
    {
      group: "Section header",
      inputs: [
        {
          type: "text",
          name: "anchorId",
          label: "Anchor ID",
          defaultValue: "voices",
        },
        {
          type: "text",
          name: "num",
          label: "Section number",
          defaultValue: "iv. Voices",
        },
        {
          type: "richtext",
          name: "title",
          label: "Title",
          defaultValue: "Notes from the <em>quiet</em> ones.",
        },
        {
          type: "textarea",
          name: "desc",
          label: "Description",
          defaultValue: "Real moments, real returns to center.",
        },
      ],
    },
  ],
  presets: {
    anchorId: "voices",
    num: "iv. Voices",
    title: "Notes from the <em>quiet</em> ones.",
    desc: "Real moments, real returns to center.",
    children: [
      {
        type: "silua-voice-item",
        text: "In the restroom before my pitch, I held it. Three breaths. I remembered who I was, not just my valuation.",
        translation:
          "在融资路演的洗手间里，我握着它。三次呼吸。我记起了我是谁，而不只是我的估值。",
        name: "Elena Whitmore",
        role: "Founder · Verified Buyer",
        product: "The Peace Circle",
      },
      {
        type: "silua-voice-item",
        text: "The year we almost died, I touched this lotus daily. It reminded me: in the darkest water, roots grow furiously. We were profitable the next year.",
        name: "Amara Okonkwo",
        role: "Studio Director · Verified Buyer",
        product: "Lotus Pendant",
      },
      {
        type: "silua-voice-item",
        text: "In the chaos of a hyper-growth phase, my energy was leaking everywhere. Touching the Wu Lou before a high-stakes call became my activation ritual.",
        name: "Sofia Marchetti",
        role: "Yoga Teacher · Verified Buyer",
        product: "Wu Lou Charm",
      },
      {
        type: "silua-voice-item",
        text: "I used to think wealth was something to chase. Now I know it's something to attract. Silua kept my vision clear during the pivot — we doubled our revenue.",
        name: "Isolde Fenn",
        role: "Investor · Verified Buyer",
        product: "Pi Xiu Bracelet",
      },
    ],
  },
});
