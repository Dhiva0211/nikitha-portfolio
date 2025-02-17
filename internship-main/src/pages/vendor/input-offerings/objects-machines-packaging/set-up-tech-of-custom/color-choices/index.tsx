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
  { loading: () => <DotsAnimation /> },
);
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
    })),
  { loading: () => <DotsAnimation /> },
);
const InputLabelLeft = dynamic(
  () =>
    import('@/components/common/input').then(mod => ({
      default: mod.InputLabelLeft,
    })),
  { loading: () => <DotsAnimation /> },
);
const CommonButton = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonButton,
    })),
  { loading: () => <DotsAnimation /> },
);
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
    })),
  { loading: () => <DotsAnimation /> },
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

const buttonClasses =
  'flex items-center justify-center w-full max-w-xs sm:max-w-sm p-2 rounded-2xl border-4 text-sm sm:text-base font-medium';
const ColorChoices: FC = () => (
  <section className="mt-4 max-w-full px-4 sm:px-6 md:px-8 lg:px-12">
    <ShowWindowTitle smallTitle secondTitle="Set Up Technology" />
    <h3 className="my-4 text-center text-lg font-bold sm:text-xl md:text-2xl">
      Color Choices
    </h3>

    <Description>
      Upload all available colors with which Shoppittos may customize your basic
      offering.
    </Description>

    <InputLabelLeft labelToUse="Color Name" />

    <section className="m-2 space-y-4">
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <button className={`${buttonClasses} bg-white`}>
          <label
            htmlFor="uploadColor"
            className="w-full cursor-pointer text-center"
          >
            Upload from color palette
          </label>
          <input id="uploadColor" type="file" className="hidden" />
        </button>
        <label htmlFor="choose-color" className={`${buttonClasses} bg-white`}>
          <span className="w-full cursor-pointer text-center">
            Choose from color palette
          </span>
          <input id="choose-color" type="color" className="hidden" />
        </label>
      </div>
      <button className={`${buttonClasses} mx-auto bg-white`}>
        Add another color
      </button>
    </section>

    <section className="m-2 mx-auto grid max-w-3xl grid-cols-1 items-center gap-4 rounded-2xl border-4 p-4 text-center sm:grid-cols-2">
      <span className="text-sm font-bold sm:text-base">
        Maximum Number of Colors that can be used per customization
      </span>
      <input
        type="text"
        className="mx-auto w-full max-w-20 rounded-md border-2 border-gray-300 text-center text-sm font-bold sm:text-base"
        defaultValue="0"
      />
    </section>

    <section className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-around">
      <button className={`${buttonClasses} w-auto bg-white`}>Edit</button>
      <CommonButton type="button" className={`${buttonClasses} w-auto`}>
        Save
      </CommonButton>
    </section>

    <section className="m-2 mx-auto grid max-w-3xl grid-cols-1 items-center gap-4 rounded-2xl border-4 p-4 text-center sm:grid-cols-2">
      <span className="text-sm font-bold sm:text-base">
        Number of Colors that can be used per customization free of charge to
        Shoppittos
      </span>
      <input
        type="text"
        className="mx-auto w-full max-w-20 rounded-md border-2 border-gray-300 text-center text-sm font-bold sm:text-base"
        defaultValue="0"
      />
    </section>

    <section className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-around">
      <button className={`${buttonClasses} w-auto bg-white`}>Edit</button>
      <CommonButton type="button" className={`${buttonClasses} w-auto`}>
        Save
      </CommonButton>
    </section>

    <div className="mt-8 flex justify-center">
      <CommonLink
        href={
          routes.vendor.inputOfferings.objMachPack.setUpTechOfCustom.default
        }
      >
        <button className="w-full max-w-xs rounded-lg bg-deep-sapphire px-4 py-2 text-center text-white transition duration-200">
          Done
        </button>
      </CommonLink>
    </div>
  </section>
);

export default ColorChoices;
export { getServerSideProps };
