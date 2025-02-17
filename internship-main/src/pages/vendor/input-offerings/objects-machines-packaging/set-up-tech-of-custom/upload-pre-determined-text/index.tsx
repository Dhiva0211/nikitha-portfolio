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

const UploadPreDeterminedText: FC = () => {
  const [textFields, setTextFields] = useState<
    { id: number; file: File | null }[]
  >([{ id: 1, file: null }]);

  const addTextField = () => {
    setTextFields([...textFields, { id: textFields.length + 1, file: null }]);
  };

  const removeLastTextField = () => {
    if (textFields.length > 1) {
      setTextFields(prevFields => prevFields.slice(0, prevFields.length - 1));
    }
  };

  const handleFileChange = (index: number, file: File | null) => {
    const updatedFields = textFields.map((field, i) =>
      i === index ? { ...field, file } : field,
    );
    setTextFields(updatedFields);
  };

  return (
    <section className="m-4 sm:m-6 lg:m-8 xl:m-10">
      <ShowWindowTitle smallTitle secondTitle="Set Up Technology" />
      <h3 className="m-4 text-center text-xl font-bold lg:text-2xl">
        Upload Pre-determined text
      </h3>

      <Description>
        Optional - Upload all predetermined text with which Shoppittos may
        customize your basic offering
      </Description>

      {textFields.map((_, index) => (
        <div key={index} className="relative m-4">
          <InputLabelLeft labelToUse={`Text Name ${index + 1}`} />
          <section className="m-2 flex w-full items-center space-y-4">
            <button className="flex w-full items-center justify-center rounded-2xl border-4 p-3 font-bold transition hover:scale-105 hover:bg-deep-sapphire hover:text-white">
              <label htmlFor={`uploadText-${index}`}>Upload</label>
              <input
                id={`uploadText-${index}`}
                type="file"
                className="hidden"
                onChange={e =>
                  handleFileChange(
                    index,
                    e.target.files ? e.target.files[0] : null,
                  )
                }
              />
            </button>
          </section>
        </div>
      ))}

      <section className="mt-4 flex w-full justify-center space-x-4">
        <button
          onClick={addTextField}
          className="flex items-center justify-center rounded-2xl border-4 px-4 py-2 hover:bg-deep-sapphire hover:text-white"
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
          <span className="ml-2">Add Another Text</span>
        </button>
        <button
          onClick={removeLastTextField}
          className="flex items-center justify-center rounded-2xl border-4 px-4 py-2 hover:bg-deep-sapphire hover:text-white"
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
          <span className="ml-2">Remove Text</span>
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

export default UploadPreDeterminedText;
export { getServerSideProps };
