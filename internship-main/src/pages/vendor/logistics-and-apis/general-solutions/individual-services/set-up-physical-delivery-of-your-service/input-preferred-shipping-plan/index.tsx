import { FC, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import Link from 'next/link';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import GenericTable3 from '@/components/common/table/table2';
import { Table } from '@/components/common/table';
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
const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
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

const listOptions = [
  {
    title: 'Explore Customized Shipping Cost',
    link: routes.underConstruction,
  },
  {
    title: 'Manually Input Shipping Rate Estimated',
    link: routes.vendor.logisticsAndApis.generalSolutions.individualServices
      .setUpPhysicalDeliveryOfYourService.inputPreferredShippingPlan
      .manualInputShippingRateEstimated,
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

const InputPreferredShippingPlan: FC = () => {
  const columns1 = [
    { header: 'Solutions', key: 'value', width: 'w-1/6' },
    { header: 'Shipping', key: 'material', width: 'w-1/6' },
    { header: 'Expected Delivery', key: 'weight', width: 'w-1/6' },
    { header: 'Delivery to US ', key: 'height', width: 'w-1/6' },
    { header: 'Delivery to Brazil', key: 'length', width: 'w-1/6' },
    { header: 'Delivery to Columbia', key: 'width', width: 'w-1/6' },
  ];
  const columns = [
    { header: 'Shipping Deal', key: 'dealName', width: 'w-1/6' },
    { header: 'Conditions', key: 'conditions', width: 'w-1/6' },
    { header: 'Expected Delivery', key: 'expectedDelivery', width: 'w-1/6' },
    { header: 'Delivery to US', key: 'deliveryUS', width: 'w-1/6' },
    { header: 'Delivery to Brazil', key: 'deliveryBrazil', width: 'w-1/6' },
    { header: 'Delivery to Colombia', key: 'deliveryColombia', width: 'w-1/6' },
  ];
  const isOptionSelected = (option: boolean) =>
    `m-4 flex cursor-pointer items-center justify-between ${option ? 'text-lg font-bold' : 'text-base'}`;
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [shippingDeals, setShippingDeals] = useState([
    {
      id: 'usps1',
      label: 'USPS 1',
      dealName: 'USPS 1',
      conditions: 'Condition 1',
      expectedDelivery: '5-7 days',
      deliveryUS: 'Available',
      deliveryBrazil: 'Not Available',
      deliveryColombia: 'Available',
    },
    {
      id: 'usps2',
      label: 'USPS 2',
      dealName: 'USPS 2',
      conditions: 'Condition 2',
      expectedDelivery: '7-10 days',
      deliveryUS: 'Available',
      deliveryBrazil: 'Available',
      deliveryColombia: 'Not Available',
    },
  ]);
  const [solutions, setSolutions] = useState([
    {
      value: 'solution1',
      label: 'Solution 1',
      material: '',
      weight: '',
      height: '',
      length: '',
      width: '',
      id: 'SolutionId1',
    },
    {
      value: 'solution2',
      label: 'Solution 2',
      material: '',
      weight: '',
      height: '',
      length: '',
      width: '',
      id: 'SolutionId2',
    },
  ]);

  const add1 = () => {
    setSolutions([
      ...solutions,
      {
        id: `solutionId${solutions.length + 1}`,
        value: `solution${solutions.length + 1}`,
        label: `Solution ${solutions.length + 1}`,
        material: '',
        weight: '',
        height: '',
        length: '',
        width: '',
      },
    ]);
  };

  const remove1 = (id: string) => {
    setSolutions(solutions.filter(solution => solution.id !== id));
  };

  const removeShippingDeal = (id: string) => {
    setShippingDeals(shippingDeals.filter(deal => deal.id !== id));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setShippingDeals(
      shippingDeals.map(deal =>
        deal.id === id
          ? { ...deal, [event.target.name]: event.target.value }
          : deal,
      ),
    );
  };

  const handleAddUSPSDeal = () => {
    const uspsCount =
      shippingDeals.filter(item => item.label.startsWith('USPS')).length + 1;
    setShippingDeals([
      ...shippingDeals,
      {
        id: `usps-${uspsCount}`,
        label: `USPS ${uspsCount}`,
        dealName: '',
        conditions: '',
        expectedDelivery: '',
        deliveryUS: '',
        deliveryBrazil: '',
        deliveryColombia: '',
      },
    ]);
  };

  const handleAddDHLDeal = () => {
    const dhlCount =
      shippingDeals.filter(item => item.label.startsWith('DHL')).length + 1;
    setShippingDeals([
      ...shippingDeals,
      {
        id: `dhl-${dhlCount}`,
        label: `DHL ${dhlCount}`,
        dealName: '',
        conditions: '',
        expectedDelivery: '',
        deliveryUS: '',
        deliveryBrazil: '',
        deliveryColombia: '',
      },
    ]);
  };

  return (
    <section className="mt-4 w-full max-w-7xl px-4">
      <ShowWindowTitle smallTitle secondTitle="Logistics" />

      <br />

      <section className="m-2 overflow-x-auto rounded-2xl border-4 p-2">
        <h3 className="p-2 text-2xl font-bold">Shipping Deals</h3>
        <div className="min-w-full overflow-x-auto">
          <Suspense fallback={<DotsAnimation />}>
            <table className="min-w-full table-auto">
              <GenericTable3
                data={shippingDeals}
                columns={columns}
                onRemove={removeShippingDeal}
                addUSPSDeal={handleAddUSPSDeal}
                addDHLDeal={handleAddDHLDeal}
                onChange={onChange}
              />
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
            <section className="size-12 rounded-2xl border-4 bg-deep-sapphire sm:size-12 md:size-16" />
          </Link>
        ))}
      </section>

      <Description>
        A considerable amount of the target market may prefer not to pay
        shipping costs. It would be wise to carefully consider the advantages
        and disadvantages of including all shipping costs in the Offering Price.
        Please check the button below to confirm that you have or have not
        included all shipping costs in the Offering Price.
      </Description>

      <section className="m-2 flex items-center justify-around">
        <span className="whitespace-normal break-words font-bold">
          Does the offering price include shipping costs?
        </span>
        <button type="button" className="size-16 rounded-2xl border-4">
          Yes
        </button>
        <button type="button" className="size-16 rounded-2xl border-4">
          No
        </button>
      </section>

      <section className="m-2 overflow-x-auto rounded-2xl border-4 p-2">
        <h3 className="p-2 text-2xl font-bold">Choose Shipping</h3>
        <div className="min-w-full overflow-x-auto">
          <Suspense fallback={<DotsAnimation />}>
            <table className="min-w-full table-auto">
              <Table
                data={solutions}
                columns={columns1}
                onRemove={remove1}
                onAdd={add1}
                onChange={onChange}
                addButtonText="Add Another Package"
              />
            </table>
          </Suspense>
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

      <Description>
        If you choose Own Shipping, you have to input the Expected Delivery Date
        and the Expected Delivery price for each of the 3 countries. If the
        shipping rate is above the rate you charged the Shoppitto at checkout,
        it may decrease your margins.
      </Description>

      <Select labelToUse="Confirm logistics provider">
        <button
          onClick={() => setConfirmed(!confirmed)}
          className={isOptionSelected(confirmed)}
        >
          By clicking, you confirm the above choice of shipping, and that you
          have read and agreed to the shipping company’s term and conditions.
          <label className="ml-2 flex items-center font-bold sm:size-48 lg:size-16">
            <input
              type="checkbox"
              id="confirm-logistics"
              className="m-2 rounded-lg border-2 border-gray-800 sm:size-48 lg:size-16"
              checked={confirmed}
              onChange={() => setConfirmed(!confirmed)}
            />
          </label>
        </button>
      </Select>

      <Link
        href={
          routes.vendor.logisticsAndApis.generalSolutions.individualServices
            .setUpPhysicalDeliveryOfYourService.inputPreferredShippingPlan
            .orderInsurances
        }
        className="m-2 flex items-center justify-between"
      >
        <section>
          <p className="w-56 text-2xl font-bold">Order Insurances</p>
          <p className="w-56 text-lg font-bold">Optional</p>
        </section>
        <section className="size-20 rounded-2xl border-4 bg-deep-sapphire" />
      </Link>

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
            .setUpPhysicalDeliveryOfYourService.default
        }
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default InputPreferredShippingPlan;
export { getServerSideProps };
