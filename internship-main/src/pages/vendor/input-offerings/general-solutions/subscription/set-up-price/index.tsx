import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { categoryInputOfferings } from '@/helpers/initial-values';
import { getToken, validSessionToken } from '@/helpers/validations';
import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const SubscriptionSetUp = dynamic(
  () =>
    import('@/components/vendor/input-offerings/set-up/subscription').then(
      mod => ({
        default: mod.SubscriptionSetUp,
      }),
    ),
  {
    loading: () => <DotsAnimation />,
  },
);
const EditOfferingSubscription = dynamic(
  () =>
    import(
      '@/components/vendor/input-offerings/set-up/edit-offering-subscription'
    ).then(mod => ({
      default: mod.EditOfferingSubscription,
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
    categoryInputOfferings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const SetUp: FC = () => (
  <EditOfferingSubscription>
    <SubscriptionSetUp
      salesTaxesOptionsLink={
        routes.vendor.inputOfferings.generalSolutions.subscription.setUpPrice
          .salesTaxesOptions
      }
      individualEditLink={
        routes.vendor.inputOfferings.generalSolutions.subscription.setUpPrice
          .default
      }
      returnLink={
        routes.vendor.inputOfferings.generalSolutions.subscription.default
      }
    >
      {/* Purple Message 1 */}
      <div className="m-4 bg-purple-200 p-4 text-lg font-medium text-black">
        <strong>Step 1:</strong> Configure your subscription pricing options.
      </div>

      {/* Purple Message 2 */}
      <div className="m-4 bg-purple-200 p-4 text-lg font-medium text-black">
        <strong>Step 2:</strong> Select your applicable sales taxes.
      </div>

      {/* Price Discount Chart Title (Optimized Size) */}
      <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
        Price Discount Chart
      </h2>

      {/* Setup Price Rectangles */}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="cursor-pointer rounded-lg border p-4 text-center hover:bg-blue-800 hover:text-white">
          Set Up Price 1
        </div>
        <div className="cursor-pointer rounded-lg border p-4 text-center hover:bg-blue-800 hover:text-white">
          Set Up Price 2
        </div>
      </div>

      {/* Optimized Discount Rectangles */}
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3">
        <div className="rounded-lg border p-4 text-center text-lg font-bold">
          5%
        </div>
        <div className="rounded-lg border p-4 text-center text-lg font-bold sm:p-4 md:p-6">
          10%
        </div>
      </div>

      {/* Optimized Special Dates Rectangles */}
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3">
        <div className="rounded-lg border p-4 text-center text-lg font-bold">
          Start Date
        </div>
        <div className="rounded-lg border p-4 text-center text-lg font-bold">
          Special Date
        </div>
        <div className="rounded-lg border p-4 text-center text-lg font-bold">
          End Date
        </div>
      </div>
    </SubscriptionSetUp>
  </EditOfferingSubscription>
);

export default SetUp;
export { getServerSideProps };
