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

const artworkArray = [
  'Artwork 1 Name',
  'Artwork 2 Name',
  'Artwork 3 Name',
  'Artwork 4 Name',
  'Artwork 5 Name',
  'Artwork 6 Name',
  'Artwork 7 Name',
  'Artwork 8 Name',
  'Artwork 9 Name',
  'Artwork 10 Name',
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

const SetUpArtworkDescription: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Set Up NFT Description" />

    {artworkArray.map(artwork => (
      <AddAnotherFaqWithTitle key={artwork} name={artwork} />
    ))}

    <CommonLink href={routes.vendor.inputOfferings.licenseNft.artwork.default}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default SetUpArtworkDescription;
export { getServerSideProps };
