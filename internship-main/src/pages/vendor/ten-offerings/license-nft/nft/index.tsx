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
const EditOfferingLicenseNFT = dynamic(
  () =>
    import('@/components/vendor/ten-offerings/edit-offering-license-nft').then(
      mod => ({
        default: mod.EditOfferingLicenseNFT,
      }),
    ),
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

interface NFTProps {
  readonly businessInfo: VendorData;
}

const NFT: FC<NFTProps> = ({ businessInfo }) => {
  const router = useRouter();
  const { color } = router.query;
  router.query.bgColor = businessInfo.bgColor as string;

  return (
    <div
      style={{ backgroundColor: businessInfo.bgColor as string }}
      className={`mx-auto flex min-h-screen w-full flex-col items-center justify-center px-10 sm:px-5 ${color && 'bg-pale-cyan'}`}
    >
      <EditOfferingLicenseNFT>
        <section className="w-full flex-1 px-4 py-6 sm:px-6">
          <div className="mx-auto w-full max-w-7xl text-center">
            <LogoNameAd vendorData={businessInfo} isSubscription={false} />
          </div>
          <div className="mx-auto grid w-full max-w-7xl">
            <GridOrList
              frameColor={businessInfo.frameColor as string}
              href={routes.vendor.tenOfferings.licenseNft.nft.default}
            />
          </div>
          <div className="mx-auto mt-6 max-w-5xl rounded-lg p-4">
            <Description>
              You have to have previously connected your wallet that contains
              your NFTs through Shop Control Payment, or connect a new wallet on
              the next page.
            </Description>
          </div>
        </section>
      </EditOfferingLicenseNFT>
    </div>
  );
};

export default NFT;
export { getServerSideProps };
