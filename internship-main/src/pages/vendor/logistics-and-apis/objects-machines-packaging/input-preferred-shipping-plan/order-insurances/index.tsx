import { FC } from 'react';
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

const OrderInsurance: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Logistics" />

    <section className="m-2 rounded-2xl border-4 sm:overflow-x-auto lg:overflow-visible">
      <h3 className="rounded-2xl border-b-4 p-2 text-2xl font-bold sm:text-3xl">
        Existing Insurance per order
      </h3>

      <section className="m-2 flex min-w-80 flex-col justify-between gap-2 sm:flex-row">
        <span className="text-center text-lg font-bold sm:text-xl">
          Offerings
        </span>
        <span className="text-center text-lg font-bold sm:text-xl">
          Shipping Plan
        </span>
        <span className="text-center text-lg font-bold sm:text-xl">
          Input Own Insurance
        </span>
        <span className="text-center text-lg font-bold sm:text-xl">
          Add Insurance to the Existing Shipping Plan
        </span>
      </section>

      {Array.from({ length: 10 }).map((_, i) => (
        <section className="m-2 flex flex-col" key={i}>
          <p className="text-base font-bold sm:text-lg">Offering {i + 1}</p>
        </section>
      ))}
    </section>

    <section className="-mt-5 inline-flex flex-wrap">
      <button className="m-5 flex items-center justify-around rounded-2xl border-4 p-2 sm:p-4">
        Edit
      </button>
      <CommonButton type="button" className="w-36 rounded-2xl sm:w-48">
        Save
      </CommonButton>
    </section>

    <Description>
      <span className="text-sm sm:text-base lg:text-lg">
        The shipping plan may offer a maximum insurance amount per order.
        <br />
        The limit of insurance can never be higher than the price paid for the
        order.
        <br />
        You may choose to cover your own shipping or add insurance cover to the
        one already offered by a chosen shipping plan.
      </span>
    </Description>

    <div className="text-base sm:text-lg lg:text-xl">
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Shipping Insurance Comparison"
      />
    </div>

    <CommonLink
      href={
        routes.vendor.logisticsAndApis.objectsMachinesPackaging
          .inputPreferredShippingPlan.default
      }
    >
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default OrderInsurance;
export { getServerSideProps };
