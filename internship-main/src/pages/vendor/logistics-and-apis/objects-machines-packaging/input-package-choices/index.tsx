import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryLogisticsAndApis } from '@/helpers/initial-values';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonButton = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonButton,
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
const TitleDescHr = dynamic(
  () =>
    import('@/components/common/two-text').then(mod => ({
      default: mod.TitleDescHr,
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

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryLogisticsAndApis,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const InputPackageChoices: FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCostType, setSelectedCostType] = useState<'percent' | 'fixed' | 'none' | null>(null);
  const [costValue, setCostValue] = useState<string>('');

  const handleCostTypeSelect = (type: 'percent' | 'fixed' | 'none') => {
    if (!isEditing) return;
    setSelectedCostType(type);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  


  const handleCostValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) return;
    setCostValue(e.target.value);
  };


  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Logistics" />

      <div className="mx-2 md:mx-4">
        <div className="overflow-x-auto rounded-2xl border-4 bg-white">
          <div className="sticky top-0 bg-white">
            <h3 className="border-b-4 p-4 text-2xl font-bold md:text-3xl">
              Input chosen package
            </h3>

            <div className="grid grid-cols-6 gap-4 p-4 text-sm font-bold md:text-lg">
              <div>Offerings</div>
              <div className="text-center">
                Material
                <p className="text-xs font-normal md:text-sm">Optional</p>
              </div>
              <div className="text-center">
                Weight
                <p className="text-xs font-normal md:text-sm">
                  Including Offering, Packaging and Protective Materials
                </p>
              </div>
              <div>Package Height</div>
              <div>Package Length</div>
              <div>Package Width</div>
            </div>
          </div>

          <div className="space-y-6 p-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="space-y-2">
                <h4 className="text-lg font-bold md:text-xl">Offering {i + 1}</h4>
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="grid grid-cols-6 gap-4">
                    <div className="font-bold">Size {j + 1}</div>
                    <input
                      className="rounded border p-2 disabled:bg-gray-100"
                      disabled={!isEditing}
                    />
                    <input
                      className="rounded border p-2 disabled:bg-gray-100"
                      disabled={!isEditing}
                    />
                    <input
                      className="rounded border p-2 disabled:bg-gray-100"
                      disabled={!isEditing}
                    />
                    <input
                      className="rounded border p-2 disabled:bg-gray-100"
                      disabled={!isEditing}
                    />
                    <input
                      className="rounded border p-2 disabled:bg-gray-100"
                      disabled={!isEditing}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <button
            onClick={handleEdit}
            disabled={isEditing}
            className="rounded-2xl border-4 px-6 py-2 font-bold disabled:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={handleSave}
            disabled={!isEditing}
            className="rounded-2xl bg-deep-sapphire px-6 py-2 font-bold text-white disabled:bg-gray-100"
          >
            Save
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold md:text-3xl">Input Handling Cost</h3>
          <div className="mt-4 flex flex-wrap justify-around gap-4">
      
            <label className="text-xl font-bold md:text-2xl">
              <div className={`relative inline-block ${!isEditing && 'opacity-50'}`}>
                <input
                  type="text"
                  value={selectedCostType === 'percent' ? costValue : ''}
                  onChange={handleCostValueChange}
                  disabled={!isEditing}
                  className={`h-16 w-24 rounded-2xl border-4 text-center transition-colors
                    ${selectedCostType === 'percent' ? 'bg-deep-sapphire text-white' : 'border-deep-sapphire'}
                    ${!isEditing || (selectedCostType && selectedCostType !== 'percent') ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleCostTypeSelect('percent')}
                />
                <span className="ml-2">%</span>
              </div>
            </label>
            <label className="text-xl font-bold md:text-2xl">
              <div className={`relative inline-block ${!isEditing && 'opacity-50'}`}>
                <input
                  type="text"
                  value={selectedCostType === 'fixed' ? costValue : ''}
                  onChange={handleCostValueChange}
                  disabled={!isEditing}
                  className={`h-16 w-24 rounded-2xl border-4 text-center transition-colors
                    ${selectedCostType === 'fixed' ? 'bg-deep-sapphire text-white' : 'border-deep-sapphire'}
                    ${!isEditing || (selectedCostType && selectedCostType !== 'fixed') ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleCostTypeSelect('fixed')}
                />
                <span className="ml-2">$</span>
              </div>
            </label>

            <label className="text-xl font-bold md:text-2xl">
              <div className={`relative inline-block ${!isEditing && 'opacity-50'}`}>
                <button
                  disabled={!isEditing}
                  className={`h-16 w-24 rounded-2xl border-4 text-center transition-colors
                    ${selectedCostType === 'none' ? 'bg-deep-sapphire text-white' : 'border-deep-sapphire'}
                    ${!isEditing || (selectedCostType && selectedCostType !== 'none') ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleCostTypeSelect('none')}
                >
                  None
                </button>
              </div>
            </label>
          </div>
        </div>

        <Description>
          You can choose to adjust shipping costs with packaging and handling fees.
          <br />
          When you mail the package, the package weight and dimensions must be lower than the conditional limit of the shipping deal, otherwise it will not be shipped to <strong>Shoppitto</strong>.
        </Description>

        <TitleDescHr
          title="Vendor Boost subscription"
          description="Price Comparison of Packages"
        />
        <TitleDescHr
          title="Vendor Boost subscription"
          description="Sustainability Comparison of Packages"
        />

        <CommonLink href={routes.vendor.logisticsAndApis.objectsMachinesPackaging.default}>
          <div className="m-2 p-2">Done</div>
        </CommonLink>
      </div>
    </section>
  );
};

export default InputPackageChoices;
export { getServerSideProps };