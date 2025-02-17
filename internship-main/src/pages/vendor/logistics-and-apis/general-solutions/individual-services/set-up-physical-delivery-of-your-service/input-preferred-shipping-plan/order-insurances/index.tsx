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
  <section className="mt-4 px-4">
    <ShowWindowTitle smallTitle secondTitle="Logistics" />

    {/* Responsive table container for mobile scrolling */}
    <section className="m-2 overflow-x-auto rounded-2xl border-4 border-blue-800">
      <h3 className="rounded-2xl border-b-4 border-blue-800 p-2 text-2xl font-bold sm:text-3xl">
        Existing Insurance per Order
      </h3>

      {/* Responsive Table for Desktop and Mobile with rounded corners and bold lines */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="rounded-tl-2xl border-2 border-blue-800 p-2 text-center font-bold sm:text-xl">
              Solutions
            </th>
            <th className="border-2 border-blue-800 p-2 text-center font-bold sm:text-xl">
              Shipping Plan
            </th>
            <th className="border-2 border-blue-800 p-2 text-center font-bold sm:text-xl">
              Input Own Insurance
            </th>
            <th className="rounded-tr-2xl border-2 border-blue-800 p-2 text-center font-bold sm:text-xl">
              Add Insurance to Existing Plan
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={i}>
              <td className="border-2 border-blue-800 p-2 text-center font-semibold">
                Solution {i + 1}
              </td>
              <td className="border-2 border-blue-800 p-2 text-center">
                {/* Input field to enter shipping plan */}
                <input
                  type="text"
                  className="w-full rounded-md border p-1 text-center"
                  placeholder="Enter plan"
                />
              </td>
              <td className="border-2 border-blue-800 p-2 text-center">
                {/* Input field to input insurance */}
                <input
                  type="text"
                  className="w-full rounded-md border p-1 text-center"
                  placeholder="Enter insurance"
                />
              </td>
              <td className="border-2 border-blue-800 p-2 text-center">
                {/* Input field to add insurance */}
                <input
                  type="text"
                  className="w-full rounded-md border p-1 text-center"
                  placeholder="Add to plan"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>

    {/* Button section with mobile styling for side-by-side display */}
    <section className="mt-4 flex flex-row justify-center gap-4 sm:flex-row sm:gap-4">
      <button className="flex w-32 items-center justify-center rounded-2xl border-4 border-blue-800 p-2 sm:w-36">
        Edit
      </button>
      <CommonButton
        type="button"
        className="w-32 rounded-2xl border-4 border-blue-800 sm:w-36"
      >
        Save
      </CommonButton>
    </section>

    <Description>
      The shipping plan may offer a maximum insurance amount per order.
      <br />
      The limit of insurance can never be higher than the price paid for the
      order. You may choose to cover your own shipping or add insurance cover to
      the one already offered by a chosen shipping plan.
    </Description>

    <TitleDescHr
      title="Vendor Boost Subscription"
      description="Shipping Insurance Comparison"
    />

    <CommonLink
      href={
        routes.vendor.logisticsAndApis.generalSolutions.individualServices
          .setUpPhysicalDeliveryOfYourService.inputPreferredShippingPlan.default
      }
    >
      <section className="m-2 w-full rounded-xl bg-oxford-blue p-4 text-center text-lg font-semibold text-white sm:text-xl lg:text-2xl">
        Done
      </section>
    </CommonLink>
  </section>
);

export default OrderInsurance;
export { getServerSideProps };
