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
const TitleDescHr = dynamic(
  () =>
    import('@/components/common/two-text').then(mod => ({
      default: mod.TitleDescHr,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const options = [
  {
    name: 'Choose Solution Delivery Method',
    link: routes.vendor.orderSetup.generalSolutions.subscription.deliveryMethod,
    query: null,
  },
  {
    name: 'Optional: Integrate with Onsite Shipping Company Software',
    link: routes.underConstruction,
    query: null,
  },
  {
    name: 'Optional: Input Allowed Shipping Destinations Manually',
    link: routes.vendor.orderSetup.generalSolutions.subscription
      .shippingDestination,
    query: null,
  },
  {
    name: 'Optional: Integrate with Accounts',
    link: routes.underConstruction,
    query: null,
  },
];

const order = [
  {
    name: 'Solution 1',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc56925ad6c',
    price: '$150',
  },
  {
    name: 'Subscription 1',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698tttt',
    price: '$321.02',
  },
  {
    name: 'Service 1',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698ad6c',
    price: '$1000',
  },
  {
    name: 'Solution 2',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc56985e89c',
    price: '$500',
  },
  {
    name: 'Subscription 2',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc56984aa2',
    price: '$1000',
  },
  {
    name: 'Service 2',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698b936',
    price: '$2000',
  },
  {
    name: 'Solution 3',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc56985698',
    price: '$1000',
  },
  {
    name: 'Subscription 3',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698dcs2',
    price: '$2000',
  },
  {
    name: 'Service 3',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc56988uas',
    price: '$3000',
  },
  {
    name: 'Solution 4',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698a256',
    price: '$2000',
  },
  {
    name: 'Subscription 4',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698a989',
    price: '$3000',
  },
  {
    name: 'Service 4',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698adas',
    price: '$4000',
  },
  {
    name: 'Solution 5',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698ad6t',
    price: '$3000',
  },
  {
    name: 'Subscription 5',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698ad6z',
    price: '$4000',
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

const ITEMS_PER_PAGE = 5;

const OrderSetUp: FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedOrders = showAll ? order : order.slice(0, ITEMS_PER_PAGE);

  const toggleShow = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Order set up" />
      <section className="px-2">
        <h3 className="m-2 text-xl font-bold">Order wait list</h3>
        <section className="m-2 h-auto overflow-y-auto overflow-x-visible">
          <section className="grid grid-cols-3 justify-around rounded-2xl border-4 py-2 text-center">
            <span className="font-bold">UpUnikSelf order tracking number</span>
            <span className="font-bold">Solution</span>
            <span className="font-bold">Full price</span>
          </section>
          {displayedOrders.map(item => (
            <Link
              key={item.id}
              href={
                routes.vendor.orderSetup.generalSolutions.subscription
                  .trackingNumber
              }
            >
              <section className="-mt-5 grid h-14 w-full grid-cols-3 items-center rounded-b-2xl border-x-4 border-b-4 pt-4 text-center">
                <div className="group relative min-w-0 px-2">
                  <span className="block truncate" style={{ direction: 'rtl' }}>
                    {item.id}
                  </span>
                  <div className="invisible absolute -top-12 left-1/2 z-50 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                    <div className="relative whitespace-nowrap rounded-lg bg-deep-sapphire px-3 py-2 text-sm text-white shadow-lg">
                      {item.id}
                      <div className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-deep-sapphire" />
                    </div>
                  </div>
                </div>
                <div className="group relative min-w-0 px-2">
                  <span className="block truncate">{item.name}</span>
                  <div className="invisible absolute -top-12 left-1/2 z-50 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                    <div className="relative whitespace-nowrap rounded-lg bg-deep-sapphire px-3 py-2 text-sm text-white shadow-lg">
                      {item.name}
                      <div className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-deep-sapphire" />
                    </div>
                  </div>
                </div>
                <span>{item.price}</span>
              </section>
            </Link>
          ))}
        </section>
        <section className="grid w-full place-items-center">
          {order.length > ITEMS_PER_PAGE && (
            <button
              type="button"
              onClick={toggleShow}
              className="w-36 rounded-xl bg-alice-blue px-4 py-3 text-center text-sm text-deep-sapphire hover:bg-bright-gray sm:text-base lg:text-lg"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          )}
        </section>

        <Description>
          Click on the UpUnikSelf Order tracking number to access your order
          details.
        </Description>

        <h3 className="m-2 mt-4 text-xl font-bold">Order Set Up Settings</h3>
        <section className="m-2">
          {options.map(({ name, link, query }) => (
            <Link
              key={name}
              href={{
                pathname: link,
                query: query,
              }}
              className="m-2 flex items-center justify-between rounded-lg bg-alice-blue p-4"
            >
              <span>{name}</span>
              <section className="flex aspect-square size-8 items-center justify-center rounded-lg border-4 bg-deep-sapphire text-lg font-bold text-white sm:size-10">
                &gt;
              </section>
            </Link>
          ))}
        </section>

        <Description>
          Start by deciding your delivery method for each solution. You have the
          option to integrate with various types of software. By clicking on
          &quot;Choose Solution Delivery Method&quot;, you can easily set up
          your delivery methods.
        </Description>
      </section>

      <TitleDescHr
        title="Vendor Boost subscription"
        description="Compare Cost of Delivery Methods"
      />

      <CommonLink href={routes.vendor.dashboard}>
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default OrderSetUp;
export { getServerSideProps };
