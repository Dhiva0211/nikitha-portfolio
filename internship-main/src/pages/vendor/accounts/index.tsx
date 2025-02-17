import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getToken, validSessionToken } from '@/helpers/validations';

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

const listOptions = [
  {
    title1: 'Balance sheet',
    title2: 'Income statement',
    title3: 'Cash flow',
    link: routes.vendor.accounts.balanceSheetIncomeStatementCashFlow.default,
  },
  {
    title1: 'Detailed cash account',
    title2: 'Inventory',
    title3: 'Sales account',
    link: routes.vendor.accounts.cashAccount.default,
  },
  {
    title1: 'Orders, returns, refunds',
    title2: 'Shoppittos, invoices',
    title3: 'Receipts lists',
    link: routes.vendor.accounts.ordersReturnsRefunds.default,
  },
  {
    title1: 'Sales tax',
    title2: 'Income estimate of sales',
    title3: '1099-K documents',
    link: routes.vendor.accounts.salesRelatedTax,
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

const Accounts: FC = () => (
  <section className="mx-auto mt-4 max-w-4xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
    <ShowWindowTitle smallTitle secondTitle="Accounting" />

    <section className="m-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {listOptions.map(option => (
        <Link
          key={option.title1}
          href={option.link}
          className="m-2 flex flex-col items-center justify-center rounded-lg border-4 p-4 hover:bg-deep-sapphire hover:text-white"
        >
          <span className="text-center text-xl font-bold">{option.title1}</span>
          {option.title2 && (
            <span className="text-center text-xl font-bold">
              {option.title2}
            </span>
          )}
          {option.title3 && (
            <span className="text-center text-xl font-bold">
              {option.title3}
            </span>
          )}
          <section className="mt-4 h-2 w-full rounded-2xl bg-deep-sapphire" />
        </Link>
      ))}
    </section>

    <section className="mt-6">
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Similar Offerings Cash Flow Trends"
      />
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Similar Offerings Revenue Trends"
      />
    </section>

    <CommonLink href={routes.vendor.dashboard}>
      <section className="m-4 rounded-2xl bg-deep-sapphire p-2 text-center text-white">
        Done
      </section>
    </CommonLink>
  </section>
);

export default Accounts;
export { getServerSideProps };
