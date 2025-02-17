import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { RenderSwitch } from '@/helpers/common/render-conditional';
import { GetServerSideProps } from 'next';
import { getToken, validSessionToken } from '@/helpers/validations';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Page1 = dynamic(
  () =>
    import('@/components/vendor/buy-ad-attacks/page-1').then(mod => ({
      default: mod.Page1,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Page2 = dynamic(
  () =>
    import('@/components/vendor/buy-ad-attacks/page-2').then(mod => ({
      default: mod.Page2,
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

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  return validSessionToken(
    token,
    context.resolvedUrl,
    true,
    false,
    false,
  ) as never;

  return {
    props: {},
  };
};

const BuyAdAttacks: FC = () => {
  const [pageToView, setPageToView] = useState<1 | 2>(1);

  const handleActiveState = (active: boolean) =>
    `m-2 border-2 rounded-xl p-2 size-12 text-xl ${active ? 'bg-deep-sapphire text-white' : ''} hover:bg-bubblegum-pink hover:text-white hover:text-2xl`;

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Ad Attacks" />

      <section className="m-2 flex justify-center">
        <button
          type="button"
          onClick={() => setPageToView(1)}
          className={handleActiveState(pageToView === 1)}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => setPageToView(2)}
          className={handleActiveState(pageToView === 2)}
        >
          2
        </button>
      </section>

      <RenderSwitch
        value={pageToView as 1 | 2}
        cases={{
          1: <Page1 />,
          2: <Page2 />,
        }}
        defaultCase={<Page1 />}
      />

      <CommonLink href={routes.vendor.dashboard}>
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default BuyAdAttacks;
export { getServerSideProps };
