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

const Nft: FC = () => (
  <section className="mt-4 max-w-7xl px-4">
    <ShowWindowTitle smallTitle secondTitle="Logistics" />

    <Description>
      <b>
        You need to decide to allow or not the license agreement to be embedded
        to your NFT.
      </b>
      <br />
      The Shoppitto will be informed of your decision before purchase.
      <br />
      You will be liable to pay for the gas fees to make this smart contract,
      and should account for them in your license price to the Shoppitto.
    </Description>

    <CommonLink href={routes.vendor.dashboard}>
      <section className="m-2 p-2">Continue</section>
    </CommonLink>
  </section>
);

export default Nft;
export { getServerSideProps };
