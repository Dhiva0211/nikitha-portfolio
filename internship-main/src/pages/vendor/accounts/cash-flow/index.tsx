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

const listOptions1 = [
  {
    title: 'Go to balance sheet',
    link: routes.vendor.accounts.balanceSheetIncomeStatementCashFlow.default,
  },
  {
    title: 'Got to income statement',
    link: routes.vendor.accounts.incomeStatement.default,
  },
];
const listOptions2 = [
  {
    title: 'Manually input your data to make more complete cash flow statement',
    link: routes.vendor.accounts.cashFlow.manualInput,
  },
  {
    title: 'Integrate with your accounting software',
    link: routes.underConstruction,
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

const CashFlow: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Accounting" />

    <section className="m-2">
      {listOptions1.map(option => (
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

    <section className="m-4">
      <h3 className="text-3xl font-bold">Cash flow statement</h3>
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

    <section className="m-2 overflow-x-scroll rounded-3xl border-4 p-2">
      <section className="flex w-screen justify-between">
        <h4 className="text-xl font-bold">Account number</h4>
        <h4 className="text-xl font-bold" />
        <h4 className="text-xl font-bold">UpUnikSelf Transactions</h4>
      </section>

      <section className="ml-64 mt-4 text-lg font-bold">
        <section className="mt-4">
          <section>Operating Activities</section>
          <section className="ml-4">
            Cash Inflows from Operating Activities
          </section>
          <section className="ml-4">
            Cash Outflows from Operating Activities
          </section>
          <section className="ml-4">
            NET CASH FLOW FROM OPERATING ACTIVITIES
          </section>
        </section>

        <section className="mt-4">
          <section>Investing Activities</section>
          <section className="ml-4">
            Cash Inflows from Investing Activities
          </section>
          <section className="ml-4">
            Cash Outflows from Investing Activities
          </section>
          <section className="ml-4">
            NET CASH FLOW FROM INVESTING ACTIVITIES
          </section>
        </section>

        <section className="mt-4">
          <section>Financing Activities</section>
          <section className="ml-4">
            Cash Inflows from Financing Activities
          </section>
          <section className="ml-4">
            Cash Outflows from Financing Activities
          </section>
          <section className="ml-4">
            NET CASH FLOW FROM FINANCING ACTIVITIES
          </section>
        </section>

        <section className="mt-4">
          <section>NET INCREASE/(DECREASE) IN CASH</section>
        </section>
      </section>
    </section>

    <Description>
      UpUnikSelf only provides data to fill the Accounting items related with
      transactions fulfilled through UpUnikSelf. You can choose to add data to
      complete the Cash Flow Statement by clicking on the button below or
      integrate with your accounting software. UpUnikSelf will add the inputted
      data and provide you with a more complete Cash Flow Statement. You should
      consult with an accountant to make sure that your income statement is in
      accordance with your local accounting rules, because your inputted data is
      your own responsibility.
    </Description>

    <section className="m-2">
      {listOptions2.map(option => (
        <Link
          key={option.title}
          href={option.link}
          className="m-2 flex items-center justify-between"
        >
          <span className="text-wrap text-sm font-bold">{option.title}</span>
          <section className="size-16 rounded-2xl border-4 bg-deep-sapphire" />
        </Link>
      ))}
    </section>

    <Description>
      Check which Accounting software will integrate with UpUnikSelf. Click here
      to learn more.
    </Description>

    <TitleDescHr
      title="Vendor Boost subscription"
      description="Similar Offerings Cash Flow Trends"
    />
    <TitleDescHr
      title="Vendor Boost subscription"
      description="Similar Offerings Revenue Trends"
    />

    <CommonLink href={routes.vendor.accounts.default}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default CashFlow;
export { getServerSideProps };
