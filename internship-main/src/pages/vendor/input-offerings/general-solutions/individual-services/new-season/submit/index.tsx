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
  <section className="m-4 mt-8 space-y-6 rounded-lg bg-white p-6 shadow-md">
    <h1 className="text-center text-6xl font-bold text-deep-sapphire">
      All Done!
    </h1>

    {/* Mobile */}
    <h3 className="text-center text-5xl font-bold text-deep-sapphire sm:hidden">
      Your new season solution has been successfully submitted.
    </h3>

    <p className="text-center text-4xl text-deep-sapphire sm:hidden">
      You will receive an email shortly with an approval update of your new
      season solution.
    </p>

    <p className="text-center text-3xl text-deep-sapphire sm:hidden">
      When you receive the approval email you can access your new season
      solution&apos;s ShopWindow and set it up!
    </p>

    {/* Computer */}
    <h3 className="hidden text-center text-5xl font-bold text-deep-sapphire sm:block">
      Your new season solution has been successfully submitted.
    </h3>

    <p className="hidden text-center text-4xl text-deep-sapphire sm:block">
      You will receive an email shortly with an approval update of your new
      season solution.
    </p>

    <p className="hidden text-center text-3xl text-deep-sapphire sm:block">
      When you receive the approval email you can access your new season
      solution&apos;s ShopWindow and set it up!
    </p>

    <div className="mt-6 flex justify-center">
      <CommonLink
        href={
          routes.vendor.inputOfferings.generalSolutions.individualServices
            .newSeason.default
        }
        query={{ color: true }}
      >
        <span className="text-xl font-bold text-white transition-colors duration-200 hover:text-blue-100">
          Continue
        </span>
      </CommonLink>
    </div>
  </section>
);

export default Submit;
export { getServerSideProps };
