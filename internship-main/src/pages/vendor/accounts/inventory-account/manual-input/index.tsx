import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
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
const CommonButton = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonButton,
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

const ManualInput: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Accounting" />

    <section className="m-4">
      <h3 className="text-3xl font-bold">Inventory account</h3>
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
      <section className="flex w-screen justify-between gap-20">
        <h4 className="text-xl font-bold">Account number</h4>
        <h4 className="text-xl font-bold" />
        <h4 className="text-xl font-bold">Beginning Balance</h4>
        <h4 className="text-xl font-bold">Additions Balance</h4>
        <h4 className="text-xl font-bold">Sales Balance</h4>
        <h4 className="text-xl font-bold">Replacements Balance</h4>
        <h4 className="text-xl font-bold">
          Estimated Date of Need to Renew Stock
        </h4>
        <h4 className="text-xl font-bold">COGS</h4>
        <h4 className="text-xl font-bold">Value of Inventory</h4>
      </section>

      <section className="ml-28 mt-4 text-lg font-bold">
        {Array.from({ length: 10 }).map((_, i) => (
          <section key={i} className="mt-4">
            <section>Offering {i + 1}</section>
            <section className="ml-4">Size 1</section>
            <section className="ml-4">Size 2</section>
            <section className="ml-4">Size 3</section>
            <section className="ml-4">Size 4</section>
          </section>
        ))}
      </section>
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
      It may be of interest to you to build a basic Inventory Account which will
      give you, a business entrepreneur, insights on its performance over a
      certain period.
      <br />
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

    <TitleDescHr
      title="Vendor Boost subscription"
      description="Similar Offerings Cash Flow Trends"
    />
    <TitleDescHr
      title="Vendor Boost subscription"
      description="Similar Offerings Revenue Trends"
    />

    <CommonLink href={routes.vendor.accounts.inventoryAccount.default}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default ManualInput;
export { getServerSideProps };
