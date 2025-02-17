import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { FC } from 'react';
import { useRouter } from 'next/router';

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

const Component: FC = () => {
  const router = useRouter();

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Edit Offering" />
      <h6 className="text-center text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl" />
      <CommonLink
        href={
          routes.vendor.tenOfferings.generalSolutions.individualServices
            .deleteOffering
        }
      >
        <span className="text-2xl font-bold">Delete this offering</span>
      </CommonLink>
      <Description>
        You can only sell up to 10 offerings at any one time. When you choose to
        change one of them, you must first delete the old solution and then add
        the new one. All the orders made by Shoppittos of the old solution
        before it was deleted must still be fulfilled.
      </Description>

      <InputLabelLeft labelToUse="New Solution Name" />

      <Description>
        Please make sure your videos are of good quality, and that they are in a
        1:1 ratio. Otherwise, they will be cut to fit the 1:1 ratio. The
        accepted video file formats are MP4, AVI, and MOV. Solution videos
        should not include sound because any sound will be removed.
      </Description>
      <section className="m-4 flex items-center">
        <video controls className="size-28 rounded-xl border-4 bg-white" />
        <label
          className="ml-4 flex-1 break-words text-sm font-bold"
          htmlFor="video1"
        >
          Upload max 20 Second Video 1 of Solution
          <input type="file" id="video1" className="hidden" />
        </label>
      </section>

      <section className="m-4 flex items-center">
        <video controls className="size-28 rounded-xl border-4 bg-white" />
        <label
          className="ml-4 flex-1 break-words text-sm font-bold"
          htmlFor="video2"
        >
          Upload max 20 Second Video 2 of Solution
          <input type="file" id="video2" className="hidden" />
        </label>
      </section>

      <Select
        labelToUse="Select which sub-category your solution applies to"
        options={['Sub-Category 1', 'Sub-Category 2', 'Sub-Category 3']}
      />

      <Description>
        Choose one of the categories in which your solution should be sold.
      </Description>

      <InputLabelLeft labelToUse="Offering Keywords" />
      <Description>
        Up to 30 keywords, no emojis. Separate each keyword by a comma “,”.
      </Description>

      <CommonLink href={routes.returnBack} onClick={goBack}>
        <span className="text-2xl font-bold">Cancel</span>
      </CommonLink>

      <Description>
        You can only sell up to 10 offerings at a time. You can change any
        offering that you want to sell, and all new offerings need to go through
        the approval process.
      </Description>

      <CommonLinkNoBg
        href={
          routes.vendor.tenOfferings.generalSolutions.individualServices
            .ApprovalOffering
        }
      >
        <Ellipse
          className="size-20"
          svgClassName="fill-deep-sapphire stroke-deep-sapphire"
        />
        <span className="text-xl font-bold sm:text-2xl md:text-3xl">
          Request Approval
        </span>
      </CommonLinkNoBg>
    </section>
  );
};

export default Component;
