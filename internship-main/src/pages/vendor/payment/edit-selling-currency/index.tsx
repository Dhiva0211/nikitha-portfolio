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
const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
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

const EditSellingCurrency: FC = () => (
  <section className="mt-4 w-full max-w-7xl px-4">
    <ShowWindowTitle smallTitle secondTitle="Payment" />

    <Select labelToUse="Chosen Selling currency" options={[' ', ' ', ' ']} />

    <h3 className="mt-8 text-center text-2xl font-bold">
      Edit selling currency
    </h3>
    <Select
      labelToUse="Choose Selling currency"
      options={['USD', 'Real', 'Colombian peso', 'Euro', 'Pound sterling']}
    />
    <section className="-mt-5 inline-flex">
      <button className="m-5 flex w-24 items-center justify-around rounded-xl border-4 p-2">
        Edit
      </button>
      <CommonButton type="button" className="w-36 rounded-2xl">
        Save
      </CommonButton>
    </section>

    <Description>
      Choose the currency which you will use to present the price to the
      Shoppittos. Check the Terms and Conditions to understand the exchange
      rates. The Local Currency option allows prices to be considered in the
      Shoppittos’ country currency.
    </Description>

    <CommonLink href={routes.vendor.payment.default}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default EditSellingCurrency;
export { getServerSideProps };
