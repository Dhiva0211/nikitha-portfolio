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

const todayDate = new Date().toISOString().split('T')[0];
const SetUpArtworkLicenseDate: FC = () => (
  <section className="mt-4 w-full max-w-7xl px-4">
    <ShowWindowTitle smallTitle secondTitle="Set Up Artwork License Date" />

    <section className="mt-8 grid gap-8 md:grid-cols-2">
      {artworkList.map(artwork => (
        <section className="rounded-xl border-4 p-2 lg:p-4" key={artwork}>
          <section className="flex items-center justify-between">
            <section className="flex flex-col justify-between">
              <span className="ml-2 font-bold sm:text-lg md:text-xl lg:text-2xl">
                {artwork}
              </span>
              <section className="size-28 shrink-0 rounded-2xl border-4 sm:size-36 lg:size-48" />
            </section>

            <section className="flex flex-col gap-4">
              <label
                htmlFor={`start_date_${artwork}`}
                className="mt-2 flex flex-col items-center justify-between text-sm sm:text-base lg:text-lg xl:flex-row"
              >
                Start Date
                <input
                  type="date"
                  id={`start_date_${artwork}`}
                  defaultValue={todayDate}
                  className="ml-2 w-40 rounded-2xl border-4 p-2"
                />
              </label>
              <label
                htmlFor={`end_date_${artwork}`}
                className="flex flex-col items-center justify-between text-sm sm:text-base lg:text-lg xl:flex-row"
              >
                End Date
                <input
                  type="date"
                  id={`end_date_${artwork}`}
                  defaultValue={todayDate}
                  className="ml-2 w-40 rounded-2xl border-4 p-2"
                />
              </label>
            </section>
          </section>

          <section className="mt-4 flex w-full gap-6">
            <button className="flex grow items-center justify-around rounded-lg border-4 md:w-20 md:grow-0">
              Edit
            </button>
            <CommonButton
              type="button"
              className="!m-0 shrink grow md:w-40 md:grow-0"
            >
              Save
            </CommonButton>
          </section>
        </section>
      ))}
    </section>

    <CommonLink href={routes.vendor.inputOfferings.licenseNft.artwork.default}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default SetUpArtworkLicenseDate;
export { getServerSideProps };
