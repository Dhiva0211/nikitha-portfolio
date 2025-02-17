import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';

const InputLabelLeft = dynamic(
  () =>
    import('@/components/common/input').then(mod => ({
      default: mod.InputLabelLeft,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const AddPlus = dynamic(
  () =>
    import('@/components/common/icons/add-plus').then(mod => ({
      default: mod.default,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

interface AddAnotherFaqWithTitleProps {
  readonly name: string;
  isMultiple?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

const MAX_CHARS = 155;
const MAX_FAQS = 20;

const AddAnotherFaqWithTitle: FC<AddAnotherFaqWithTitleProps> = ({
  name,
  isMultiple = false,
}) => {
  const [faqFields, setFaqFields] = useState<FAQ[]>([
    { question: '', answer: '' },
  ]);

  const handleFaqChange = (index: number, field: keyof FAQ, value: string) => {
    if (value.length <= MAX_CHARS) {
      const updatedFAQs = faqFields.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq,
      );
      setFaqFields(updatedFAQs);
    }
  };

  const addFaqField = () => {
    if (faqFields.length < MAX_FAQS) {
      setFaqFields([...faqFields, { question: '', answer: '' }]);
    }
  };

  const removeFaqField = (index: number) => {
    const updatedFAQs = faqFields.filter((_, i) => i !== index);
    setFaqFields(updatedFAQs);
  };

  return (
    <section
      className={`mt-10 ${isMultiple ? 'm-4 rounded-lg border-4 p-4 shadow-xl shadow-deep-sapphire' : 'm-2'}`}
    >
      <h3 className="m-2 rounded-2xl border-4 p-2 text-center text-2xl font-bold">
        [{name}]
      </h3>

      {faqFields.map((faq, index) => (
        <section className="relative my-10 md:mx-4" key={index}>
          <section className="flex flex-col space-y-2">
            <div className="flex w-full items-center space-x-1">
              <button
                type="button"
                onClick={() => removeFaqField(index)}
                className="flex aspect-square size-6 items-center justify-center rounded-lg border-2 text-lg sm:size-8 md:size-10"
              >
                -
              </button>
              <div className="flex flex-1 items-center justify-between">
                <div className="flex-1">
                  <InputLabelLeft
                    value={faq.question}
                    onChange={e =>
                      handleFaqChange(index, 'question', e.target.value)
                    }
                    labelToUse={`FAQ ${index + 1}`}
                    maxLength={MAX_CHARS}
                  />
                </div>
                <span className="absolute right-2 top-1/2 -translate-y-1/4 text-xs sm:right-4 sm:-translate-y-3/4 sm:text-sm">
                  {faq.question.length}/{MAX_CHARS}
                </span>
              </div>
            </div>
            <div className="m-4 flex items-center justify-between">
              <div className="relative flex-1">
                <input
                  value={faq.answer}
                  onChange={e =>
                    handleFaqChange(index, 'answer', e.target.value)
                  }
                  placeholder="Answer"
                  maxLength={MAX_CHARS}
                  className="w-full rounded-2xl border-4 p-2 text-center text-sm font-bold placeholder:text-corn-flower-blue sm:text-xl md:text-2xl"
                />
                <span className="absolute -bottom-5 right-2 text-xs sm:bottom-1 sm:text-sm">
                  {faq.answer.length}/{MAX_CHARS}
                </span>
              </div>
            </div>
          </section>
        </section>
      ))}

      {faqFields.length < MAX_FAQS && (
        <section className="m-2 mb-4 flex justify-center">
          <button
            onClick={addFaqField}
            type="button"
            className="flex w-full items-center justify-center rounded-2xl border-4 py-2 text-xl font-bold transition hover:scale-105 hover:bg-deep-sapphire hover:text-white"
          >
            <AddPlus className="mr-2" />
            Add another FAQ
          </button>
        </section>
      )}
    </section>
  );
};

export default AddAnotherFaqWithTitle;
