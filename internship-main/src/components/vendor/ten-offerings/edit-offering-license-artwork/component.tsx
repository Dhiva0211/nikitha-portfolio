import whiteImage from '@//public/images/white-image.jpg';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

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

  const buildQuery = () => {
    if (Array.isArray(edit)) {
      return edit.join('');
    }

    if (typeof edit === 'string') {
      return edit;
    }

    return '';
  };

  return (
    <section className="border border-white bg-white">
      <ShowWindowTitle smallTitle secondTitle="Edit Artwork To License" />
      <h6 className="m-2 text-center text-xl font-bold">
        Artwork License {edit}
      </h6>

      <CommonLink
        href={routes.vendor.tenOfferings.licenseNft.artwork.deleteOffering}
        query={{ edit: buildQuery() }}
      >
        <span className="text-lg font-bold md:text-xl">
          Change this Artwork to license
        </span>
      </CommonLink>
      <CommonLink
        href={routes.vendor.tenOfferings.licenseNft.artwork.default}
        onClick={goBack}
      >
        <span className="text-lg font-bold md:text-xl">
          Add another Artwork to license
        </span>
      </CommonLink>

      <Description>
        You can only sell up to 10 Artwork licenses at any one time. When you
        choose to change one of them, you must first delete the old Artwork
        license and then add the new one. All the orders made by Shoppittos of
        the old Artwork license before it was deleted must still be fulfilled.
      </Description>

      <InputLabelLeft labelToUse="Artwork Name" />

      {/* Updated to retain original size and avoid clipping */}
      <section className="m-2 flex">
        <section className="size-40 overflow-hidden rounded-xl border-4">
          <Image
            src={whiteImage}
            alt="Artwork"
            className="size-full object-cover"
          />
        </section>
        <label className="m-2 cursor-pointer font-bold" htmlFor="artwork-image">
          Choose Artwork file to license
          <input type="file" id="artwork-image" className="hidden" />
        </label>
      </section>

      <Select
        labelToUse="Select which sub-category your Artwork to license applies to"
        options={[]}
      />

      <Description>
        Choose one of the categories in which your Artwork license should be
        sold
      </Description>

      <InputLabelLeft labelToUse="Artwork Keywords" />

      <Description>
        Up to 30 keywords, no emojis Separate each keyword by a comma “,”
      </Description>

      <CommonLink href={routes.returnBack} onClick={goBack}>
        <span className="text-lg font-bold md:text-xl">Cancel</span>
      </CommonLink>

      <Description>
        You can only license up to 10 Artworks at a time. You can change any
        Artwork that you want to license, and all new Artwork licenses need to
        go through the approval process.
      </Description>

      <CommonLinkNoBg
        href={routes.vendor.tenOfferings.licenseNft.artwork.ApprovalOffering}
      >
        <div className="flex w-full items-center justify-center gap-5">
          <Ellipse
            className="size-20"
            svgClassName="fill-deep-sapphire stroke-deep-sapphire"
          />
          <span className="text-xl font-bold sm:text-2xl md:text-3xl">
            Request Approval
          </span>
        </div>
      </CommonLinkNoBg>
    </section>
  );
};

export default Component;
