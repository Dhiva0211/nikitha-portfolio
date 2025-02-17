import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
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
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
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

const plansArray = [
  '[plan 1]',
  '[plan 2]',
  '[plan 3]',
  '[plan 4]',
  '[plan 5]',
  '[plan 6]',
  '[plan 7]',
  '[plan 8]',
  '[plan 9]',
  '[plan 10]',
];

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

const SetUpPlanFeatures: FC = () => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [textareaValues, setTextareaValues] = useState(
    Array(plansArray.length).fill(''),
  );

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSave = () => {
    setEditingIndex(null);
  };

  const handleTextareaChange = (index: number, value: string) => {
    setTextareaValues(prevValues => {
      const newValues = [...prevValues];
      newValues[`${index}`] = value;
      return newValues;
    });
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Set up subscription features" />

      <Description>
        Shortlist the Features of your subscription. For a full description go
        to Set Up Solution Description.
      </Description>

      <section className="mx-2 mt-4">
        {plansArray.map((plan, index) => (
          <section className="py-1" key={plan}>
            <h3 className="my-2 text-center text-2xl font-bold">{plan}</h3>
            <textarea
              className="size-48 w-full rounded-2xl border-4 p-2 text-center placeholder:text-corn-flower-blue"
              placeholder={`Enter list of ${plan} Subscription Features`}
              disabled={editingIndex !== index}
              value={textareaValues[`${index}`]}
              onChange={e => handleTextareaChange(index, e.target.value)}
            />
            <section className="m-2 flex gap-4">
              <button
                className={`w-24 rounded-2xl border-4 p-3 font-semibold transition-all sm:w-32 ${
                  editingIndex === index
                    ? 'border-gray-300 bg-gray-100 text-gray-400'
                    : 'border-deep-sapphire bg-white text-deep-sapphire hover:bg-gray-50'
                }`}
                onClick={() => handleEdit(index)}
                disabled={editingIndex === index}
              >
                Edit
              </button>
              <button
                className={`w-24 rounded-2xl border-4 p-3 font-semibold transition-all sm:w-32 ${
                  editingIndex === index
                    ? 'border-deep-sapphire bg-deep-sapphire text-white hover:bg-deep-sapphire/90'
                    : 'border-gray-300 bg-gray-100 text-gray-400'
                }`}
                onClick={() => handleSave()}
                disabled={editingIndex !== index}
              >
                Save
              </button>
            </section>
          </section>
        ))}
      </section>

      <CommonLink
        href={
          routes.vendor.inputOfferings.generalSolutions.subscription.default
        }
      >
        <section className="m-2 p-2 font-bold">Done</section>
      </CommonLink>
    </section>
  );
};

export default SetUpPlanFeatures;
export { getServerSideProps };
