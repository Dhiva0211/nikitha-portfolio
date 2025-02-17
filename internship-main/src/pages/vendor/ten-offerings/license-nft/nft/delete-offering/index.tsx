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
  const { query } = router;

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="m-2 mt-4">
      <ShowWindowTitle smallTitle secondTitle="Edit NFT to License" />
      <h3 className="m-2 text-center text-2xl font-bold sm:mt-4 xl:mt-6">
        NFT License {query?.edit ?? 0}
      </h3>
      <h6 className="m-10 text-center text-2xl font-bold sm:mx-24">
        Are you certain you want to change this NFT?
      </h6>

      <p className="m-4 block text-center text-xl sm:text-base md:text-lg lg:text-xl">
        If you change this NFT, you will delete all of the features, license
        type and price information associated with this NFT. All licenses signed
        before this date on the old NFT will still be active up until their due
        date.
      </p>

      <CommonLink
        href={routes.vendor.tenOfferings.licenseNft.nft.deleteOfferingSuccess}
      >
        <span className="text-xl font-bold">Change NFT to license</span>
      </CommonLink>

      <p className="m-4 text-center text-xl">
        Changing your NFT to license does not make any changes in your wallet.
      </p>

      <section className="flex w-full justify-center sm:grid sm:items-center">
        <button
          type="button"
          onClick={goBack}
          className="m-5 block w-64 rounded-xl border-4 p-2 text-center text-xl font-bold xl:outline-1 xl:hover:bg-deep-sapphire xl:hover:text-white"
        >
          Cancel
        </button>
      </section>
    </section>
  );
};

export default DeleteOffering;
export { getServerSideProps };
