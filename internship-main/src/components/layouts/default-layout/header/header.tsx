import logoFullWord from '@//public/images/logo-full-word.png';
import logo from '@//public/images/logo.png';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, FC, SetStateAction } from 'react';

const MagnifyingGlass = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.MagnifyingGlass,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Hamburger = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.Hamburger,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

interface HeaderProps {
  setOpenRightSideBar: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ setOpenRightSideBar }) => (
  <header className="bg-deep-sapphire text-white">
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="flex items-center justify-between py-6">
        <Link href={routes.home}>
          <section className="shrink-0">
            <Image
              src={logo}
              alt="Application Logo"
              width={90}
              height={80}
              className="size-16 object-contain sm:size-20"
            />
          </section>
        </Link>
        <section className="flex grow items-center justify-between">
          <section className="md:mr-8">
            <Image
              src={logoFullWord}
              alt="Application Name"
              width={217}
              height={60}
              className="h-10 w-auto object-contain sm:h-12 md:h-14 lg:h-16"
              priority
            />
          </section>

          <section className="hidden items-center md:flex">
            <input
              type="text"
              placeholder="Shop Search"
              className="rounded-full py-2 pl-4 pr-10 text-black focus:outline-none"
            />
            <MagnifyingGlass
              className="pointer-events-none -ml-10"
              svgClassName="h-6 w-6 text-deep-sapphire"
            />
          </section>
          <section className="pt-2">
            <button
              type="button"
              onClick={() => setOpenRightSideBar(value => !value)}
              className="text-white focus:outline-none"
            >
              <Hamburger
                className="size-10 md:size-12"
                svgClassName="size-10 md:size-12 stroke-bubblegum-pink"
              />
              <span className="sr-only">Menu</span>
            </button>
          </section>
        </section>
      </section>
    </section>
  </header>
);

export default Header;
