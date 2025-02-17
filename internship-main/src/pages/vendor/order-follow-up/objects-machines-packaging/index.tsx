import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import Link from 'next/link';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { RenderIf } from '@/helpers/common/render-conditional';
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
    categoryOrderFollowUp,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const ObjectsMachinesPackaging: FC = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="mt-4 sm:mt-2 md:mt-6 lg:mt-8">
      <ShowWindowTitle smallTitle secondTitle="Order Follow Up" />

      <section className="m-2 overflow-y-hidden overflow-x-visible p-2 sm:p-1 md:p-4 lg:p-6">
        <h3 className="m-2 text-2xl font-bold sm:text-xl md:text-3xl">
          Final order wait list
        </h3>
        <section className="flex justify-around rounded-2xl border-4 p-2 sm:flex-col sm:gap-2 sm:p-1 md:flex-row md:gap-4 md:p-4 lg:p-6">
          <span className="w-full sm:w-auto md:w-36">
            UpUnikSelf order tracking number
          </span>
          <span>[Basic Offering]</span>
          <span>[Full price]</span>
        </section>

        <Link
          href={routes.vendor.orderFollowUp.objectsMachinesPackaging.followUp}
        >
          <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4 sm:h-12 md:h-16" />
        </Link>
        <Link
          href={routes.vendor.orderFollowUp.objectsMachinesPackaging.followUp}
        >
          <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4 sm:h-12 md:h-16" />
        </Link>

        <RenderIf
          condition={showMore}
          then={
            <>
              <Link
                href={
                  routes.vendor.orderFollowUp.objectsMachinesPackaging.followUp
                }
              >
                <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4 sm:h-12 md:h-16" />
              </Link>
              <Link
                href={
                  routes.vendor.orderFollowUp.objectsMachinesPackaging.followUp
                }
              >
                <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4 sm:h-12 md:h-16" />
              </Link>
            </>
          }
          otherwise={null}
        />

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

      <div className="scale-95 p-4 sm:p-2 lg:p-3">
        <TitleDescHr
          title="Vendor Boost subscription"
          description="Automate order follow up"
        />
      </div>

      <CommonLink href={routes.vendor.dashboard}>
        <section className="m-2 rounded-lg border border-deep-sapphire p-2 sm:p-1 md:p-2 lg:p-2">
          Done
        </section>
      </CommonLink>
    </section>
  );
};

export default ObjectsMachinesPackaging;
export { getServerSideProps };
