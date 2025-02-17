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

const ApprovalOffering: FC = () => (
  <section className="m-2 mt-4">
    <h1 className="m-2 text-center text-3xl font-bold">All Done!</h1>
    <h3 className="m-2 text-center text-2xl font-bold">
      Your new solution has been successfully submitted.
    </h3>

    <p className="text-center text-xl font-semibold">
      You will receive an email shortly with an approval update of your new
      offering.
    </p>

    <p className="text-center text-xl font-semibold">
      When you receive the approval email you can access your new
      offering&apos;s ShopWindow and set it up!
    </p>

    <CommonLink
      href={routes.vendor.tenOfferings.generalSolutions.subscription.default}
      query={{ color: true }}
    >
      <span className="text-xl font-bold">Continue</span>
    </CommonLink>
  </section>
);

export default ApprovalOffering;
export { getServerSideProps };
