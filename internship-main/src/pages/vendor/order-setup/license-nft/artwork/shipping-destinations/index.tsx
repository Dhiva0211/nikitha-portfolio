import { useRouter } from 'next/router';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryOrderSetUp } from '@/helpers/initial-values';

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
    categoryOrderSetUp,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const ShippingDestinations: FC = () => {
  const router = useRouter();

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Order Setup" />

      <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
        <h3 className="text-center text-xl font-bold">
          Allowed Shipping destinations
        </h3>
        <table className="mt-4 rounded-r-2xl border-4">
          <thead>
            <tr className="grid grid-cols-3 px-2 pt-2">
              <th>Country 1</th>
              <th>Allowed Shipping</th>
              <th>Confirm Allowed Shipping</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="h-10" />
              <td className="h-10" />
              <td className="h-10" />
            </tr>
          </tbody>
        </table>
        <button className="m-5 mx-auto flex items-center justify-around rounded-2xl border-4 p-2">
          Add Another Row
        </button>
      </section>

      <CommonLink
        href={routes.vendor.orderSetup.licenseNft.artwork.default}
        onClick={goBack}
      >
        <section className="py-1">Done</section>
      </CommonLink>
    </section>
  );
};

export default ShippingDestinations;
export { getServerSideProps };
