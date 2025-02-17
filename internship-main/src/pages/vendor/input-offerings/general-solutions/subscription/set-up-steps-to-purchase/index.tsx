import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import { getToken, validSessionToken } from '@/helpers/validations';
import { categoryInputOfferings } from '@/helpers/initial-values';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const AddPlusIcon = dynamic(
  () =>
    import('@/components/common/icons/add-plus').then(mod => ({
      default: mod.default,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryInputOfferings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const SetUpStepsToPurchase: FC = () => {
  const [steps, setSteps] = useState<{ title: string; answer: string }[]>([
    { title: '', answer: '' },
    { title: '', answer: '' },
  ]);

  const handleAddSteps = () => {
    if (steps.length < 20) {
      setSteps([...steps, { title: '', answer: '' }]);
    } else {
      alert('You can only add up to 20 FAQs.');
    }
  };

  const handleStepChange = (
    index: number,
    field: 'title' | 'answer',
    value: string,
  ) => {
    const updatedSteps = [...steps];
    updatedSteps[`${index}`][`${field}`] = value.slice(0, 155);
    setSteps(updatedSteps);
  };

  const handleRemoveStep = (index: number) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  return (
    <section className="mx-4 my-8 w-full max-w-7xl rounded-lg border-t-4 border-deep-sapphire bg-white p-4 shadow-md sm:p-6 md:p-8">
      <ShowWindowTitle smallTitle secondTitle="Set Up Steps to Purchase" />

      <h3 className="my-4 text-center text-xl font-semibold text-deep-sapphire sm:my-6 sm:text-2xl">
        Exclusive Customized Plan
      </h3>
      <div className="mb-6 sm:mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="mb-6 flex flex-col rounded-xl border-4 p-4 shadow-lg shadow-deep-sapphire sm:mb-8"
          >
            <input
              type="text"
              placeholder={`Step Name ${index + 1}`}
              value={step.title}
              onChange={e => handleStepChange(index, 'title', e.target.value)}
              className="w-full border-b-2 border-corn-flower-blue p-2 text-lg placeholder:text-corn-flower-blue focus:border-deep-sapphire focus:outline-none"
              maxLength={155}
            />
            <textarea
              placeholder="Description"
              value={step.answer}
              onChange={e => handleStepChange(index, 'answer', e.target.value)}
              className="mt-4 w-full border-b-2 border-corn-flower-blue p-2 text-lg placeholder:text-corn-flower-blue focus:border-deep-sapphire focus:outline-none"
              maxLength={155}
            />
            <p className="text-right text-sm text-deep-sapphire">
              {step.answer.length}/155 characters
            </p>
            <div className="mt-2 self-end">
              <button
                onClick={() => handleRemoveStep(index)}
                className="flex aspect-square size-10 items-center justify-center rounded-xl border-4 text-deep-sapphire transition-all hover:bg-deep-sapphire/90 hover:text-white focus:outline-none focus:ring-4 focus:ring-deep-sapphire/50"
                aria-label="Remove step"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleAddSteps}
            className="flex items-center justify-between rounded-md bg-deep-sapphire px-4 py-2 text-white transition-all hover:bg-deep-sapphire/90 focus:outline-none focus:ring-4 focus:ring-deep-sapphire/50"
            disabled={steps.length >= 20}
            aria-label="Add another step"
          >
            <AddPlusIcon className="mr-2" />
            Add Another Step
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-center sm:mt-6">
        <CommonLink
          href={
            routes.vendor.inputOfferings.generalSolutions.subscription.default
          }
          className="rounded-md bg-deep-sapphire px-4 py-2 text-base font-medium text-white transition-all hover:bg-deep-sapphire/90 focus:outline-none focus:ring-4 focus:ring-deep-sapphire/50 sm:px-6 sm:text-lg"
        >
          Done
        </CommonLink>
      </div>
    </section>
  );
};

export default SetUpStepsToPurchase;
export { getServerSideProps };
