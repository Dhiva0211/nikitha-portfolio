import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { apiRoutes, routes } from '@/routes';
import { ColorStyleNavigation, stylesNavigation } from '@/helpers';
import { RenderIf } from '@/helpers/common/render-conditional';

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
  const color = router.query.color as string;
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState('');

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  const colorToApply = (type: ColorStyleNavigation, defaultStyle?: string) => {
    if (color) return stylesNavigation[String(type)];

    return defaultStyle ? defaultStyle : '';
  };

  useEffect(() => {
    if (isLoading) return;
    setIsLoading(true);
    fetch(apiRoutes.isLoggedIn)
      .then(async response => response.json())
      .then(data => setIsLogin(data.isLogin))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  useEffect(() => {
    if (router.isReady) setBgColor(router.query.bgColor as string);
  }, [router.isReady, router.query.bgColor]);

  return (
    <nav
      style={{ backgroundColor: router.query.edit === '1' ? '' : bgColor }}
      className={`-mb-1 flex justify-around pb-4 pt-2 ${colorToApply(
        ColorStyleNavigation.bg,
      )} sm:justify-between sm:px-4 md:px-8 lg:px-12 xl:px-16`}
    >
      <Link
        href={routes.returnBack}
        onClick={goBack}
        className="flex items-center gap-2"
      >
        <Ellipse
          className="size-5"
          svgClassName={colorToApply(
            ColorStyleNavigation.icon,
            'fill-deep-sapphire stroke-deep-sapphire',
          )}
        />
        <span
          className={`text-sm font-bold md:text-lg lg:text-xl ${colorToApply(
            ColorStyleNavigation.text,
          )}`}
        >
          Back
        </span>
      </Link>

      <Link
        href={routes.underConstruction}
        className="flex items-center gap-2 font-bold"
      >
        <Ellipse
          className="size-5"
          svgClassName={colorToApply(
            ColorStyleNavigation.icon,
            'fill-deep-sapphire stroke-deep-sapphire',
          )}
        />
        <span
          className={`text-sm font-bold md:text-lg lg:text-xl ${colorToApply(
            ColorStyleNavigation.text,
          )}`}
        >
          Search
        </span>
      </Link>

      <RenderIf
        condition={isLoading}
        then={
          <section className="flex justify-center">
            <DotsAnimation />
          </section>
        }
        otherwise={
          <Link
            href={routes.login}
            className="flex items-center gap-2 font-bold"
          >
            <Ellipse
              className="size-5"
              svgClassName={colorToApply(
                ColorStyleNavigation.icon,
                'fill-deep-sapphire stroke-deep-sapphire',
              )}
            />
            <span
              className={`text-sm font-bold md:text-lg lg:text-xl ${colorToApply(
                ColorStyleNavigation.text,
              )}`}
            >
              <RenderIf
                condition={isLogin}
                then={<span>Log out</span>}
                otherwise={<span>Log in</span>}
              />
            </span>
          </Link>
        }
      />
    </nav>
  );
};

export default NavigationMenu;
