import { Table } from '@/components/common/table';
import { FC, useState, useEffect } from 'react';
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
  const [packages, setPackages] = useState([
    {
      value: 'package1',
      label: 'Package 1',
      material: 'Plastic',
      weight: '1kg',
      height: '10cm',
      length: '20cm',
      width: '30cm',
      id: 'packageId1',
    },
    {
      value: 'package2',
      label: 'Package 2',
      material: 'Cardboard',
      weight: '2kg',
      height: '15cm',
      length: '25cm',
      width: '35cm',
      id: 'packageId2',
    },
  ]);

  const [mounted, setMounted] = useState<boolean>(false);
  const [selectedCostType, setSelectedCostType] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState({
    percentage: '',
    dollar: '',
  });

  const handleSelection = (option: string) => {
    setSelectedCostType(option);
    if (option === '%') {
      setInputValues({ percentage: '', dollar: '' });
    } else if (option === '$') {
      setInputValues({ percentage: '', dollar: '' });
    } else {
      setInputValues({ percentage: '', dollar: '' });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setInputValues({
      ...inputValues,
      [field]: event.target.value,
    });
  };

  const addPackage = () => {
    const newPackage = {
      value: 'package' + (packages.length + 1),
      label: 'Package ' + (packages.length + 1),
      material: '',
      weight: '1kg',
      height: '10cm',
      length: '20cm',
      width: '30cm',
      name: 'Package Name',
      id: 'packageId' + (packages.length + 1),
    };
    setPackages([...packages, newPackage]);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedPackages = packages.map(pkg => {
      if (pkg.id === id) {
        return { ...pkg, [event.target.name]: event.target.value };
      }
      return pkg;
    });
    setPackages(updatedPackages);
  };

  const columns = [
    { header: 'Package', key: 'value', width: 'w-1/5' },
    { header: 'Material', key: 'material', width: 'w-1/5' },
    { header: 'Weight', key: 'weight', width: 'w-1/5' },
    { header: 'Package Height', key: 'height', width: 'w-1/5' },
    { header: 'Package Length', key: 'length', width: 'w-1/5' },
    { header: 'Package Width', key: 'width', width: 'w-1/5' },
  ];

  const removePackage = (id: string) => {
    const updatedPackages = packages.filter(pkg => pkg.id !== id);
    setPackages(updatedPackages);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="mt-4 w-full max-w-7xl px-4">
      <ShowWindowTitle smallTitle secondTitle="Logistics" />
      <br />
      <section className="m-2 overflow-x-auto rounded-2xl border-4 p-2">
        <h3 className="p-2 text-2xl font-bold">Input chosen package</h3>
        <div className="min-w-full overflow-x-auto">
          {mounted && (
            <table className="min-w-full table-auto">
              <Table
                data={packages}
                columns={columns}
                onRemove={removePackage}
                onAdd={addPackage}
                onChange={onChange}
                addButtonText="Add Another Package"
              />
            </table>
          )}
        </div>
      </section>

      <section className="-mt-5 inline-flex">
        <button className="m-5 flex w-24 items-center justify-around rounded-2xl border-4 p-2">
          Edit
        </button>
        <CommonButton type="button" className="w-36 rounded-2xl">
          Save
        </CommonButton>
      </section>

      <section className="m-2 p-2">
        <h3 className="text-2xl font-bold lg:text-3xl">Input Handling Cost</h3>
        <br />
        <section className="flex justify-around space-x-4">
          <label className="flex items-center text-2xl font-bold">
            <button
              className={`h-16 w-20 rounded-2xl border-4 text-center ${
                selectedCostType === '%'
                  ? 'bg-deep-sapphire'
                  : 'bg-white text-black'
              }`}
              onClick={() => handleSelection('%')}
            >
              <input
                type="text"
                className="w-full text-center"
                value={inputValues.percentage}
                onChange={e => handleInputChange(e, 'percentage')}
                disabled={selectedCostType !== '%'}
              />
            </button>
            <span
              className={`ml-2 cursor-pointer ${
                selectedCostType === '%' ? 'text-deep-sapphire' : 'text-black'
              }`}
              onClick={() => handleSelection('%')}
            >
              %
            </span>
          </label>

          <label className="flex items-center text-2xl font-bold">
            <button
              className={`h-16 w-20 rounded-2xl border-4 text-center ${
                selectedCostType === '$'
                  ? 'bg-deep-sapphire'
                  : 'bg-white text-black'
              }`}
              onClick={() => handleSelection('$')}
            >
              <input
                type="text"
                className="w-full text-center"
                value={inputValues.dollar}
                onChange={e => handleInputChange(e, 'dollar')}
                disabled={selectedCostType !== '$'}
              />
            </button>
            <span
              className={`ml-2 cursor-pointer ${
                selectedCostType === '$' ? 'text-deep-sapphire' : 'text-black'
              }`}
              onClick={() => handleSelection('$')}
            >
              $
            </span>
          </label>

          <label className="flex items-center text-2xl font-bold">
            <button
              className={`h-16 w-20 rounded-2xl border-4 text-center ${
                selectedCostType === 'none'
                  ? 'bg-deep-sapphire text-white'
                  : 'bg-white text-black'
              }`}
              onClick={() => handleSelection('none')}
            >
              None
            </button>
          </label>
        </section>
      </section>

      <Description>
        You can choose to adjust shipping costs with packaging and handling
        fees. You can only choose one of the above choices to compute handling
        costs.
      </Description>

      <Description>
        WHEN YOU MAIL THE PACKAGE, THE PACKAGE WEIGHT AND DIMENSIONS MUST BE
        LOWER THAN THE CONDITIONAL LIMIT OF THE SHIPPING DEAL, OTHERWISE IT WILL
        NOT BE SHIPPED TO THE SHOPPITTO.
      </Description>

      <TitleDescHr
        title="Vendor Boost subscription"
        description="Price Comparison of Packages"
      />
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Sustainability Comparison of Packages"
      />

      <CommonLink
        href={
          routes.vendor.logisticsAndApis.generalSolutions.individualServices
            .setUpPhysicalDeliveryOfYourService.default
        }
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default InputPackageChoices;
export { getServerSideProps };
