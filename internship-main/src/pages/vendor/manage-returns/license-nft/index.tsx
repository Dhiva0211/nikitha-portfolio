import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { FC } from 'react';
import Link from 'next/link';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryManageReturns } from '@/helpers/initial-values';

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
    categoryManageReturns,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const ManageReturnsObjectsMachinesPackaging: FC = () => {
  const router = useRouter();

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Manage Returns" />

      <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
        <h3 className="m-2 text-2xl font-bold">Licenses complaints received</h3>
        <section className="flex justify-around rounded-2xl border-4 p-2">
          <span>UpUnikSelf order tracking number</span>
          <span>License</span>
          <span>Price</span>
        </section>
        <Link href={routes.vendor.manageReturns.licenseNft.complain}>
          <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4" />
        </Link>
        <Link href={routes.vendor.manageReturns.licenseNft.complain}>
          <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4" />
        </Link>
        <button type="button" className="w-full text-center">
          Show More
        </button>
      </section>

      <CommonLink href={routes.vendor.dashboard} onClick={goBack}>
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default ManageReturnsObjectsMachinesPackaging;
export { getServerSideProps };
