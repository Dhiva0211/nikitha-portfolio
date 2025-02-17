import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import { getToken, validSessionToken } from '@/helpers/validations';
import { category10Offerings } from '@/helpers/initial-values';

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
    category10Offerings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const ApprovalOffering: FC = () => (
  <section className="m-2 mt-4">
    <h1 className="m-2 my-4 text-center text-3xl font-bold sm:mx-6 md:my-10 lg:text-4xl">
      All Done!
    </h1>
    <h3 className="m-2 my-3 text-center text-2xl font-bold sm:mx-4 md:my-6 lg:text-3xl">
      Your new NFT to license has been successfully submitted.
    </h3>

    <p className="my-4 block text-center text-xl font-bold sm:mx-12 sm:text-base md:my-6 md:text-lg lg:my-12 lg:text-xl">
      You will receive an email shortly with an approval update of your new NFT
      to license.
    </p>

    <p className="m-4 block text-center text-xl sm:text-base md:text-lg lg:text-xl">
      When you receive the approval email you can access your new NFT to
      license&apos;s ShopWindow and set it up!
    </p>

    <CommonLink
      href={routes.vendor.tenOfferings.licenseNft.nft.default}
      query={{ color: true }}
    >
      <span className="py-1 text-xl font-bold">Continue</span>
    </CommonLink>
  </section>
);

export default ApprovalOffering;
export { getServerSideProps };
