'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';

const Ellipse = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.Ellipse,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const NavigationMenu: FC = () => {
  const router = useRouter();

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <nav className="mt-2 flex w-full flex-wrap justify-around sm:justify-between">
      <Link
        href={routes.returnBack}
        onClick={goBack}
        className="flex items-center"
      >
        <Ellipse
          className="size-5"
          svgClassName="fill-deep-sapphire stroke-deep-sapphire"
        />
        <span className="ml-2 break-words text-sm font-bold">Back</span>
      </Link>

      <Link
        href={routes.underConstruction}
        className="flex items-center font-bold"
      >
        <Ellipse
          className="size-5"
          svgClassName="fill-deep-sapphire stroke-deep-sapphire"
        />
        <span className="ml-2 break-words text-sm font-bold">Search</span>
      </Link>

      <Link href={routes.login} className="flex items-center font-bold">
        <Ellipse
          className="size-5"
          svgClassName="fill-deep-sapphire stroke-deep-sapphire"
        />
        <span className="ml-2 break-words text-sm font-bold">Log out</span>
      </Link>
    </nav>
  );
};

export default NavigationMenu;
