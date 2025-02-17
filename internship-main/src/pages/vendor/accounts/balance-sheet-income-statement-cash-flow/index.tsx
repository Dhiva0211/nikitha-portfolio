import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import Link from 'next/link';

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

const accountOptions = [
  {
    title: 'Go to income statement',
    link: routes.vendor.accounts.incomeStatement.default,
  },
  {
    title: 'Go to cash flow',
    link: routes.vendor.accounts.cashFlow.default,
  },
];

const additionalOptions = [
  {
    title: 'Manually input data to create a complete balance sheet',
    link: routes.vendor.accounts.balanceSheetIncomeStatementCashFlow
      .manualInput,
  },
  {
    title: 'Integrate with your accounting software',
    link: routes.underConstruction,
  },
];

const BalanceSheetIncomeStatementCashFlow: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Accounting" />

    <section className="m-2">
      {accountOptions.map(option => (
        <Link
          key={option.title}
          href={option.link}
          className="m-2 flex items-center justify-between"
        >
          <span className="text-xl font-bold">{option.title}</span>
          <section className="size-16 rounded-2xl border-4 bg-deep-sapphire" />
        </Link>
      ))}
    </section>

    <section className="m-4">
      <h3 className="text-3xl font-bold">Balance Sheet</h3>
      <p className="text-xl font-bold">
        Date{' '}
        <input
          type="date"
          defaultValue={new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          })}
          className="ml-4"
        />
      </p>
    </section>

    <section className="m-2 rounded-3xl border-4 p-2">
      <h4 className="text-xl font-bold">Account Details</h4>
      <section className="ml-64 mt-4 text-lg font-bold">
        <section>
          <h5>Assets</h5>
          <ul className="ml-4">
            <li>Cash</li>
            <li>Accounts Receivable</li>
            <li>Inventory</li>
            <li>Prepaid Expenses</li>
          </ul>
          <h5>Investments</h5>
          <h5>Property, Plant, and Equipment</h5>
          <ul className="ml-4">
            <li>Accumulated Depreciation</li>
            <li>Net PP&E</li>
          </ul>
          <h5>Other Assets</h5>
          <ul className="ml-4">
            <li>Deferred Tax Assets</li>
            <li>Prepaid Expenses</li>
          </ul>
        </section>

        <section className="mt-4">
          <h5>Liabilities</h5>
          <ul className="ml-4">
            <li>Accounts Payable</li>
            <li>Short-term Debt</li>
            <li>Accrued Liabilities</li>
            <li>Income Taxes Payable</li>
          </ul>
          <h5>Long-term Debt</h5>
          <h5>Other Liabilities</h5>
        </section>

        <section className="mt-4">
          <h5>Equity</h5>
          <ul className="ml-4">
            <li>Common Stock</li>
            <li>Retained Earnings</li>
            <li>Additional Paid-in Capital</li>
            <li>Treasury Stock (if applicable)</li>
            <li>Accumulated Income</li>
          </ul>
        </section>
      </section>
    </section>

    <Description>
      UpUnikSelf only provides data to fill the Accounting items related with
      transactions fulfilled through UpUnikSelf. You can choose to add data to
      complete the balance sheet by clicking on the button below or integrate
      with your accounting software. UpUnikSelf will add the inputted data and
      provide you with a more complete Balance Sheet. You should consult with an
      accountant to make sure that your balance sheet is in accordance with your
      local accounting rules, because your inputted data is your own
      responsibility.
    </Description>

    <section className="m-2">
      {additionalOptions.map(option => (
        <Link
          key={option.title}
          href={option.link}
          className="m-2 flex items-center justify-between"
        >
          <span className="text-sm font-bold">{option.title}</span>
          <section className="size-14 rounded-2xl border-4 bg-deep-sapphire" />
        </Link>
      ))}
    </section>

    <Description>
      Check which Accounting software will integrate with UpUnikSelf.{' '}
      <Link href={routes.underConstruction} className="text-blue-500 underline">
        Click here to learn more.
      </Link>
    </Description>

    <TitleDescHr
      title="Vendor Boost Subscription"
      description="Cash Flow Trends"
    />
    <TitleDescHr
      title="Vendor Boost Subscription"
      description="Revenue Trends"
    />

    <CommonLink href={routes.vendor.accounts.default}>
      <section className="m-2 rounded-2xl bg-deep-sapphire p-2 text-center text-white">
        Done
      </section>
    </CommonLink>
  </section>
);

export default BalanceSheetIncomeStatementCashFlow;
