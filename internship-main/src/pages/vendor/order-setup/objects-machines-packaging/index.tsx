import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import Link from 'next/link';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryOrderSetUp } from '@/helpers/initial-values';

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

const options = [
  {
    name: 'Optional Integrate with Omnichannel Stock Software',
    link: routes.underConstruction,
  },
  {
    name: 'Optional Integrate with Plain Stock Software',
    link: routes.underConstruction,
  },
  {
    name: 'Optional Integrate with Accounts Software',
    link: routes.underConstruction,
  },
  {
    name: 'Optional Input Stock Manually',
    link: routes.vendor.orderSetup.objMachPack.setUp.default,
  },
  {
    name: 'Optional Integrate with Shipping Company Software',
    link: routes.underConstruction,
  },
  {
    name: 'Optional Input Allowed Shipping Destinations Manually',
    link: routes.vendor.orderSetup.objMachPack.shippingDestinations,
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
    categoryOrderSetUp,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const OrderSetUp: FC = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(prevShowMore => !prevShowMore);

  return (
    <section className="mx-auto max-w-4xl overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-10">
      <ShowWindowTitle smallTitle secondTitle="Order Set Up" />

      <h3 className="text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
        Order Wait List
      </h3>

      <section className="m-2 overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10">
        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-4 p-4 sm:p-6 lg:p-8">
          <span className="flex-1 text-center text-sm sm:text-base md:text-lg lg:text-xl">
            UpUnikSelf order tracking number
          </span>
          <span className="flex-1 text-center text-sm sm:text-base md:text-lg lg:text-xl">
            [Basic Offering]
          </span>
          <span className="flex-1 text-center text-sm sm:text-base md:text-lg lg:text-xl">
            [Full price]
          </span>
        </section>

        <Link href={routes.vendor.orderSetup.objMachPack.trackingNumber}>
          <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4 sm:h-14 lg:h-16" />
        </Link>
        <Link href={routes.vendor.orderSetup.objMachPack.trackingNumber}>
          <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4 sm:h-14 lg:h-16" />
        </Link>

        {showMore && (
          <>
            <Link href={routes.vendor.orderSetup.objMachPack.trackingNumber}>
              <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4 sm:h-14 lg:h-16" />
            </Link>
            <Link href={routes.vendor.orderSetup.objMachPack.trackingNumber}>
              <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4 sm:h-14 lg:h-16" />
            </Link>
          </>
        )}

        <button
          type="button"
          onClick={toggleShowMore}
          className="mt-4 w-full text-center text-sm sm:text-base lg:text-lg"
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </section>

      <h3 className="m-2 mt-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
        Order Set Up Settings
      </h3>

      <section className="m-2 space-y-4">
        {options.map(({ name, link }) => (
          <Link
            key={name}
            href={link}
            className="flex items-center justify-between rounded-lg border border-gray-300 bg-corn-flower-blue/40 p-4 text-sm sm:text-base md:text-lg lg:text-xl"
          >
            <span className="flex-1">{name}</span>
            <section className="flex size-8 items-center justify-center rounded-lg border-4 bg-deep-sapphire text-lg font-bold text-white sm:size-10">
              &gt;
            </section>
          </Link>
        ))}
      </section>

      <p className="m-4 mx-2 max-w-7xl rounded-xl border-4 bg-lavender-blush p-4 text-center text-sm sm:text-base md:text-lg lg:text-xl">
        You will have to give us insight into your stock and shipping options in
        order to complete your offerings listing process. You can choose either
        to do it with the help of software, integrate with your preferred
        shipping company, or manually.
      </p>

      <div className="mt-6 flex justify-center">
        <CommonLink href={routes.vendor.dashboard}>
          <button className="w-full max-w-xs rounded-2xl bg-deep-sapphire p-4 text-center text-base font-bold text-white shadow-lg transition duration-200 hover:bg-blue-800 sm:text-lg md:text-xl">
            Done
          </button>
        </CommonLink>
      </div>
    </section>
  );
};

export default OrderSetUp;
export { getServerSideProps };
