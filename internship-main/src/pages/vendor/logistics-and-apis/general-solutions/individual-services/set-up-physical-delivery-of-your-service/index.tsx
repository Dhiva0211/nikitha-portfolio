import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import Link from 'next/link';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import { FC, Suspense } from 'react';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import GenericTable1 from '@/components/common/table/table1';
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

const shippingPlansToUse = [
  {
    value: 'solution1',
    label: 'Solution 1',
    shippingPlan: '',
    weight: '',
    height: '',
    length: '',
    width: '',
    name: 'Solution Name',
    id: 'solutionId1',
  },
  {
    value: 'solution2',
    label: 'Solution 2',
    shippingPlan: 'USPS Economy 1',
    weight: '',
    height: '',
    length: '',
    width: '',
    name: 'Solution Name',
    id: 'solutionId2',
  },
  {
    value: 'solution3',
    label: 'Solution 3',
    shippingPlan: 'DHL Standard 1',
    weight: '',
    height: '',
    length: '',
    width: '',
    name: 'Solution Name',
    id: 'solutionId3',
  },
  {
    value: 'solution4',
    label: 'Solution 4',
    shippingPlan: 'USPS Economy 1',
    weight: '',
    height: '',
    length: '',
    width: '',
    name: 'Solution Name',
    id: 'solutionId4',
  },
  {
    value: 'solution5',
    label: 'Solution 5',
    shippingPlan: 'DHL Standard 1',
    weight: '',
    height: '',
    length: '',
    width: '',
    name: 'Solution Name',
    id: 'solutionId5',
  },
  {
    value: 'solution6',
    label: 'Solution 6',
    shippingPlan: 'USPS Economy 1',
    weight: '',
    height: '',
    length: '',
    width: '',
    name: 'Solution Name',
    id: 'solutionId6',
  },
  {
    value: 'solution7',
    label: 'Solution 7',
    shippingPlan: '',
    weight: '',
    height: '',
    length: '',
    width: '',
    name: 'Solution Name',
    id: 'solutionId7',
  },
  {
    value: 'solution8',
    label: 'Solution 8',
    shippingPlan: 'USPS Economy 1',
    weight: '',
    height: '',
    length: '',
    width: '',
    name: 'Solution Name',
    id: 'solutionId8',
  },
  {
    value: 'solution9',
    label: 'Solution 9',
    shippingPlan: 'Own',
    weight: '',
    height: '',
    length: '',
    width: '',
    name: 'Solution Name',
    id: 'solutionId9',
  },
  {
    value: 'solution10',
    label: 'Solution 10',
    shippingPlan: 'Own',
    weight: '',
    height: '',
    length: '',
    width: '',
    name: 'Solution Name',
    id: 'solutionId10',
  },
];

const listOptions = [
  {
    title: 'Input Package Choices',
    link: routes.vendor.logisticsAndApis.generalSolutions.individualServices
      .setUpPhysicalDeliveryOfYourService.inputPackageChoices,
  },
  {
    title: 'Input Preferred Shipping Plan',
    link: routes.vendor.logisticsAndApis.generalSolutions.individualServices
      .setUpPhysicalDeliveryOfYourService.inputPreferredShippingPlan.default,
  },
  {
    title: 'Print Shipping Labels',
    link: routes.vendor.logisticsAndApis.generalSolutions.individualServices
      .setUpPhysicalDeliveryOfYourService.printShippingLabels,
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
    categoryLogisticsAndApis,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const Logistics: FC = () => {
  const columns = [
    { header: 'Solution', key: 'label', width: 'w-1/5' },
    { header: 'Shipping Plan', key: 'shippingPlan', width: 'w-1/5' },
    { header: 'Weight', key: 'weight', width: 'w-1/5' },
    { header: 'Package Height', key: 'height', width: 'w-1/5' },
    { header: 'Package Length', key: 'length', width: 'w-1/5' },
    { header: 'Package Width', key: 'width', width: 'w-1/5' },
  ];

  return (
    <section className="mt-4 w-full max-w-7xl px-4">
      <ShowWindowTitle smallTitle secondTitle="Logistics" />
      <br />
      <section className="m-2 overflow-x-auto rounded-2xl border-4 p-2">
        <h3 className="p-2 text-2xl font-bold">Chosen Shipping Plan</h3>
        <div className="min-w-full overflow-x-auto">
          <Suspense fallback={<DotsAnimation />}>
            <table className="min-w-full table-auto">
              <GenericTable1 data={shippingPlansToUse} columns={columns} />
            </table>
          </Suspense>
        </div>
      </section>

      <section className="m-2 my-10 rounded-2xl border-4 p-2 px-4">
        {listOptions.map((option, index) => (
          <Link
            key={index}
            href={option.link}
            className="mt-2 flex items-center justify-between"
          >
            <span className="text-start text-lg font-bold sm:text-xl md:text-2xl">
              {option.title}
            </span>
            <section className="size-10 rounded-2xl border-4 bg-deep-sapphire sm:size-12 md:size-16" />
          </Link>
        ))}
      </section>

      <TitleDescHr
        title="Vendor Boost subscription"
        description="Shipping Plan Fees Comparison per Shoppitto Location"
      />
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Shipping Plan Date Comparison per Shoppitto Location"
      />

      <CommonLink
        href={
          routes.vendor.logisticsAndApis.generalSolutions.individualServices
            .default
        }
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default Logistics;
export { getServerSideProps };
