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

const listOptions = [
  {
    title: 'Go to Income Estimate of Sales',
    link: routes.vendor.accounts.incomeEstimateSales,
  },
  {
    title: 'Go to 1099-K Document',
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

const SalesRelatedTax: FC = () => (
  <section className="mt-4 min-w-0 max-w-7xl space-y-6 px-4">
    <ShowWindowTitle smallTitle secondTitle="Accounting" />

    <section className="m-2">
      {listOptions.map(option => (
        <Link
          key={option.title}
          href={option.link}
          className="group m-2 flex items-center justify-between"
        >
          <span className="text-start text-lg font-bold group-hover:underline sm:text-xl md:text-2xl">
            {option.title}
          </span>
          <section className="size-10 shrink-0 rounded-2xl border-4 bg-deep-sapphire sm:size-12 md:size-16" />
        </Link>
      ))}
    </section>

    <section className="m-4 flex flex-col items-center space-y-2">
      <h3 className="text-xl font-bold sm:text-2xl md:text-3xl">
        Sales-Related Tax
      </h3>
      <p className="font-bold sm:text-lg md:text-xl">
        <input
          type="date"
          defaultValue={new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          })}
          className="mr-1 rounded-2xl border-4 p-2"
        />{' '}
        to Today
      </p>
    </section>

    <section className="m-4 grid grid-cols-7 overflow-x-auto text-nowrap rounded-3xl border-4 p-4 pr-0 font-bold *:space-y-4 sm:text-lg md:text-xl">
      <section className="overflow-auto">
        <p>123456789</p>
        <p>123456789</p>
        <p>123456789</p>
        <p>123456789</p>
        <p>123456789</p>
      </section>
      <section className="ml-4 mr-40">
        <p>Gross Sales</p>
        <p>Sales-Related Tax Collected</p>
        <p>Tax-Related Fees Collected</p>
        <p>Shipping Fees</p>
        <p>Shipping Tax Collected</p>
      </section>
      <section className="pr-4">
        <p>$0</p>
        <p>$0</p>
        <p>$0</p>
        <p>$0</p>
        <p>$0</p>
      </section>
    </section>

    <Description>
      <b>THIS DOES NOT CONSTITUTE ACCOUNTING ADVICE.</b>
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

export default SalesRelatedTax;
export { getServerSideProps };
