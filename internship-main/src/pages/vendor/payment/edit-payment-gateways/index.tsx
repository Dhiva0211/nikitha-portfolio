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

const EditPaymentGateways: FC = () => (
  <section className="mt-4 p-4 sm:mt-6 md:mt-6 lg:mt-8">
    <ShowWindowTitle smallTitle secondTitle="Payment" />

    <Select
      labelToUse="Chosen Shoppittos' payment gateways"
      options={[' ', ' ', ' ']}
    />

    <h3 className="flex w-full flex-col items-center text-center text-2xl font-bold">
      Edit Shoppittos&apos; payment gateways
    </h3>
    <Select
      labelToUse="Shoppittos' payment gateways"
      options={[' ', ' ', ' ']}
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
      Check all of those that apply.
      <br />
      To remove one, just check it again.
    </Description>

    <div className="flex w-full flex-col sm:flex-row sm:space-x-4">
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Automatic comparison of payment gateway fees per country"
      />{' '}
    </div>

    <CommonLink href={routes.vendor.payment.default}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default EditPaymentGateways;
export { getServerSideProps };
