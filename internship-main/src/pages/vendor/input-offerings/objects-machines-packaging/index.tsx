import { FC } from 'react';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
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
    link: routes.vendor.inputOfferings.objMachPack.setUpPrice.default,
    query: null,
  },
  {
    title: 'Set Up Basic Offering Features',
    link: routes.vendor.inputOfferings.objMachPack.setUpBasicOfferingFeatures
      .default,
    query: null,
  },
  {
    title: 'Set Up Technology of Customization',
    link: routes.vendor.inputOfferings.objMachPack.setUpTechOfCustom.default,
    query: null,
  },
  {
    title: 'Set Up Offering Description',
    link: routes.vendor.inputOfferings.objMachPack.setUpOfferingDescription
      .default,
    query: null,
  },
  {
    title: 'Add New Season',
    link: routes.vendor.inputOfferings.objMachPack.newSeason.default,
    query: { color: true },
  },
  {
    title: 'Set Up Customization Size Table',
    link: routes.vendor.inputOfferings.objMachPack.setUpCustomizationSizeTable
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
