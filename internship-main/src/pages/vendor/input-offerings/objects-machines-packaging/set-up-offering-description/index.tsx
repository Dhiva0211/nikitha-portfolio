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
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const AddAnotherFaqWithTitle = dynamic(
  () =>
    import('@/components/common/faq').then(mod => ({
      default: mod.AddAnotherFaqWithTitle,
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

const initialBasicOfferingArray = [
  'Basic Offering 1 Name',
  'Basic Offering 2 Name',
  'Basic Offering 3 Name',
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

const SetUpOfferingDescription: FC = () => {
  const [basicOfferingArray, setBasicOfferingArray] = useState<
    ReadonlyArray<string>
  >(initialBasicOfferingArray);

  const handleAddNewFaq = () => {
    if (basicOfferingArray.length < 10) {
      setBasicOfferingArray(prev => [
        ...prev,
        `Basic Offering ${prev.length + 1} Name`,
      ]);
    }
  };

  return (
    <section className="mx-auto mt-4 max-w-4xl overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Title with proper size classes */}
      <ShowWindowTitle
        smallTitle
        secondTitle="Set Up Offering Description"
        // className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
      />

      {/* Wrapped Description for additional className */}
      <div className="text-2xl font-normal sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        <Description>
          You have to be clear, comprehensive, and honest in your Basic Offering
          Description in order to avoid future litigations.
        </Description>
      </div>

      <div className="mt-6 space-y-4">
        {basicOfferingArray.map((basicOffering, index) => (
          <div
            key={index}
            className="w-full overflow-hidden rounded-lg bg-white p-4 shadow-lg"
          >
            <AddAnotherFaqWithTitle name={basicOffering} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center space-y-4">
        {/* Button with dynamic styling */}
        <button
          className={`w-full max-w-xs rounded-lg px-4 py-2 text-center transition duration-200 sm:text-lg md:text-xl lg:text-2xl ${
            basicOfferingArray.length >= 10
              ? 'cursor-not-allowed bg-blue-700 text-white'
              : 'bg-deep-sapphire text-white hover:bg-blue-700'
          }`}
          onClick={handleAddNewFaq}
          disabled={basicOfferingArray.length >= 10}
        >
          Add Another FAQ
        </button>

        {/* Done button */}
        <CommonLink href={routes.vendor.inputOfferings.objMachPack.default}>
          <button className="w-full max-w-xs rounded-lg bg-deep-sapphire px-4 py-2 text-center text-lg text-white transition duration-200 sm:text-xl md:text-2xl">
            Done
          </button>
        </CommonLink>
      </div>
    </section>
  );
};

export default SetUpOfferingDescription;
export { getServerSideProps };
