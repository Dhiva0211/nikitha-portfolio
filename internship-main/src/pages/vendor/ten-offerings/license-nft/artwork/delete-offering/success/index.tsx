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

const DeleteSuccess: FC = () => (
  <section className="m-2 mt-4">
    <h1 className="m-2 text-center text-3xl font-bold">All Done!</h1>
    <h3 className="m-2 text-center text-2xl font-bold">
      Your Artwork License plan has been successfully deleted.
    </h3>

    <p className="text-center text-xl font-bold">
      You can now add a new Artwork License plan.
    </p>

    <p className="text-center text-xl">
      All the orders made by Shoppittos of the old Artwork License before it was
      deleted must still be fulfilled.
    </p>

    <CommonLink
      href={routes.vendor.tenOfferings.licenseNft.artwork.default}
      query={{ color: true }}
    >
      <span className="text-xl font-bold">Continue</span>
    </CommonLink>
  </section>
);

export default DeleteSuccess;
export { getServerSideProps };
