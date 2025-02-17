import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryManageReturns } from '@/helpers/initial-values';

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

const order = [
  {
    name: 'Solution 1',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc56925ad6c',
    price: '$150',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
  },
  {
    name: 'Subscription 1',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698tttt',
    price: '$321.02',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
  },
  {
    name: 'Service 1',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698ad6c',
    price: '$1000',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
  },
  {
    name: 'Solution 2',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc56985e89c',
    price: '$500',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
  },
  {
    name: 'Subscription 2',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc56984aa2',
    price: '$1000',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
  },
  {
    name: 'Service 2',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698b936',
    price: '$2000',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
  },
  {
    name: 'Solution 3',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc56985698',
    price: '$1000',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
  },
  {
    name: 'Subscription 3',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698dcs2',
    price: '$2000',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
  },
  {
    name: 'Service 3',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc56988uas',
    price: '$3000',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
  },
  {
    name: 'Solution 4',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698a256',
    price: '$2000',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
  },
  {
    name: 'Subscription 4',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698a989',
    price: '$3000',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
  },
  {
    name: 'Service 4',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698adas',
    price: '$4000',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
  },
  {
    name: 'Solution 5',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698ad6t',
    price: '$3000',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
  },
  {
    name: 'Subscription 5',
    id: 'eafe6eb1-5e89-4aa2-b936-f5dc5698ad6z',
    price: '$4000',
    solution: '',
    complaintDate: '',
    deliveryMethod: '',
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
    categoryManageReturns,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const IndividualSolutionsSubscription: FC = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const rowsToShow = showMore ? 10 : 2;

  const toggleShowMore = () => setShowMore(prev => !prev);

  return (
    <section className="mt-4 w-full overflow-hidden px-4 sm:mt-2 lg:mt-8">
      <ShowWindowTitle smallTitle secondTitle="Manage Returns" />
      <section className="m-2 w-full p-2">
        <div className="overflow-x-auto sm:overflow-x-visible">
          <table className="min-w-full table-auto border-separate border-spacing-0 rounded-2xl border-4">
            <thead>
              <tr className="text-center">
                <th className="border-b-4 px-4 py-2 font-bold">
                  UpUnikSelf order tracking number
                </th>
                <th className="border-b-4 px-4 py-2 font-bold">Solution</th>
                <th className="border-b-4 px-4 py-2 font-bold">Full price</th>
                <th className="border-b-4 px-4 py-2 font-bold">
                  Solution has been delivered
                </th>
                <th className="border-b-4 px-4 py-2 font-bold">
                  Date of Complaint/Return
                </th>
                <th className="rounded-tr-2xl border-b-4 font-bold">
                  Delivery Method
                </th>
              </tr>
            </thead>
            <tbody>
              {order.slice(0, rowsToShow).map((item, index) => (
                <tr key={item.id} className="items-center text-center">
                  {Object.keys(item).map((key, keyIndex) => (
                    <td
                      key={keyIndex}
                      className={`px-4 py-2 ${index === rowsToShow - 1 ? 'rounded-b-2xl' : 'border-b-4'}`}
                    >
                      {item[`${key}`]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

      <CommonLink href={routes.vendor.dashboard}>
        <section className="m-2 w-full rounded-2xl bg-deep-sapphire p-4 text-center text-lg font-semibold text-white sm:text-xl lg:text-2xl">
          Done
        </section>
      </CommonLink>
    </section>
  );
};

export default IndividualSolutionsSubscription;
export { getServerSideProps };
