import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryInputOfferings } from '@/helpers/initial-values';
import { useState } from 'react';

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

const OutputFormats: FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section className="mt-4 rounded-lg border-t-4 border-deep-sapphire bg-white p-4 shadow-md sm:p-6 md:p-8">
      <ShowWindowTitle smallTitle secondTitle="Set Up Technology" />
      <h3 className="m-2 text-center text-xl font-bold">
        Output possible formats
      </h3>

      <div
        className={`relative ${!isEditing ? 'pointer-events-none opacity-50' : ''}`}
      >
        <Select
          labelToUse="Customization Output Formats"
          options={['SVG', 'PDF', 'PNG', 'DXF']}
        />
      </div>

      <section className="-mt-5 inline-flex">
        <button
          className="m-5 flex w-40 items-center justify-around rounded-xl border-4 p-2"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <CommonButton
          type="button"
          className="w-40 rounded-2xl"
          onClick={() => setIsEditing(false)}
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

export default OutputFormats;
export { getServerSideProps };
