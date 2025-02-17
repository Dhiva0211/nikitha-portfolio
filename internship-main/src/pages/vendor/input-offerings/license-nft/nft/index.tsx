import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryInputOfferings } from '@/helpers/initial-values';

const FeaturesList = dynamic(
  () =>
    import('@/components/vendor/input-offerings/features-list').then(mod => ({
      default: mod.FeaturesList,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const features = [
  {
    title: 'Set Up Price',
    link: routes.vendor.inputOfferings.licenseNft.nft.setUpPrice.default,
    query: null,
  },
  {
    title: 'Set Up Previous License Agreements',
    link: routes.vendor.inputOfferings.licenseNft.nft
      .setUpPreviousLicenseAgreements.default,
    query: null,
  },
  {
    title: 'Set Up License Type',
    link: routes.vendor.inputOfferings.licenseNft.nft.setUpLicenseType.default,
    query: null,
  },
  {
    title: 'Set Up NFT Description',
    link: routes.vendor.inputOfferings.licenseNft.nft.setUpNftDescription
      .default,
    query: null,
  },
  {
    title: 'Add New Season',
    link: routes.vendor.inputOfferings.licenseNft.nft.newSeason.default,
    query: { color: true },
  },
  {
    title: 'Set Up NFT Licensing Period',
    link: routes.vendor.inputOfferings.licenseNft.nft.setUpNftLicenseDate
      .default,
    query: null,
  },
];

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

const Features: FC = () => <FeaturesList list={features} />;

export default Features;
export { getServerSideProps };
