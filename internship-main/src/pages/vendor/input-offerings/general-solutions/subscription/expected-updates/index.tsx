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
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const NewExpectedUpdate = dynamic(
  () =>
    import('@/components/vendor/new-expected-update').then(mod => ({
      default: mod.NewExpectedUpdate,
    })),
  { loading: () => <DotsAnimation /> },
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

const ExpectUpdates: FC = () => {
  const [expectedUpdateFields, setExpectedUpdateFields] = useState([{ id: 1 }]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addExpectedUpdateField = () => {
    setExpectedUpdateFields([
      ...expectedUpdateFields,
      { id: expectedUpdateFields.length + 1 },
    ]);
  };

  const removeExpectedUpdateField = (index: number) => {
    const newFields = expectedUpdateFields.filter((_, i) => i !== index);
    setExpectedUpdateFields(newFields);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSave = () => {
    setEditingIndex(null);
  };

  return (
    <section className="mt-4 w-full max-w-7xl px-4">
      <ShowWindowTitle smallTitle secondTitle="Expected Feature Updates" />

      <section className="mb-8 space-y-10">
        {expectedUpdateFields.map((field, index) => (
          <section
            className="relative p-4 px-8 shadow-lg shadow-deep-sapphire/50 sm:px-12"
            key={field.id}
          >
            <button
              type="button"
              onClick={() => removeExpectedUpdateField(index)}
              className="absolute left-1 top-1/3 flex size-6 items-center justify-center rounded-lg border-2 sm:left-2 md:size-8 md:rounded-xl"
            >
              -
            </button>

            <NewExpectedUpdate
              header={`New Expected Update ${index !== 0 ? `${index + 1}` : ''}`}
              isEditing={editingIndex === index}
            />

            <div className="mt-4">
              <h4 className="mb-6 text-center text-xl font-bold text-deep-sapphire">
                Select in which plans your new feature will be offered
              </h4>
              <div className="mx-auto max-w-md rounded-xl border-4 p-8">
                <div className="space-y-6">
                  {[
                    'Plan 1',
                    'Plan 2',
                    'Plan 3',
                    'Plan 4',
                    'Plan 5',
                    'Plan 6',
                    'Plan 7',
                    'Plan 8',
                    'Plan 9',
                    'Plan 10',
                  ].map(plan => (
                    <div
                      key={plan}
                      className="grid grid-cols-1 items-center gap-12"
                    >
                      <span className="text-xl font-bold text-deep-sapphire">
                        {plan}
                      </span>
                      <input
                        type="checkbox"
                        className="size-6 cursor-pointer rounded border-2 border-deep-sapphire text-corn-flower-blue focus:ring-2 focus:ring-corn-flower-blue"
                        disabled={editingIndex !== index}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-4">
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
          </section>
        ))}

        <button
          onClick={addExpectedUpdateField}
          type="button"
          className="flex w-full items-center justify-center rounded-2xl border-4 py-2 text-lg font-bold transition hover:scale-105 hover:bg-deep-sapphire hover:text-white sm:text-xl md:text-2xl"
        >
          Add New Feature Update
        </button>
      </section>

      <CommonLink
        href={
          routes.vendor.inputOfferings.generalSolutions.subscription.default
        }
      >
        <span className="m-2 p-2">Done</span>
      </CommonLink>
    </section>
  );
};

export default ExpectUpdates;
export { getServerSideProps };
