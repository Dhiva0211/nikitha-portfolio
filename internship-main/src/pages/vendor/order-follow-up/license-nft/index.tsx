import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import Link from 'next/link';
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

const LicenseNft: FC = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="mx-2 my-8 mt-4 rounded-lg border-t-4 border-deep-sapphire p-4 shadow-md sm:mt-2 sm:p-6 md:mx-4 md:p-8 lg:mt-8">
      <ShowWindowTitle smallTitle secondTitle="Order Follow Up" />

      <section className="m-2 overflow-y-hidden overflow-x-visible p-2 sm:p-1 lg:p-6">
        <h3 className="m-2 text-2xl font-bold sm:text-xl lg:text-3xl">
          Final order wait list
        </h3>

        {/* Initial rows that are always visible */}
        <section className="flex justify-around rounded-2xl border-4 p-2 sm:flex-col sm:gap-2 sm:p-1 lg:flex-row lg:gap-4 lg:p-6">
          <span>UpUnikSelf order tracking number</span>
          <span>[License]</span>
          <span>[Full price]</span>
          <span>[License Agreement was delivered to both parties]</span>
        </section>

        <Link href={routes.underConstruction}>
          <section className="-mt-5 h-12 w-full rounded-b-2xl border-x-4 border-b-4 lg:h-16" />
        </Link>
        <Link href={routes.underConstruction}>
          <section className="-mt-5 h-12 w-full rounded-b-2xl border-x-4 border-b-4 lg:h-16" />
        </Link>

        {/* Additional rows conditionally displayed */}
        {showMore && (
          <>
            <Link href={routes.underConstruction}>
              <section className="-mt-5 h-12 w-full rounded-b-2xl border-x-4 border-b-4 lg:h-16" />
            </Link>
            <Link href={routes.underConstruction}>
              <section className="-mt-5 h-12 w-full rounded-b-2xl border-x-4 border-b-4 lg:h-16" />
            </Link>
          </>
        )}

        {/* Show More / Show Less button */}
        <div className="mt-4 flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => setShowMore(false)}
            className="rounded-lg bg-gray-200 px-4 py-3 text-center text-lg transition-all duration-200 ease-in-out hover:bg-gray-300 lg:text-xl"
            style={{ maxWidth: '200px', width: '100%' }}
          >
            Show Less
          </button>

          <button
            type="button"
            onClick={() => setShowMore(true)}
            className="rounded-lg bg-gray-200 px-4 py-3 text-center text-lg transition-all duration-200 ease-in-out hover:bg-gray-300 lg:text-xl"
            style={{ maxWidth: '200px', width: '100%' }}
          >
            Show More
          </button>
        </div>
      </section>

      <CommonLink href={routes.vendor.dashboard}>
        <section className="m-2 p-2 sm:p-1 lg:p-6">Done</section>
      </CommonLink>
    </section>
  );
};

export default LicenseNft;
export { getServerSideProps };
