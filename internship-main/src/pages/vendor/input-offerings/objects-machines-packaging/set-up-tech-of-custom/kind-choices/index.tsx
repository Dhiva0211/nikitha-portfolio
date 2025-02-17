import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
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
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
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

const KindChoices: FC = () => {
  const [kinds, setKinds] = useState<number[]>([1]);

  const addKind = () => {
    setKinds(prevKinds => [...prevKinds, prevKinds.length + 1]);
  };

  const removeLastKind = () => {
    if (kinds.length > 1) {
      setKinds(prevKinds => prevKinds.slice(0, prevKinds.length - 1));
    }
  };

  return (
    <section className="m-4 sm:m-6 lg:m-8 xl:m-10">
      <ShowWindowTitle smallTitle secondTitle="Set Up Technology" />
      <h3 className="m-4 text-center text-xl font-bold lg:text-2xl">
        Kind Choices
      </h3>

      <Description>
        You can offer Shoppittos one or more types of customization each with a
        different price. For example, you may offer various max sizes. You may
        also offer visual customization in specific portions of your basic
        offering, for instance, the sneakers shoelaces. For that, you may need
        to build a modular 3D model of your basic offering to help Shoppittos
        understand their options. You can do that in “Set up
        technology”-”Template choices”.
      </Description>

      <Select
        labelToUse="A sizes in cm (1 in = 2.54 cm)"
        required
        options={[
          'A1 - 59.4 x 84.1 cm',
          'A2 - 42 x 59.4 cm',
          'A3 - 29.7 x 42 cm',
          'A4 - 21 x 29.7 cm',
          'A5 - 14.8 x 21 cm',
          'A6 - 10.5 x 14.8 cm',
          'A7 - 7.4 x 10.5 cm',
          'A8 - 5.2 x 7.4 cm',
          'A9 - 3.7 x 5.2 cm',
          'A10 - 2.6 x 3.7 cm',
        ]}
      />

      {kinds.map(kind => (
        <div key={kind}>
          <div className="w-auto">
            <div className="mt-4">
              <InputLabelLeft labelToUse={`Kind ${kind}`} />
            </div>
          </div>
          <section className="m-2 flex flex-wrap">
            <video
              controls
              className="m-2 flex size-36 flex-col justify-between rounded-xl border-4 bg-white text-center"
            />
            <label
              className="m-2 cursor-pointer font-bold"
              htmlFor={`video${kind}`}
            >
              Optional: Upload photo of the kind when a portion of the basic
              offering
              <input type="file" id={`video${kind}`} className="hidden" />
            </label>
          </section>
        </div>
      ))}
      <section className="mt-4 flex w-full justify-center space-x-4">
        <button
          onClick={addKind}
          className="flex items-center justify-center rounded-2xl border-4 hover:bg-deep-sapphire hover:text-white sm:px-3 sm:py-1 md:px-3 lg:px-4 lg:py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="20" height="20" rx="2" ry="2" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span className="ml-1 sm:text-sm lg:ml-4">Add Another Kind</span>
        </button>

        <button
          onClick={removeLastKind}
          className="flex items-center justify-center rounded-2xl border-4 px-4 py-2 hover:bg-deep-sapphire hover:text-white sm:px-3 sm:py-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />

            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span className="ml-2 sm:text-sm">Remove Kind</span>
        </button>
      </section>

      <CommonLink
        href={
          routes.vendor.inputOfferings.objMachPack.setUpTechOfCustom.default
        }
      >
        <section className="m-2 w-full rounded-2xl border-4 p-2 text-center text-lg font-bold lg:text-xl">
          Done
        </section>
      </CommonLink>
    </section>
  );
};

export default KindChoices;
export { getServerSideProps };
