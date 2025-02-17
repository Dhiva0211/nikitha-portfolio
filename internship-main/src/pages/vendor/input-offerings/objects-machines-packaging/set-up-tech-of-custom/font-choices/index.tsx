import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
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
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
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
const InputLabelLeft = dynamic(
  () =>
    import('@/components/common/input').then(mod => ({
      default: mod.InputLabelLeft,
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

const chooseArray = [
  'Choose Available Font',
  'Choose Font Effects',
  'Choose minimum Font Size',
  'Choose Maximum Font Size',
  'Choose Character Spacing',
  'Choose Line Spacing',
  'Choose Text Alignment',
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

const ImageChoices: FC = () => (
  <section className="mt-4 w-full max-w-7xl px-4">
    <ShowWindowTitle smallTitle secondTitle="Set Up Technology" />
    <h3 className="m-2 text-center font-bold lg:text-2xl">Font Choices</h3>

    <Description>
      Your customization tech may imply some restrictions on the fonts
      Shoppittos may use to customize. Give us your directions on available font
      choices.
    </Description>

    <section className="m-2 grid grid-cols-2 items-center rounded-2xl border-4 p-2 text-center">
      <span className="m-2 font-bold">
        Maximum Number of Characters that can be used per text box for 1
        customization
      </span>
      <input
        type="text"
        className="text-center font-bold md:w-auto"
        defaultValue="0"
      />
    </section>
    <section className="-mt-5 inline-flex">
      <button className="m-5 flex w-24 items-center justify-around rounded-xl border-4 p-2">
        Edit
      </button>
      <CommonButton type="button" className="w-40 rounded-2xl">
        Save
      </CommonButton>
    </section>

    <section className="m-2 grid grid-cols-2 items-center rounded-2xl border-4 text-center">
      <span className="m-2 font-bold">
        Number of characters that can be used per customization free of charge
        to shoppittos
      </span>
      <input
        type="text"
        className="text-center font-bold md:w-auto"
        defaultValue="0"
      />
    </section>
    <section className="-mt-5 inline-flex">
      <button className="m-5 flex w-24 items-center justify-around rounded-xl border-4 p-2">
        Edit
      </button>
      <CommonButton type="button" className="w-40 rounded-2xl">
        Save
      </CommonButton>
    </section>

    {chooseArray.map(item => (
      <>
        <InputLabelLeft labelToUse={item} defaultValue="▼" disabled />
        <section className="-mt-5 inline-flex">
          <button className="m-5 flex w-24 items-center justify-around rounded-xl border-4 p-2">
            Edit
          </button>
          <CommonButton type="button" className="w-40 rounded-2xl">
            Save
          </CommonButton>
        </section>
      </>
    ))}

    <CommonLink
      href={routes.vendor.inputOfferings.objMachPack.setUpTechOfCustom.default}
    >
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default ImageChoices;
export { getServerSideProps };
