import { FC, useState } from 'react';
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
const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
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
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
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

const InputFormats: FC = () => {
  const [readOnly, setReadOnly] = useState(true);

  const handleEditClick = () => {
    setReadOnly(false);
  };

  const handleSaveClick = () => {
    setReadOnly(true);
  };

  return (
    <section className="mx-4 my-8 mt-4 w-full max-w-7xl rounded-lg border-t-4 border-deep-sapphire p-4 shadow-md sm:p-6 md:p-8">
      <ShowWindowTitle smallTitle secondTitle="Set Up Technology" />
      <h3 className="m-2 text-center text-lg font-bold md:text-2xl lg:text-3xl">
        Inputs to be customized
      </h3>

      <Description>
        You can offer Shoppittos one or more forms to customize your basic
        offering. The first five are only visual customizations, and the 6th is
        the option to change the shape of the basic offering. For that, you may
        need to build a modular 3D model of your basic offering to help
        Shoppittos understand their options. You can do it in “Set Up
        Technology”,”Template choices”.
      </Description>

      <Select
        labelToUse="Customization Inputs"
        options={[
          'Shoppitto can only upload Image',
          'Shoppitto can only upload Text',
          'Shoppitto can use Text + Image',
          'Pre-Determined Images',
          'Pre-Determined Text',
          'Shoppitto can change shape',
        ]}
        alignItems="start"
        justifyContent="justify-center"
        readonly={readOnly}
      />

      <section className="flex w-full gap-6">
        <button
          className="flex grow items-center justify-around rounded-lg border-4 md:w-40 md:grow-0"
          onClick={handleEditClick}
        >
          Edit
        </button>
        <CommonButton
          type="button"
          className="!m-0 shrink grow md:w-40 md:grow-0"
          onClick={handleSaveClick}
        >
          Save
        </CommonButton>
      </section>

      <CommonLink
        href={
          routes.vendor.inputOfferings.objMachPack.setUpTechOfCustom.default
        }
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default InputFormats;
export { getServerSideProps };
