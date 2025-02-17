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
  <section className="mt-4 flex min-h-fit flex-col items-center justify-center sm:m-4 md:m-6 lg:m-8 xl:m-10">
    <h1 className="m-2 mt-4 text-center text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
      All Done!
    </h1>
    <h3 className="m-2 mt-4 text-center text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
      Your solution has been successfully deleted.
    </h3>

    <p className="m-2 mt-4 text-center text-lg font-medium sm:text-lg md:text-xl lg:text-2xl xl:text-2xl">
      You can now add a new solution.
    </p>

    <p className="m-12 my-4 text-center text-base font-normal sm:text-base md:text-lg lg:text-xl xl:text-xl">
      All the orders made by Shoppittos of the old solution before it was
      deleted must still be fulfilled.
    </p>

    {/* Continue Button */}
    <div className="mt-8 text-center">
      <CommonLink
        href={
          routes.vendor.tenOfferings.generalSolutions.individualServices.default
        }
        query={{ color: true }}
        className="m-2 rounded-lg p-3 text-lg font-semibold transition-all"
      >
        Continue
      </CommonLink>
    </div>
  </section>
);

export default DeleteSuccess;
export { getServerSideProps };
