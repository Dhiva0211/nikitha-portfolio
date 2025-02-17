import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryInputOfferings } from '@/helpers/initial-values';

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
    categoryInputOfferings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const Submit: FC = () => (
  <section className="m-2 mt-4">
    <h1 className="m-2 text-center text-3xl font-bold">All Done!</h1>
    <h3 className="m-2 text-center text-2xl font-semibold">
      Your new season offering has been successfully submitted.
    </h3>

    <p className="text-center text-xl">
      You will receive an email shortly with an approval update of your new
      season offering.
    </p>

    <p className="text-center text-xl">
      When you receive the approval email you can access your new season
      offering’s ShopWindow and set it up!
    </p>

    <CommonLink
      href={routes.vendor.inputOfferings.objMachPack.newSeason.default}
      query={{ color: true }}
    >
      <span className="text-xl font-bold">Continue</span>
    </CommonLink>
  </section>
);

export default Submit;
export { getServerSideProps };
