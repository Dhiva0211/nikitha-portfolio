import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import { getToken, validSessionToken } from '@/helpers/validations';

const Steps = dynamic(
  () =>
    import('@/components/common/steps').then(mod => ({
      default: mod.Steps,
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
    false,
    false,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const Step6: FC = () => (
  <section className="mt-5">
    <h1 className="m-2 text-center text-3xl font-bold text-deep-sapphire">
      Almost Done
    </h1>

    <Steps activeStep={6} numberOfSteps={6} />

    <h2 className="mt-8 text-center text-2xl font-bold">
      Your account has been successfully submitted.
    </h2>

    <p className="m-2 mt-8 text-center text-xl font-semibold">
      You will receive an email briefly with an approval of your account.
      <br />
      <br />
      With this email you can start selling!
    </p>

    <CommonLink href={routes.vendor.tenOfferings.default}>
      <span className="text-xl font-bold">Continue</span>
    </CommonLink>
  </section>
);

export default Step6;
export { getServerSideProps };
