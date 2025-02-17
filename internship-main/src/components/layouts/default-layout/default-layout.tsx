import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import dynamic from 'next/dynamic';
import { FC, ReactElement } from 'react';

const NavigationMenu = dynamic(
  () =>
    import('./navigation-menu').then(mod => ({
      default: mod.NavigationMenu,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Footer = dynamic(
  () =>
    import('./footer').then(mod => ({
      default: mod.Footer,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const FloatingMenu = dynamic(
  () =>
    import('./floating-menu').then(mod => ({
      default: mod.FloatingMenu,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

interface DefaultLayoutProps {
  children: ReactElement;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => (
  <div className="flex min-h-screen flex-col">
    <NavigationMenu />

    <main className="flex grow items-center justify-center">{children}</main>

    <FloatingMenu />

    <Footer />
  </div>
);

export default DefaultLayout;
