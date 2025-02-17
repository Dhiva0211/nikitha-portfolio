import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryInputOfferings } from '@/helpers/initial-values';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const AddAnotherFaqWithTitle = dynamic(
  () =>
    import('@/components/common/faq').then(mod => ({
      default: mod.AddAnotherFaqWithTitle,
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

const nftArray = [
  'NFT 1 Name',
  'NFT 2 Name',
  'NFT 3 Name',
  'NFT 4 Name',
  'NFT 5 Name',
  'NFT 6 Name',
  'NFT 7 Name',
  'NFT 8 Name',
  'NFT 9 Name',
  'NFT 10 Name',
];

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryInputOfferings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const SetUpNFTDescription: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Set Up NFT Description" />

    {nftArray.map(nft => (
      <AddAnotherFaqWithTitle key={nft} name={nft} />
    ))}

    <CommonLink href={routes.vendor.inputOfferings.licenseNft.nft.default}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default SetUpNFTDescription;
export { getServerSideProps };
