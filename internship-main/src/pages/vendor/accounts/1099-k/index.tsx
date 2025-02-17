import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import Link from 'next/link';
import Image from 'next/image';
import document1099k from '@//public/images/1099k.jpg';
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
    title: 'Got to income estimate of sales',
    link: routes.vendor.accounts.incomeEstimateSales,
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
      American vendors are required to report the income from their Form 1099-K
      on their federal income tax return.
      <br />
      Non-US vendors also need to report income earned from U.S. sources on
      their country of residence’s tax returns. Vendors who have made at least
      $600 in gross sales and exceeded 200 transactions for goods on UpUnikSelf
      in 2023 will receive a tax Form 1099-K for all of their 2024 sales
      transactions.
      <br />
      Think of Form 1099-K as a guide designed to help you determine your
      taxable income.
      <br />
      It includes the gross amount of all payment transactions within a calendar
      year. This gross amount doesn’t include any adjustments for credits,
      discounts, fees, refunds or other amounts.
    </Description>

    <section className="m-4">
      <h3 className="text-3xl font-bold">1099-K Document</h3>
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

    <section className="m-2 rounded-3xl border-4">
      <Image
        src={document1099k}
        alt="1099-K Document"
        width={728}
        height={481}
        placeholder="blur"
        className="w-full rounded-3xl"
      />
    </section>

    <section className="m-2 flex w-full justify-center">
      <button
        type="button"
        className="w-56 rounded-3xl border-4 p-2 text-2xl font-bold"
      >
        Download
      </button>
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
