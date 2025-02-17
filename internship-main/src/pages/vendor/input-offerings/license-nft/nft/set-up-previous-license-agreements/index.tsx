import { FC } from 'react';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
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
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const artworks = [
  'NFT 1',
  'NFT 2',
  'NFT 3',
  'NFT 4',
  'NFT 5',
  'NFT 6',
  'NFT 7',
  'NFT 8',
  'NFT 9',
  'NFT 10',
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

const SetUpPreviousLicenseAgreements: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle
      smallTitle
      secondTitle="Set up previous license agreements"
    />

    <section className="m-2 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {artworks.map(artwork => (
        <section key={artwork}>
          <h3 className="m-2 rounded-lg border-2 text-center text-lg font-bold sm:rounded-xl sm:border-4 sm:text-xl md:text-2xl lg:rounded-2xl">
            [{artwork}]
          </h3>

          <section className="m-2 rounded-lg border-2 p-2 sm:rounded-xl sm:border-4 lg:rounded-2xl">
            <input
              className="w-full border-none text-sm font-bold sm:text-lg"
              defaultValue="Description of License"
            />
            <br />
            <input
              className="w-full border-none text-sm font-bold sm:text-lg"
              defaultValue="License Type"
            />
            <br />
            <input
              className="w-full border-none text-sm font-bold sm:text-lg"
              defaultValue="Beginning Date"
            />
            <input
              className="w-full border-none text-sm font-bold sm:text-lg"
              defaultValue="Ending Date"
            />
          </section>

          <button className="m-5 flex items-center justify-center rounded-lg border-2 p-2 sm:justify-around sm:rounded-xl sm:border-4 lg:rounded-2xl">
            Add new existing license
          </button>
        </section>
      ))}
    </section>

    <CommonLink href={routes.vendor.inputOfferings.licenseNft.nft.default}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default SetUpPreviousLicenseAgreements;
export { getServerSideProps };
