import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { useRouter } from 'next/router';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { category10Offerings } from '@/helpers/initial-values';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
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

const DeleteOffering: FC = () => {
  const router = useRouter();

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="m-4 sm:m-6 lg:m-8 xl:m-10">
      <ShowWindowTitle smallTitle secondTitle="Edit Solution" />
      <h6 className="mb-6 text-center text-xl font-bold md:text-2xl lg:text-3xl">
        Are you certain you want to delete this solution?
      </h6>

      <p className="mb-6 text-center text-lg md:text-xl lg:text-2xl">
        By deleting this solution, you will delete all of the features, messages
        and price information associated with this solution.
      </p>

      <p className="mb-6 text-center text-lg md:text-xl lg:text-2xl">
        All orders made before this date on the old offering still need to be
        fulfilled.
      </p>

      <section className="flex justify-center text-xl font-bold">
        <CommonLink
          href={
            routes.vendor.tenOfferings.generalSolutions.subscription
              .deleteOfferingSuccess
          }
        >
          <span className="rounded-lg px-4 py-2 text-lg font-bold transition-all md:text-xl lg:text-2xl">
            Delete this solution
          </span>
        </CommonLink>
      </section>

      <section className="flex justify-center text-xl font-bold">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex w-80 justify-center rounded-xl border-4 px-4 py-2 text-lg font-bold transition-all md:text-xl lg:text-2xl"
        >
          Cancel
        </button>
      </section>
    </section>
  );
};

export default DeleteOffering;
export { getServerSideProps };
