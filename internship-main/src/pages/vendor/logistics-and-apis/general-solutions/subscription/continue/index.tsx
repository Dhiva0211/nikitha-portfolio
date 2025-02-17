import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryLogisticsAndApis } from '@/helpers/initial-values';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
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
const APIForm = dynamic(
  () =>
    import('@/components/common/api-form').then(mod => ({
      default: mod.APIForm,
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
    categoryLogisticsAndApis,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const SubscriptionContinue: FC = () => {
  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Logistics" />

      <Description>
        ACCOUNT API SET UP For a successful new account integration, you need to
        <br />
        Step 1 - Set up user account mapping. Establish a mechanism to map user
        accounts between the marketplace and your software. When a user
        purchases your software on the marketplace, you need to associate their
        marketplace account with an account in your software.
        <br />
        Step 2 - Upon successful payment, use the marketplace API to trigger
        setting up a new account in your software. Pass the necessary user
        details, such as username and email, from the marketplace to your
        software.
        <br />
        Step 3 - Set up a system to handle event notifications from the
        marketplace.
      </Description>
      <APIForm />
      <CommonLink href={routes.vendor.dashboard}>
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default SubscriptionContinue;
export { getServerSideProps };
