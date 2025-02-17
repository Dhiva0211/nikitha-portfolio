import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { categoryInputOfferings } from '@/helpers/initial-values';
import { VendorData } from '@/helpers/interfaces';

const EditOfferingIndividualServices = dynamic(
  () =>
    import(
      '@/components/vendor/input-offerings/new-season/edit-offering-individual-services'
    ).then(mod => ({
      default: mod.EditOfferingIndividualServices,
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
const LogoNameAd = dynamic(
  () =>
    import('@/components/vendor/logo-name-ad').then(mod => ({
      default: mod.LogoNameAd,
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

interface NewSeasonProps {
  readonly businessInfo: VendorData;
}

const NewSeason: FC<NewSeasonProps> = ({ businessInfo }) => {
  const router = useRouter();
  router.query.bgColor = String(businessInfo.bgColor);
  const [selectedValues, setSelectedValues] = useState({});

  const handleChange = (offering: string, value: string) => {
    setSelectedValues(prev => ({
      ...prev,
      [offering]: prev[`${offering}`] === value ? null : value,
    }));
  };

  return (
    <EditOfferingIndividualServices>
      <section
        style={{ backgroundColor: String(businessInfo.bgColor) }}
        className="flex size-full flex-col items-center justify-center bg-pale-cyan px-2 py-6 md:px-10"
      >
        <LogoNameAd
          vendorData={businessInfo}
          isSubscription={false}
          secondTitle="Add new season offering"
        />
        
        <GridOrList
          frameColor={String(businessInfo.frameColor)}
          href={
            routes.vendor.inputOfferings.generalSolutions.individualServices
              .newSeason.default
          }
        />
        <br />
        <h3 className="m-2 px-5 text-center text-xl font-bold">
          To delete the preapprove new season for any solution, check it on the
          table below
        </h3>
        <section className="m-2 mx-auto flex max-w-fit items-center justify-center rounded-2xl border-4 bg-white px-10 py-4">
          <div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <span />
              <div className="grid grid-cols-2 gap-2">
                <span className="text-center text-lg font-bold">Yes</span>
                <span className="text-center text-lg font-bold">No</span>
              </div>
            </div>

            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="mb-2 grid grid-cols-2 items-center gap-4"
              >
                <span className="mx-4 font-bold">Plan {index + 1}</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      name="yes-no"
                      checked={selectedValues[`offering${index}`] === 'yes'}
                      onChange={() => handleChange(`offering${index}`, 'yes')}
                      className="size-5"
                    />
                  </div>
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      name="yes-no"
                      checked={selectedValues[`offering${index}`] === 'no'}
                      onChange={() => handleChange(`offering${index}`, 'no')}
                      className="size-5"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CommonLink
          href={
            routes.vendor.inputOfferings.generalSolutions.individualServices
              .default
          }
        >
          <section className="px-4 py-2">Done</section>
        </CommonLink>
      </section>
    </EditOfferingIndividualServices>
  );
};

export default NewSeason;
export { getServerSideProps };
