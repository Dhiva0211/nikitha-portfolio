import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import Link from 'next/link';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryOrderFollowUp } from '@/helpers/initial-values';

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

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryOrderFollowUp,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const FollowUp: FC = () => (
  <section className="mx-2 my-8 w-full max-w-7xl rounded-lg border-t-4 border-deep-sapphire bg-white p-4 shadow-md sm:p-6 md:mx-4 md:p-8">
    <ShowWindowTitle smallTitle secondTitle="Order Follow Up" />

    <section className="flex items-center justify-around">
      <span className="text-xl font-bold">
        Integrate with production software
      </span>
      <Link href={routes.underConstruction}>
        <section className="size-16 rounded-2xl bg-deep-sapphire" />
      </Link>
    </section>

    <section className="mt-2 flex items-center justify-around">
      <span className="h-16 w-auto content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white sm:w-96">
        Vendor Confirmation that order was picked
      </span>
      <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
        Yes
      </span>
    </section>

    <section className="mt-2 flex items-center justify-around">
      <span className="h-16 w-auto rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white sm:w-96">
        Vendor confirmation that order was customized
      </span>
      <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
        Yes
      </span>
    </section>

    <section>
      <section className="mt-2 flex items-center justify-around gap-2">
        <span className="size-auto rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white sm:h-16 sm:w-96">
          Photo of completed offering has been Uploaded
        </span>
        <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
          Yes
        </span>
      </section>
      <label
        htmlFor="upload-image"
        className="m-2 flex cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold"
      >
        Upload Photo
        <input type="file" id="upload-image" className="hidden" />
      </label>
    </section>
    <section className="flex items-center justify-around">
      <span className="size-auto p-1 text-xl font-bold sm:h-16 sm:w-96">
        Shoppitto confirms that the photo is accurate
      </span>
      <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
        Yes
      </span>
    </section>

    <section className="mt-2 flex items-center justify-around">
      <span className="size-auto rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white sm:h-16 sm:w-96">
        Vendor confirmation that the order was packed
      </span>
      <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
        Yes
      </span>
    </section>

    <section className="mt-2 flex items-center justify-around">
      <span className="h-16 w-auto content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white sm:w-96">
        Vendor purchase of shipping label
      </span>
      <span className="size-16" />
    </section>
    <span className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-4 text-xl font-bold">
      Option Shipping Number
      <span className="mt-2 flex cursor-pointer items-center justify-center text-xl font-bold">
        123456-1236456789-123456H
      </span>
    </span>

    <Description>
      You have 3 Shipping Label options.
      <br />
      Option 1 - You pay to print, using your own printer, your shipping labels
      under your company’s name, which we prepare for you. Learn more in
      Logistics.
      <br />
      Option 2 - You don’t pay to print, using your own printer, your shipping
      label under UpUnikSelf’s name which we prepare for you.
      <br />
      Option 3 - The price of the shipping plan already includes printing the
      shipping label, and you receive a QR code to print the shipping label when
      you mail the order.
    </Description>

    <section>
      <section className="mt-2 flex items-center justify-around">
        <span className="size-auto content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white sm:h-16 sm:w-96">
          Vendor printing of shipping labels
        </span>
        <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
          Print
        </span>
      </section>
      <span className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-4 text-xl font-bold">
        Shipping Number
        <span className="mt-2 flex cursor-pointer items-center justify-center text-xl font-bold">
          123456-1236456789-123456H
        </span>
      </span>
    </section>

    <section>
      <section className="mt-2 flex items-center justify-around">
        <span className="size-auto rounded-2xl bg-deep-sapphire p-2 text-xl font-bold text-white sm:h-16 sm:w-96">
          Vendor printing of download shipping label
        </span>
        <span className="flex h-16 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-4 text-sm font-bold">
          Download
        </span>
      </section>
      <span className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-4 text-xl font-bold">
        Shipping Number
        <span className="mt-2 flex cursor-pointer items-center justify-center text-xl font-bold">
          123456-1236456789-123456H
        </span>
      </span>
    </section>

    <section className="mt-2 flex items-center justify-around">
      <span className="size-auto content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white sm:h-16 sm:w-96">
        Vendor confirmation of shipping
      </span>
      <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
        Yes
      </span>
    </section>

    <section>
      <section className="mt-2 flex items-center justify-around">
        <span className="size-auto content-center rounded-2xl p-1 text-xl font-bold sm:h-16 sm:w-96">
          Shipping company has sent photo proof of delivery
        </span>
        <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
          Yes
        </span>
      </section>
      <label
        htmlFor="upload-image-photo"
        className="mt-2 flex cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold"
      >
        Upload Photo
        <input type="file" id="upload-image-photo" className="hidden" />
      </label>
    </section>

    <section className="mt-2 flex items-center justify-around">
      <span className="size-auto rounded-2xl p-1 text-xl font-bold sm:h-16 sm:w-96">
        UpUnikSelf has sent a delivery confirmation email to Shoppitto
      </span>
      <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
        Yes
      </span>
    </section>

    <label
      className="m-2 flex items-center justify-between"
      htmlFor="logistics-fees"
    >
      <span className="size-auto content-center p-1 text-xl font-bold sm:h-16 sm:w-96">
        Estimated logistics fees
      </span>
      <input
        id="logistics-fees"
        type="text"
        defaultValue="$0"
        className="size-16 rounded-2xl border-4 text-center"
      />
    </label>

    <CommonLink
      href={routes.vendor.orderFollowUp.objectsMachinesPackaging.default}
    >
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default FollowUp;
export { getServerSideProps };
