import { FC } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { ParsedUrlQueryInput } from 'querystring';

const Ellipse = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.Ellipse,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

interface FeaturesListProps {
  list: ReadonlyArray<{
    title: string | null;
    link: string | null;
    query: string | ParsedUrlQueryInput | null | undefined;
  }>;
}

const FeaturesList: FC<FeaturesListProps> = ({ list }) => (
  <section className="flex flex-col items-center">
    <h1 className="my-2 text-center text-4xl font-bold lg:text-5xl xl:mt-10 xl:text-6xl">
      Input Offering Features
    </h1>

    <ul className="relative m-6 mb-10 grid grid-cols-2 gap-4 sm:gap-6">
      {list?.map?.(option => (
        <li
          key={option.title}
          className="flex h-32 transform-gpu items-center justify-center rounded-lg border-2 transition duration-300 ease-in-out hover:z-10 hover:scale-105"
        >
          <Link
            href={{
              pathname: option.link,
              query: option.query,
            }}
            className="m-4 flex w-3/4 items-center hover:underline sm:m-5 sm:pl-2"
          >
            <div className="flex items-center gap-2 md:gap-4">
              <Ellipse
                className="size-8 shrink-0 sm:size-10 lg:size-20"
                svgClassName="fill-deep-sapphire stroke-deep-sapphire"
              />
              <span className="text-sm font-bold md:text-lg lg:text-2xl">
                {option.title}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default FeaturesList;
