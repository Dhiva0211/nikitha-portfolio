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

const solutionArray = [
  'Solution 1 Name',
  'Solution 2 Name',
  'Solution 3 Name',
  'Solution 4 Name',
  'Solution 5 Name',
  'Solution 6 Name',
  'Solution 7 Name',
  'Solution 8 Name',
  'Solution 9 Name',
  'Solution 10 Name',
];

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
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Set Up Solution Description" />

    {solutionArray.map(solution => (
      <AddAnotherFaqWithTitle
        key={solution}
        name={solution}
        isMultiple={true}
      />
    ))}
    <section className="mb-2 mt-6">
      <CommonLink
        href={
          routes.vendor.inputOfferings.generalSolutions.individualServices
            .default
        }
      >
        <section className="m-2">Done</section>
      </CommonLink>
    </section>
  </section>
);

export default SetUpSolutionDescription;
export { getServerSideProps };
