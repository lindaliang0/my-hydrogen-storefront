import {
  createSchema,
  useChildInstances,
  type HydrogenComponentProps,
} from "@weaverse/hydrogen";

interface SiluaFaqProps extends HydrogenComponentProps {
  heading: string;
}

function SiluaFaq(props: SiluaFaqProps) {
  const { heading, children, ...rest } = props;
  const childInstances = useChildInstances();
  const faqItems = childInstances.map((instance) => {
    const data = instance.getSnapShot();
    return {
      question: data.question as string,
      answer: data.answer as string,
    };
  });

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section {...rest} className="mx-auto max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      {heading && (
        <h2 className="mb-12 text-center font-serif text-3xl tracking-wide text-emerald-950">
          {heading}
        </h2>
      )}
      <div className="space-y-8">{children}</div>
    </section>
  );
}

export default SiluaFaq;

export const schema = createSchema({
  type: "silua-faq",
  title: "Silua - Client Care FAQ",
  limit: 1,
  childTypes: ["silua-faq-item"],
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Section heading",
          defaultValue: "Client Care & Inquiry",
        },
      ],
    },
  ],
  presets: {
    heading: "Client Care & Inquiry",
    children: [
      {
        type: "silua-faq-item",
        question:
          "Are the internal veining and subtle cloudiness in my jade piece considered flaws?",
        answer:
          "Not at all. At Silua, we work exclusively with untreated, natural minerals. What may resemble fine threads, internal cloudiness, or subtle veining are actually the stone's organic growth structures, formed deep within the earth over millennia. We view these delicate markings as nature's singular fingerprint—a guarantee that your piece is genuine, unvarnished, and entirely yours.",
      },
      {
        type: "silua-faq-item",
        question:
          "How do I ensure the bracelet will fit comfortably on my wrist?",
        answer:
          "Every Silua creation is designed for effortless daily wear. Our signature beaded collections feature high-tensile elastic cords, while our hand-woven designs incorporate intuitive sliding knots, offering a tailored fit for wrist circumferences ranging from 5.5 to 7.5 inches (14 to 19 cm). For precise sizing details, please consult our wrist measurement guide on each product page.",
      },
      {
        type: "silua-faq-item",
        question:
          "Is Silua jewelry suitable for sensitive skin, and how does the metal resist tarnish?",
        answer:
          "Yes. Every metallic component in our collection is crafted from medical-grade surgical metals or solid 925 sterling silver, finished with a heavy layer of 18K gold plating. Our pieces are strictly nickel-free and hypoallergenic. With standard care, the gold finish remains luminous and resistant to daily oxidization.",
      },
      {
        type: "silua-faq-item",
        question:
          "What is the Mindful Activation ritual, and how do the forest sound frequencies work?",
        answer:
          "Every Silua piece begins its journey far from urban electromagnetic noise, undergoing a subtle Resonance Ritual in a quiet mountain sanctuary. After precision shaping, our stones absorb the low-frequency acoustic vibrations of natural soundscapes and temple bells to preserve their primal frequency. Accompanied by our digital audio guide, wearing your stone serves as a physical anchor—a daily sensory cue to ground your breath and return to presence.",
      },
      {
        type: "silua-faq-item",
        question:
          "Will I need to pay additional customs duties, and is the packaging ready for gifting?",
        answer:
          "No unexpected fees will apply. All international orders are shipped Delivered Duty Paid (DDP), meaning all import taxes and duties are fully settled by Silua prior to dispatch. Each creation arrives presented in our signature dark green debossed gift box, complete with a velvet pouch, natural quartz cleansing stones, and an authenticity card—prepared for immediate gifting.",
      },
    ],
  },
});
