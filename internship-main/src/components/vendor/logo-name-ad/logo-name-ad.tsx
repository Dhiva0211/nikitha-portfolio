import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { VendorData } from '@/helpers/interfaces';
import { convertDateToString } from '@/helpers/validations';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

interface StatProps {
  readonly label: string;
  readonly id: string;
  readonly frameColor?: string;
}

const StatsCard: FC<StatProps> = ({ label, id, frameColor }) => (
  <section
    style={{ border: '4px solid' + frameColor || undefined }}
    className="flex w-full flex-col items-center rounded-xl border-4 border-bubblegum-pink bg-white p-4 text-center shadow-md"
  >
    <label
      htmlFor={id}
      className="mb-2 grow text-xs font-bold text-deep-sapphire sm:text-sm"
    >
      {label}
    </label>
    <input
      id={id}
      type="text"
      defaultValue="0"
      style={{ border: '2px solid' + frameColor || undefined }}
      className="w-full shrink-0 rounded-full border-2 border-bubblegum-pink px-3 py-1 text-center text-xs font-semibold text-deep-sapphire sm:text-lg"
    />
  </section>
);

interface CheckMarkCardProps {
  readonly frameColor?: string;
}

const CheckMarkCard: FC<CheckMarkCardProps> = ({ frameColor }) => (
  <section
    style={{ border: '4px solid' + frameColor || undefined }}
    className="flex w-full flex-col items-center rounded-xl border-4 border-bubblegum-pink bg-white p-4 text-center shadow-md"
  >
    <label
      htmlFor="icon"
      className="mb-2 text-xs font-bold text-deep-sapphire sm:text-sm"
    >
      Verified Account
    </label>
    <section id="icon" className="flex w-full justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 448 512">
        <path
          fill="#cc96f6"
          d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
        />
      </svg>
    </section>
  </section>
);

const CompanyCard: FC<VendorData> = ({
  country,
  city,
  joinedInDate,
  vendorName,
  frameColor,
}) => (
  <section
    style={{ border: '4px solid' + frameColor || undefined }}
    className="flex w-full max-w-7xl flex-row rounded-xl border-4 border-bubblegum-pink bg-white text-deep-sapphire shadow-md"
  >
    <section className="flex grow items-center p-4">
      <section className="flex grow flex-col">
        <section className="mb-4 flex items-center">
          <span
            style={{ border: '4px solid' + frameColor || undefined }}
            className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border-4 border-bubblegum-pink bg-white p-2 text-center text-xs font-bold sm:size-14 sm:text-lg md:size-20 md:text-xl lg:size-24 lg:text-2xl"
          >
            <svg viewBox="0 0 100 100" className="size-full">
              <rect width="100" height="100" fill="#cc96f6" />
              <text
                x="50"
                y="55"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
                fill="#ffffff"
              >
                LOGO
              </text>
            </svg>
          </span>
          <section className="ml-3 flex flex-col justify-center overflow-hidden text-left">
            <span className="truncate text-xs sm:text-sm md:text-base lg:text-lg">
              {country}
            </span>
            <span className="truncate text-xs sm:text-sm md:text-base lg:text-lg">
              {city}
            </span>
            <span className="truncate text-xs sm:text-sm md:text-base lg:text-lg">
              Joined {convertDateToString(new Date(joinedInDate))}
            </span>
          </section>
        </section>

        <span className="mt-2 truncate text-left text-lg font-bold md:text-2xl">
          {vendorName}
        </span>
      </section>
    </section>
    <section className="flex items-center justify-center p-4">
      <section
        style={{ border: '4px solid' + frameColor || undefined }}
        className="aspect-square size-24 overflow-hidden rounded-lg border-4 border-bubblegum-pink md:size-40 lg:size-48"
      >
        <section className="aspect-square bg-black">
          <video className="size-full object-cover" controls>
            <source src="null" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>
      </section>
    </section>
  </section>
);

interface LogoNameAdProps {
  vendorData: VendorData;
  readonly isSubscription: boolean;
  readonly secondTitle?: string;
}

const ResponsiveLayout: FC<LogoNameAdProps> = ({
  vendorData: { country, city, joinedInDate, vendorName, bgColor, frameColor },
  isSubscription,
}) => (
  <section className="mx-auto w-full max-w-7xl py-4 sm:p-6 md:px-20">
    <section className="mb-8 grid grid-cols-3 gap-4 lg:grid-cols-3 lg:gap-20">
      <StatsCard
        label={isSubscription ? 'Monthly plans sold' : 'Items Sold'}
        id="items-sold"
        frameColor={frameColor || undefined}
      />
      <StatsCard
        label={isSubscription ? '% Canceled' : '% Returns'}
        id="returns"
        frameColor={frameColor || undefined}
      />
      <CheckMarkCard frameColor={frameColor || undefined} />
    </section>

    <section className="flex flex-col items-stretch justify-center sm:flex-row">
      <CompanyCard
        country={country}
        city={city}
        joinedInDate={joinedInDate}
        vendorName={vendorName}
        bgColor={bgColor}
        frameColor={frameColor}
      />
    </section>
  </section>
);

const LogoNameAd: FC<LogoNameAdProps> = ({
  vendorData,
  isSubscription = false,
  secondTitle = '',
}) => (
  <section className="m-5 mx-auto w-full overflow-x-hidden">
    <ShowWindowTitle secondTitle={secondTitle} />

    <ResponsiveLayout vendorData={vendorData} isSubscription={isSubscription} />
  </section>
);

export default LogoNameAd;
