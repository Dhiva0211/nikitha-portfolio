import { ReactElement, ReactNode, useEffect, useState } from 'react';
import type { Metadata, NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { Montserrat } from 'next/font/google';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { DefaultLayout } from '@/components/layouts/default-layout';
import { RenderIf } from '@/helpers/common/render-conditional';
import disableBodyScrollBar from '@/components/common/dialog/no-scroll-bar';
import 'normalize.css/normalize.css';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UpUnikSelf',
  description:
    'A shopping plaza where businesses can supercharge their growth with AI services, general services and packaging, and individuals can make their life unique with customized objects, tech and services.',
};

const Header = dynamic(
  () =>
    import('@/components/layouts/default-layout/header').then(mod => ({
      default: mod.Header,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const RoutingAnimation = dynamic(
  () =>
    import('@/components/loading-animations/routing-animation').then(mod => ({
      default: mod.RoutingAnimation,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const SideBarCategories = dynamic(
  () =>
    import('@/components/layouts/default-layout/side-bar-categories').then(
      mod => ({
        default: mod.SideBarCategories,
      }),
    ),
  {
    loading: () => <DotsAnimation />,
  },
);

type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyAppLayout = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component?.getLayout;
  const [loadingRoutingTransition, setLoadingRoutingTransition] =
    useState<boolean>(false);
  const [openRightSideBar, setOpenRightSideBar] = useState<boolean>(false);

  useEffect(() => {
    const start = () => setLoadingRoutingTransition(true);
    const end = () => setLoadingRoutingTransition(false);

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  useEffect(() => {
    disableBodyScrollBar(openRightSideBar);
  }, [openRightSideBar]);

  return (
    <>
      <style>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>

      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link
          rel="android-chrome"
          sizes="192x192"
          href="/favicon/android-chrome-192x192.png"
          type="image/<generated>"
        />
        <link
          rel="android-chrome"
          sizes="512x512"
          href="/favicon/android-chrome-512x512.png"
          type="image/<generated>"
        />
        <meta name="theme-color" content="#f5f5f5" />
      </Head>

      <Header setOpenRightSideBar={setOpenRightSideBar} />

      <SideBarCategories
        openRightSideBar={openRightSideBar}
        setOpenRightSideBar={setOpenRightSideBar}
      />

      <RenderIf
        condition={getLayout !== undefined}
        then={getLayout?.(<Component {...pageProps} />)}
        otherwise={
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        }
      />

      <RenderIf
        condition={loadingRoutingTransition}
        then={<RoutingAnimation />}
        otherwise={null}
      />
    </>
  );
};

export default MyAppLayout;
export type { NextPageWithLayout };
