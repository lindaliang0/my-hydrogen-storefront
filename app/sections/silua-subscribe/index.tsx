import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { romanize, useSiluaReveal } from "~/utils/silua";

interface SiluaSubscribeProps extends HydrogenComponentProps {
  numEyebrow: string;
  title: string;
  desc: string;
  features: string;
  cardEyebrow: string;
  cardTitle: string;
  note: string;
  consent: string;
  submitLabel: string;
  benefits: string;
}

function SiluaSubscribe(props: SiluaSubscribeProps) {
  const {
    numEyebrow,
    title,
    desc,
    features,
    cardEyebrow,
    cardTitle,
    note,
    consent,
    submitLabel,
    benefits,
    ...rest
  } = props;
  const rootRef = useRef<HTMLElement>(null);
  useSiluaReveal(rootRef);

  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sent");
  };

  const featureItems = features
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const benefitItems = benefits
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section {...rest} ref={rootRef} className="silua-home subscribe">
      <div className="subscribe-grid">
        <div className="subscribe-left reveal">
          <span className="num-eyebrow">{numEyebrow}</span>
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
          <p>{desc}</p>

          <div className="subscribe-features">
            {featureItems.map((feature, index) => (
              <div className="sub-feature" key={feature}>
                <span className="num">{romanize(index + 1)}.</span>
                <span className="txt">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="subscribe-right reveal">
          <span className="card-eyebrow">{cardEyebrow}</span>
          <h3 dangerouslySetInnerHTML={{ __html: cardTitle }} />
          <p className="note">{note}</p>

          <form onSubmit={handleSubmit}>
            <div className="field-row">
              <input type="email" placeholder="your.email@quiet.co" required />
              <button type="submit">
                {status === "sent" ? "Sent — check your inbox." : submitLabel}
              </button>
            </div>
            <label className="checkbox-row">
              <input type="checkbox" defaultChecked />
              <span>{consent}</span>
            </label>
          </form>

          <div className="subscribe-benefits">
            {benefitItems.map((benefit) => (
              <span key={benefit}>{benefit}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SiluaSubscribe;

export const schema = createSchema({
  type: "silua-subscribe",
  title: "Silua - Journal Subscribe",
  limit: 1,
  settings: [
    {
      group: "Left column",
      inputs: [
        {
          type: "text",
          name: "numEyebrow",
          label: "Eyebrow",
          defaultValue: "vi. The Silua Journal",
        },
        {
          type: "richtext",
          name: "title",
          label: "Title",
          defaultValue: "Letters<br/>from the <em>quiet.</em>",
        },
        {
          type: "textarea",
          name: "desc",
          label: "Description",
          defaultValue:
            "A slow letter — arriving on the first Monday of each month. Meditations, atelier notes, and the occasional first look at a piece before it becomes public.",
        },
        {
          type: "textarea",
          name: "features",
          label: "Features (one per line)",
          defaultValue:
            "One thoughtful letter a month — never a promotion.\nRituals, mantras & guided pauses.\nFirst look at limited-edition drops.\nUnsubscribe with one quiet click.",
        },
      ],
    },
    {
      group: "Right column",
      inputs: [
        {
          type: "text",
          name: "cardEyebrow",
          label: "Card eyebrow",
          defaultValue: "Subscribe — Free",
        },
        {
          type: "richtext",
          name: "cardTitle",
          label: "Card title",
          defaultValue:
            "Receive our <em>monthly letter</em>, and 10% off your first Silua.",
        },
        {
          type: "textarea",
          name: "note",
          label: "Note",
          defaultValue:
            "Enter your email below. We'll send you a welcome ritual, a meditation guide, and a private code for your first piece.",
        },
        {
          type: "textarea",
          name: "consent",
          label: "Consent text",
          defaultValue:
            "I'd like to receive occasional letters & ritual invitations from Silua. Unsubscribe anytime.",
        },
        {
          type: "text",
          name: "submitLabel",
          label: "Submit button label",
          defaultValue: "Subscribe",
        },
        {
          type: "textarea",
          name: "benefits",
          label: "Benefits (one per line)",
          defaultValue: "10% welcome\nMembers-only drops\nPrivate previews",
        },
      ],
    },
  ],
  presets: {
    numEyebrow: "vi. The Silua Journal",
    title: "Letters<br/>from the <em>quiet.</em>",
    desc: "A slow letter — arriving on the first Monday of each month. Meditations, atelier notes, and the occasional first look at a piece before it becomes public.",
    features:
      "One thoughtful letter a month — never a promotion.\nRituals, mantras & guided pauses.\nFirst look at limited-edition drops.\nUnsubscribe with one quiet click.",
    cardEyebrow: "Subscribe — Free",
    cardTitle:
      "Receive our <em>monthly letter</em>, and 10% off your first Silua.",
    note: "Enter your email below. We'll send you a welcome ritual, a meditation guide, and a private code for your first piece.",
    consent:
      "I'd like to receive occasional letters & ritual invitations from Silua. Unsubscribe anytime.",
    submitLabel: "Subscribe",
    benefits: "10% welcome\nMembers-only drops\nPrivate previews",
  },
});
