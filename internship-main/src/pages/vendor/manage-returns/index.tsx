import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import { ResponseText } from '@/helpers/api';
import { getToken, validSessionToken } from '@/helpers/validations';
import { categoryManageReturns } from '@/helpers/initial-values';

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
  const error = ResponseText.processFailed;
  const token = getToken(context.req.headers.cookie);

  return validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    true,
    categoryManageReturns,
  ) as never;

  return {
    props: {
      error,
    },
  };
};

interface ShowCorrectPageUrlProps {
  readonly error?: string;
}

const ShowCorrectPageUrl: FC<ShowCorrectPageUrlProps> = ({ error }) => (
  <section className="flex h-screen items-center justify-center">
    <label className="text-center text-lg text-red-500">{error}</label>
    <CommonLink href={routes.vendor.dashboard}>Go to Dashboard</CommonLink>
  </section>
);

export default ShowCorrectPageUrl;
export { getServerSideProps };
