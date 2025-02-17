import { FC } from 'react';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryInputOfferings } from '@/helpers/initial-values';

const SalesTaxesOptions = dynamic(
  () =>
    import('@/components/vendor/input-offerings/sales-taxes-options').then(
      mod => ({
        default: mod.SalesTaxesOptions,
      }),
    ),
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

const LicenseNFTSalesTaxesOptions: FC = () => (
  <SalesTaxesOptions
    returnTo={routes.vendor.inputOfferings.licenseNft.nft.setUpPrice.default}
  />
);

export default LicenseNFTSalesTaxesOptions;
export { getServerSideProps };
