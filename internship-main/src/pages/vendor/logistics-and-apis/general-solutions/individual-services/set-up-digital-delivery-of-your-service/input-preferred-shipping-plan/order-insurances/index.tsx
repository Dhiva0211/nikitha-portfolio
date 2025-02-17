import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import { getToken, validSessionToken } from '@/helpers/validations';
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

const OrderInsuranceTable: FC = () => (
  <section className="m-4 overflow-hidden rounded-2xl border-4 border-deep-sapphire bg-white p-4 shadow-md">
    <ShowWindowTitle smallTitle secondTitle="Logistics" />

    <h3 className="mb-4 text-center text-3xl font-bold text-deep-sapphire">
      Existing Insurance per Order
    </h3>

    <section className="overflow-x-auto">
      <section className="min-w-full">
        <section className="flex justify-between rounded-t-lg bg-deep-sapphire p-3 text-white">
          <span className="flex-1 text-center text-lg font-bold">
            Solutions
          </span>
          <span className="flex-1 text-center text-lg font-bold">
            Digital Shipping Plan
          </span>
          <span className="flex-1 text-center text-lg font-bold">
            Input Own Insurance
          </span>
          <span className="flex-1 text-center text-lg font-bold">
            Add Insurance to the Existing Shipping Plan
          </span>
        </section>

        <section className="rounded-b-lg bg-gray-100">
          {Array.from({ length: 10 }).map((_, i) => (
            <section
              key={i}
              className="flex justify-between border-b p-3 text-center last:border-b-0"
            >
              <span className="flex-1 text-lg font-bold text-deep-sapphire">
                Solution {i + 1}
              </span>
              <span className="flex-1 text-lg">&nbsp;</span>
              <span className="flex-1 text-lg">&nbsp;</span>
              <span className="flex-1 text-lg">&nbsp;</span>
            </section>
          ))}
        </section>
      </section>
    </section>

    <Description>
      The digital shipping plan may offer a maximum insurance amount per order.
      The limit of insurance can never be higher than the price paid for the
      order. You may choose to cover your own digital shipping or add insurance
      to the existing plan.
    </Description>

    {/* Action Buttons */}
    <section className="mt-4 flex justify-center gap-4">
      <button className="m-5 flex w-36 items-center justify-around rounded-xl border-4 p-2">
        Edit
      </button>
      <CommonButton type="button" className="w-36 rounded-2xl">
        Save
      </CommonButton>
    </section>

    <CommonLink
      href={
        routes.vendor.logisticsAndApis.generalSolutions.individualServices
          .setUpDigitalDeliveryOfYourService.inputPreferredShippingPlan.default
      }
    >
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default OrderInsuranceTable;
export { getServerSideProps };
