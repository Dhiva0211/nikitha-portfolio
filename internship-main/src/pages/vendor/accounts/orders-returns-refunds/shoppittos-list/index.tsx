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

const ShoppittosList: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Order Follow Up" />

    <section className="m-4">
      <h3 className="text-3xl font-bold">Shoppittos List</h3>
      <p className="text-xl font-bold">
        <input
          type="date"
          defaultValue={new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          })}
          className="ml-4"
        />{' '}
        - Today
      </p>
    </section>

    <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
      <section className="flex justify-between gap-8 rounded-2xl border-4 p-4">
        <span>UpUnikSelf shoppitto number</span>
        <span>Number of orders</span>
        <span>Net sales</span>
      </section>
      <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4" />
      <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4" />
      <button type="button" className="w-full text-center">
        Show More
      </button>
    </section>

    <Description>
      GROSS SALES (Amount paid by the shoppitto) = (Sales Price - Sales
      Discount) * Sales Quantity * (1 + Sales Tax) + Shipping Fees * (1 +
      Shipping Tax) + Tax-Related Fees - Refunds
      <br />
      SALES (Amount earned by the vendor) = (Sales Price - Sales Discount) *
      Sales Quantity - Refunds
      <br />
      NET SALES (Amount received by the vendor) = Sales - Payment Gateway Fees -
      Transaction Fees from UpUnikSelf
    </Description>

    <CommonLink href={routes.vendor.accounts.ordersReturnsRefunds.default}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default ShoppittosList;
export { getServerSideProps };
