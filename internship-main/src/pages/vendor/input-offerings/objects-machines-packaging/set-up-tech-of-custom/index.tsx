// Import necessary components and libraries
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const AddAnotherFaq = dynamic(
  () =>
    import('@/components/common/faq').then(mod => ({
      default: mod.AddAnotherFaq,
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

const techChoices = [
  'Output Formats',
  'Input Formats',
  'Set Print Area',
  'Kind Choices',
  'Upload Pre-Determined Images',
  'Upload Pre-Determined Text',
  'Color Choices',
  'Image Choices',
  'Font Choices',
  'Template Choices',
];

const optionsCustomization = [
  'Customization Technology 1',
  'Customization Technology 2',
  'Customization Technology 3',
  'Customization Technology 4',
  'Customization Technology 5',
];

const isOptionSelected = (option: string, optionSelected: string) =>
  option === optionSelected ? 'text-lg font-bold underline' : 'text-base';

const SetUpTechOfCustom: FC = () => {
  const [optionTechSelected, setOptionTechSelected] = useState<string>('1');

  return (
    <div className="container mx-auto text-center">
      <section className="mt-4">
        <ShowWindowTitle smallTitle secondTitle="Set Up Technology" />
        <h3 className="m-2 text-center text-xl font-bold">
          Customization Studio
        </h3>

        <Description>
          You have to be clear, comprehensive and honest in your Customization
          Offering Description in order to avoid future litigations. You can set
          up 5 customization technologies.
        </Description>

        <Select labelToUse="Set Up Technology">
          {optionsCustomization.map((option, index) => (
            <option
              key={option}
              value={option}
              className={isOptionSelected(
                String(index + 1),
                optionTechSelected,
              )}
              onClick={() => setOptionTechSelected(String(index + 1))}
            >
              {option}
            </option>
          ))}
        </Select>

        <AddAnotherFaq name={`Tech ${optionTechSelected} Faq`} />

        <section className="m-2 flex flex-wrap items-center justify-center">
          <video
            controls
            className="m-2 flex size-28 rounded-xl border-4 bg-white text-center font-bold"
          />
          <label
            className="m-2 w-full max-w-md cursor-pointer text-center font-bold lg:text-left"
            htmlFor="video1"
          >
            Optional Upload 20-second Tech {optionTechSelected} Explanation
            Video
            <input type="file" id="video1" className="hidden" />
          </label>
        </section>

        <Description>Choose all that apply</Description>

        <Select
          labelToUse="To which basic offerings will this customization technology apply?"
          options={[
            '[Offering 1]',
            '[Offering 2]',
            '[Offering 3]',
            '[Offering 4]',
            '[Offering 5]',
            '[Offering 6]',
            '[Offering 7]',
            '[Offering 8]',
            '[Offering 9]',
            '[Offering 10]',
            'All',
          ]}
        />

        <section className="-mt-5 flex justify-center">
          <button className="m-5 w-40 rounded-xl border-4 p-2">Edit</button>
          <CommonButton type="button" className="w-40 rounded-2xl">
            Save
          </CommonButton>
        </section>

        <h3 className="m-2 text-center text-xl font-bold">
          Tech {optionTechSelected} Choices
        </h3>

        <section className="m-2 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techChoices.map(choice => (
            <Link
              key={choice}
              href={`${routes.vendor.inputOfferings.objMachPack.setUpTechOfCustom.default}/${choice.replaceAll(' ', '-').toLowerCase()}`}
              className="m-2 flex flex-col items-center"
            >
              <span className="text-center text-xl font-bold">{choice}</span>
              <section className="size-12 rounded-2xl bg-deep-sapphire" />
            </Link>
          ))}
        </section>

        <section className="m-2 mt-4 flex items-center justify-center">
          <Link
            href={`${routes.vendor.inputOfferings.objMachPack.setUpTechOfCustom.default}/change-basic-offering-shape-choices`}
            className="m-2 flex flex-col items-center"
          >
            <span className="text-center text-xl font-bold">
              Change Basic Offering Shape Choices
            </span>
            <section className="size-12 rounded-2xl bg-deep-sapphire" />
          </Link>
        </section>

        <CommonLink href={routes.vendor.inputOfferings.objMachPack.default}>
          <section className="py-1 text-lg md:text-xl lg:text-2xl">
            Done
          </section>
        </CommonLink>
      </section>
    </div>
  );
};

export default SetUpTechOfCustom;
export { getServerSideProps };
