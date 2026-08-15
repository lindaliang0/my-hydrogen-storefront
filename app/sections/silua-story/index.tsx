import {
  createSchema,
  type HydrogenComponentProps,
  type WeaverseImage,
} from "@weaverse/hydrogen";
import { useRef } from "react";
import storyMountainFallback from "~/assets/silua/story-mountain.jpg";
import { getImageUrl, useSiluaReveal } from "~/utils/silua";

interface SiluaStoryProps extends HydrogenComponentProps {
  anchorId: string;
  num: string;
  title: string;
  desc: string;
  image: WeaverseImage | string;
  lead: string;
  p1: string;
  p2: string;
  small: string;
  pullQuote: string;
  attribution: string;
  signatureName: string;
  signatureLinkLabel: string;
  signatureLinkUrl: string;
}

function SiluaStory(props: SiluaStoryProps) {
  const {
    anchorId,
    num,
    title,
    desc,
    image,
    lead,
    p1,
    p2,
    small,
    pullQuote,
    attribution,
    signatureName,
    signatureLinkLabel,
    signatureLinkUrl,
    ...rest
  } = props;
  const rootRef = useRef<HTMLElement>(null);
  useSiluaReveal(rootRef);

  const imageUrl = getImageUrl(image) ?? storyMountainFallback;

  return (
    <section
      {...rest}
      ref={rootRef}
      className="silua-home silua-section story"
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

      <div className="story-body">
        <div className="story-image reveal">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="story-text reveal">
          <p className="lead" dangerouslySetInnerHTML={{ __html: lead }} />
          <p dangerouslySetInnerHTML={{ __html: p1 }} />
          <p>{p2}</p>

          <div className="story-pull">
            &quot;{pullQuote}&quot;
            <span className="attribution">— {attribution}</span>
          </div>

          <p className="small">{small}</p>

          <div className="story-signature">
            <div>
              <span className="name-serif">{signatureName}</span>
            </div>
            <a href={signatureLinkUrl}>{signatureLinkLabel} →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SiluaStory;

export const schema = createSchema({
  type: "silua-story",
  title: "Silua - The Story",
  limit: 1,
  settings: [
    {
      group: "Section header",
      inputs: [
        {
          type: "text",
          name: "anchorId",
          label: "Anchor ID",
          defaultValue: "story",
        },
        {
          type: "text",
          name: "num",
          label: "Section number",
          defaultValue: "i. The Story",
        },
        {
          type: "richtext",
          name: "title",
          label: "Title",
          defaultValue:
            "For the woman who <em>carries the world</em><br/>on her shoulders.",
        },
        {
          type: "textarea",
          name: "desc",
          label: "Description",
          defaultValue:
            "A house born in the quiet — where silence, moonlight and skin meet.",
        },
      ],
    },
    {
      group: "Image",
      inputs: [
        {
          type: "image",
          name: "image",
          label: "Story image",
        },
      ],
    },
    {
      group: "Body",
      inputs: [
        {
          type: "richtext",
          name: "lead",
          label: "Lead paragraph",
          defaultValue:
            "Silua isn't jewelry. It's a <em>reminder</em> — like moonlight on a late-night walk home, it doesn't speak; it simply lights the way.",
        },
        {
          type: "richtext",
          name: "p1",
          label: "Paragraph 1",
          defaultValue:
            "Our name is a word we created from two ancient roots: <em>Silence</em> and <em>Luna</em>. Stillness and moonlight — the two things that have guided travelers through darkness for thousands of years, and the gift we all long for, yet rarely give ourselves.",
        },
        {
          type: "textarea",
          name: "p2",
          label: "Paragraph 2",
          defaultValue:
            "Every piece begins as a journey from mountain to mind. Deep in a remote valley, far from urban electromagnetic noise, each raw stone undergoes our signature Resonance Ritual — a precision attunement in a natural acoustic sanctuary, absorbing the rhythm of nature and low-frequency temple resonance.",
        },
        {
          type: "textarea",
          name: "pullQuote",
          label: "Pull quote",
          defaultValue: "Your quietest moments hold your greatest power.",
        },
        {
          type: "text",
          name: "attribution",
          label: "Pull quote attribution",
          defaultValue: "The Silua Manifesto",
        },
        {
          type: "textarea",
          name: "small",
          label: "Closing paragraph",
          defaultValue:
            "We don't promise miracles. We offer something simpler: a tangible reminder — for the moments you forget who you are, so you can remember. These symbols have guided seekers for millennia. Now, they guide you.",
        },
        {
          type: "text",
          name: "signatureName",
          label: "Signature name",
          defaultValue: "Ling, Founder of Silua",
        },
        {
          type: "text",
          name: "signatureLinkLabel",
          label: "Signature link label",
          defaultValue: "Read the founder letter",
        },
        {
          type: "url",
          name: "signatureLinkUrl",
          label: "Signature link URL",
          defaultValue: "#",
        },
      ],
    },
  ],
  presets: {
    anchorId: "story",
    num: "i. The Story",
    title: "For the woman who <em>carries the world</em><br/>on her shoulders.",
    desc: "A house born in the quiet — where silence, moonlight and skin meet.",
    image: {
      url: "/app/assets/silua/story-mountain.jpg",
      altText: "Silua story — mountain landscape",
    },
    lead: "Silua isn't jewelry. It's a <em>reminder</em> — like moonlight on a late-night walk home, it doesn't speak; it simply lights the way.",
    p1: "Our name is a word we created from two ancient roots: <em>Silence</em> and <em>Luna</em>. Stillness and moonlight — the two things that have guided travelers through darkness for thousands of years, and the gift we all long for, yet rarely give ourselves.",
    p2: "Every piece begins as a journey from mountain to mind. Deep in a remote valley, far from urban electromagnetic noise, each raw stone undergoes our signature Resonance Ritual — a precision attunement in a natural acoustic sanctuary, absorbing the rhythm of nature and low-frequency temple resonance.",
    pullQuote: "Your quietest moments hold your greatest power.",
    attribution: "The Silua Manifesto",
    small:
      "We don't promise miracles. We offer something simpler: a tangible reminder — for the moments you forget who you are, so you can remember. These symbols have guided seekers for millennia. Now, they guide you.",
    signatureName: "Ling, Founder of Silua",
    signatureLinkLabel: "Read the founder letter",
    signatureLinkUrl: "#",
  },
});
