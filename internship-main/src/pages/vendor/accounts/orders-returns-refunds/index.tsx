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

const listOptions1 = [
  {
    title: 'Orders List',
    link: routes.vendor.accounts.ordersReturnsRefunds.ordersList,
  },
  {
    title: 'Returns List',
    link: routes.vendor.accounts.ordersReturnsRefunds.returnsList,
  },
  {
    title: 'Refunds List',
    link: routes.vendor.accounts.ordersReturnsRefunds.refundsList,
  },
  {
    title: 'Shoppittos List',
    link: routes.vendor.accounts.ordersReturnsRefunds.shoppittosList,
  },
  {
    title: 'Invoices List',
    link: routes.vendor.accounts.ordersReturnsRefunds.invoicesList,
  },
  {
    title: 'Receipts List',
    link: routes.vendor.accounts.ordersReturnsRefunds.receiptsList,
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

const SalesAccount: FC = () => (
  <section className="mt-4 w-full max-w-7xl px-4">
    <ShowWindowTitle smallTitle secondTitle="Accounting" />

    <section className="m-2 my-10 rounded-2xl border-4 p-2 px-4">
      {listOptions1.map(option => (
        <Link
          key={option.title}
          href={option.link}
          className="m-2 flex items-center justify-between"
        >
          <span className="text-center text-lg font-bold sm:text-xl md:text-2xl">
            {option.title}
          </span>
          <section className="size-10 rounded-2xl border-4 bg-deep-sapphire sm:size-12 md:size-16" />
        </Link>
      ))}
    </section>

    <TitleDescHr
      title="Vendor Boost subscription"
      description="Cash Flow Trends"
    />
    <TitleDescHr
      title="Vendor Boost subscription"
      description="Revenue Trends"
    />

    <CommonLink href={routes.vendor.accounts.default}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default SalesAccount;
export { getServerSideProps };
