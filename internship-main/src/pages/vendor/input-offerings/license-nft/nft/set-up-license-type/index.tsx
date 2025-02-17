import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { RenderIf } from '@/helpers/common/render-conditional';
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
const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
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
const CommonButton = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonButton,
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

const nftList = [
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

const SetUpLicenseType: FC = () => {
  const [editingNFT, setEditingNFT] = useState<string | null>(null);

  const handleEditClick = (nft: string) => {
    setEditingNFT(nft);
  };

  const handleSaveClick = () => {
    setEditingNFT(null);
  };

  return (
    <section className="mt-4 sm:px-4 md:px-8 lg:px-12 xl:px-16">
      <ShowWindowTitle smallTitle secondTitle="NFT License Type" />

      <Description>
        You can choose 1 license type per NFT.
        <br />
        You should review the licenses to check the one that better fits your
        objectives.
        <br />
        To view the License agreements developed by a16z. Summary and full
        contract, click on the button below.
      </Description>

      <section className="flex justify-center">
        <section className="p-4">
          <CommonLink href={routes.underConstruction}>
            <button className="rounded-2xl bg-deep-sapphire px-6 py-3 text-lg font-semibold text-white">
              View
            </button>
          </CommonLink>
        </section>
      </section>

      {nftList.map(nft => (
        <section
          className="m-4 rounded-2xl border-4 p-4 sm:m-4 md:m-6 lg:m-8 xl:m-10"
          key={nft}
        >
          <h3 className="text-center text-lg font-bold sm:text-xl md:text-2xl">
            {nft}
          </h3>

          <RenderIf
            condition={editingNFT === nft}
            then={
              <Select
                labelToUse="Choose License Type"
                options={[
                  'License Type 1',
                  'License Type 2',
                  'License Type 3',
                  'License Type 4',
                  'License Type 5',
                  'License Type 6',
                ]}
              />
            }
            otherwise={
              <p className="m-2 rounded-2xl border-2 p-2 text-center">
                [{nft} Pre-Defined Name]
              </p>
            }
          />

          <section className="mt-4 inline-flex sm:mt-6 md:mt-8 lg:mt-10">
            {editingNFT === nft ? (
              <CommonButton
                type="button"
                onClick={handleSaveClick}
                className="m-4 w-40 rounded-2xl bg-deep-sapphire px-6 py-3 text-lg font-semibold text-white"
              >
                Save
              </CommonButton>
            ) : (
              <button
                onClick={() => handleEditClick(nft)}
                className="m-4 rounded-2xl bg-deep-sapphire px-6 py-3 text-lg font-semibold text-white"
              >
                Edit
              </button>
            )}
          </section>
        </section>
      ))}

      <section className="mt-6 text-center sm:mt-8 md:mt-10 lg:mt-12">
        <CommonLink href={routes.vendor.inputOfferings.licenseNft.nft.default}>
          <span className="text-2xl font-bold sm:text-3xl">Done</span>
        </CommonLink>
      </section>
    </section>
  );
};

export default SetUpLicenseType;
export { getServerSideProps };
