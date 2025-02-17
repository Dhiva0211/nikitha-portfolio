/* eslint-disable tailwindcss/no-custom-classname */
'use client';
import { RenderIf } from '@/helpers/common/render-conditional';
import { routes } from '@/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const handleRoute = (route: string): boolean => {
  if (route === routes.login) return false;
  if (route === routes.vendor.login) return false;
  if (route === routes.vendor.support) return false;
  if (route === routes.vendor.newRegister.default) return false;
  if (route === routes.vendor.newRegister.welcome) return false;
  if (route === routes.vendor.dashboard) return false;

  return true;
};

const FloatingMenu: FC = () => {
  const router = useRouter();

  return (
    <RenderIf
      condition={handleRoute(router.pathname)}
      then={
        <section className="fixed bottom-4 right-4">
          <section className="flex flex-col items-center">
            <Link
              href={routes.vendor.dashboard}
              className="m-5 animate-spin-slow rounded-2xl border-4 border-deep-sapphire bg-bubblegum-pink p-2 ease-linear hover:animate-spin-slow-reverse-2s"
            >
              <section className="flex items-center justify-center">
                <section className="relative size-5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <section
                      key={i}
                      className={`absolute size-2 rounded-full bg-deep-sapphire ${
                        i === 0
                          ? 'right-0 top-0'
                          : i === 1
                            ? 'left-0 top-0'
                            : i === 2
                              ? 'bottom-0 left-0'
                              : 'bottom-0 right-0'
                      }`}
                    />
                  ))}
                </section>
              </section>
            </Link>
          </section>
        </section>
      }
      otherwise={null}
    />
  );
};

export default FloatingMenu;
