import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { categoryInputOfferings } from '@/helpers/initial-values';
import { getToken, validSessionToken } from '@/helpers/validations';
import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { FC, useState } from 'react';

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
  {
    name: '[Solution 1]',
    desc: '',
  },
  {
    name: '[Solution 2]',
    desc: '',
  },
  {
    name: '[Solution 3]',
    desc: '',
  },
  {
    name: '[Solution 4]',
    desc: '',
  },
  {
    name: '[Solution 5]',
    desc: '',
  },
  {
    name: '[Solution 6]',
    desc: '',
  },
  {
    name: '[Solution 7]',
    desc: '',
  },
  {
    name: '[Solution 8]',
    desc: '',
  },
  {
    name: '[Solution 9]',
    desc: '',
  },
  {
    name: '[Solution 10]',
    desc: '',
  },
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

const MAX_CHARACTERS = 3000;

const Single: FC = () => {
  const [plans, setPlans] = useState(
    plansArray.map(plan => plan.desc || `List of ${plan.name} Features`),
  );
  const [editablePlans, setEditablePlans] = useState(
    plansArray.map(() => false),
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (index: number, key: string, value: string | number) => {
    const newList = [...plans];
    newList[String(index)][String(key)] = value;
    setPlans(newList);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSave = () => {
    setEditingIndex(null);
  };

  const handleSaveDescription = (index: number, value: string) => {
    if (value.length <= MAX_CHARACTERS) {
      const newList = [...plans];
      newList[`${index}`] = value;
      setPlans(newList);
    }
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Set up solution features" />

      <div className="py-8">
        <Description>
          Shortlist the Features of your single solution. For a full
          description, go to Set Up Solution Description.
        </Description>
      </div>

      <div className="w-full max-w-6xl space-y-12 px-2 sm:mx-auto">
        {plansArray.map((plan, index) => (
          <div key={plan.name} className="bg-white">
            <h3 className="mb-6 text-center text-lg font-bold sm:text-xl md:text-2xl">
              {plan.name}
            </h3>

            <div className="rounded-3xl border-4 p-6 text-corn-flower-blue">
              <textarea
                className="mb-4 w-full rounded-2xl border-4 p-4 text-left placeholder:text-corn-flower-blue"
                value={plans[`${index}`]}
                onChange={e => handleSaveDescription(index, e.target.value)}
                placeholder="Enter features for this solution..."
                rows={4}
                disabled={editingIndex !== index}
              />

              <div className="flex items-center justify-between">
                <div className="flex gap-4">
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
                    onClick={handleSave}
                    disabled={editingIndex !== index}
                  >
                    Save
                  </button>
                </div>
                <span className="text-right text-sm font-medium text-blue-900 sm:text-lg">
                  {plans[`${index}`].length}/{MAX_CHARACTERS}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="my-6">
        <CommonLink
          href={
            routes.vendor.inputOfferings.generalSolutions.individualServices
              .setUpSolutionsFeatures.default
          }
        >
          <section className="m-2 p-2">Done</section>
        </CommonLink>
      </section>
    </section>
  );
};

export default Single;
export { getServerSideProps };
