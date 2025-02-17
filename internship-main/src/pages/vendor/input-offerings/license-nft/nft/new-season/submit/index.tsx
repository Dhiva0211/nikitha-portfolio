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
  <section className="m-4 mb-0 flex max-w-7xl flex-col items-center justify-center md:m-6 lg:m-8 xl:m-10">
    <h1 className="m-2 mt-4 text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
      All Done!
    </h1>
    <h3 className="m-2 mt-4 text-center text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
      Your new season NFT to license has been successfully submitted.
    </h3>

    <p className="m-2 mt-4 text-center text-xl font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
      You will receive an email shortly with an approval update of your new
      season NFT to license.
    </p>

    <p className="m-12 my-4 text-center sm:text-base md:text-xl lg:text-2xl xl:text-2xl">
      When you receive the approval email you can access your new season NFT to
      license&apos;s ShopWindow and set it up!
    </p>

    <CommonLink
      href={routes.vendor.inputOfferings.licenseNft.nft.newSeason.default}
      query={{ color: true }}
    >
      <span className="m-2 p-2">Continue</span>
    </CommonLink>
  </section>
);

export default Submit;
export { getServerSideProps };
