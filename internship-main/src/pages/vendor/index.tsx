import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { redirectServerPageToLogin } from '@/helpers/api';
import { getToken } from '@/helpers/validations';
import { routes } from '@/routes';
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC, FormEvent } from 'react';

const Ellipse = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.Ellipse,
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
    include: {
      account: {
        select: {
          firstName: true,
          lastName: true,
          BusinessInfo: {
            select: {
              categoryId: true,
            },
          },
        },
      },
    },
  });
  prisma.$disconnect();

  const isExpired =
    !session || new Date(session.expires) < new Date() || !session?.valid;
  if (isExpired) return redirectServerPageToLogin();

  return {
    props: {
      firstName: `${session.account.firstName}`,
      isLinksActive: !!session.account.BusinessInfo?.categoryId,
    },
  };
};

interface VendorDashboardProps {
  readonly firstName: string;
  readonly isLinksActive: boolean;
}

const VendorDashboard: FC<VendorDashboardProps> = ({
  firstName,
  isLinksActive,
}) => {
  const linkState = (state: boolean) =>
    `m-2 flex items-center justify-start hover:underline md:m-5 ${state ? 'hover:underline' : 'cursor-not-allowed '}`;

  const handleLinkClick = (e: FormEvent) => {
    if (!isLinksActive) e.preventDefault();
  };

  return (
    <section className="mx-auto my-4 w-full max-w-7xl">
      <h1 className="m-8 line-clamp-3 text-center text-2xl font-bold tracking-wide md:m-6 md:text-2xl lg:text-3xl 2xl:text-4xl">
        {firstName}, Welcome to Vendor&apos;s Dashboard
      </h1>

      <section className="mx-2 grid grid-cols-2 gap-1 lg:gap-2">
        <section className="flex grow flex-col rounded-xl border-4">
          <h1 className="mx-2 flex flex-col justify-center border-b-4 p-2 text-center text-xl font-extrabold sm:mx-5 sm:flex-row sm:gap-2 md:p-5 md:text-2xl lg:text-3xl 2xl:text-4xl">
            Shop
            <span>Window</span>
          </h1>

          <Link
            href={routes.vendor.tenOfferings.default}
            className={linkState(isLinksActive)}
            onClick={handleLinkClick}
          >
            <Ellipse
              className="size-10 shrink-0 md:size-14"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <section className="font-bold leading-6 md:text-lg lg:text-xl xl:text-2xl">
              Input 10 Offerings
            </section>
          </Link>
          <Link
            href={routes.vendor.inputOfferings.default}
            className={linkState(isLinksActive)}
            onClick={handleLinkClick}
          >
            <Ellipse
              className="size-10 shrink-0 md:size-14"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <section className="font-bold leading-6 md:text-lg lg:text-xl xl:text-2xl">
              Input Offering Features
            </section>
          </Link>
          <Link
            href={routes.vendor.editWindowDecor.default}
            className={linkState(isLinksActive)}
            onClick={handleLinkClick}
          >
            <Ellipse
              className="size-10 shrink-0 md:size-14"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <section className="font-bold leading-6 md:text-lg lg:text-xl xl:text-2xl">
              Edit Window&#39;s Decor
            </section>
          </Link>
        </section>

        <section className="flex grow flex-col rounded-xl border-4">
          <h1 className="mx-2 flex flex-col justify-center border-b-4 p-2 text-center text-xl font-extrabold sm:mx-5 sm:flex-row sm:gap-2 md:p-5 md:text-2xl lg:text-3xl 2xl:text-4xl">
            Shop
            <span>Orders</span>
          </h1>

          <Link
            href={routes.vendor.orderSetup.default}
            className={`my-auto ${linkState(isLinksActive)}`}
            onClick={handleLinkClick}
          >
            <Ellipse
              className="size-10 shrink-0 md:size-14"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <section className="font-bold leading-6 md:text-lg lg:text-xl xl:text-2xl">
              Order Set Up
            </section>
          </Link>
          <Link
            href={routes.vendor.orderFollowUp.default}
            className={`my-auto ${linkState(isLinksActive)}`}
            onClick={handleLinkClick}
          >
            <Ellipse
              className="size-10 shrink-0 md:size-14"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <section className="font-bold leading-6 md:text-lg lg:text-xl xl:text-2xl">
              Order Follow Up
            </section>
          </Link>
          <Link
            href={routes.vendor.manageReturns.default}
            className={`my-auto ${linkState(isLinksActive)}`}
            onClick={handleLinkClick}
          >
            <Ellipse
              className="size-10 shrink-0 md:size-14"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <section className="font-bold leading-6 md:text-lg lg:text-xl xl:text-2xl">
              Manage Returns
            </section>
          </Link>
        </section>

        <section className="flex grow flex-col rounded-xl border-4">
          <h1 className="mx-2 flex flex-col justify-center border-b-4 p-2 text-center text-xl font-extrabold sm:mx-5 sm:flex-row sm:gap-2 md:p-5 md:text-2xl lg:text-3xl 2xl:text-4xl">
            Shop
            <span>Control</span>
          </h1>

          <Link
            href={routes.vendor.payment.default}
            className={linkState(isLinksActive)}
            onClick={handleLinkClick}
          >
            <Ellipse
              className="size-10 shrink-0 md:size-14"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <section className="font-bold leading-6 md:text-lg lg:text-xl xl:text-2xl">
              Payment
            </section>
          </Link>
          <Link
            href={routes.vendor.logisticsAndApis.default}
            className={linkState(isLinksActive)}
            onClick={handleLinkClick}
          >
            <Ellipse
              className="size-10 shrink-0 md:size-14"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <section className="font-bold leading-6 md:text-lg lg:text-xl xl:text-2xl">
              Logistics and APIs
            </section>
          </Link>
        </section>

        <section className="flex grow flex-col rounded-xl border-4">
          <h1 className="mx-2 flex flex-col justify-center border-b-4 p-2 text-center text-xl font-extrabold sm:mx-5 sm:flex-row sm:gap-2 md:p-5 md:text-2xl lg:text-3xl 2xl:text-4xl">
            Shop
            <span>Accounts</span>
          </h1>

          <Link
            href={routes.vendor.accounts.default}
            className={linkState(isLinksActive)}
            onClick={handleLinkClick}
          >
            <Ellipse
              className="size-10 shrink-0 md:size-14"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <section className="font-bold leading-6 md:text-lg lg:text-xl xl:text-2xl">
              Accounts
            </section>
          </Link>
          <Link
            href={routes.vendor.statistics}
            className={linkState(isLinksActive)}
            onClick={handleLinkClick}
          >
            <Ellipse
              className="size-10 shrink-0 md:size-14"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <section className="font-bold leading-6 md:text-lg lg:text-xl xl:text-2xl">
              Statistics
            </section>
          </Link>
        </section>

        <section className="flex grow flex-col rounded-xl border-4">
          <h1 className="mx-2 flex flex-col justify-center border-b-4 p-2 text-center text-xl font-extrabold sm:mx-5 sm:flex-row sm:gap-2 md:p-5 md:text-2xl lg:text-3xl 2xl:text-4xl">
            Ad
            <span>Attacks</span>
          </h1>

          <Link
            href={routes.vendor.buyAdAttacks.default}
            className={`my-auto ${linkState(isLinksActive)}`}
            onClick={handleLinkClick}
          >
            <Ellipse
              className="size-10 shrink-0 md:size-14"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <section className="font-bold leading-6 md:text-lg lg:text-xl xl:text-2xl">
              Buy Ad Attacks
            </section>
          </Link>
        </section>

        <section className="flex grow flex-col rounded-xl border-4">
          <h1 className="mx-2 flex flex-col justify-center border-b-4 p-2 text-center text-xl font-extrabold sm:mx-5 sm:flex-row sm:gap-2 md:p-5 md:text-2xl lg:text-3xl 2xl:text-4xl">
            Vendor&#39;s <span>Data</span>
          </h1>

          <Link
            href={routes.vendor.setUpEditVendorWindow.default}
            className={linkState(true)}
          >
            <Ellipse
              className="size-10 shrink-0 md:size-14"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <section className="font-bold leading-6 md:text-lg lg:text-xl xl:text-2xl">
              Set Up and Edit Vendor&#39;s Data
            </section>
          </Link>
        </section>
      </section>
    </section>
  );
};

export default VendorDashboard;
export { getServerSideProps };
