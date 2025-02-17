import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryLogisticsAndApis } from '@/helpers/initial-values';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
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

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryLogisticsAndApis,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const Artwork: FC = () => (
  <section className="mt-4 max-w-7xl px-4">
    <ShowWindowTitle smallTitle secondTitle="Logistics" />

    <Description as="section">
      Although optional, usually it can be safer if you decide to mint all your
      artworks to be licensed through UpUnikSelf as an NFTs, as this may allow
      all license agreements signed through UpUnikSelf to be embedded with your
      artwork NFTs.
      <br />
      <p className="my-2 font-bold">You need to decide:</p>
      <section className="space-y-2 p-2 text-start">
        <p>
          <b>Step 1 - </b>
          To mint or not your artworks as an NFT. UpUnikSelf does not provide
          this service.
        </p>
        <p>
          <b>Step 2 - </b>
          To allow or not the license agreement to be embedded to your NFT. The
          Shoppitto will be informed of your decision before purchase. You will
          be liable to pay for the gas fees to make this smart contract, and
          should account for them in your license price to the Shoppitto.
        </p>
        <p>
          <b>Step 3 - </b>
          By choosing this option and minting all your artworks as NFTs, click
          on the button below to transform your Artwork License Account into an
          NFT License Account.
        </p>
      </section>
    </Description>

    <CommonLink href={routes.vendor.dashboard}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default Artwork;
export { getServerSideProps };
