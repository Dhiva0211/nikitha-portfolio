import { useRouter } from 'next/router';
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
const InputLabelLeft = dynamic(
  () =>
    import('@/components/common/input').then(mod => ({
      default: mod.InputLabelLeft,
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

const Weight: FC = () => {
  const { query } = useRouter();

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Weight" />
      <h3 className="text-center text-xl font-bold">
        [Offering {query?.number}]
      </h3>

      <select
        name="weight"
        id="weight"
        className="mx-auto my-4 block rounded-2xl border-2 p-2 text-center"
      >
        <option value="">Units</option>
        <option value="kg">Kilogram (kg)</option>
        <option value="g">Gram (g)</option>
        <option value="lb">Pound (lb)</option>
        <option value="oz">Ounce (oz)</option>
      </select>
      <InputLabelLeft labelToUse="Weight" type="text" />

      <CommonLink
        href={
          routes.vendor.inputOfferings.objMachPack.setUpBasicOfferingFeatures
            .default
        }
      >
        <section className="py-1">Done</section>
      </CommonLink>
    </section>
  );
};

export default Weight;
export { getServerSideProps };
