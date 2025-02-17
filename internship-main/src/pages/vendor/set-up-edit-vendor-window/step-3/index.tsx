import { FC, FormEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { apiRoutes, routes } from '@/routes';
import { linksList } from '@/helpers/steps';
import { redirectServerPageToLogin } from '@/helpers/api';
import { getToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { BusinessInfo, PrismaClient } from '@prisma/client';
import { ApiResponse } from '@/helpers/interfaces';
import { useRouter } from 'next/router';
import { RenderIf } from '@/helpers/common/render-conditional';

import Image from 'next/image';

const Steps = dynamic(
  () =>
    import('@/components/common/steps').then(mod => ({
      default: mod.Steps,
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
const InputLabelLeft = dynamic(
  () =>
    import('@/components/common/input').then(mod => ({
      default: mod.InputLabelLeft,
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
const UploadIcon = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.UploadIcon,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const ElectronicSignature = dynamic(
  () =>
    import('@/components/common/electronic-signature').then(mod => ({
      default: mod.ElectronicSignature,
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

interface Step3Props {
  data: {
    readonly businessInfo: string;
  };
}

const formId = 'editor-proprieties-step3';
const Step3: FC<Step3Props> = ({ data }) => {
  const router = useRouter();
  const { businessInfo } = data;
  const [step3FormData, setStep3FormData] = useState<BusinessInfo>(
    JSON.parse(businessInfo),
  );

  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [isSaveAndExit, setIsSaveAndExit] = useState<boolean>(false);

  const handleFormData = (key: string, value: string | number | Date) => {
    setStep3FormData(values => ({ ...values, [key]: value }));
  };

  const handleSaveAndExit = () => setIsSaveAndExit(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        handleFormData('idPhotoUrl', reader.result as string);
      };
    }
  };

  const handleElectronicSignature: (signature: string) => void = (
    signature: string,
  ) => handleFormData('electronicSignatureUrl', signature);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    const formDataToView = new FormData();

    Object.entries(step3FormData).forEach(([key, value]) => {
      if (key === 'id') return;
      if (value instanceof Date) {
        const dateToString = String(value);
        formDataToView.append(key, dateToString);
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
          const linkToGo = isSaveAndExit
            ? routes.vendor.dashboard
            : linksList[3];
          router.push(linkToGo);
        }
      })
      .finally(() => setIsFormSubmitting(false));
  };

  return (
    <section className="mt-4 w-screen max-w-5xl">
      <h1 className="m-2 text-center text-3xl font-bold text-deep-sapphire">
        Financial data
      </h1>

      <Steps activeStep={3} numberOfSteps={6} />

      <form id={formId} onSubmit={handleOnSubmit} method="POST">
        <InputLabelLeft
          labelToUse="Tutor number"
          value={step3FormData.tutorNumber ?? ''}
          onChange={e => handleFormData('tutorNumber', e.target.value)}
        />
        <Description>
          If a freelance pre-approved tutor has helped you through the
          application form, then insert the tutor’s number. The tutor will be
          rewarded according to existing Terms and Conditions.
        </Description>

        <InputLabelLeft
          labelToUse="Tax ID Number"
          value={step3FormData.taxIdNumber}
          onChange={e => handleFormData('taxIdNumber', e.target.value)}
          required
        />
        <Description>
          As a Sole Proprietor, you should provide your Tax ID number.
          <br />
          As a Registered Company, you should provide your company’s Tax ID
          number. You have the option to provide your Tax ID number now OR YOU
          HAVE THE OPTION TO PROVIDE IT ONCE YOUR REACH $600 IN YEARLY SALES AND
          200 TRANSACTIONS. Once the threshold is reached, you will have to
          provide the Tax ID number, otherwise any payments to you will be
          withheld until you provide it.
        </Description>

        <div className="m-4">
          <h3 className="text-2xl font-extrabold">Upload Photo ID</h3>
        </div>
        <div className="m-2 flex items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-4 hover:bg-gray-200"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <UploadIcon />
              <p className="mb-2 text-sm font-semibold">
                Click to upload or drag and drop
              </p>
            </div>
            <input
              onChange={handleFileChange}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
        </div>

        <RenderIf
          condition={
            step3FormData.idPhotoUrl !== '' && step3FormData.idPhotoUrl !== null
          }
          then={
            <div className="mt-4 flex flex-col items-center justify-evenly sm:flex-row">
              <Image
                width={0}
                height={0}
                // @ts-expect-error - idPhotoUrl is not null
                src={step3FormData.idPhotoUrl || null}
                alt="Uploaded Image Preview"
                className="mt-2 w-32 rounded-lg"
              />
            </div>
          }
          otherwise={null}
        />

        <Description>
          Choose from Passport, Driver’s License or Citizen Card. We will only
          use this to verify your identity, according to our Privacy Policy.
        </Description>

        <div className="m-4">
          <h3 className="text-2xl font-extrabold">Electronic Signature</h3>
        </div>
        <section className="m-2 max-w-5xl">
          <ElectronicSignature onSignatureChange={handleElectronicSignature} />

          <RenderIf
            condition={
              step3FormData.electronicSignatureUrl !== '' &&
              step3FormData.electronicSignatureUrl !== null
            }
            then={
              <div className="mt-4 flex flex-col items-center justify-evenly sm:flex-row">
                <p className="font-semibold">Signature saved successfully!</p>
                <Image
                  width={0}
                  height={0}
                  // @ts-expect-error - electronicSignatureUrl is not null
                  src={step3FormData.electronicSignatureUrl || null}
                  alt="Saved Signature Preview"
                  className="mt-2 size-32 rounded-lg"
                />
              </div>
            }
            otherwise={null}
          />
        </section>

        <Description>
          By adding your first and last legal name, you acknowledge, accept and
          agree to the terms and conditions
        </Description>

        <RenderIf
          condition={isFormSubmitting}
          then={
            <section className="mb-20">
              <DotsAnimation />
            </section>
          }
          otherwise={
            <section className="flex flex-col items-center">
              <CommonButton
                type="submit"
                className="w-80"
                onClick={handleSaveAndExit}
              >
                <span className="text-xl font-bold">Save so far and Exit</span>
              </CommonButton>

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

export default Step3;
export { getServerSideProps };
