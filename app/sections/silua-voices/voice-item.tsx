import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";

interface SiluaVoiceItemProps extends HydrogenComponentProps {
  text: string;
  translation: string;
  name: string;
  role: string;
  product: string;
}

function SiluaVoiceItem(props: SiluaVoiceItemProps) {
  const { text, translation, name, role, product, ...rest } = props;

  return (
    <div {...rest} className="voice-card reveal">
      <div className="voice-stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>★</span>
        ))}
      </div>
      <span className="voice-quote-mark">&quot;</span>
      <p className="voice-text">
        {text}
        {translation && <em>{translation}</em>}
      </p>
      <div className="voice-foot">
        <div className="voice-attr">
          <div className="name">{name}</div>
          <div className="role">{role}</div>
        </div>
        <div className="voice-product">
          Wearing
          <em>{product}</em>
        </div>
      </div>
    </div>
  );
}

export default SiluaVoiceItem;

export const schema = createSchema({
  type: "silua-voice-item",
  title: "Silua - Voice item",
  settings: [
    {
      group: "Voice",
      inputs: [
        {
          type: "textarea",
          name: "text",
          label: "Quote",
          defaultValue: "Quote from a verified buyer.",
        },
        {
          type: "textarea",
          name: "translation",
          label: "Translation (optional)",
          defaultValue: "",
        },
        {
          type: "text",
          name: "name",
          label: "Name",
          defaultValue: "Verified Buyer",
        },
        {
          type: "text",
          name: "role",
          label: "Role",
          defaultValue: "Verified Buyer",
        },
        {
          type: "text",
          name: "product",
          label: "Product worn",
          defaultValue: "The Peace Circle",
        },
      ],
    },
  ],
});
