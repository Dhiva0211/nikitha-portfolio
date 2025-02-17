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

const NonMintedNftContinue: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Logistics" />

    <Description>
      Although optional, usually it can be safer if you decide to mint all your
      Non-Minted offered to be licensed through UpUnikSelf as NFTs, as this may
      allow all license agreements signed through UpUnikSelf to be embedded with
      your artwork NFTs. You need to decide
      <br />
      Step 1 - To mint or not your artworks as an NFT. UpUnikSelf does not
      provide this service.
      <br />
      Step 2 - To allow or not the license agreement to be embedded to your NFT.
      The Shoppitto will be informed of your decision before purchase. You will
      be liable to pay for the gas fees to make this smart contract, and should
      account for them in your license price to the Shoppitto.
      <br />
      Step 3 - By choosing this option and minting all your Non-Minted NTFs as
      Minted NFTs, click on the button below to transform your Non-Minted NFT
      License Account into an NFT License Account.
    </Description>

    <CommonLink href={routes.vendor.dashboard}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default NonMintedNftContinue;
export { getServerSideProps };
