import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { FC } from 'react';
import Link from 'next/link';
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

const ManageReturnsObjectsMachinesPackaging: FC = () => {
  const router = useRouter();

  const [visibleRows, setVisibleRows] = useState(2); // Control the initial number of empty rows

  const addRows = () => setVisibleRows(prev => prev + 2);
  const removeRows = () => setVisibleRows(prev => Math.max(2, prev - 2));

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="mt-4 sm:mt-2 lg:mt-8">
      <ShowWindowTitle smallTitle secondTitle="Manage Returns" />

      <section className="m-2 overflow-y-hidden overflow-x-visible p-2 sm:p-1 lg:p-6">
        <h3 className="m-2 text-2xl font-bold sm:text-xl lg:text-3xl">
          Orders complaints received
        </h3>

        {/* Static row with tracking number, solution, and price (only displayed once) */}
        <section className="flex flex-col justify-around gap-2 rounded-2xl border-4 p-2 sm:flex-row sm:gap-4 sm:p-4 lg:p-6">
          <span>UpUnikSelf order tracking number</span>
          <span>[Basic Offering]</span>
          <span>[Price]</span>
        </section>

        {/* Render empty rows based on the current visibleRows state */}
        {Array.from({ length: visibleRows }).map((_, index) => (
          <Link
            key={index}
            href={routes.vendor.manageReturns.objectsMachinesPackaging.complain}
          >
            <section className="-mt-5 h-12 w-full rounded-b-2xl border-x-4 border-b-4 sm:h-14 lg:h-16" />
          </Link>
        ))}

        <div className="mt-6 flex justify-center gap-4">
          {visibleRows > 2 && (
            <button
              type="button"
              onClick={removeRows}
              className="w-full rounded-lg bg-alice-blue px-4 py-3 text-center text-sm text-deep-sapphire hover:bg-bright-gray sm:text-base lg:text-lg"
            >
              Show Less
            </button>
          )}
          <button
            type="button"
            onClick={addRows}
            className="w-full rounded-lg bg-alice-blue px-4 py-3 text-center text-sm text-deep-sapphire hover:bg-bright-gray sm:text-base lg:text-lg"
          >
            Show More
          </button>
        </div>
      </section>

      <CommonLink href={routes.vendor.dashboard} onClick={goBack}>
        <section className="m-2 p-2 sm:p-4 lg:p-6">Done</section>
      </CommonLink>
    </section>
  );
};

export default ManageReturnsObjectsMachinesPackaging;
export { getServerSideProps };
