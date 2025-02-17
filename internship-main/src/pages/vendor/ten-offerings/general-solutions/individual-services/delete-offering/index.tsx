import { FC, MouseEvent } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getToken, validSessionToken } from '@/helpers/validations';
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

  const goBack = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="m-4 sm:m-6 lg:m-8 xl:m-10">
      <ShowWindowTitle smallTitle secondTitle="Edit Solution" />

      <h6 className="m-10 text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
        Are you sure you want to delete this solution?
      </h6>

      <p className="m-4 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        By deleting this solution, you will delete all of the features,
        messages, and price information associated with this solution.
      </p>

      <p className="m-4 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        All orders made before this date on the old offering still need to be
        fulfilled.
      </p>

      <section className="mt-8 flex w-full justify-center">
        <button
          type="button"
          onClick={() =>
            router.push(
              routes.vendor.tenOfferings.generalSolutions.individualServices
                .deleteOfferingSuccess,
            )
          }
          className="w-full rounded-xl border-4 bg-deep-sapphire p-4 text-center text-xl font-bold text-white sm:max-w-md sm:text-2xl md:text-3xl lg:text-4xl"
        >
          Delete this solution
        </button>
      </section>

      <section className="mt-8 flex w-full justify-center">
        <button
          type="button"
          onClick={goBack}
          className="w-full rounded-xl border-4 p-4 text-center text-xl font-bold sm:max-w-md sm:text-2xl md:text-3xl lg:text-4xl"
          aria-label="Cancel"
        >
          Cancel
        </button>
      </section>
    </section>
  );
};

export default DeleteOffering;
export { getServerSideProps };
