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
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonButton = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonButton,
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
    title: 'Go to sales-related tax',
    link: routes.vendor.accounts.salesRelatedTax,
  },
  {
    title: 'Got to 1099-K document',
    link: routes.vendor.accounts.document1099K,
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

const IncomeEstimateSales: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Accounting" />

    <section className="m-2">
      {listOptions.map(option => (
        <Link
          key={option.title}
          href={option.link}
          className="m-2 flex items-center justify-between"
        >
          <span className="text-center text-xl font-bold">{option.title}</span>
          <section className="size-16 rounded-2xl border-4 bg-deep-sapphire" />
        </Link>
      ))}
    </section>

    <Description>
      Vendors are taxable on their Net Income. Only goods that are sold for a
      profit are considered taxable. Please consult a tax professional if you
      have any questions about any tax filing, which documentation you need to
      prove your costs, or any other regulations.
    </Description>

    <section className="m-4">
      <h3 className="text-3xl font-bold">Income estimate of sales</h3>
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

    <section className="m-2 rounded-3xl border-4 p-2">
      <p className="m-2 text-xl font-bold">Sales</p>

      <section className="m-2 text-xl font-bold">
        <section>Cost</section>
        <section className="ml-4">COGS</section>
        <section className="ml-4">Payment Gateway Fees</section>
        <section className="ml-4">Transaction Fees from UpUnikSelf</section>
        <section className="ml-4">Other Selling Costs</section>
        <section className="ml-4">Other Costs</section>
      </section>

      <p className="m-2 text-xl font-bold">Income before taxes</p>
    </section>
    <section className="-mt-5 inline-flex">
      <button className="m-5 flex items-center justify-around rounded-2xl border-4 p-2">
        Edit
      </button>
      <CommonButton type="button" className="w-36 rounded-2xl">
        Save
      </CommonButton>
    </section>

    <Description>
      THIS DOES NOT CONSTITUTE ACCOUNTING ADVICE.
      <br />
      This document is provided for informational purposes only and does not
      constitute UpUnikSelf professional advice or a comprehensive accounting
      service. UpUnikSelf makes no representations or warranties of any kind,
      express or implied, about the completeness, accuracy, reliability,
      suitability, or availability with respect to the information contained in
      it. Also, this document is not intended to substitute for professional
      accounting advice, and individuals or entities should not act upon the
      information contained herein without seeking professional guidance.
      UpUnikSelf disclaims any liability for any errors or omissions in the
      content of this document or for any actions taken based on the information
      provided.
    </Description>

    <CommonLink href={routes.vendor.accounts.default}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default IncomeEstimateSales;
export { getServerSideProps };
