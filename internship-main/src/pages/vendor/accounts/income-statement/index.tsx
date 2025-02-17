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
    title: 'Got to cash flow',
    link: routes.vendor.accounts.cashFlow.default,
  },
];
const listOptions2 = [
  {
    title: 'Manually input your data to make more complete income statement',
    link: routes.vendor.accounts.incomeStatement.manualInput,
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

const IncomeStatement: FC = () => (
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
      <h3 className="text-3xl font-bold">Income Statement</h3>
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
      <section className="flex justify-between">
        <h4 className="text-xl font-bold">Account number</h4>
        <h4 className="text-xl font-bold">UpUnikSelf Transactions</h4>
      </section>

      <section className="ml-48 mt-4 text-lg font-bold">
        <section>
          <section>Sales</section>
        </section>
        <section>
          <section>Cost of Goods Sold</section>
        </section>
        <section>
          <section>GROSS PROFIT</section>
        </section>
        <section>
          <section>Operating Expenses</section>
          <section className="ml-4">Selling Expenses</section>
          <section className="ml-4">
            General and Administrative Expenses
          </section>
          <section className="ml-4">Research and Development Expenses</section>
          <section className="ml-4">Depreciation and Amortization</section>
          <section className="ml-4">Other Operating Expenses</section>
        </section>
        <section>
          <section>OPERATING INCOME</section>
        </section>
        <section>
          <section>Other Income and Expenses</section>
        </section>
        <section>
          <section>INCOME BEFORE TAX</section>
        </section>
        <section>
          <section>Income Tax Expense</section>
        </section>
        <section>
          <section> NET INCOME</section>
        </section>
        <section>
          <section>Earnings Per Share</section>
        </section>
      </section>
    </section>

    <Description>
      UpUnikSelf only provides data to fill the Accounting items related with
      transactions fulfilled through UpUnikSelf. You can choose to add data to
      complete the Income Statement by clicking on the button below or integrate
      with your accounting software. UpUnikSelf will add the inputted data and
      provide you with a more complete Income Statement. You should consult with
      an accountant to make sure that your income statement is in accordance
      with your local accounting rules, because your inputted data is your own
      responsibility.
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

export default IncomeStatement;
export { getServerSideProps };
