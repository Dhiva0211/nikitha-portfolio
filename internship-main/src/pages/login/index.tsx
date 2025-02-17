import { ReactElement } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { NextPageWithLayout } from '../_app';
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import { routes } from '@/routes';
import { getToken } from '@/helpers/validations';

const Ellipse = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.Ellipse,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const DefaultLayout = dynamic(
  () =>
    import('@/components/layouts/default-layout').then(mod => ({
      default: mod.DefaultLayout,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  if (token) {
    const prisma = new PrismaClient();
    await prisma.session
      .findUnique({
        where: {
          sessionToken: JSON.stringify(token),
        },
      })
      .then(async session => {
        if (session) {
          await prisma.session.update({
            where: {
              id: session.id,
            },
            data: {
              valid: false,
            },
          });
        }
      });
    prisma.$disconnect();
  }

  return {
    props: {},
  };
};

const Login: NextPageWithLayout = () => (
  <section className="m-2 flex flex-1 flex-col items-stretch justify-around gap-4 px-2 md:flex-row lg:px-2">
    <section className="mx-auto flex max-w-4xl flex-1 flex-col rounded-xl border-4 p-5">
      <h1 className="mb-5 border-b-4 p-5 text-center text-4xl font-extrabold">
        SHOP
      </h1>

      <Link
        href={routes.underConstruction}
        className="m-3 flex items-center hover:underline"
      >
        <Ellipse
          className="size-20"
          svgClassName="fill-deep-sapphire stroke-deep-sapphire"
        />
        <span className="ml-3 text-2xl font-bold">Guest</span>
      </Link>
      <Link
        href={routes.underConstruction}
        className="m-3 flex items-center hover:underline"
      >
        <Ellipse
          className="size-20"
          svgClassName="fill-deep-sapphire stroke-deep-sapphire"
        />
        <span className="ml-3 text-2xl font-bold">New Account</span>
      </Link>
      <Link
        href={routes.underConstruction}
        className="m-3 flex items-center hover:underline"
      >
        <Ellipse
          className="size-20"
          svgClassName="fill-deep-sapphire stroke-deep-sapphire"
        />
        <span className="ml-3 text-2xl font-bold">Log In</span>
      </Link>
    </section>

    <section className="mx-auto flex max-w-4xl flex-1 flex-col rounded-xl border-4 p-5">
      <h1 className="mb-5 border-b-4 p-5 text-center text-4xl font-extrabold">
        VEND
      </h1>

      <Link
        href={routes.vendor.support}
        className="m-3 flex items-center hover:underline"
      >
        <Ellipse
          className="size-20"
          svgClassName="fill-deep-sapphire stroke-deep-sapphire"
        />
        <span className="ml-3 text-2xl font-bold">Support</span>
      </Link>
      <Link
        href={routes.vendor.newRegister.default}
        className="m-3 flex items-center hover:underline"
      >
        <Ellipse
          className="size-20"
          svgClassName="fill-deep-sapphire stroke-deep-sapphire"
        />
        <span className="ml-3 text-2xl font-bold">New Account</span>
      </Link>
      <Link
        href={routes.vendor.login}
        className="m-3 flex items-center hover:underline"
      >
        <Ellipse
          className="size-20"
          svgClassName="fill-deep-sapphire stroke-deep-sapphire"
        />
        <span className="ml-3 text-2xl font-bold">Log In</span>
      </Link>
    </section>
  </section>
);

Login.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;

export default Login;
export { getServerSideProps };
