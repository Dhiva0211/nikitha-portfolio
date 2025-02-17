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

const BasicOfferingStock: FC = () => {
  const router = useRouter();
  const { query } = router;

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Order Setup" />
      <h3 className="m-2 text-2xl font-bold">
        Basic Offering {query.name} stock
      </h3>

      <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
        <table className="rounded-r-2xl border-4">
          <thead>
            <tr>
              <th>[Basic offering {query?.name}]</th>
              <th>Size</th>
              <th>Color</th>
              <th>Material</th>
              <th>Input Stock</th>
              <th>Confirm Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="h-10" />
              <td className="h-10" />
              <td className="h-10" />
              <td className="h-10" />
              <td className="h-10" />
              <td className="h-10" />
            </tr>
          </tbody>
        </table>
        <button className="m-5 flex items-center justify-around rounded-2xl border-4 p-2">
          Add Another Row
        </button>
      </section>

      <CommonLink
        href={routes.vendor.orderSetup.objMachPack.default}
        onClick={goBack}
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default BasicOfferingStock;
export { getServerSideProps };
