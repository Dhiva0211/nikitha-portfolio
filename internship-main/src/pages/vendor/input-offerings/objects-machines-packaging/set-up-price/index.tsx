import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import Link from 'next/link';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryInputOfferings } from '@/helpers/initial-values';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonLinkNoBg = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLinkNoBg,
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
const EditOfferingObjMachPack = dynamic(
  () =>
    import(
      '@/components/vendor/input-offerings/set-up/edit-offering-obj-math-pack'
    ).then(mod => ({
      default: mod.EditOfferingObjMachPack,
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

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryInputOfferings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const SetUp: FC = () => (
  <EditOfferingObjMachPack>
    <section className="m-2 mt-4">
      <ShowWindowTitle smallTitle secondTitle="Set Up Price" />

      <Description>
        <b> Step 1:</b> Set up the price of the basic offering according to
        size, color, and material. Then, setup the price of the customizations
        according to kind and technology used by clicking on the Basic Offering
        Price button below. The basic offering and customization price asked in
        UpUnikSelf Inc. can not be higher than the price you sell it in your own
        website.
      </Description>

      <section className="flex justify-center">
        <CommonLinkNoBg
          href={
            routes.vendor.inputOfferings.objMachPack.setUpPrice
              .salesTaxesOptions
          }
        >
          <span className="p-2">Sales Taxes Options</span>
        </CommonLinkNoBg>
      </section>

      <Description>
        <b> Step 2:</b> Set up the Vendor&apos;s choice on how to include
        sales-related taxes in the price presented to Shoppittos. Click in the
        above button to go there directly.
      </Description>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <Link
            href={{
              pathname:
                routes.vendor.inputOfferings.objMachPack.setUpPrice.default,
              query: { edit: index + 1 },
            }}
            key={index}
            className={`m-2 flex flex-col items-center justify-around rounded-2xl border-4 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg ${
              index === 9 ? 'lg:col-span-1 lg:col-start-2' : ''
            }`}
          >
            <section className="mb-4 flex h-20 w-full items-center justify-center rounded-xl border-2 bg-gray-50">
              <span className="text-center text-lg font-bold sm:text-xl md:text-2xl">
                Offering {index + 1} Name
              </span>
            </section>
            <section className="flex flex-col items-center space-y-2">
              <p className="text-lg font-semibold sm:text-xl md:text-2xl">
                Offering {index + 1} Price
              </p>
              <section className="h-10 w-24 rounded-lg border-2 bg-gray-100 hover:bg-deep-sapphire" />
            </section>
          </Link>
        ))}
      </section>

      <Description>
        <b> Step 3: </b>
        Set up the packaging choice, including packaging handling fees as well
        as the shipping plan in the Logistics button of the Vendor&apos;s
        Dashboard.
      </Description>

      <CommonLink href={routes.vendor.inputOfferings.objMachPack.default}>
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  </EditOfferingObjMachPack>
);

export default SetUp;
export { getServerSideProps };
