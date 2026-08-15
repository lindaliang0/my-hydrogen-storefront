import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";

interface SiluaTierProps extends HydrogenComponentProps {
  name: string;
  cn: string;
  benefits: string;
  price: string;
  per: string;
  cta: string;
  featured: boolean;
  badge: string;
}

function SiluaTier(props: SiluaTierProps) {
  const { name, cn, benefits, price, per, cta, featured, badge, ...rest } =
    props;

  return (
    <div {...rest} className={featured ? "tier featured" : "tier"}>
      {badge && <span className="tier-badge">{badge}</span>}
      <div className="tier-head">
        <div className="tier-name">{name}</div>
        <div className="tier-cn">{cn}</div>
      </div>
      <div className="tier-benefits">{benefits}</div>
      <div>
        <div className="tier-price">
          {price}
          <span className="per">{per}</span>
        </div>
        <a href="#" className="tier-cta">
          {cta}
        </a>
      </div>
    </div>
  );
}

export default SiluaTier;

export const schema = createSchema({
  type: "silua-tier",
  title: "Silua - Membership tier",
  settings: [
    {
      group: "Tier",
      inputs: [
        {
          type: "text",
          name: "name",
          label: "Name",
          defaultValue: "Novice",
        },
        {
          type: "text",
          name: "cn",
          label: "Chinese name",
          defaultValue: "寂 · The Threshold",
        },
        {
          type: "textarea",
          name: "benefits",
          label: "Benefits",
          defaultValue:
            "Journal subscription · 10% first-piece courtesy · early access to seasonal drops.",
        },
        {
          type: "text",
          name: "price",
          label: "Price",
          defaultValue: "Free",
        },
        {
          type: "text",
          name: "per",
          label: "Period",
          defaultValue: "On sign-up",
        },
        {
          type: "text",
          name: "cta",
          label: "Button label",
          defaultValue: "Join Silently",
        },
        {
          type: "switch",
          name: "featured",
          label: "Featured tier",
          defaultValue: false,
        },
        {
          type: "text",
          name: "badge",
          label: "Badge (optional)",
          defaultValue: "",
        },
      ],
    },
  ],
});
