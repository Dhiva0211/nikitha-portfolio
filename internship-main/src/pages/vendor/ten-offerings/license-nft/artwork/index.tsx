import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { VendorData } from '@/helpers/interfaces';
import { GetServerSideProps } from 'next';
import { getToken, validSessionToken } from '@/helpers/validations';
import { useRouter } from 'next/router';
import { category10Offerings } from '@/helpers/initial-values';

const LogoNameAd = dynamic(
  () =>
    import('@/components/vendor/logo-name-ad').then(mod => ({
      default: mod.LogoNameAd,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const GridOrList = dynamic(
  () =>
    import('@/components/vendor/grid-or-list').then(mod => ({
      default: mod.GridOrList,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const EditOfferingLicenseArtwork = dynamic(
  () =>
    import(
      '@/components/vendor/ten-offerings/edit-offering-license-artwork'
    ).then(mod => ({
      default: mod.EditOfferingLicenseArtwork,
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
    category10Offerings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {
      businessInfo: {
        country: user?.BusinessInfo?.countryInfo.name,
        city: user?.BusinessInfo?.city,
        joinedInDate: user?.BusinessInfo?.joinInDate?.toString(),
        vendorName: user?.BusinessInfo?.busLegalName,
        bgColor: user?.BusinessInfo?.businessLayout?.bgColor,
        frameColor: user?.BusinessInfo?.businessLayout?.frameColor,
      },
    },
  };
};

interface ArtworkProps {
  readonly businessInfo: VendorData;
}

const Artwork: FC<ArtworkProps> = ({ businessInfo }) => {
  const router = useRouter();
  router.query.bgColor = businessInfo.bgColor as string;

  return (
    <div
      style={{ backgroundColor: businessInfo.bgColor as string }}
      className="flex min-h-screen w-full flex-col justify-center bg-pale-cyan"
    >
      <EditOfferingLicenseArtwork>
        <section className="w-full flex-1 px-1 py-6 md:px-10">
          <div className="mx-auto w-full max-w-7xl text-center">
            <LogoNameAd vendorData={businessInfo} isSubscription={false} />
          </div>
          <div className="mx-auto grid w-full max-w-7xl">
            <GridOrList
              frameColor={businessInfo.frameColor as string}
              href={routes.vendor.tenOfferings.licenseNft.artwork.default}
            />
          </div>
        </section>
      </EditOfferingLicenseArtwork>
    </div>
  );
};

export default Artwork;
export { getServerSideProps };
