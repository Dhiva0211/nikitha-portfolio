import { FC, FormEvent, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { apiRoutes, routes } from '@/routes';
import { GetServerSideProps } from 'next';
import { getToken } from '@/helpers/validations';
import { redirectServerPageToLogin } from '@/helpers/api';
import { linksList } from '@/helpers/steps';
import { useRouter } from 'next/router';
import { BusinessInfo, PrismaClient } from '@prisma/client';
import { RenderIf } from '@/helpers/common/render-conditional';
import { ApiResponse } from '@/helpers/interfaces';

const Steps = dynamic(
  () =>
    import('@/components/common/steps').then(mod => ({
      default: mod.Steps,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const TermsAndConditionsAcceptance = dynamic(
  () =>
    import('@/components/vendor/terms-and-condition-acceptance').then(mod => ({
      default: mod.TermsAndConditionsAcceptance,
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

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);
  if (!token) return redirectServerPageToLogin();

  const prisma = new PrismaClient();
  const session = await prisma.session.findUnique({
    where: {
      sessionToken: JSON.stringify(token),
    },
  });

  const isExpired =
    !session || new Date(session.expires) < new Date() || !session?.valid;
  if (isExpired) {
    prisma.$disconnect();
    return redirectServerPageToLogin();
  }

  const user = await prisma.account.findUnique({
    where: {
      userId: session.accountId,
    },
    select: {
      BusinessInfo: true,
    },
  });
  prisma.$disconnect();

  if (!user?.BusinessInfo) {
    return {
      redirect: {
        destination: linksList[0],
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: {
        businessInfo: JSON.stringify(user.BusinessInfo),
      },
    },
  };
};

interface Step5Props {
  data: {
    readonly businessInfo: string;
  };
}

const formId = 'editor-proprieties_step_5';
const Step5: FC<Step5Props> = ({ data }) => {
  const router = useRouter();
  const { businessInfo } = data;
  const [step5FormData] = useState<BusinessInfo>(JSON.parse(businessInfo));
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [tCsAcc, setTCsAcc] = useState<boolean>(false);

  const handleTermsAndConditionsAcceptance = (tCsAccToUse: boolean) => {
    if (!tCsAccToUse) return;
    setTCsAcc(tCsAccToUse);
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToView = new FormData();
    Object.entries(step5FormData).forEach(([key, value]) => {
      if (key === 'id') return;
      if (value instanceof Date) {
        const dateToString = String(value);
        formDataToView.append(key, dateToString);
        return;
      }

      if (key === 'termsAndConditionFinishRegistration') {
        const dataToUse =
          step5FormData.termsAndConditionFinishRegistration && tCsAcc
            ? String(step5FormData.termsAndConditionFinishRegistration)
            : new Date().toISOString();

        formDataToView.append(key, dataToUse);
        return;
      }

      formDataToView.append(key, value ? value.toString() : '');
    });

    await fetch(apiRoutes.vendorWindow, {
      method: 'POST',
      body: formDataToView,
    })
      .then(resp => resp.json())
      .then(async (resp: ApiResponse) => {
        if (resp?.error) {
          alert(resp.error);
          return;
        }

        if (resp?.location) {
          const linkToGo = routes.vendor.setUpEditVendorWindow.step6;
          router.push(linkToGo);
        }
      })
      .finally(() => setIsFormSubmitting(false));
  };

  useEffect(() => {
    if (step5FormData.termsAndConditionFinishRegistration) setTCsAcc(true);
  }, [step5FormData]);

  return (
    <section className="mt-5">
      <h1 className="m-2 text-center text-3xl font-bold text-deep-sapphire">
        Almost Done
      </h1>

      <Steps activeStep={5} numberOfSteps={6} />

      <form id={formId} onSubmit={handleOnSubmit} method="POST">
        <TermsAndConditionsAcceptance
          formId={formId}
          tCsAcc={tCsAcc}
          onChange={handleTermsAndConditionsAcceptance}
        />

        <RenderIf
          condition={isFormSubmitting}
          then={
            <section className="mb-20">
              <DotsAnimation />
            </section>
          }
          otherwise={
            <section className="flex justify-center">
              <CommonButton type="submit" className="w-80">
                <span className="text-xl font-bold">Continue</span>
              </CommonButton>
            </section>
          }
        />
      </form>
    </section>
  );
};

export default Step5;
export { getServerSideProps };
