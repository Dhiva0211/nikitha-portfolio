import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryInputOfferings } from '@/helpers/initial-values';

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
    categoryInputOfferings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const Submit: FC = () => (
  <section className="m-2 mt-4">
    <h1 className="m-2 text-center text-3xl font-bold">All Done!</h1>
    <h3 className="m-2 text-center text-2xl font-bold">
      Your new season Artwork to license has been successfully submitted.
    </h3>

    <p className="text-center text-xl font-bold">
      You will receive an email briefly with an approval of your new season
      Artwork to license.
    </p>

    <p className="text-center text-xl font-bold">
      With this email you can access your new season Artwork’s ShopWindow and
      set it up!
    </p>

    <CommonLink
      href={routes.vendor.inputOfferings.licenseNft.artwork.newSeason.default}
      query={{ color: true }}
    >
      <span className="text-xl font-bold">Continue</span>
    </CommonLink>
  </section>
);

export default Submit;
export { getServerSideProps };
