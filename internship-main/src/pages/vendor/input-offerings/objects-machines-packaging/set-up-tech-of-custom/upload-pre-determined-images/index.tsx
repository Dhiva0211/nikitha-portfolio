import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { AddPlus } from '@/components/common/icons';
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

const UploadPreDeterminedImages: FC = () => {
  const [imageFields, setImageFields] = useState([{ id: 1 }]);

  const addImageField = () => {
    setImageFields([...imageFields, { id: imageFields.length + 1 }]);
  };

  const removeImageField = (index: number) => {
    const updatedFields = imageFields.filter((_, i) => i !== index);
    setImageFields(updatedFields);
  };

  return (
    <section className="mt-4 w-full max-w-7xl px-4">
      <ShowWindowTitle smallTitle secondTitle="Set Up Technology" />
      <h3 className="m-6 text-center text-xl font-bold sm:m-1 sm:text-lg">
        Upload Pre-determined images
      </h3>

      <Description>
        Optional - Upload all predetermined images with which Shoppittos may
        customize your basic offering
      </Description>

      <section className="flex flex-col items-center px-8 py-2 shadow-lg shadow-deep-sapphire/50 sm:px-12">
        {imageFields.map((field, index) => (
          <section className="relative w-full" key={field.id}>
            <InputLabelLeft labelToUse={`Image Name ${index + 1}`} />
            <button
              type="button"
              onClick={() => removeImageField(index)}
              className="absolute -left-7 top-1/3 flex size-6 items-center justify-center rounded-lg border-2 md:-left-10 md:size-8 md:rounded-xl"
            >
              -
            </button>
            <section className="m-4">
              <button className="flex w-full items-center justify-center rounded-2xl border-4 p-3 font-bold transition hover:scale-105 hover:bg-deep-sapphire hover:text-white">
                <label htmlFor={`uploadImage-${index}`}>Upload</label>
                <input
                  id={`uploadImage-${index}`}
                  type="file"
                  className="hidden"
                />
              </button>
            </section>
          </section>
        ))}
        <button
          onClick={addImageField}
          className="m-4 flex w-full items-center justify-center gap-2 rounded-2xl border-4 p-3 font-bold transition hover:scale-105 hover:bg-deep-sapphire hover:text-white"
        >
          <AddPlus />
          Add another image
        </button>
      </section>

      <CommonLink
        href={
          routes.vendor.inputOfferings.objMachPack.setUpTechOfCustom.default
        }
        className="w-full max-w-80"
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default UploadPreDeterminedImages;
export { getServerSideProps };
