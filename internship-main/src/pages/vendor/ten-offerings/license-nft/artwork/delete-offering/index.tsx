import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { category10Offerings } from '@/helpers/initial-values';
import { getToken, validSessionToken } from '@/helpers/validations';
import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC } from 'react';

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
  const { query } = router;

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="m-4 sm:m-6 lg:m-8 xl:m-10">
      <ShowWindowTitle smallTitle secondTitle="Edit Artwork To License" />
      <h3 className="m-2 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
        Artwork License {query?.edit ?? 0}
      </h3>
      <h6 className="m-10 text-center text-2xl font-bold md:text-2xl lg:text-3xl">
        Are you certain you want to change this Artwork?
      </h6>

      <p className="m-4 block text-center text-xl sm:text-base md:text-lg lg:text-xl">
        If you change this Artwork, you will delete all of the features, license
        type and price information associated with this Artwork. All licenses
        signed before this date on the old Artwork will still be active up until
        their due date.
      </p>

      <CommonLink
        href={
          routes.vendor.tenOfferings.licenseNft.artwork.deleteOfferingSuccess
        }
      >
        <span className="text-xl font-bold md:text-lg lg:text-xl">
          Change Artwork to license
        </span>
      </CommonLink>

      <section className="flex w-full justify-center">
        <button
          type="button"
          onClick={goBack}
          className="m-3 w-80 rounded-xl border-4 p-2 text-center text-xl font-bold hover:bg-deep-sapphire hover:text-white md:text-lg lg:text-xl"
        >
          Cancel
        </button>
      </section>
    </section>
  );
};

export default DeleteOffering;
export { getServerSideProps };
