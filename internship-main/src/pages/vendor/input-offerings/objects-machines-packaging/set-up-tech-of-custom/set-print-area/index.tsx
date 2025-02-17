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

const margins = ['From Left', 'From Right', 'From Top', 'From Bottom'];
const SetPrintArea: FC = () => (
  <section className="mx-auto mt-4 w-full max-w-7xl px-4">
    <ShowWindowTitle smallTitle secondTitle="Set Up Technology" />
    <h3 className="m-2 text-center text-xl font-bold">Set Print area</h3>

    <Select
      labelToUse="Choose measuring units"
      options={['m', 'cm', 'mm', 'in']}
    />
    <section className="flex w-full gap-6">
      <button className="flex grow items-center justify-around rounded-lg border-4 md:w-20 md:grow-0">
        Edit
      </button>
      <CommonButton
        type="button"
        className="!m-0 shrink grow md:w-40 md:grow-0"
      >
        Save
      </CommonButton>
    </section>

    <Select labelToUse="Choose Margins">
      {margins.map(margin => (
        <ul
          key={margin}
          className="mb-2 flex items-center justify-between md:text-lg lg:text-xl"
        >
          <span className="ml-4">{margin}</span>
          <input
            type="text"
            className="mx-2 w-20 rounded-lg border-2 text-center"
            defaultValue="0"
          />
        </ul>
      ))}
    </Select>
    <section className="flex w-full gap-6">
      <button className="flex grow items-center justify-around rounded-lg border-4 md:w-20 md:grow-0">
        Edit
      </button>
      <CommonButton
        type="button"
        className="!m-0 shrink grow md:w-40 md:grow-0"
      >
        Save
      </CommonButton>
    </section>

    <CommonLink
      href={routes.vendor.inputOfferings.objMachPack.setUpTechOfCustom.default}
    >
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default SetPrintArea;
export { getServerSideProps };
