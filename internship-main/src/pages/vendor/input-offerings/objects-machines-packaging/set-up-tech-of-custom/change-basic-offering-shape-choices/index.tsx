import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import constructionLogo from '@//public/images/logo-constructor.png';
import Image from 'next/image';
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

const ChangeBasicOfferingShapeChoices: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Set Up Technology" />
    <h3 className="m-2 text-center text-xl">
      Basic offering change shape options
    </h3>

    <Description>
      You may want to offer the possibility to make small changes to the basic
      offering to make it even more unique. For example, a piece of jewelry
      which can match a picture, or a perfume box which can be offered with or
      without one window. Choose a short name for the shape change, describe it
      and you may even add a photo to showcase the change.
    </Description>

    <AddAnotherFaq name="Change shape 1" />

    <section className="m-4 flex text-center sm:my-4 sm:text-lg">
      <section className="size-32 overflow-hidden rounded-2xl border-4 sm:size-44">
        <Image
          src={constructionLogo}
          alt="construction logo"
          width={928}
          height={622}
          placeholder="blur"
          className="my-6 sm:my-7"
        />
      </section>
      <label className="m-2 cursor-pointer font-bold" htmlFor="shapeChange1">
        Upload photo of the basic offering after shape change 1
        <input type="file" id="shapeChange1" className="hidden" />
      </label>
    </section>
    <section className="m-2">
      <button className="my-4 flex w-full items-center justify-around rounded-2xl border-4 p-2 text-xl font-bold">
        Add another shape change
      </button>
    </section>

    <Description>
      Change shape customization offerings will be treated as another kind of
      customization offer. You can set up their price exactly as you would set
      up the prices for each kind of customization, after all the kind’s prices
      have been set up in “Input offering features”-“Set up price”. You still
      have to name and describe the customization technology that you are using.
      You can only use a max of 5 customization technologies between kind
      customizations, which do not alter the shape of the basic offering, and
      customizations that change the shape of the basic offering.
    </Description>

    <CommonLink
      href={routes.vendor.inputOfferings.objMachPack.setUpTechOfCustom.default}
    >
      <section className="py-1 text-lg">Done</section>
    </CommonLink>
  </section>
);

export default ChangeBasicOfferingShapeChoices;
export { getServerSideProps };
