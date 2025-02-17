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

const DeleteSuccess: FC = () => (
  <section className="m-2 mt-4 md:mt-5">
    <h1 className="m-2 text-center text-4xl font-bold sm:my-6 sm:text-5xl md:my-8 md:text-6xl lg:text-7xl xl:my-10 xl:text-8xl">
      All Done!
    </h1>
    <h3 className="m-2 text-center text-2xl font-bold sm:text-3xl md:my-4 md:text-4xl lg:text-5xl xl:my-6 xl:text-6xl">
      Your solution has been successfully deleted.
    </h3>

    <p className="text-center text-xl font-bold md:my-4 md:text-2xl xl:my-10">
      You can now add a new subscription solution.
    </p>

    <p className="my-4 text-center text-xl md:mx-16 xl:my-10">
      All the orders made by Shoppittos of the old subscription plans of the old
      solution before it was deleted must still be fulfilled.
    </p>

    <CommonLink
      href={routes.vendor.tenOfferings.generalSolutions.subscription.default}
      query={{ color: true }}
    >
      <span className="block py-1 text-lg font-bold md:text-xl xl:text-2xl">
        Continue
      </span>
    </CommonLink>
  </section>
);

export default DeleteSuccess;
export { getServerSideProps };
