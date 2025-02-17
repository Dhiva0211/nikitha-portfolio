import { useRouter } from 'next/router';
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
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const materialsFiller = [
  { id: 1, name: 'Material 1', type: '' },
  { id: 2, name: 'Material 2', type: '' },
  { id: 3, name: 'Material 3', type: '' },
  { id: 4, name: 'Material 4', type: '' },
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

const Material: FC = () => {
  const { query } = useRouter();
  const [materials, setMaterials] = useState(materialsFiller);

  const addMaterial = () => {
    const newId = materials.length + 1;
    setMaterials([
      ...materials,
      { id: newId, name: `Material ${newId}`, type: '' },
    ]);
  };

  const onChangeMaterialName = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const newMaterials = materials.map(material => {
      if (material.id === id) {
        return { ...material, name: event.target.value };
      }
      return material;
    });
    setMaterials(newMaterials);
  };

  const onChangeMaterialType = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const newMaterials = materials.map(material => {
      if (material.id === id) {
        return { ...material, type: event.target.value };
      }
      return material;
    });
    setMaterials(newMaterials);
  };

  const onRemove = (id: number) => {
    const newMaterials = materials.filter(material => material.id !== id);
    setMaterials(newMaterials);
  };

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <ShowWindowTitle smallTitle secondTitle="Material" />
      <h3 className="mb-6 text-center text-xl font-bold">
        [Offering {query?.number}]
      </h3>

      <section className="start-0 flex flex-col gap-4">
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl shadow-md">
          <table className="w-full border-separate border-spacing-0 text-left text-sm">
            <thead className="text-xs uppercase">
              <tr>
                <th
                  scope="col"
                  className="rounded-tl-xl border-4 border-b border-r px-2 py-3"
                >
                  Material Name
                </th>
                <th
                  scope="col"
                  className="border-4 border-b border-r px-2 py-3"
                >
                  Material Name Input
                </th>
                <th
                  scope="col"
                  className="rounded-tr-xl border-4 border-b px-2 py-3"
                >
                  Material Type
                </th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, index) => (
                <tr key={material.id}>
                  <td
                    className={`whitespace-nowrap border-4 border-r px-2 py-4 font-medium ${index === materials.length - 1 ? 'rounded-bl-xl' : 'border-b'}`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span>{material.name}</span>
                      <button
                        onClick={() => onRemove(material.id)}
                        className="flex size-6 items-center justify-center rounded-lg border-2 pb-1 sm:pb-0 md:size-8 md:rounded-xl"
                      >
                        -
                      </button>
                    </div>
                  </td>
                  <td
                    className={`border-4 border-r ${index === materials.length - 1 ? '' : 'border-b'} px-2 py-4`}
                  >
                    <input
                      onChange={event =>
                        onChangeMaterialName(event, material.id)
                      }
                      type="text"
                      className="w-full rounded border p-2"
                      value={material.name}
                    />
                  </td>
                  <td
                    className={`border-4 px-2 py-4 ${index === materials.length - 1 ? 'rounded-br-xl' : 'border-b'} `}
                  >
                    <input
                      onChange={event =>
                        onChangeMaterialType(event, material.id)
                      }
                      type="text"
                      className="w-full rounded border p-2"
                      value={material.type}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mx-auto max-w-5xl">
          <button
            onClick={addMaterial}
            className="mt-6 flex items-center justify-center rounded-2xl border-4 px-4 py-2 hover:bg-deep-sapphire hover:text-white"
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
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <span className="ml-2">Add new Material</span>
          </button>
        </div>
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

export default Material;
export { getServerSideProps };
