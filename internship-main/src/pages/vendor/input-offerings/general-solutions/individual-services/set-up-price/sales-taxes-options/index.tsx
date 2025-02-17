import { FC } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import getToken from '@/helpers/validations/get-token';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { categoryInputOfferings } from '@/helpers/initial-values';
import { validSessionToken } from '@/helpers/validations';

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

const GeneralSolutionsIndividualServicesSalesTaxesOptions: FC = () => (
  <SalesTaxesOptions
    returnTo={
      routes.vendor.inputOfferings.generalSolutions.individualServices
        .setUpPrice.default
    }
  />
);

export default GeneralSolutionsIndividualServicesSalesTaxesOptions;
export { getServerSideProps };
