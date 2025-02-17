import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import Link from 'next/link';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const TitleDescBgWhite = dynamic(
  () =>
    import('@/components/common/two-text').then(mod => ({
      default: mod.TitleDescBgWhite,
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

  return validSessionToken(
    token,
    context.resolvedUrl,
    true,
    false,
    false,
  ) as never;

  return {
    props: {},
  };
};

const DetailFiatPayment: FC = () => (
  <section className="mt-4 w-full max-w-7xl px-4">
    <ShowWindowTitle smallTitle secondTitle="Detailed payments" />

    <section className="mx-auto -mb-8 mt-8 flex flex-col items-center">
      <h3 className="text-center text-xl font-bold sm:text-2xl md:text-3xl">
        Balance
      </h3>
      <TitleDescBgWhite title={'127'} description="USD" isLink={false} />
    </section>

    <section className="my-8">
      <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
        <h3 className="mb-3 text-center text-xl font-bold sm:text-2xl md:text-3xl">
          Fiat transactions
        </h3>
        <section className="flex h-32 items-center justify-between rounded-2xl border-4 p-2 sm:h-24">
          <span className="font-bold sm:text-lg md:text-xl">
            Received from UpUnikSelf from orders
          </span>
          <input
            type="text"
            defaultValue="$0"
            className="w-20 text-center font-bold sm:text-lg md:text-xl"
            disabled
          />
        </section>
        <section className="-mt-3 flex h-32 items-center justify-between rounded-b-2xl border-x-4 border-b-4 p-2 sm:h-24">
          <span className="font-bold sm:text-lg md:text-xl">
            Cash held by UpUnikSelf from orders in transit
          </span>
          <input
            type="text"
            defaultValue="$0"
            className="w-20 text-center font-bold sm:text-lg md:text-xl"
            disabled
          />
        </section>
        <section className="-mt-3 flex h-32 items-center justify-between rounded-b-2xl border-x-4 border-b-4 p-2 sm:h-24">
          <span className="font-bold sm:text-lg md:text-xl">
            Refunds to Shoppittos
          </span>
          <input
            type="text"
            defaultValue="$0"
            className="w-20 text-center font-bold sm:text-lg md:text-xl"
            disabled
          />
        </section>
        <section className="-mt-3 flex h-32 items-center justify-between rounded-b-2xl border-x-4 border-b-4 p-2 sm:h-24">
          <span className="font-bold sm:text-lg md:text-xl">
            Vendor boosts, fees and taxes
          </span>
          <input
            type="text"
            defaultValue="$0"
            className="w-20 text-center font-bold sm:text-lg md:text-xl"
            disabled
          />
        </section>
        <section className="-mt-3 flex h-32 items-center justify-between rounded-b-2xl border-x-4 border-b-4 p-2 sm:h-24">
          <span className="font-bold sm:text-lg md:text-xl">
            Cash paid to vendor
          </span>
          <input
            type="text"
            defaultValue="$0"
            className="w-20 text-center font-bold sm:text-lg md:text-xl"
            disabled
          />
        </section>
        <Link
          href={routes.underConstruction}
          className="-mt-3 flex h-32 items-center justify-between rounded-b-2xl border-x-4 border-b-4 p-2 sm:h-24"
        >
          <span className="font-bold sm:text-lg md:text-xl">Balance</span>
          <input
            type="text"
            defaultValue="$0"
            className="w-20 text-center font-bold sm:text-lg md:text-xl"
            disabled
          />
        </Link>
      </section>

      <Description>
        By clicking on Balance, you will be redirected to Accounting where you
        can explore your payment details per order.
      </Description>
    </section>

    <TitleDescHr
      title="Vendor Boost subscription"
      description="Graphic Analysis of fiat payment details"
    />

    <CommonLink href={routes.vendor.payment.default}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default DetailFiatPayment;
export { getServerSideProps };
