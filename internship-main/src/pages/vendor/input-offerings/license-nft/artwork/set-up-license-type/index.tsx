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

const artworkList = [
  'Artwork 1',
  'Artwork 2',
  'Artwork 3',
  'Artwork 4',
  'Artwork 5',
  'Artwork 6',
  'Artwork 7',
  'Artwork 8',
  'Artwork 9',
  'Artwork 10',
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

const SetUpLicenseType: FC = () => (
  <section className="mt-4 p-2">
    <ShowWindowTitle smallTitle secondTitle="Artwork License Type" />

    <Description>
      You can choose 1 license type per Artwork.
      <br />
      You should review the licenses to check the one that better fits your
      objectives.
      <br />
      To view the License agreements developed by a16z. Summary and full
      contract, click on the button below
    </Description>

    <section className="flex justify-center">
      <section className="size-20">
        <CommonLink href={routes.underConstruction}>
          <span className="mx-2 my-1">View</span>
        </CommonLink>
      </section>
    </section>
    <section className="flex w-full flex-col items-center justify-center">
      {artworkList.map(artwork => (
        <section
          className="m-2 my-6 w-full max-w-2xl rounded-2xl border-4 p-4"
          key={artwork}
        >
          <h3 className="text-center text-xl font-bold">{artwork}</h3>
          <p className="m-2 rounded-2xl border-2 p-2 text-center">
            [{artwork} Predefined Name]
          </p>
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
          <section className="-mt-5 flex">
            <button className="m-5 flex w-32 items-center justify-around rounded-2xl border-4 p-2 sm:w-40">
              Edit
            </button>
            <CommonButton type="button" className="w-32 rounded-2xl sm:w-40">
              Save
            </CommonButton>
          </section>
        </section>
      ))}
    </section>
    <CommonLink href={routes.vendor.inputOfferings.licenseNft.artwork.default}>
      <span className="py-4 text-xl font-bold">Done</span>
    </CommonLink>
  </section>
);

export default SetUpLicenseType;
export { getServerSideProps };
