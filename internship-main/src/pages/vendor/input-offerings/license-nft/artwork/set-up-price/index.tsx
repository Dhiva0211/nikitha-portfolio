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
const EditOfferingLicenseArtwork = dynamic(
  () =>
    import(
      '@/components/vendor/input-offerings/set-up/edit-offering-license-artwork'
    ).then(mod => ({
      default: mod.EditOfferingLicenseArtwork,
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
  <EditOfferingLicenseArtwork>
    <section className="m-2 mt-4">
      <ShowWindowTitle smallTitle secondTitle="Set Up Price" />

      <Description>
        Step 1 - Set up the price of the Artwork licenses by clicking on the
        Artwork License Price button The license price asked in UpUnikSelf Inc.
        can not be higher than the one you sell it in your own website.
      </Description>

      <section className="flex justify-center">
        <CommonLinkNoBg
          href={
            routes.vendor.inputOfferings.licenseNft.artwork.setUpPrice
              .salesTaxesOptions
          }
        >
          <span className="p-2">Sales Taxes Options</span>
        </CommonLinkNoBg>
      </section>

      <Description>
        Step 2 - Set up the Vendor’s choice on how to include sales-related
        taxes in the price presented to Shoppittos. Click in the above button to
        go there directly.
      </Description>

      {Array.from({ length: 10 }).map((_, index) => (
        <Link
          href={{
            pathname:
              routes.vendor.inputOfferings.licenseNft.artwork.setUpPrice
                .default,
            query: { edit: index + 1 },
          }}
          key={index}
          className="m-2 flex justify-around"
        >
          <section className="flex size-36 justify-center rounded-2xl border-4">
            <span className="text-center text-2xl font-bold">
              Artwork License {index + 1}
            </span>
          </section>
          <section className="m-4 flex flex-col items-center">
            <p className="text-2xl font-bold">Artwork License Price</p>
            <section className="size-16 rounded-2xl border-4" />
          </section>
        </Link>
      ))}

      <CommonLink
        href={routes.vendor.inputOfferings.licenseNft.artwork.default}
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  </EditOfferingLicenseArtwork>
);

export default SetUp;
export { getServerSideProps };
