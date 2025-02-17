import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
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
const TitleDescHr = dynamic(
  () =>
    import('@/components/common/two-text').then(mod => ({
      default: mod.TitleDescHr,
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

const videos = [
  'Upload photo of the front of the basic offering',
  'Upload photo of the back of the basic offering',
  'Upload photo of the left side of the basic offering',
  'Upload photo of the right side of the basic offering',
  'Upload photo of the top of the basic offering',
  'Upload photo of the bottom of the basic offering',
];

const TemplateChoices: FC = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const [uploadedImages, setUploadedImages] = useState({});

  const handleChange = (offering: string, value: string) => {
    setSelectedValues(prev => ({
      ...prev,
      [offering]: prev[`${offering}`] === value ? null : value,
    }));
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImages(prev => ({ ...prev, [index]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="mt-4 px-2 sm:mt-2 md:mt-6 md:px-4 lg:mt-8 lg:px-8">
      <ShowWindowTitle smallTitle secondTitle="Set Up Technology" />
      <h3 className="m-2 text-center text-xl font-bold md:text-2xl lg:text-3xl">
        Template Choices
      </h3>

      <Description>
        Choose the template type for each basic offering which will serve as a
        base for Shoppittos to view and construct their customizations on top of
        your basic offering.
      </Description>

      <Select
        labelToUse="Choose template"
        options={[
          '1- 6 photos: free',
          '2- Plain 3D model: boost',
          '3- One shape: boost, modular 3D model',
          '4- Multiple shapes: boost, modular 3D model',
        ]}
        alignItems="start"
        justifyContent="justify-center"
      />
      <div className="mt-2" />
      <section className="-mt-5 inline-flex">
        <button className="m-5 flex w-24 items-center justify-around rounded-xl border-4 p-2">
          Edit
        </button>
        <CommonButton type="button" className="w-36 rounded-2xl">
          Save
        </CommonButton>
      </section>

      <h3 className="m-2 px-12 text-center text-xl">
        To which basic offerings will this template apply?
      </h3>
      <section className="m-2 mx-auto flex max-w-fit items-center justify-center rounded-2xl border-4 px-8 py-4">
        <div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <span />
            <div className="grid grid-cols-2 gap-2">
              <span className="text-center text-lg font-bold">Yes</span>
              <span className="text-center text-lg font-bold">No</span>
            </div>
          </div>

          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="mb-2 grid grid-cols-2 items-center gap-4"
            >
              <span className="mx-4 font-bold">Offering {index + 1}</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    name="yes-no"
                    checked={selectedValues[`offering${index}`] === 'yes'}
                    onChange={() => handleChange(`offering${index}`, 'yes')}
                    className="size-5"
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    name="yes-no"
                    checked={selectedValues[`offering${index}`] === 'no'}
                    onChange={() => handleChange(`offering${index}`, 'no')}
                    className="size-5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-2" />
      <section className="-mt-5 inline-flex">
        <button className="m-5 flex w-24 items-center justify-around rounded-xl border-4 p-2">
          Edit
        </button>
        <CommonButton type="button" className="w-36 rounded-2xl">
          Save
        </CommonButton>
      </section>

      <Description>
        You can upload the 6 photos of each side of your basic offering below.
        They will be used as a template to help Shoppittos with their
        customization. Make sure the photos are of good quality. Accepted file
        types are SVG, PNG, and PDF.
      </Description>

      <div className="my-4" />

      <div className="flex flex-wrap">
        {videos.map((item, index) => (
          <section
            className="m-2 flex w-full sm:w-1/2 md:w-1/2 lg:w-1/2"
            key={item}
          >
            <section className="m-2 flex size-36 flex-col items-center justify-between rounded-xl border-4 bg-white text-center">
              <div className="flex size-36 items-center justify-center overflow-hidden rounded-lg border-2">
                {uploadedImages[`${index}`] ? (
                  <Image
                    src={uploadedImages[`${index}`]}
                    alt="Uploaded preview"
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">No image</span>
                )}
              </div>
            </section>
            <label
              className="m-2 flex w-3/4 cursor-pointer items-center justify-start font-bold"
              htmlFor={item}
            >
              <span className="block text-center">{item}</span>
              <input
                type="file"
                id={item}
                className="hidden"
                onChange={e => handleImageUpload(e, index)}
              />
            </label>
          </section>
        ))}
      </div>

      <section className="-mt-5 inline-flex">
        <button className="m-5 flex w-24 items-center justify-around rounded-xl border-4 p-2">
          Edit
        </button>
        <CommonButton type="button" className="w-40 rounded-2xl">
          Save
        </CommonButton>
      </section>

      <Description>
        To offer a better customization experience to shoppittos you may choose
        to construct a plain 3D model of your basic offering
      </Description>

      <TitleDescHr
        title="Vendor Boost subscription"
        description="Build and integrate as template a plain 3D model"
      />

      <Description>
        You may offer a basic offering which has many portions of uneven
        dimensions that can be customized. For example, a sofa. In this case, it
        might be useful to build and integrate a One shape 3D modular model as a
        template. Also, you may want to offer shoppittos various combinations to
        change the shape of the basic offering. For example, a shelf. In this
        case, it might be useful to build and integrate a multiple shape 3D
        modular model as a template. For that click on the vendor boost below.
      </Description>

      <TitleDescHr
        title="Vendor Boost subscription"
        description="Build and integrate as template a one shape modular 3D model"
      />
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Build and use as template a multiple shape modular 3D model"
      />

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

export default TemplateChoices;
export { getServerSideProps };
