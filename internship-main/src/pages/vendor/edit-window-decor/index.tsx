import { FC, FormEvent, useEffect, useState } from 'react';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import dynamic from 'next/dynamic';
import { RenderIf } from '@/helpers/common/render-conditional';
import { apiRoutes, routes } from '@/routes';
import { GetServerSideProps } from 'next';
import { getToken, validSessionToken } from '@/helpers/validations';
import { BusinessInfo, BusinessLayout } from '@prisma/client';
import config from '@//tailwind.config';
import { ApiResponse } from '@/helpers/interfaces';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
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
const CommonButton = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonButton,
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
const Ellipse = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.Ellipse,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonLinkNoBg = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLinkNoBg,
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
    false,
    false,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {
      data: {
        businessInfo: JSON.stringify(user?.BusinessInfo),
        countryName: user?.BusinessInfo?.countryInfo.name,
        businessLayout: user?.BusinessInfo?.businessLayout,
      },
    },
  };
};

interface EditWindowDecorProps {
  data: {
    readonly businessInfo: string;
    readonly countryName: string;
    readonly businessLayout: BusinessLayout;
  };
}

const formId = 'edit-window-decor';
const EditWindowDecor: FC<EditWindowDecorProps> = ({ data }) => {
  const { businessInfo, countryName, businessLayout } = data;
  const [businessInformation] = useState<BusinessInfo>(
    JSON.parse(businessInfo),
  );
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
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

  const handleChange = (key: string, value: string) =>
    setColors({ ...colors, [key]: value });

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsFormSubmitting(true);
    const formDataToView = new FormData();
    formDataToView.append('layoutId', businessLayout.layoutId);
    formDataToView.append('bgColor', colors.bgColor);
    formDataToView.append('frameColor', colors.frameColor);

    await fetch(apiRoutes.businessLayout, {
      method: 'POST',
      body: formDataToView,
    })
      .then(resp => resp.json())
      .then(async (resp: ApiResponse) => {
        if (resp?.error) alert(resp.error);
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
    <section className="mt-4 w-full max-w-7xl space-y-10 px-4">
      <ShowWindowTitle smallTitle secondTitle="Window Decor" />

      <DialogHandler isOpen={showDialog.open}>
        <ColorDialog
          value={showDialog.color}
          saveInformation={handleChangeColor}
        />
      </DialogHandler>

      <AddLogoName
        country={countryName}
        city={businessInformation.city}
        joinedInDate={businessInformation.joinInDate ?? ''}
        vendorName={businessInformation.busLegalName}
      />

      <form
        id={formId}
        onSubmit={handleOnSubmit}
        method="POST"
        className="mt-8 space-y-10"
      >
        <section>
          <section className="m-2 mt-4 flex overflow-hidden rounded-xl border-4">
            <label
              htmlFor="back-color"
              className="flex w-44 items-center rounded-xl border-r-4 p-2 sm:w-64 sm:p-5"
            >
              <span className="text-center text-sm font-bold sm:text-xl md:text-2xl">
                Choose background color
              </span>
            </label>

            <section className="m-4 flex grow flex-col items-center justify-center">
              <input
                id="back-color"
                type="color"
                value={colors.bgColor}
                disabled
                readOnly
                className="w-full max-w-xs"
              />
            </section>
          </section>
          <RenderIf
            condition={isFormSubmitting}
            then={
              <section className="flex w-full justify-center">
                <DotsAnimation />
              </section>
            }
            otherwise={
              <section className="flex w-full gap-6 p-2">
                <button
                  type="button"
                  className="flex grow items-center justify-around rounded-lg border-4 md:w-20 md:grow-0"
                  onClick={() => handleOpenModal(colors.bgColor, 'bgColor')}
                >
                  Edit
                </button>
                <CommonButton
                  type="submit"
                  className="!m-0 shrink grow md:w-40 md:grow-0"
                >
                  Save
                </CommonButton>
              </section>
            }
          />
        </section>

        <section>
          <section className="m-2 mt-4 flex overflow-hidden rounded-xl border-4">
            <label
              htmlFor="back-color"
              className="flex w-44 items-center rounded-xl border-r-4 p-2 sm:w-64 sm:p-5"
            >
              <span className="text-center text-sm font-bold sm:text-xl md:text-2xl">
                Choose frame and font color
              </span>
            </label>

            <section className="m-4 flex grow flex-col items-center justify-center">
              <input
                id="frame-color"
                type="color"
                value={colors.frameColor}
                disabled
                readOnly
                className="w-full max-w-xs"
              />
            </section>
          </section>
          <RenderIf
            condition={isFormSubmitting}
            then={
              <section className="m-2 flex w-full justify-center">
                <DotsAnimation />
              </section>
            }
            otherwise={
              <section className="flex w-full gap-6 p-2">
                <button
                  type="button"
                  className="flex grow items-center justify-around rounded-lg border-4 md:w-20 md:grow-0"
                  onClick={() =>
                    handleOpenModal(colors.frameColor, 'frameColor')
                  }
                >
                  Edit
                </button>
                <CommonButton
                  type="submit"
                  className="!m-0 shrink grow md:w-40 md:grow-0"
                >
                  Save
                </CommonButton>
              </section>
            }
          />
        </section>

        <section>
          <Description>
            If you would like to change your Vendor’s Name, write the new name
            and request a free Special Verification.
          </Description>

          <InputLabelLeft
            labelToUse="Change Vendor’s Name"
            defaultValue={businessInformation.busLegalName}
          />
        </section>

        <CommonLinkNoBg
          className="w-full max-w-lg"
          href={routes.vendor.editWindowDecor.success}
        >
          <div className="flex items-center justify-center gap-3">
            <Ellipse
              className="size-20"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <span className="text-xl font-bold sm:text-2xl md:text-3xl">
              Request Special Approval
            </span>
          </div>
        </CommonLinkNoBg>

        <CommonLink href={routes.vendor.dashboard}>
          <section className="m-2 p-2">Done</section>
        </CommonLink>
      </form>
    </section>
  );
};

export default EditWindowDecor;
export { getServerSideProps };
