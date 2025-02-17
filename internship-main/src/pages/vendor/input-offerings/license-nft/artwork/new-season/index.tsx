import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryInputOfferings } from '@/helpers/initial-values';

const EditOfferingLicenseArtwork = dynamic(
  () =>
    import(
      '@/components/vendor/input-offerings/new-season/edit-offering-license-artwork'
    ).then(mod => ({
      default: mod.EditOfferingLicenseArtwork,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
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
const GridOrList = dynamic(
  () =>
    import('@/components/vendor/grid-or-list').then(mod => ({
      default: mod.GridOrList,
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
    categoryInputOfferings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const NewSeason: FC = () => (
  <EditOfferingLicenseArtwork>
    <section className="h-full bg-pale-cyan py-6 md:px-10">
      <ShowWindowTitle secondTitle="Add New Season Offering" />
      <Description>
        Click on one existing Artwork licenses to reserve it to automatically
        switch to the new season Artwork license in the pre-selected date after
        it has been pre-approved. All license agreements of the previous Artwork
        will still have to be completed.
      </Description>
      <GridOrList
        href={routes.vendor.inputOfferings.licenseNft.artwork.newSeason.default}
      />
      <CommonLink
        href={routes.vendor.inputOfferings.licenseNft.artwork.default}
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  </EditOfferingLicenseArtwork>
);

export default NewSeason;
export { getServerSideProps };
