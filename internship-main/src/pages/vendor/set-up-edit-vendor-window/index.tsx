import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import { getToken } from '@/helpers/validations';
import { redirectServerPageToLogin } from '@/helpers/api';
import { PrismaClient } from '@prisma/client';

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
  if (!token) return redirectServerPageToLogin();

  const prisma = new PrismaClient();
  const session = await prisma.session.findUnique({
    where: {
      sessionToken: JSON.stringify(token),
    },
  });
  prisma.$disconnect();

  const isExpired =
    !session || new Date(session.expires) < new Date() || !session?.valid;
  if (isExpired) {
    return redirectServerPageToLogin();
  }

  return {
    props: {},
  };
};

const SetUpEditVendorWindow: FC = () => (
  <main className="flex max-w-full flex-col items-center justify-center p-4">
    <section className="mt-4 w-full max-w-4xl">
      <h1 className="m-2 text-center text-3xl font-bold text-deep-sapphire sm:text-4xl md:text-5xl">
        Set Up account and start selling
      </h1>

      <div className="flex flex-col space-y-6">
        <div>
          <h3 className="mt-4 text-center text-2xl font-bold sm:text-3xl md:text-4xl">
            Sell almost anything
          </h3>
          <p className="m-2 text-justify text-base sm:text-lg md:text-xl">
            You can sell almost anything, first sale and resale, as long as you
            offer at least one way to make it a unique purchase for Shoppittos
            either in the offering or on the offering’s packaging. It could be
            something as plain as a message sticker. Also, you can sell any type
            of solutions, which are unique in their own nature. Check exceptions
            in our Terms and Conditions.
          </p>
        </div>

        <div>
          <h3 className="mt-4 text-center text-2xl font-bold sm:text-3xl md:text-4xl">
            Focus on What You Sell Best
          </h3>
          <p className="m-2 text-justify text-base sm:text-lg md:text-xl">
            You can sell up to 10 offerings at a time, check which boost sales
            the most in Statistics, and request to change any of your 10
            offerings when you want.
          </p>
        </div>

        <div>
          <h3 className="mt-4 text-center text-2xl font-bold sm:text-3xl md:text-4xl">
            Pay low transaction fees
          </h3>
          <p className="m-2 text-justify text-base sm:text-lg md:text-xl">
            You can manage your account without having to worry about paying any
            fees up until you sell. Use Vendor’s Boosts to acquire any specific
            extra services instead of paying subscriptions full of services that
            you mostly never use.
          </p>
        </div>

        <section className="mt-8 flex w-full justify-center">
          <CommonLink href={routes.vendor.setUpEditVendorWindow.step1}>
            <span className="block w-full max-w-xs text-center text-xl font-bold">
              Continue
            </span>
          </CommonLink>
        </section>
      </div>
    </section>
  </main>
);

export default SetUpEditVendorWindow;
export { getServerSideProps };
