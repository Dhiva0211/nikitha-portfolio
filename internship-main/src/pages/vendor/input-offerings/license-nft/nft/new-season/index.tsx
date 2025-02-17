import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { categoryInputOfferings } from '@/helpers/initial-values';

const EditOfferingLicenseNFT = dynamic(
  () =>
    import(
      '@/components/vendor/input-offerings/new-season/edit-offering-license-nft'
    ).then(mod => ({
      default: mod.EditOfferingLicenseNFT,
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
    props: {
      frameColor: user?.BusinessInfo?.businessLayout?.frameColor as string,
      bgColor: user?.BusinessInfo?.businessLayout?.bgColor as string,
    },
  };
};

interface NewSeasonProps {
  readonly frameColor: string;
  readonly bgColor: string;
}

const NewSeason: FC<NewSeasonProps> = ({ bgColor, frameColor }) => {
  const router = useRouter();
  router.query.bgColor = bgColor;
  return (
    <EditOfferingLicenseNFT>
      <section
        style={{ backgroundColor: bgColor }}
        className="flex size-full flex-col items-center justify-center bg-pale-cyan px-2 py-6 sm:py-4 md:px-10 md:py-6 lg:py-8"
      >
        <ShowWindowTitle secondTitle="Add New Season Offering" />
        <Description>
          Click on one existing NFT licenses to reserve it to automatically
          switch to the new season NFT license in the pre-selected date after it
          has been pre-approved. All license agreements of the previous NFTs
          will still have to be completed.
        </Description>
        <GridOrList
          frameColor={frameColor}
          href={routes.vendor.inputOfferings.licenseNft.nft.newSeason.default}
        />
        <Description>
          You have to have previously connected your wallet that contains your
          NFTs through Shop Control Payment, or connect a new wallet in the next
          page.
        </Description>
        <CommonLink href={routes.vendor.inputOfferings.licenseNft.nft.default}>
          <section className="p-2">Done</section>
        </CommonLink>
      </section>
    </EditOfferingLicenseNFT>
  );
};

export default NewSeason;
export { getServerSideProps };
