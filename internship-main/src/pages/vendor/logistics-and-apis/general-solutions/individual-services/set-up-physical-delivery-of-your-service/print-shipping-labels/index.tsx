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
  <section className="mt-4 px-4">
    <ShowWindowTitle smallTitle secondTitle="Logistics" />

    <Description>
      You have 3 options.
      <br />
      <strong>Option 1</strong> - You print, using your own printer, your
      shipping labels under your company’s name, which we prepare for you. Check
      instructions below.
      <br />
      <strong>Option 2</strong> - You print, using your own printer, your
      shipping label under UpUnikSelf’s name which we prepare for you.
      <br />
      <strong>Option 3</strong> - The price of the shipping plan already
      includes printing the shipping label, and you receive a QR code to print
      the shipping label when you mail the order.
    </Description>

    <Select
      labelToUse="Choose default option to print labels"
      options={['Option 1', 'Option 2', 'Option 3']}
    />

    {/* Adjusted button layout for mobile */}
    <section className="mt-4 flex flex-row gap-4">
      <button className="flex w-32 items-center justify-center rounded-2xl border-4 p-2">
        Edit
      </button>
      <CommonButton type="button" className="w-32 rounded-2xl">
        Save
      </CommonButton>
    </section>

    <Description>
      Check one.
      <br />
      You can always change the option for a specific order in the &quot;Order
      Follow-Up&quot; button.
    </Description>

    <Link
      href={routes.vendor.orderFollowUp.individualSolutions.default}
      className="mt-4 flex items-center justify-between rounded-lg border-2 p-2 transition hover:bg-slate-200"
    >
      <p className="w-56 text-xl font-bold sm:text-2xl">
        Go to Orders Follow Up
      </p>
      <div className="size-8 rounded-lg border-4 bg-deep-sapphire" />
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
      href={
        routes.vendor.logisticsAndApis.generalSolutions.individualServices
          .setUpPhysicalDeliveryOfYourService.default
      }
    >
      <section className="m-2 w-full rounded-xl bg-oxford-blue p-4 text-center text-lg font-semibold text-white sm:text-xl lg:text-2xl">
        Done
      </section>
    </CommonLink>
  </section>
);

export default PrintShippingLabels;
export { getServerSideProps };
