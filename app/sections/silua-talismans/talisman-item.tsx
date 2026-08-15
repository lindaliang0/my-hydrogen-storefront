import {
  createSchema,
  type HydrogenComponentProps,
  type WeaverseImage,
} from "@weaverse/hydrogen";
import peaceCircleFallback from "~/assets/silua/bracelet-peace-circle.jpg";
import { getImageUrl } from "~/utils/silua";

interface SiluaTalismanItemProps extends HydrogenComponentProps {
  num: string;
  cn: string;
  name: string;
  tag: string;
  desc: string;
  image: WeaverseImage | string;
  url: string;
}

function SiluaTalismanItem(props: SiluaTalismanItemProps) {
  const { num, cn, name, tag, desc, image, url, ...rest } = props;
  const imageUrl = getImageUrl(image) ?? peaceCircleFallback;

  return (
    <div {...rest} className="talisman-card reveal">
      <div
        className="talisman-img"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <span className="talisman-num">{num}</span>
        <span className="talisman-cn">{cn}</span>
      </div>
      <div className="talisman-info">
        <h3 className="talisman-name">{name}</h3>
        <p className="talisman-tag">{tag}</p>
        <p className="talisman-desc">{desc}</p>
        <a href={url} className="talisman-arrow">
          <span>Discover</span>
          <span>→</span>
        </a>
      </div>
    </div>
  );
}

export default SiluaTalismanItem;

export const schema = createSchema({
  type: "silua-talisman-item",
  title: "Silua - Talisman item",
  settings: [
    {
      group: "Talisman",
      inputs: [
        {
          type: "text",
          name: "num",
          label: "Number",
          defaultValue: "i.",
        },
        {
          type: "text",
          name: "cn",
          label: "Chinese name",
          defaultValue: "平安扣",
        },
        {
          type: "text",
          name: "name",
          label: "Name",
          defaultValue: "The Peace Circle",
        },
        {
          type: "text",
          name: "tag",
          label: "Tagline",
          defaultValue: "The anchor of stillness.",
        },
        {
          type: "textarea",
          name: "desc",
          label: "Description",
          defaultValue:
            "A minimalist mandala. Trace the outer rim, find the still point, breathe.",
        },
        {
          type: "image",
          name: "image",
          label: "Image",
        },
        {
          type: "url",
          name: "url",
          label: "Discover link",
          defaultValue: "#",
        },
      ],
    },
  ],
});
