import { FC } from 'react';
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

interface AddAnotherFaqsProps {
  readonly name: string;
}

const AddAnotherFaq: FC<AddAnotherFaqsProps> = ({ name }) => (
  <>
    <InputLabelLeft labelToUse={name} />
    <InputLabelLeft labelToUse="Faq 1" />

    <section className="m-2 mx-auto flex w-5/6 justify-center">
      <input
        defaultValue="Answer"
        className="flex w-full items-center justify-center rounded-2xl border-4 p-2 text-center text-2xl font-bold"
      />
    </section>

    <section className="m-2 mx-auto flex w-5/6 justify-center">
      <button
        type="button"
        className="flex w-full items-center justify-center rounded-2xl border-4 py-2 text-xl font-bold"
      >
        Add another Faq
      </button>
    </section>
  </>
);

export default AddAnotherFaq;
