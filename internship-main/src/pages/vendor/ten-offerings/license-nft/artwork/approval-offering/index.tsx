import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
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
  <section className="m-2 mt-4 max-w-screen-lg overflow-x-hidden">
    <h1 className="m-2 text-center text-2xl font-bold sm:text-3xl md:text-4xl">
      All Done!
    </h1>
    <h3 className="m-2 text-center text-xl font-bold sm:text-2xl md:text-3xl">
      Your new Artwork to license has been successfully submitted.
    </h3>

    <p className="text-center text-lg sm:text-xl md:text-2xl">
      You will receive an email shortly with an approval update of your new
      Artwork to license.
    </p>

    <p className="text-center text-lg sm:text-xl md:text-2xl">
      When you receive the approval email you can access your new Artwork to
      license&apos;s ShopWindow and set it up!
    </p>

    <div className="mt-4 flex w-full justify-center">
      <CommonLink
        href={routes.vendor.tenOfferings.licenseNft.artwork.default}
        query={{ color: true }}
      >
        <span className="text-lg font-bold sm:text-xl md:text-2xl">
          Continue
        </span>
      </CommonLink>
    </div>
  </section>
);

export default ApprovalOffering;
export { getServerSideProps };
