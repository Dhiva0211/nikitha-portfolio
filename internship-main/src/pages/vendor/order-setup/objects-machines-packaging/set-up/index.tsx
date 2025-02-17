'use client';
import { useRouter } from 'next/router';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import Link from 'next/link';
import { routes } from '@/routes';
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

const offerings = Array.from(
  { length: 10 },
  (_, i) => `Basic Offering ${i + 1}`,
);

const SetUp: FC = () => {
  const router = useRouter();

  const goBack = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.back();
  };

  return (
    <main className="flex grow items-center justify-center overflow-hidden">
      <section className="mx-auto mt-4 w-full max-w-screen-lg p-4 sm:p-6 md:p-8 lg:p-10">
        <ShowWindowTitle smallTitle secondTitle="Order Setup" />
        <h3 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          Optional Input Stock Manually
        </h3>

        <Description>
          Select a Basic Offering to view and update stock.
        </Description>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {offerings.map((title, index) => (
            <section
              className="flex flex-col items-center justify-center gap-4 rounded-lg border border-gray-300 p-6 text-center"
              key={title}
            >
              <Link
                href={{
                  pathname:
                    routes.vendor.orderSetup.objMachPack.setUp
                      .BasicOfferingStock,
                  query: { name: index + 1 },
                }}
                className="w-full text-lg font-semibold text-blue-600 hover:underline sm:text-xl md:text-2xl"
              >
                {title}
                Basic Offering Stock
                <section className="size-5 rounded-full border-4" />
              </Link>

              <input
                type="number"
                placeholder="Enter Stock"
                className="w-full rounded-lg border border-gray-300 p-2 text-center text-base sm:text-lg md:text-xl"
              />
            </section>
          ))}
        </div>

        <CommonLink
          href={routes.vendor.orderSetup.objMachPack.default}
          onClick={goBack}
          className="block w-full"
        >
          <section className="rounded-md bg-deep-sapphire px-4 py-2 text-base font-medium text-white transition-all hover:bg-deep-sapphire/90 focus:outline-none focus:ring-4 focus:ring-deep-sapphire/50 sm:px-6 sm:text-lg">
            Done
          </section>
        </CommonLink>
      </section>
    </main>
  );
};

export default SetUp;
export { getServerSideProps };
