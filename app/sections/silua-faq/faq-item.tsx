import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";

interface SiluaFaqItemProps extends HydrogenComponentProps {
  question: string;
  answer: string;
}

function SiluaFaqItem(props: SiluaFaqItemProps) {
  const { question, answer, ...rest } = props;

  return (
    <div {...rest} className="border-b border-stone-200 pb-6">
      <h3 className="mb-3 text-lg font-medium text-stone-900">{question}</h3>
      <p className="whitespace-pre-line text-sm leading-relaxed text-stone-600 md:text-base">
        {answer}
      </p>
    </div>
  );
}

export default SiluaFaqItem;

export const schema = createSchema({
  type: "silua-faq-item",
  title: "FAQ item",
  settings: [
    {
      group: "FAQ item",
      inputs: [
        {
          type: "text",
          name: "question",
          label: "Question",
          defaultValue: "Question",
        },
        {
          type: "textarea",
          name: "answer",
          label: "Answer",
          defaultValue: "Answer",
        },
      ],
    },
  ],
});
