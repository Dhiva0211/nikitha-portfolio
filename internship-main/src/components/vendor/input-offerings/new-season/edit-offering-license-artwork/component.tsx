import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import whiteImage from '@//public/images/white-image.jpg';

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
const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Ellipse = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.Ellipse,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonLinkNoBg = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLinkNoBg,
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

interface ComponentProps {
  edit: string | Array<string> | undefined;
}

const Component: FC<ComponentProps> = ({ edit }) => {
  const router = useRouter();

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="New Season Artwork To License" />
      <h6 className="text-center text-xl font-bold">Artwork License {edit}</h6>

      <InputLabelLeft
        labelToUse="First Day of New Season Artwork License"
        type="date"
      />
      <InputLabelLeft labelToUse="New Season Artwork Name" />

      <section className="m-2 flex">
        <section className="rounded-xl border-4">
          <Image
            src={whiteImage}
            alt="Artwork"
            width={300}
            height={300}
            className="m-2 size-36"
          />
        </section>
        <label className="m-2 cursor-pointer font-bold" htmlFor="artwork-image">
          Choose Artwork file to license
          <input type="file" id="artwork-image" className="hidden" />
        </label>
      </section>

      <Select
        labelToUse="Select which sub-category your new season Artwork to license applies to"
        options={[]}
      />

      <Description>
        Choose one of the categories in which your new season Artwork license
        should be sold
      </Description>

      <InputLabelLeft labelToUse="New Season Artwork Keywords" />

      <Description>
        Up to 30 keywords, no emojis Separate each keyword by a comma “,”
      </Description>

      <CommonLink href={routes.returnBack} onClick={goBack}>
        <span className="text-xl font-bold">Cancel</span>
      </CommonLink>

      <CommonLink href={routes.underConstruction}>
        <span className="text-xl font-bold">Allow Pre-Orders</span>
      </CommonLink>

      <Description>
        You can only license up to 10 New Season Artworks
      </Description>

      <CommonLinkNoBg
        href={routes.vendor.inputOfferings.licenseNft.artwork.newSeason.submit}
      >
        <Ellipse
          className="size-20"
          svgClassName="fill-deep-sapphire stroke-deep-sapphire"
        />
        <span className="text-3xl font-bold">Request Approval</span>
      </CommonLinkNoBg>
    </section>
  );
};

export default Component;
