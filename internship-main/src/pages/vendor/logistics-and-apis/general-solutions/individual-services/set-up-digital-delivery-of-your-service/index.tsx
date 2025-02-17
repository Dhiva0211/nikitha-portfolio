import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import Link from 'next/link';
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

const Logistics: FC = () => (
  <section className="mt-4 px-4">
    <ShowWindowTitle smallTitle secondTitle="Logistics" />

    <section className="m-4 overflow-x-auto rounded-2xl border-4 p-4">
      <h3 className="rounded-2xl border-b-4 p-2 text-3xl font-bold">
        Chosen Shipping Plan
      </h3>
      <section className="m-2 flex justify-around gap-4 text-center">
        <span className="text-xl font-bold">Solutions</span>
        <span className="text-xl font-bold">Digital Shipping Plan</span>
      </section>

      <section className="m-4 space-y-4">
        <section className="flex items-center justify-between">
          <span className="font-bold">Solution 1</span>
          <span className="text-end font-bold">UpUnikSelf Delivery</span>
        </section>
        <section className="flex items-center justify-between">
          <span className="font-bold">Solution 2</span>
          <span className="text-end font-bold">No Need</span>
        </section>
        <section className="flex items-center justify-between">
          <span className="font-bold">Solution 3</span>
          <span className="text-end font-bold">No Need</span>
        </section>

        {Array.from({ length: 7 }).map((_, i) => (
          <section className="flex items-center justify-between" key={i}>
            <span className="font-bold">Solution {i + 4}</span>
            <span className="text-end font-bold" />
          </section>
        ))}
      </section>
    </section>

    <section className="m-4">
      <Link
        href={
          routes.vendor.logisticsAndApis.generalSolutions.individualServices
            .setUpDigitalDeliveryOfYourService.inputPreferredShippingPlan
            .default
        }
        className="mt-2 flex items-center justify-between"
      >
        <span className="w-56 text-2xl font-bold">
          Input Preferred Digital Shipping Plan
        </span>
        <section className="size-6 rounded-2xl border-4 bg-deep-sapphire" />
      </Link>
    </section>

    <CommonLink
      href={
        routes.vendor.logisticsAndApis.generalSolutions.individualServices
          .default
      }
    >
      <section className="m-2 rounded-lg bg-blue-600 p-4 text-center text-white">
        Done
      </section>
    </CommonLink>
  </section>
);

export default Logistics;
export { getServerSideProps };
