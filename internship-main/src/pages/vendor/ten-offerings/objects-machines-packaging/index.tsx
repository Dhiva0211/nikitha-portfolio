import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import { getToken, validSessionToken } from '@/helpers/validations';
import { VendorData } from '@/helpers/interfaces';
import { useRouter } from 'next/router';
import { category10Offerings } from '@/helpers/initial-values';

const LogoNameAd = dynamic(
  () =>
    import('@/components/vendor/logo-name-ad').then(mod => ({
      default: mod.LogoNameAd,
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
const EditOfferingObjMachPack = dynamic(
  () =>
    import(
      '@/components/vendor/ten-offerings/edit-offering-obj-mach-pack'
    ).then(mod => ({
      default: mod.EditOfferingObjMachPack,
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
    category10Offerings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {
      businessInfo: {
        country: user?.BusinessInfo?.countryInfo.name,
        city: user?.BusinessInfo?.city,
        joinedInDate: user?.BusinessInfo?.joinInDate?.toString(),
        vendorName: user?.BusinessInfo?.busLegalName,
        bgColor: user?.BusinessInfo?.businessLayout?.bgColor,
        frameColor: user?.BusinessInfo?.businessLayout?.frameColor,
      },
    },
  };
};

interface ObjMachPackProps {
  readonly businessInfo: VendorData;
}

const ObjMachPack: FC<ObjMachPackProps> = ({ businessInfo }) => {
  const router = useRouter();
  router.query.bgColor = businessInfo.bgColor as string;

  return (
    <EditOfferingObjMachPack>
      <section
        style={{ backgroundColor: businessInfo.bgColor as string }}
        className="size-full bg-pale-cyan px-1 py-6 md:px-10"
      >
        <section className="mx-auto max-w-7xl px-4">
          <LogoNameAd vendorData={businessInfo} isSubscription={false} />
          <GridOrList
            frameColor={businessInfo.frameColor as string}
            href={routes.vendor.tenOfferings.objMachPack.default}
          />
        </section>
      </section>
    </EditOfferingObjMachPack>
  );
};

export default ObjMachPack;
export { getServerSideProps };
