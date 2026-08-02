//import { ComponentLoaderArgs, WeaverseSectionProps } from '@weaverse/hydrogen';
import { forwardRef } from 'react';

// 1. 定义数据结构
type FAQItem = {
  question: string;
  answer: string;
};

type SiluaFaqProps = any;


// 2. 组件渲染逻辑
const SiluaFaq = forwardRef<HTMLElement, SiluaFaqProps>((props, ref) => {
  const { heading, faqList, ...rest } = props;

  // 动态生成 GEO / SEO 友好的 JSON-LD 结构化数据
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList?.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section ref={ref} {...rest} className="silua-faq-section py-16 px-6 max-w-4xl mx-auto">
      {/* 嵌入 JSON-LD 结构化代码，供 Google 和 AI 引擎抓取 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* 用户在前台看到的界面 */}
      {heading && (
        <h2 className="text-3xl font-serif text-center mb-12 tracking-wide text-emerald-950">
          {heading}
        </h2>
      )}

      <div className="faq-list space-y-8">
        {faqList?.map((item, index) => (
          <div key={index} className="faq-item border-b border-stone-200 pb-6">
            <h3 className="text-lg font-medium text-stone-900 mb-3">
              {item.question}
            </h3>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
});

export default SiluaFaq;

// 3. 注册到 Weaverse 可视化编辑器 (Schema 绑定)
export const schema = {
  type: 'silua-faq',
  title: 'Silua - Client Care FAQ',
  limit: 1,
  preset: {
    heading: 'Client Care & Inquiry',
    faqList: [
      {
        question: 'Are the internal veining and subtle cloudiness in my jade piece considered flaws?',
        answer: 'Not at all. At Silua, we work exclusively with untreated, natural minerals. What may resemble fine threads, internal cloudiness, or subtle veining are actually the stone’s organic growth structures, formed deep within the earth over millennia. We view these delicate markings as nature’s singular fingerprint—a guarantee that your piece is genuine, unvarnished, and entirely yours.',
      },
      {
        question: 'How do I ensure the bracelet will fit comfortably on my wrist?',
        answer: 'Every Silua creation is designed for effortless daily wear. Our signature beaded collections feature high-tensile elastic cords, while our hand-woven designs incorporate intuitive sliding knots, offering a tailored fit for wrist circumferences ranging from 5.5 to 7.5 inches (14 to 19 cm). For precise sizing details, please consult our wrist measurement guide on each product page.',
      },
      {
        question: 'Is Silua jewelry suitable for sensitive skin, and how does the metal resist tarnish?',
        answer: 'Yes. Every metallic component in our collection is crafted from medical-grade surgical metals or solid 925 sterling silver, finished with a heavy layer of 18K gold plating. Our pieces are strictly nickel-free and hypoallergenic. With standard care, the gold finish remains luminous and resistant to daily oxidization.',
      },
      {
        question: 'What is the Mindful Activation ritual, and how do the forest sound frequencies work?',
        answer: 'Every Silua piece begins its journey far from urban electromagnetic noise, undergoing a subtle Resonance Ritual in a quiet mountain sanctuary. After precision shaping, our stones absorb the low-frequency acoustic vibrations of natural soundscapes and temple bells to preserve their primal frequency. Accompanied by our digital audio guide, wearing your stone serves as a physical anchor—a daily sensory cue to ground your breath and return to presence.',
      },
      {
        question: 'Will I need to pay additional customs duties, and is the packaging ready for gifting?',
        answer: 'No unexpected fees will apply. All international orders are shipped Delivered Duty Paid (DDP), meaning all import taxes and duties are fully settled by Silua prior to dispatch. Each creation arrives presented in our signature dark green debossed gift box, complete with a velvet pouch, natural quartz cleansing stones, and an authenticity card—prepared for immediate gifting.',
      },
    ],
  },
  inspector: [
    {
      group: 'FAQ Settings',
      inputs: [
        {
          type: 'text',
          name: 'heading',
          label: 'Section Heading',
          defaultValue: 'Client Care & Inquiry',
        },
        {
          type: 'array',
          name: 'faqList',
          label: 'FAQ Items',
          itemLabel: 'FAQ Item',
          defaultValue: [],
          inputs: [
            {
              type: 'text',
              name: 'question',
              label: 'Question',
            },
            {
              type: 'textarea',
              name: 'answer',
              label: 'Answer',
            },
          ],
        },
      ],
    },
  ],
};
