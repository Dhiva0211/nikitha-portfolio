import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
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

const DetailCryptoPayment: FC = () => (
  <section className="mt-4 w-full max-w-7xl px-4">
    <ShowWindowTitle smallTitle secondTitle="Detailed payments" />

    <section className="my-8">
      <section className="flex flex-col items-center">
        <h3 className="text-center text-xl font-bold sm:text-2xl md:text-3xl">
          Balance
        </h3>
        <section className="relative">
          <TitleDescBgWhite title={'1'} description="BTC" isLink={false} />
          <span className="absolute bottom-6 right-10 text-sm font-bold sm:bottom-5 sm:text-xl">
            $60.000
          </span>
        </section>
      </section>

      <Description>
        The fiat value is an estimate of its crypto value according to our
        source. There may be a considerable difference between the displayed
        fiat value and its actual value according to your broker.
      </Description>
    </section>

    <section className="my-8">
      <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
        <section className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-bold sm:text-2xl md:text-3xl">
            Crypto transactions
          </h3>
          <select className="rounded-xl border-4 p-2 text-sm sm:text-base md:text-lg">
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            <option value="BNB">BNB</option>
          </select>
        </section>
        <section className="flex h-24 items-center justify-between rounded-2xl border-4 p-2">
          <span className="font-bold sm:text-lg md:text-xl">
            Received from UpUnikSelf from orders
          </span>
          <input
            type="text"
            defaultValue="$0"
            className="w-20 text-center font-bold sm:text-lg md:text-xl"
          />
        </section>
        <section className="-mt-3 flex h-24 items-center justify-between rounded-b-2xl border-x-4 border-b-4 p-2">
          <span className="font-bold sm:text-lg md:text-xl">
            Cash held by UpUnikSelf from orders in transit
          </span>
          <input
            type="text"
            defaultValue="$0"
            className="w-20 text-center font-bold sm:text-lg md:text-xl"
          />
        </section>
        <section className="-mt-3 flex h-24 items-center justify-between rounded-b-2xl border-x-4 border-b-4 p-2">
          <span className="font-bold sm:text-lg md:text-xl">
            Refunds to Shoppittos
          </span>
          <input
            type="text"
            defaultValue="$0"
            className="w-20 text-center font-bold sm:text-lg md:text-xl"
          />
        </section>
        <section className="-mt-3 flex h-24 items-center justify-between rounded-b-2xl border-x-4 border-b-4 p-2">
          <span className="font-bold sm:text-lg md:text-xl">
            Fees and taxes
          </span>
          <input
            type="text"
            defaultValue="$0"
            className="w-20 text-center font-bold sm:text-lg md:text-xl"
          />
        </section>
        <section className="-mt-3 flex h-24 items-center justify-between rounded-b-2xl border-x-4 border-b-4 p-2">
          <span className="font-bold sm:text-lg md:text-xl">
            Crypto paid to vendor
          </span>
          <input
            type="text"
            defaultValue="$0"
            className="w-20 text-center font-bold sm:text-lg md:text-xl"
          />
        </section>
        <section className="-mt-3 flex h-24 items-center justify-between rounded-b-2xl border-x-4 border-b-4 p-2">
          <span className="font-bold sm:text-lg md:text-xl">Balance</span>
          <input
            type="text"
            defaultValue="$0"
            className="w-20 text-center font-bold sm:text-lg md:text-xl"
          />
        </section>
      </section>

      <Description>
        The Crypto Balance is calculated using the estimated value of crypto in
        your preferred currency.
        <br />
        By clicking on Balance, you will be redirected to Accounting where you
        can explore your payment details per order.
      </Description>
    </section>

    <TitleDescHr
      title="Vendor Boost subscription"
      description="Graphic Analysis of crypto payment details"
    />

    <CommonLink href={routes.vendor.payment.default}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default DetailCryptoPayment;
export { getServerSideProps };
