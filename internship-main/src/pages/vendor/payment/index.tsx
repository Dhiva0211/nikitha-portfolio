import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { RenderIf } from '@/helpers/common/render-conditional';
import Link from 'next/link';
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
const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
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
const Ellipse = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.Ellipse,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const ArrowDown = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.ArrowDown,
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
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const TimeFrameSelector = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('1D');
  const timeFrames = ['1D', '1W', '1M', '3M', '1Y', 'All'];

  return (
    <div className="my-2 flex w-full justify-around space-x-3">
      {timeFrames.map(timeFrame => (
        <button
          key={timeFrame}
          className={`w-10 rounded-lg border-2 px-2 py-1 text-sm sm:w-14 sm:text-lg md:text-xl ${
            selectedTimeFrame === timeFrame ? 'bg-deep-sapphire text-white' : ''
          }`}
          onClick={() => setSelectedTimeFrame(timeFrame)}
        >
          {timeFrame}
        </button>
      ))}
    </div>
  );
};

const BalanceChart: FC<{
  subTitle: string | null;
}> = ({ subTitle }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!subTitle) {
    return null;
  }

  return (
    <>
      <section
        onClick={() => setIsExpanded(!isExpanded)}
        className="my-4 flex cursor-pointer select-none items-center justify-center gap-2 text-xl font-bold sm:text-2xl md:text-3xl"
      >
        <p>{subTitle}</p>
        <button>
          <ArrowDown
            className={`size-4 transition-transform sm:size-6 ${!isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </section>
      <section className={`w-full ${!isExpanded ? 'hidden' : ''} `}>
        <TimeFrameSelector />
        <section className="h-44 w-full rounded-2xl border-4" />
      </section>
    </>
  );
};

const paymentList = [
  {
    title: 'Detailed fiat payments',
    link: routes.vendor.payment.detailFiatPayment,
    isDescription: false,
    description: null,
  },
  {
    title: 'Detailed crypto payments',
    link: routes.vendor.payment.detailCryptoPayment,
    isDescription: false,
    description: null,
  },
  {
    title: 'Edit payment gateways for Shoppittos',
    link: routes.vendor.payment.editPaymentGateways,
    isDescription: false,
    description: null,
  },
  {
    title: null,
    link: ' ',
    isDescription: true,
    description:
      'List all of the fiat payment gateways which your shoppittos can use to pay at checkout, and make sure they are accepted in the countries where you want to sell.',
  },
  {
    title: 'Edit fiat payment',
    link: routes.vendor.payment.editFiatPayment,
    isDescription: false,
    description: null,
  },
  {
    title: null,
    link: ' ',
    isDescription: true,
    description:
      'Choose which payment method you prefer to receive proceeds from sales through UpUnikSelf, and to pay for Vendor Boosts and any other business related fees.',
  },
  {
    title: 'Edit crypto wallet',
    link: routes.vendor.payment.editCryptoWallet,
    isDescription: false,
    description: null,
  },
  {
    title: null,
    link: ' ',
    isDescription: true,
    description:
      'Choose which crypto wallet you prefer to receive proceeds from sales through UpUnikSelf.',
  },
  {
    title: 'Edit selling currency',
    link: routes.vendor.payment.editSellingCurrency,
    isDescription: false,
    description: null,
  },
  {
    title: null,
    link: ' ',
    isDescription: true,
    description:
      'Choose which currency you prefer to list your prices and receive proceeds from sales through UpUnikSelf.',
  },
];
const fiatBalance = [
  {
    title: 'Fiat balance',
    subTitle: 'Fiat transactions',
    value: 127,
    isDescription: false,
    description: null,
  },
  {
    title: 'Crypto balance',
    subTitle: 'Crypto transactions',
    value: 2,
    isDescription: false,
    description: null,
  },
  {
    title: null,
    subTitle: null,
    value: null,
    isDescription: true,
    description:
      'The Crypto Balance is calculated using the estimated value of crypto in your preferred currency.',
  },
  {
    title: 'Full balance',
    subTitle: 'Full transactions',
    value: 129,
    isDescription: false,
    description: null,
  },
  {
    title: null,
    subTitle: null,
    value: null,
    isDescription: true,
    description:
      'The Full Balance is calculated using your preferred currency balance and the estimated value of crypto in your preferred currency.',
  },
];

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

const Payment: FC = () => (
  <section className="mt-4 max-w-7xl space-y-10 px-4">
    <ShowWindowTitle smallTitle secondTitle="Payment" />

    <Select labelToUse="Shoppittos' payment gateways" options={[' ']} />
    <Select labelToUse="Vendor fiat payment method" options={[' ']} />
    <Select labelToUse="Vendor crypto payment method" options={[' ']} />
    <Select labelToUse="Vendor preferred selling currency" options={[' ']} />

    <section className="m-2 space-y-4">
      {paymentList.map((payment, index) => (
        <RenderIf
          key={index}
          condition={payment.isDescription}
          then={
            <section className="m-2">
              <Description>{payment.description}</Description>
              <Link
                href={routes.underConstruction}
                className="m-2 flex items-center justify-center hover:underline"
              >
                <Ellipse
                  className="size-6 sm:size-8 md:size-10"
                  svgClassName="fill-deep-sapphire stroke-deep-sapphire"
                />
                <section className="text-center font-bold sm:text-lg md:text-xl">
                  Terms and Conditions
                </section>
              </Link>
            </section>
          }
          otherwise={
            <Link
              href={payment.link}
              className="group mt-2 flex items-center justify-between"
            >
              <span className="w-56 text-lg font-bold group-hover:underline sm:text-xl md:text-2xl">
                {payment.title}
              </span>
              <section className="size-12 rounded-2xl border-4 bg-deep-sapphire sm:size-16 md:size-20" />
            </Link>
          }
        />
      ))}
    </section>

    <section className="m-2 mt-8 space-y-8">
      {fiatBalance.map((balance, index) => (
        <RenderIf
          key={index}
          condition={balance.isDescription}
          then={<Description>{balance.description}</Description>}
          otherwise={
            <section className="flex flex-col items-center">
              <h3 className="mt-8 text-center text-xl font-bold sm:text-2xl md:text-3xl">
                {balance.title}
              </h3>
              <TitleDescBgWhite
                title={String(balance.value)}
                description="USD"
                isLink={false}
              />
              <BalanceChart subTitle={balance.subTitle} />
            </section>
          }
        />
      ))}
    </section>

    <CommonLink href={routes.vendor.dashboard}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default Payment;
export { getServerSideProps };
