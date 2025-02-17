import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import Link from 'next/link';
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
    title: 'Manually Input Shipping Rate Estimates',
    link: routes.vendor.logisticsAndApis.objectsMachinesPackaging
      .inputPreferredShippingPlan.manualInputShippingRateEstimated,
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
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const isOptionSelected = (option: boolean) =>
    `m-4 flex cursor-pointer items-center justify-between ${option ? 'text-lg font-bold' : 'text-base'}`;

  return (
    <section className="mt-4 overflow-scroll">
      <ShowWindowTitle smallTitle secondTitle="Logistics" />

      <section className="m-2 overflow-x-scroll rounded-2xl border-4">
        <h3 className="rounded-2xl border-b-4 p-2 text-3xl font-bold">
          Shipping deals
        </h3>

        <section className="m-2 flex gap-2">
          <span className="text-center text-xl font-bold">Shipping Deals</span>
          <span className="text-center text-xl font-bold">Conditions</span>
          <span className="text-center text-xl font-bold">
            Expected Delivery
          </span>
          <span className="text-center text-xl font-bold">Delivery to US</span>
          <span className="text-center text-xl font-bold">
            Delivery to Brazil
          </span>
          <span className="text-center text-xl font-bold">
            Delivery to Colombia
          </span>
        </section>

        <section className="m-2 flex flex-col">
          <p className="text-lg font-bold">USPS 1</p>
          <p className="text-lg font-bold">USPS 2</p>
          <p className="text-lg font-bold">DHL 1</p>
          <p className="text-lg font-bold">DHL 2</p>
        </section>
      </section>

      <section className="m-4">
        {listOptions.map((option, index) => (
          <Link
            key={index}
            href={option.link}
            className="mt-2 flex items-center justify-between"
          >
            <span className="w-56 text-2xl font-bold">{option.title}</span>
            <section className="size-20 rounded-2xl border-4 bg-deep-sapphire" />
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

      <section className="m-2 overflow-x-scroll rounded-2xl border-4">
        <h3 className="rounded-2xl border-b-4 p-2 text-3xl font-bold">
          Choose Shipping
        </h3>

        <section className="m-2 flex justify-between gap-2">
          <span className="text-center text-xl font-bold">Offering</span>
          <span className="text-center text-xl font-bold">Shipping</span>
          <span className="text-center text-xl font-bold">
            Expected Delivery
          </span>
          <span className="text-center text-xl font-bold">Delivery to US</span>
          <span className="text-center text-xl font-bold">
            Delivery to Brazil
          </span>
          <span className="text-center text-xl font-bold">
            Delivery to Colombia
          </span>
        </section>

        <section className="m-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <p className="font-bold" key={i}>
              Offering {i + 1}
            </p>
          ))}
        </section>
      </section>
      <section className="-mt-5 inline-flex">
        <button className="m-5 flex items-center justify-around rounded-2xl border-4 p-2">
          Edit
        </button>
        <CommonButton type="button" className="w-36 rounded-2xl">
          Save
        </CommonButton>
      </section>

      <Description>
        If you choose Own Shipping, you have to input the Expected Delivery Date
        and the Expected Delivery price for each of the 3 countries. When the
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
          <input
            type="checkbox"
            id="confirm-logistics"
            className="m-2 size-16"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
          />
        </button>
      </Select>

      <Link
        href={
          routes.vendor.logisticsAndApis.objectsMachinesPackaging
            .inputPreferredShippingPlan.orderInsurances
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
        href={routes.vendor.logisticsAndApis.objectsMachinesPackaging.default}
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default InputPreferredShippingPlan;
export { getServerSideProps };
