import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryOrderFollowUp } from '@/helpers/initial-values';

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
const TitleDescHr = dynamic(
  () =>
    import('@/components/common/two-text').then(mod => ({
      default: mod.TitleDescHr,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

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
    categoryOrderFollowUp,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const Subscription: FC = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const rowsToShow = showMore ? 10 : 2;

  const toggleShowMore = () => setShowMore(prev => !prev);

  return (
    <section className="w-full max-w-7xl rounded-lg border-t-4 border-deep-sapphire bg-white p-2 shadow-md md:p-4 lg:p-6">
      <ShowWindowTitle smallTitle secondTitle="Order Follow Up" />

      <h3 className="m-2 text-2xl font-bold sm:text-xl lg:text-3xl">
        Final order wait list
      </h3>

      <section className="h-96 overflow-y-auto overflow-x-visible">
        <section className="grid grid-cols-3 justify-around rounded-2xl border-4 py-2 text-center">
          <span className="font-bold">UpUnikSelf order tracking number</span>
          <span className="font-bold">Solution</span>
          <span className="font-bold">Full price</span>
          <span className="font-bold">Solution has been delivered</span>
        </section>

        {order.slice(0, rowsToShow).map(item => (
          <section key={item.id}>
            <section className="-mt-5 grid h-14 w-full grid-cols-3 items-center rounded-b-2xl border-x-4 border-b-4 pt-4 text-center">
              <span>{item.id}</span>
              <span>{item.name}</span>
              <span>{item.price}</span>
            </section>
          </section>
        ))}
      </section>

      <section className="mt-4 flex justify-center space-x-4">
        <button
          type="button"
          onClick={toggleShowMore}
          className="rounded-lg bg-gray-200 px-4 py-3 text-center text-lg transition-all duration-200 ease-in-out hover:bg-gray-300 lg:text-xl"
          style={{ maxWidth: '200px', width: '100%' }}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </section>

      <TitleDescHr
        title="Vendor Boost Subscription"
        description="Automate Order Follow Up"
      />

      <CommonLink href={routes.vendor.dashboard}>
        <section className="m-2 w-full rounded-2xl bg-deep-sapphire p-4 text-center text-lg font-semibold text-white sm:text-xl lg:text-2xl">
          Done
        </section>
      </CommonLink>
    </section>
  );
};

export default Subscription;
export { getServerSideProps };
