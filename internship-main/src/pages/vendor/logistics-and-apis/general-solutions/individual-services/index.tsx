import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import Link from 'next/link';
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

const listOptions = [
  {
    title: 'Set up physical delivery of your solutions',
    link: routes.vendor.logisticsAndApis.generalSolutions.individualServices
      .setUpPhysicalDeliveryOfYourService.default,
  },
  {
    title: 'Set up digital delivery of your solutions',
    link: routes.vendor.logisticsAndApis.generalSolutions.individualServices
      .setUpDigitalDeliveryOfYourService.default,
  },
  {
    title: 'Set up API process',
    link: routes.vendor.logisticsAndApis.generalSolutions.individualServices
      .setUpApiProcess.default,
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
    categoryLogisticsAndApis,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const Logistics: FC = () => (
  <section className="mt-4 w-full max-w-7xl px-4">
    <ShowWindowTitle smallTitle secondTitle="Logistics" />

    <Description as="section">
      <p className="my-2 font-bold">Your solutions may require:</p>
      <section className="space-y-2 p-2 text-start">
        <p>
          <b>Option 1 -</b> Some sort of physical delivery, for which you need
          to set up shipping.
        </p>
        <p>
          <b>Option 2 -</b> Some sort of digital delivery, which may require you
          to set up digital shipping.{' '}
        </p>
        <p>
          <b>Option 3 -</b> To set up an API process to easily connect
          Shoppittos to your solutions bought through UpUnikSelf.
        </p>
      </section>
    </Description>

    <section className="my-10 mt-4 rounded-2xl border-4 p-2">
      {listOptions.map((option, index) => (
        <Link
          key={index}
          href={option.link}
          className="mt-2 flex items-center justify-between"
        >
          <span className="text-start text-sm font-bold sm:text-xl md:text-2xl">
            {option.title}
          </span>
          <section className="size-10 rounded-2xl border-4 bg-deep-sapphire sm:size-12 md:size-16" />
        </Link>
      ))}
    </section>

    <CommonLink href={routes.vendor.dashboard}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default Logistics;
export { getServerSideProps };
