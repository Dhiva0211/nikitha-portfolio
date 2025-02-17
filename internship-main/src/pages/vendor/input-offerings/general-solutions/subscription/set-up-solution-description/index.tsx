import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryInputOfferings } from '@/helpers/initial-values';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const AddAnotherFaqWithTitle = dynamic(
  () =>
    import('@/components/common/faq').then(mod => ({
      default: mod.AddAnotherFaqWithTitle,
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
    categoryInputOfferings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const SetUpSolutionDescription: FC = () => (
  <section className="my-4 w-full max-w-7xl px-4">
    <ShowWindowTitle smallTitle secondTitle="Set Up Solution Description" />

    <section className="px-6 py-1 shadow-lg shadow-deep-sapphire/50">
      <AddAnotherFaqWithTitle name="Solution Name" />
    </section>

    <CommonLink
      href={routes.vendor.inputOfferings.generalSolutions.subscription.default}
    >
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default SetUpSolutionDescription;
export { getServerSideProps };
