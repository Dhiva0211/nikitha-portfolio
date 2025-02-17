import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC } from 'react';
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
const EditOfferingLicenseNft = dynamic(
  () =>
    import(
      '@/components/vendor/input-offerings/set-up/edit-offering-license-nft'
    ).then(mod => ({
      default: mod.EditOfferingLicenseNFT,
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
  <EditOfferingLicenseNft>
    <section className="m-2 mt-4 sm:m-6 lg:m-8 xl:m-10">
      <ShowWindowTitle smallTitle secondTitle="Set Up Price" />

      <Description>
        Step 1 - Set up the price of the NFT licenses by clicking on the NFT
        License Price button - The price asked for a license can not be higher
        than the one you sell it in your own website.
      </Description>

      <section className="flex justify-center">
        <CommonLinkNoBg
          href={
            routes.vendor.inputOfferings.licenseNft.nft.setUpPrice
              .salesTaxesOptions
          }
        >
          <span className="p-2 text-lg font-bold hover:bg-deep-sapphire hover:text-white md:text-xl">
            Sales Taxes Options
          </span>
        </CommonLinkNoBg>
      </section>

      <Description>
        Step 2 - Set up the Vendor’s choice on how to include sales-related
        taxes in the price presented to Shoppittos. Click in the above button to
        go there directly.
      </Description>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <Link
            href={{
              pathname:
                routes.vendor.inputOfferings.licenseNft.nft.setUpPrice.default,
              query: { edit: index + 1 },
            }}
            key={index}
            className={`m-2 flex flex-col items-center justify-around rounded-2xl border-4 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg ${
              index === 9 ? 'lg:col-span-1 lg:col-start-2' : ''
            }`}
          >
            <section className="mb-4 flex h-20 w-full items-center justify-center rounded-xl border-2 bg-gray-50">
              <span className="text-center text-lg font-bold sm:text-xl md:text-2xl">
                NFT License {index + 1}
              </span>
            </section>
            <section className="flex flex-col items-center space-y-2">
              <p className="text-lg font-semibold sm:text-xl md:text-2xl">
                NFT License Price
              </p>
              <section className="h-10 w-24 rounded-lg border-2 bg-gray-100 hover:scale-105 hover:bg-deep-sapphire" />
            </section>
          </Link>
        ))}
      </section>
      <CommonLink href={routes.vendor.inputOfferings.licenseNft.nft.default}>
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  </EditOfferingLicenseNft>
);

export default SetUp;
export { getServerSideProps };
