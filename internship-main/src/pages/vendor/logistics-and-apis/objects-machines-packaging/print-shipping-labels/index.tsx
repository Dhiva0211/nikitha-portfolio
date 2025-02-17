import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import Link from 'next/link';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryLogisticsAndApis } from '@/helpers/initial-values';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
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
const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
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

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryLogisticsAndApis,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const PrintShippingLabels: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Logistics" />

    <Description>
      You have 3 options.
      <br />
      Option 1 - You pay to print, using your own printer, your shipping labels
      under your company’s name, which we prepare for you. Check instructions
      below.
      <br />
      Option 2 - You don’t pay to print, using your own printer, your shipping
      label under UpUnikSelf’s name which we prepare for you.
      <br />
      Option 3 - The price of the shipping plan already includes printing the
      shipping label, and you receive a QR code to print the shipping label when
      you mail the order.
    </Description>

    <Select
      labelToUse="Choose default option to print labels"
      options={['Option 1', 'Option 2', 'Option 3']}
    />
    <section className="-mt-5 inline-flex">
      <button className="m-5 flex items-center justify-around rounded-2xl border-4 p-2">
        Edit
      </button>
      <CommonButton type="button" className="w-36 rounded-2xl">
        Save
      </CommonButton>
    </section>

    <Description>
      Check one.
      <br />
      You can always change the Option for a specific order in the Order
      Follow-Up button.
    </Description>

    <Link
      href={routes.vendor.orderFollowUp.objectsMachinesPackaging.default}
      className="m-2 flex items-center justify-between"
    >
      <section>
        <p className="w-56 text-2xl font-bold">Go to orders follow up</p>
      </section>
      <section className="size-20 rounded-2xl border-4 bg-deep-sapphire" />
    </Link>

    <Description>
      Directions to Print
      <br />
      Make sure you can see all barcodes at the bottom of the label.
      <br />
      To make it easier to see all barcodes, change the print settings to
      portrait mode and manually scale the print job to less than 100%.
    </Description>

    <CommonLink
      href={routes.vendor.logisticsAndApis.objectsMachinesPackaging.default}
    >
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default PrintShippingLabels;
export { getServerSideProps };
