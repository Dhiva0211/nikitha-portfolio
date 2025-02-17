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

const Size: FC = () => {
  const { query } = useRouter();

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Size" />
      <h3 className="text-center text-xl font-bold">
        [Offering {query?.number}]
      </h3>

      <Select
        labelToUse="Choose measuring units"
        options={['m', 'cm', 'mm', 'in']}
      />
      <section className="-mt-5 inline-flex">
        <button className="m-5 flex items-center justify-around rounded-2xl border-4 p-2">
          Edit
        </button>
        <CommonButton type="button" className="w-36 rounded-2xl">
          Save
        </CommonButton>
      </section>

      <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
        <table className="border-collapse border-4">
          <thead>
            <tr>
              <th className="border-4">Size Name</th>
              <th className="border-4">Size Name</th>
              <th className="border-4">Height</th>
              <th className="border-4">Length</th>
              <th className="border-4">Width</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-4 p-2">Size 1</td>
              <td className="border-4">
                <input type="text" />
              </td>
              <td className="border-4 p-2">
                <input type="text" />
              </td>
              <td className="border-4">
                <input type="text" />
              </td>
              <td className="border-4 p-2">
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td className="border-4 p-2">Size 2</td>
              <td className="border-4">
                <input type="text" />
              </td>
              <td className="border-4 p-2">
                <input type="text" />
              </td>
              <td className="border-4">
                <input type="text" />
              </td>
              <td className="border-4 p-2">
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td className="border-4 p-2">Size 3</td>
              <td className="border-4">
                <input type="text" />
              </td>
              <td className="border-4 p-2">
                <input type="text" />
              </td>
              <td className="border-4">
                <input type="text" />
              </td>
              <td className="border-4 p-2">
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td className="border-4 p-2">Size 4</td>
              <td className="border-4">
                <input type="text" />
              </td>
              <td className="border-4 p-2">
                <input type="text" />
              </td>
              <td className="border-4">
                <input type="text" />
              </td>
              <td className="border-4 p-2">
                <input type="text" />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="m-5 flex items-center justify-around rounded-2xl border-4 p-2">
          Add new size
        </button>
      </section>

      <CommonLink
        href={
          routes.vendor.inputOfferings.objMachPack.setUpBasicOfferingFeatures
            .default
        }
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default Size;
export { getServerSideProps };
