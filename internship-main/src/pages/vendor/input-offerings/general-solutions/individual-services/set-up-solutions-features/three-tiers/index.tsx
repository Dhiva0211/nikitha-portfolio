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
    tab: 0,
    desc: {
      0: '',
      1: '',
      2: '',
    },
  },
  {
    name: '[Solution 2]',
    tab: 0,
    desc: {
      0: '',
      1: '',
      2: '',
    },
  },
  {
    name: '[Solution 3]',
    tab: 0,
    desc: {
      0: '',
      1: '',
      2: '',
    },
  },
  {
    name: '[Solution 4]',
    tab: 0,
    desc: {
      0: '',
      1: '',
      2: '',
    },
  },
  {
    name: '[Solution 5]',
    tab: 0,
    desc: {
      0: '',
      1: '',
      2: '',
    },
  },
  {
    name: '[Solution 6]',
    tab: 0,
    desc: {
      0: '',
      1: '',
      2: '',
    },
  },
  {
    name: '[Solution 7]',
    tab: 0,
    desc: {
      0: '',
      1: '',
      2: '',
    },
  },
  {
    name: '[Solution 8]',
    tab: 0,
    desc: {
      0: '',
      1: '',
      2: '',
    },
  },
  {
    name: '[Solution 9]',
    tab: 0,
    desc: {
      0: '',
      1: '',
      2: '',
    },
  },
  {
    name: '[Solution 10]',
    tab: 0,
    desc: {
      0: '',
      1: '',
      2: '',
    },
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

const ThreeTiers: FC = () => {
  const [list, setList] = useState<typeof plansArray>(plansArray);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (index: number, key: string, value: string | number) => {
    const newList = [...list];
    newList[String(index)][String(key)] = value;
    setList(newList);
  };

  const handleSaveDescription = (
    index: number,
    tab: number,
    value: string | number,
  ) => {
    if (value.toString().length <= MAX_CHARACTERS) {
      const newList = [...list];
      newList[String(index)].desc[String(tab)] = value;
      setList(newList);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSave = () => {
    setEditingIndex(null);
  };

  return (
    <div className="relative min-h-screen border-t-4 border-deep-sapphire bg-white p-4 shadow-md sm:p-6 md:p-8">
      <section className="mt-4">
        <ShowWindowTitle smallTitle secondTitle="Set up solution features" />
        <section className="py-8">
          <Description>
            Shortlist the Features of your 3 tiers solution. For a full
            description go to Set Up Solution Description.
          </Description>
        </section>
        <div className="w-full max-w-6xl space-y-12 px-2 sm:mx-auto">
          {list.map(({ name, tab, desc }, index) => (
            <div key={name} className="bg-white">
              <h3 className="mb-6 text-center text-lg font-bold sm:text-xl md:text-2xl">
                {name}
              </h3>

              <div className="flex gap-0 overflow-hidden">
                {['Economy', 'Standard', 'Business'].map((label, tabIndex) => (
                  <button
                    key={tabIndex}
                    type="button"
                    onClick={() => handleChange(index, 'tab', tabIndex)}
                    className={`flex-1 rounded-t-2xl border-4 py-4 text-sm font-semibold sm:px-8 sm:text-lg ${
                      tabIndex !== 2 ? '-mr-4' : ''
                    } ${
                      tab === tabIndex
                        ? 'relative z-10 -mb-1 border-b-white bg-white text-deep-sapphire'
                        : 'bg-gray-50 text-corn-flower-blue hover:bg-gray-100'
                    } transition-colors duration-200`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="rounded-3xl rounded-t-none border-x-4 border-b-4 p-6">
                <textarea
                  className="mb-4 w-full rounded-2xl border-4 p-4 text-left placeholder:text-corn-flower-blue"
                  value={desc[`${tab}`]}
                  onChange={e =>
                    handleSaveDescription(index, tab, e.target.value)
                  }
                  placeholder="Enter features for this tier..."
                  disabled={editingIndex !== index}
                  rows={4}
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
                      onClick={() => handleSave()}
                      disabled={editingIndex !== index}
                    >
                      Save
                    </button>
                  </div>
                  <span className="text-right text-sm font-medium text-blue-900 sm:text-lg">
                    {desc[`${tab}`].toString().length}/{MAX_CHARACTERS}
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
                .default
            }
          >
            <section className="m-2 p-2">Done</section>
          </CommonLink>
        </section>
      </section>
    </div>
  );
};

export default ThreeTiers;
export { getServerSideProps };
