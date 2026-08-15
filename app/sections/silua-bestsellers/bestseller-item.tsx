import {
  createSchema,
  type HydrogenComponentProps,
  type WeaverseImage,
} from "@weaverse/hydrogen";
import redRoseFallback from "~/assets/silua/bracelet-red-rose.jpg";
import { getImageUrl } from "~/utils/silua";

interface SiluaBestsellerItemProps extends HydrogenComponentProps {
  badge: "signature" | "gold" | "new";
  badgeLabel: string;
  meta: string;
  metaRight: string;
  name: string;
  cn: string;
  material: string;
  price: string;
  oldPrice: string;
  image: WeaverseImage | string;
  imageBg: string;
  url: string;
}

function SiluaBestsellerItem(props: SiluaBestsellerItemProps) {
  const {
    badge,
    badgeLabel,
    meta,
    metaRight,
    name,
    cn,
    material,
    price,
    oldPrice,
    image,
    imageBg,
    url,
    ...rest
  } = props;
  const imageUrl = getImageUrl(image) ?? redRoseFallback;
  const badgeClass = badge === "signature" ? "" : badge;

  return (
    <article {...rest} className="best-card reveal">
      <div
        className="best-img"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundColor: imageBg,
        }}
      >
        <span className={`best-badge ${badgeClass}`}>{badgeLabel}</span>
        <div className="best-fav" role="button" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24">
            <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
          </svg>
        </div>
      </div>
      <div className="best-body">
        <div className="best-meta">
          <span>{meta}</span>
          <span>{metaRight}</span>
        </div>
        <h3 className="best-name">{name}</h3>
        <p className="best-cn">{cn}</p>
        <p className="best-material">{material}</p>
        <div className="best-foot">
          <div className="best-price">
            {price}
            {oldPrice && <span className="old">{oldPrice}</span>}
          </div>
          <a href={url} className="best-btn">
            Add to Bag
          </a>
        </div>
      </div>
    </article>
  );
}

export default SiluaBestsellerItem;

export const schema = createSchema({
  type: "silua-bestseller-item",
  title: "Silua - Bestseller item",
  settings: [
    {
      group: "Product",
      inputs: [
        {
          type: "select",
          name: "badge",
          label: "Badge style",
          configs: {
            options: [
              { value: "signature", label: "Signature" },
              { value: "gold", label: "Gold" },
              { value: "new", label: "New" },
            ],
          },
          defaultValue: "signature",
        },
        {
          type: "text",
          name: "badgeLabel",
          label: "Badge label",
          defaultValue: "Signature",
        },
        {
          type: "text",
          name: "meta",
          label: "Meta left",
          defaultValue: "Bracelet · 平安扣",
        },
        {
          type: "text",
          name: "metaRight",
          label: "Meta right",
          defaultValue: "The Peace Circle",
        },
        {
          type: "text",
          name: "name",
          label: "Name",
          defaultValue: "Rose Quartz & South Red Agate",
        },
        {
          type: "text",
          name: "cn",
          label: "Chinese name",
          defaultValue: "寂静之锚 · Anchor of Stillness",
        },
        {
          type: "textarea",
          name: "material",
          label: "Material",
          defaultValue:
            "South red agate beads, hand-carved rose quartz rosette.",
        },
        {
          type: "text",
          name: "price",
          label: "Price",
          defaultValue: "$248",
        },
        {
          type: "text",
          name: "oldPrice",
          label: "Compare-at price",
          defaultValue: "",
        },
        {
          type: "image",
          name: "image",
          label: "Image",
        },
        {
          type: "color",
          name: "imageBg",
          label: "Image background",
          defaultValue: "#EDE4D3",
        },
        {
          type: "url",
          name: "url",
          label: "Product link",
          defaultValue: "#",
        },
      ],
    },
  ],
});
