import { FC, FormEvent, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { RenderIf } from '@/helpers/common/render-conditional';
import { BusinessInfo, BusinessLayout, PrismaClient } from '@prisma/client';
import { linksList } from '@/helpers/steps';
import { getToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { redirectServerPageToLogin } from '@/helpers/api';
import { apiRoutes, routes } from '@/routes';
import { ApiResponse } from '@/helpers/interfaces';
import { useRouter } from 'next/router';
import config from '@//tailwind.config';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
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
const AddLogoName = dynamic(
  () =>
    import('@/components/common/add-logo-name').then(mod => ({
      default: mod.AddLogoName,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const DialogHandler = dynamic(
  () =>
    import('@/components/common/dialog').then(mod => ({
      default: mod.DialogHandler,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const ColorDialog = dynamic(
  () =>
    import('@/components/common/dialog').then(mod => ({
      default: mod.ColorDialog,
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
      BusinessInfo: {
        select: {
          city: true,
          country: true,
          joinInDate: true,
          busLegalName: true,
          layoutId: true,
          countryInfo: {
            select: {
              name: true,
            },
          },
          businessLayout: {
            select: {
              layoutId: true,
              bgColor: true,
              frameColor: true,
            },
          },
        },
      },
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

  if (
    !user.BusinessInfo.city ||
    !user.BusinessInfo.country ||
    !user.BusinessInfo.joinInDate ||
    !user.BusinessInfo.busLegalName
  ) {
    return {
      redirect: {
        destination: linksList[1],
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: {
        businessInfo: JSON.stringify(user.BusinessInfo),
        countryName: user.BusinessInfo.countryInfo.name,
        businessLayout: user.BusinessInfo.businessLayout,
      },
    },
  };
};

interface Step4Props {
  data: {
    readonly businessInfo: string;
    readonly countryName: string;
    readonly businessLayout: BusinessLayout;
  };
}

const formId = 'editor-proprieties-step4';
const Step4: FC<Step4Props> = ({ data }) => {
  const router = useRouter();
  const { businessInfo, countryName, businessLayout } = data;
  const [step4FormData] = useState<BusinessInfo>(JSON.parse(businessInfo));
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [isSaveAndExit, setIsSaveAndExit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<{
    open: boolean;
    color: string;
    key: string;
  }>({ open: false, color: '', key: '' });
  const [colors, setColors] = useState<{ bgColor: string; frameColor: string }>(
    {
      bgColor: config.theme?.extend?.colors?.['pale-cyan'],
      frameColor: config.theme?.extend?.colors?.['deep-sapphire'],
    },
  );

  const handleSaveAndExit = () => setIsSaveAndExit(true);

  const handleChange = (key: string, value: string) =>
    setColors({ ...colors, [key]: value });

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    const formDataToView = new FormData();
    formDataToView.append('layoutId', step4FormData.layoutId ?? '');
    formDataToView.append('logoUrl', '');
    formDataToView.append('addUrl', '');
    formDataToView.append('bgColor', colors.bgColor);
    formDataToView.append('frameColor', colors.frameColor);

    await fetch(apiRoutes.businessLayout, {
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
            : linksList[4];
          router.push(linkToGo);
        }
      })
      .finally(() => setIsFormSubmitting(false));
  };

  const handleOpenModal = (color: string, key: string) => {
    if (showDialog.open) return;
    setShowDialog({ open: true, color: color, key: key });
  };

  const handleCloseModal = () =>
    setShowDialog({ open: false, color: '', key: '' });

  const handleChangeColor = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const color = formData.get('colorSelect')?.toString() ?? '';

    handleChange(showDialog.key, color);
    handleCloseModal();
  };

  useEffect(() => {
    if (businessLayout) {
      const layout = businessLayout;
      setColors({
        bgColor: layout.bgColor,
        frameColor: layout.frameColor,
      });
    }
  }, [businessLayout]);

  return (
    <section className="mt-4 p-2">
      <ShowWindowTitle smallTitle />

      <Steps activeStep={4} numberOfSteps={6} />

      <DialogHandler isOpen={showDialog.open}>
        <ColorDialog
          value={showDialog.color}
          saveInformation={handleChangeColor}
        />
      </DialogHandler>

      <form
        id={formId}
        onSubmit={handleOnSubmit}
        method="POST"
        className="mt-8"
      >
        <AddLogoName
          country={countryName}
          city={step4FormData.city}
          joinedInDate={step4FormData.joinInDate ?? ''}
          vendorName={step4FormData.busLegalName}
        />
        <Description>click to upload logo and video</Description>

        <section className="m-2 mt-4 flex items-center justify-between overflow-hidden rounded-xl border-4">
          <label
            htmlFor="back-color"
            className="w-44 rounded-xl border-r-4 p-2 text-center text-sm font-bold sm:w-64 sm:p-5 sm:text-xl md:text-2xl"
          >
            Choose background color
          </label>

          <section className="m-4 w-full">
            <RenderIf
              condition={colors.bgColor !== ''}
              then={
                <input
                  id="back-color"
                  type="color"
                  value={colors.bgColor}
                  disabled
                  readOnly
                  className="w-full"
                />
              }
              otherwise={null}
            />
          </section>
        </section>
        <Description>
          <button
            type="button"
            onClick={() => handleOpenModal(colors.bgColor, 'bgColor')}
            className="w-full"
          >
            Click to show colors
          </button>
        </Description>

        <section className="m-2 mt-4 flex items-center justify-between overflow-hidden rounded-xl border-4">
          <label
            htmlFor="frame-color"
            className="w-44 rounded-xl border-r-4 p-2 text-center text-sm font-bold sm:w-64 sm:p-5 sm:text-xl md:text-2xl"
          >
            Choose frame and font color
          </label>

          <section className="m-2 w-full">
            <RenderIf
              condition={colors.frameColor !== ''}
              then={
                <input
                  id="frame-color"
                  type="color"
                  value={colors.frameColor}
                  disabled
                  readOnly
                  className="w-full"
                />
              }
              otherwise={null}
            />
          </section>
        </section>
        <Description>
          <button
            type="button"
            onClick={() => handleOpenModal(colors.frameColor, 'frameColor')}
            className="w-full"
          >
            Click to show colors
          </button>
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

export default Step4;
export { getServerSideProps };
