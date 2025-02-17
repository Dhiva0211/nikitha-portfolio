import { useRouter } from 'next/router';
import { FC, FormEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { RenderIf } from '@/helpers/common/render-conditional';
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
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const colorOptions = [
  { name: 'Color', value: '', color: '', id: 1 },
  { name: 'Color', value: '', color: '', id: 2 },
  { name: 'Color', value: '', color: '', id: 3 },
  { name: 'Color', value: '', color: '', id: 4 },
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

const Color: FC = () => {
  const { query } = useRouter();
  const [colors, setColors] = useState<typeof colorOptions>(colorOptions);
  const [showDialog, setShowDialog] = useState<{
    open: boolean;
    index: number;
  }>({ open: false, index: 0 });

  const handleChange = (index: number, key: string, value: string) => {
    const newColors = colors.map((color, i) =>
      i === index ? { ...color, [key]: value } : color,
    );
    setColors(newColors);
  };

  const handleRemoveColor = (index: number) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  const handleOpenModal = (index: number) =>
    setShowDialog({ open: true, index });

  const handleCloseModal = () => setShowDialog({ open: false, index: 0 });

  const handleChangeColor = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const color = formData.get('colorSelect')?.toString() ?? '';

    handleChange(showDialog.index, 'color', color);
    handleCloseModal();
  };

  const handleAddNewColor = () => {
    const newColor = {
      name: 'Color',
      value: '',
      color: '',
      id: colors.length + 1,
    };
    setColors([...colors, newColor]);
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Color" />
      <h3 className="text-center text-xl font-bold">
        [Offering {query?.number}]
      </h3>

      <DialogHandler isOpen={showDialog.open}>
        <ColorDialog
          value={colors[showDialog.index].color}
          saveInformation={handleChangeColor}
        />
      </DialogHandler>

      {/* Make the table responsive */}
      <section className="m-2 overflow-x-auto p-2">
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl shadow-md">
          <table className="w-full border-separate border-spacing-0 text-left text-sm">
            <thead className="text-xs uppercase">
              <tr>
                <th
                  scope="col"
                  className="rounded-tl-xl border-4 border-b border-r px-2 py-3 text-center font-bold"
                >
                  Color Number
                </th>
                <th
                  scope="col"
                  className="border-4 border-b border-r px-2 py-3 text-center font-bold"
                >
                  Color Name
                </th>
                <th
                  scope="col"
                  className="rounded-tr-xl border-4 border-b px-2 py-3 text-center font-bold"
                >
                  Color Pallet
                </th>
              </tr>
            </thead>
            <tbody>
              {colors.map(({ name, value, color }, index) => (
                <tr key={name}>
                  <td
                    className={`whitespace-nowrap border-4 border-r px-2 py-4 font-medium ${index === colors.length - 1 ? 'rounded-bl-xl' : 'border-b'}`}
                  >
                    <div className="flex items-center justify-between">
                      {name} {index + 1}
                      <button
                        onClick={() => handleRemoveColor(index)}
                        className="flex size-6 items-center justify-center rounded-lg border-2 pb-1 sm:pb-0 md:size-8 md:rounded-xl"
                      >
                        -
                      </button>
                    </div>
                  </td>
                  <td
                    className={`border-4 border-r ${index === colors.length - 1 ? '' : 'border-b'} px-2 py-4`}
                  >
                    <input
                      type="text"
                      value={value}
                      onChange={e =>
                        handleChange(index, 'value', e.target.value)
                      }
                      className="w-full rounded border p-2"
                    />
                  </td>
                  <td
                    className={`border-4 px-2 py-4 ${index === colors.length - 1 ? 'rounded-br-xl' : 'border-b'} `}
                  >
                    <section className="flex justify-center">
                      <RenderIf
                        condition={color !== ''}
                        then={
                          <input
                            type="color"
                            value={color}
                            disabled
                            readOnly
                            className="w-full"
                          />
                        }
                        otherwise={null}
                      />
                    </section>
                    <button
                      onClick={() => handleOpenModal(index)}
                      className="w-full rounded-2xl border-2 p-2 text-xs hover:bg-deep-sapphire hover:text-white sm:text-sm"
                    >
                      Click to show colors
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mx-auto flex max-w-5xl justify-center">
          <button
            onClick={handleAddNewColor}
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
            <span className="ml-2">Add new Color</span>
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

export default Color;
export { getServerSideProps };
