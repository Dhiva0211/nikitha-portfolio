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

const SetUpApiProcess: FC = () => (
  <section className="mt-4 w-full max-w-7xl px-4">
    <ShowWindowTitle smallTitle secondTitle="Logistics" />

    <Description as="section">
      <p className="my-2 font-bold">BASIC API SET UP</p>
      <section className="space-y-2 p-2 text-start">
      For a successful API, you need to
      <p>
          <b>Step 1 : </b> Ensure that UpUnikSelf
      provides an API that allows you to programmatically interact with their
      platform. Click here to check.
      </p>
        <p>
          <b>Step 2 : </b> Install on your service
      software an API that that allows for the generation of user accounts and
      providing access to features.
      </p>
        <p>
          <b>Step 3 : </b> Set up the authentication
      mechanism.
      </p>
      </section>
    </Description>

    <CommonLink
      href={
        routes.vendor.logisticsAndApis.generalSolutions.individualServices
          .setUpApiProcess.continue
      }
    >
      <section className="m-2 p-2">Continue</section>
    </CommonLink>
  </section>
);

export default SetUpApiProcess;
export { getServerSideProps };
