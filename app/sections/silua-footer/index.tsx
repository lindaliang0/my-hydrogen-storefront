import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";

interface SiluaFooterProps extends HydrogenComponentProps {
  brandMark: string;
  tagline: string;
  cn: string;
  col1Title: string;
  col1Links: string;
  col2Title: string;
  col2Links: string;
  col3Title: string;
  col3Links: string;
  bottomLeft: string;
  bottomCenter: string;
  bottomRight: string;
}

function SiluaFooter(props: SiluaFooterProps) {
  const {
    brandMark,
    tagline,
    cn,
    col1Title,
    col1Links,
    col2Title,
    col2Links,
    col3Title,
    col3Links,
    bottomLeft,
    bottomCenter,
    bottomRight,
    ...rest
  } = props;

  const columns = [
    { title: col1Title, links: col1Links },
    { title: col2Title, links: col2Links },
    { title: col3Title, links: col3Links },
  ].map((column) => ({
    title: column.title,
    links: column.links
      .split("\n")
      .map((link) => link.trim())
      .filter(Boolean),
  }));

  return (
    <footer {...rest} className="silua-home silua-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="mark">{brandMark}</span>
          <p>{tagline}</p>
          <div className="cn">{cn}</div>
        </div>
        {columns.map((column) => (
          <div className="footer-col" key={column.title}>
            <h5>{column.title}</h5>
            <ul>
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <div>{bottomLeft}</div>
        <div className="cred">{bottomCenter}</div>
        <div>{bottomRight}</div>
      </div>
    </footer>
  );
}

export default SiluaFooter;

export const schema = createSchema({
  type: "silua-footer",
  title: "Silua - Footer",
  limit: 1,
  settings: [
    {
      group: "Brand",
      inputs: [
        {
          type: "text",
          name: "brandMark",
          label: "Brand mark",
          defaultValue: "SILUA",
        },
        {
          type: "textarea",
          name: "tagline",
          label: "Tagline",
          defaultValue:
            "Silence + Luna. The quiet light that guides you home to yourself.",
        },
        {
          type: "text",
          name: "cn",
          label: "Chinese name",
          defaultValue: "丝露雅 · 寂静月光",
        },
      ],
    },
    {
      group: "Columns",
      inputs: [
        {
          type: "text",
          name: "col1Title",
          label: "Column 1 title",
          defaultValue: "Collection",
        },
        {
          type: "textarea",
          name: "col1Links",
          label: "Column 1 links (one per line)",
          defaultValue:
            "The Peace Circle\nWu Lou\nLotus\nPi Xiu\nSignature Tag",
        },
        {
          type: "text",
          name: "col2Title",
          label: "Column 2 title",
          defaultValue: "The House",
        },
        {
          type: "textarea",
          name: "col2Links",
          label: "Column 2 links (one per line)",
          defaultValue:
            "The Story\nThe Ritual\nJournal\nCircle Silua\nCraftsmanship",
        },
        {
          type: "text",
          name: "col3Title",
          label: "Column 3 title",
          defaultValue: "Care",
        },
        {
          type: "textarea",
          name: "col3Links",
          label: "Column 3 links (one per line)",
          defaultValue: "Contact\nShipping\nReturns\nCare Guide\nFAQ",
        },
      ],
    },
    {
      group: "Bottom bar",
      inputs: [
        {
          type: "text",
          name: "bottomLeft",
          label: "Left text",
          defaultValue: "© MMXXVI · Silua Atelier · All Rights Reserved",
        },
        {
          type: "text",
          name: "bottomCenter",
          label: "Center text",
          defaultValue: "Find Your Inner Silua.",
        },
        {
          type: "text",
          name: "bottomRight",
          label: "Right text",
          defaultValue: "Volume I · MMXXVI",
        },
      ],
    },
  ],
  presets: {
    brandMark: "SILUA",
    tagline:
      "Silence + Luna. The quiet light that guides you home to yourself.",
    cn: "丝露雅 · 寂静月光",
    col1Title: "Collection",
    col1Links: "The Peace Circle\nWu Lou\nLotus\nPi Xiu\nSignature Tag",
    col2Title: "The House",
    col2Links: "The Story\nThe Ritual\nJournal\nCircle Silua\nCraftsmanship",
    col3Title: "Care",
    col3Links: "Contact\nShipping\nReturns\nCare Guide\nFAQ",
    bottomLeft: "© MMXXVI · Silua Atelier · All Rights Reserved",
    bottomCenter: "Find Your Inner Silua.",
    bottomRight: "Volume I · MMXXVI",
  },
});
