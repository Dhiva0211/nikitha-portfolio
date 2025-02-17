import { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import Link from 'next/link';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonLinkNoBg = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLinkNoBg,
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
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

interface SubscriptionSetUpProps {
  readonly salesTaxesOptionsLink: string;
  readonly individualEditLink: string;
  readonly returnLink: string;
  children?: ReactNode;
}

const SubscriptionSetUp: FC<SubscriptionSetUpProps> = ({
  salesTaxesOptionsLink,
  individualEditLink,
  returnLink,
}) => (
  <section className="m-4 mt-8 space-y-8">
    <ShowWindowTitle smallTitle secondTitle="Set Up Price" />

    <Description>
      <strong>Step 1:</strong> Set up the price of the subscription plans by
      clicking on the Plan Price button. The price of each plan in UpUnikSelf
      Inc. cannot be higher than the one you sell on your own website.
    </Description>

    <section className="mb-6 flex justify-center">
      <CommonLinkNoBg
        href={salesTaxesOptionsLink}
        aria-label="Sales Taxes Options"
      >
        <span className="p-3 transition-transform duration-200 hover:scale-105 hover:underline">
          Sales Taxes Options
        </span>
      </CommonLinkNoBg>
    </section>

    <Description>
      <strong>Step 2:</strong> Set up the vendor&apos;s choice on how to include
      sales-related taxes in the price presented to Shoppittos. Click on the
      button above to go there directly.
    </Description>

    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <Link
          href={{
            pathname: individualEditLink,
            query: { edit: index + 1 },
          }}
          key={index}
          className={`relative m-2 flex flex-col items-center justify-around rounded-2xl border-4 bg-white p-4 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-2xl ${
            index === 9 ? 'lg:col-span-1 lg:col-start-2' : ''
          }`}
          aria-label={`Edit Plan ${index + 1}`}
        >
          <section className="mb-4 flex h-20 w-full items-center justify-center rounded-xl border-2 bg-gray-50">
            <span className="text-center text-lg font-bold sm:text-xl md:text-2xl">
              Plan {index + 1} Name
            </span>
          </section>
          <section className="flex flex-col items-center space-y-2">
            <p className="text-lg font-semibold sm:text-xl md:text-2xl">
              Plan Price
            </p>
            <section className="h-10 w-24 rounded-lg border-2 bg-gray-100 transition-colors duration-200 hover:bg-dark-cerulean" />
          </section>

          {/* Overlay for hover effect */}
          {/* <div className="absolute inset-0 rounded-xl bg-dark-cerulean opacity-0 transition-opacity duration-200 hover:opacity-10" /> */}
        </Link>
      ))}
    </section>

    <section className="mt-8 flex justify-center">
      <CommonLink
        href={returnLink}
        aria-label="Return to Input Offering Features page"
      >
        <span className="m-2 p-2 cursor-pointer rounded-lg transition-transform duration-200 hover:scale-105 hover:decoration-white hover:shadow-xl">
          Done
        </span>
      </CommonLink>
    </section>
  </section>
);

export default SubscriptionSetUp;
