import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { category10Offerings } from '@/helpers/initial-values';
import { getToken, validSessionToken } from '@/helpers/validations';
import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { FC } from 'react';

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
  <section className="mt-4 flex min-h-fit flex-col items-center justify-center sm:m-4 md:m-6 lg:m-8 xl:m-10">
    <h1 className="m-2 mt-4 text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
      All Done!
    </h1>
    <h3 className="m-2 mt-4 text-center text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
      Your offering has been successfully deleted.
    </h3>

    <p className="m-2 mt-4 text-center text-xl font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
      You can now add a new offering.
    </p>

    <p className="m-12 my-4 text-center sm:text-base md:text-xl lg:text-2xl xl:text-2xl">
      All the orders made by Shoppittos of the old offering before it was
      deleted must still be fulfilled.
    </p>

    <div className="mt-8 text-center">
      <CommonLink
        href={routes.vendor.tenOfferings.objMachPack.default}
        query={{ color: true }}
      >
        <span className="text-xl font-bold">Continue</span>
      </CommonLink>
    </div>
  </section>
);

export default DeleteSuccess;
export { getServerSideProps };
