import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { categoryInputOfferings } from '@/helpers/initial-values';
import { getToken, validSessionToken } from '@/helpers/validations';
import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC } from 'react';

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
const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
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

const options = [
  {
    name: 'Single',
    url: routes.vendor.inputOfferings.generalSolutions.individualServices
      .setUpSolutionsFeatures.single,
  },
  {
    name: 'Up to 3 Tiers',
    url: routes.vendor.inputOfferings.generalSolutions.individualServices
      .setUpSolutionsFeatures.threeTiers,
  },
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

const SetUpSolutionsFeatures: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Set up solution features" />

    <Description>
      You can sell single solutions, for example a software, or freelance
      solutions with up to 3 tiers: Basic, Standard, Plus.
    </Description>

    <Select labelToUse="Choose which type of Solution you are selling">
      <div className="relative">
        <ul className="mt-4 flex w-full flex-col rounded-lg p-2 font-medium">
          {options.map(({ name, url }) => (
            <li key={name} className="flex w-full justify-center p-2">
              <Link
                href={url}
                className="cursor-pointer text-deep-sapphire hover:font-bold hover:underline md:text-lg lg:text-xl"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Select>

    <Description>
      You can choose to either sell up to 10 single solutions or up to 10 3 tier
      solutions.
    </Description>

    <CommonLink
      href={
        routes.vendor.inputOfferings.generalSolutions.individualServices.default
      }
    >
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default SetUpSolutionsFeatures;
export { getServerSideProps };
