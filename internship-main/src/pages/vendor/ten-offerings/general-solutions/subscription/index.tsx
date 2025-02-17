import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { VendorData } from '@/helpers/interfaces';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
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
const EditOfferingSubscription = dynamic(
  () =>
    import('@/components/vendor/ten-offerings/edit-offering-subscription').then(
      mod => ({
        default: mod.EditOfferingSubscription,
      }),
    ),
  {
    loading: () => <DotsAnimation />,
  },
);
const TabStructure = dynamic(
  () =>
    import('@/components/vendor/tab-structure').then(mod => ({
      default: mod.TabStructure,
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

interface SubscriptionProps {
  readonly businessInfo: VendorData;
}

const Subscription: FC<SubscriptionProps> = ({ businessInfo }) => {
  const router = useRouter();
  router.query.bgColor = businessInfo.bgColor || undefined;

  return (
    <EditOfferingSubscription>
      <section
        style={{ backgroundColor: businessInfo.bgColor || undefined }}
        className="size-full bg-pale-cyan"
      >
        <section className="mx-2">
          <LogoNameAd vendorData={businessInfo} isSubscription />
          <TabStructure
            frameColor={businessInfo.frameColor || undefined}
            href={
              routes.vendor.tenOfferings.generalSolutions.subscription.default
            }
          />
        </section>
      </section>
    </EditOfferingSubscription>
  );
};

export default Subscription;
export { getServerSideProps };
