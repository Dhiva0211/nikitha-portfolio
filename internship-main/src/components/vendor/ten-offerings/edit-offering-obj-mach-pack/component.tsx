import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
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

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Edit Offering" />
      <h6 className="m-2 text-center text-xl font-bold">Offering {edit}</h6>

      <CommonLink href={routes.vendor.tenOfferings.objMachPack.deleteOffering}>
        <span className="text-lg font-bold md:text-xl">
          Delete this offering
        </span>
      </CommonLink>
      <CommonLink
        href={routes.vendor.tenOfferings.objMachPack.default}
        onClick={goBack}
      >
        <span className="text-lg font-bold md:text-xl">
          Add another offering
        </span>
      </CommonLink>

      <Description>
        You can only sell up to 10 offerings at any one time. When you choose to
        change one of them, you must first delete the old offering and then add
        the new one. All the orders made by Shoppittos of the old offering
        before it was deleted must still be fulfilled. You can sell your
        offering with or without customization, although when you list it, you
        must offer Shoppittos the opportunity to make a unique purchase by
        offering them the possibility to customize either the basic offering or
        the basic offering’s packaging in at least one way. You can set this up
        in Vendor’s Dashboard - Input Offering features - Set Up Technology of
        Customization.
      </Description>

      <InputLabelLeft labelToUse="New Offering Name" />

      <Description>
        You can choose whether you will customize the basic offering or the
        packaging of the basic offering
      </Description>

      <Select
        labelToUse="Will you customize the basic offering or its packaging?"
        options={['Basic Offering', 'Packaging']}
      />

      <Description>
        Please make sure your videos are of good quality, that they show all of
        the sides of the Basic Offering, and that they are in a 1:1 ratio.
        Otherwise, they will be cut to fit the 1:1 ratio. You can make 1:1
        videos by using one of the following options: Adobe Premiere, iMovie +
        Keynote, Clipchamp, InShot, Kapwing, and VEED.io. The accepted video
        file formats are MP4, AVI and MOV. Product videos should not include
        sound because any sound will be removed.
      </Description>

      <section className="m-2 flex flex-wrap">
        <video
          controls
          className="m-2 flex size-36 flex-col justify-between rounded-xl border-4 bg-white text-center font-bold"
        />
        <label className="m-2 cursor-pointer font-bold" htmlFor="video1">
          Upload max 20 Second Video 1 of Base Offering (Not Customized)
          <input type="file" id="video1" className="hidden" />
        </label>
      </section>
      <section className="m-2 flex flex-wrap">
        <video
          controls
          className="m-2 flex size-36 flex-col justify-between rounded-xl border-4 bg-white text-center font-bold"
        />
        <label className="m-2 cursor-pointer font-bold" htmlFor="video2">
          Upload max 20 Second Video 2 of Base Offering with a Sample
          Customization
          <input type="file" id="video2" className="hidden" />
        </label>
      </section>

      <Select
        labelToUse="Select which sub-category your offering applies to"
        options={['Sub-Category 1', 'Sub-Category 2', 'Sub-Category 3']}
      />

      <Description>
        Choose one of the categories in which your offering should be sold
      </Description>

      <InputLabelLeft labelToUse="Offering Keywords" />

      <Description>
        Up to 30 keywords, no emojis Separate each keyword by a comma “,”
      </Description>

      <CommonLink href={routes.returnBack} onClick={goBack}>
        <span className="text-lg font-bold md:text-xl">Cancel</span>
      </CommonLink>

      <Description>
        You can only sell up to 10 offerings at a time. You can change any
        offering that you want to sell, and all new offerings need to go through
        the approval process.
      </Description>
      <div className="flex w-full justify-center">
        <CommonLinkNoBg
          className="w-full max-w-lg"
          href={routes.vendor.tenOfferings.objMachPack.ApprovalOffering}
        >
          <div className="flex w-full items-center justify-center gap-5 text-center">
            <Ellipse
              className="size-20"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <span className="text-xl font-bold sm:text-2xl md:text-3xl">
              Request Approval
            </span>
          </div>
        </CommonLinkNoBg>
      </div>
    </section>
  );
};

export default Component;
