import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { carouselPlans } from '@/assets/mocks';

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
const CommonButton = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonButton,
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
const InputLabelLeft = dynamic(
  () =>
    import('@/components/common/input').then(mod => ({
      default: mod.InputLabelLeft,
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
      <ShowWindowTitle smallTitle secondTitle="Edit Subscription" />

      <CommonLink
        href={
          routes.vendor.tenOfferings.generalSolutions.subscription
            .deleteOffering
        }
      >
        <span className="m-2 p-2 text-xl font-bold">Delete this solution</span>
      </CommonLink>
      <CommonLink
        href={routes.vendor.tenOfferings.generalSolutions.subscription.default}
        onClick={goBack}
      >
        <span className="m-2 p-2 text-xl font-bold">Add another solution</span>
      </CommonLink>

      <Description>
        You can only sell up to 1 solution at any one time, in order to help you
        focus on what you sell best. When you choose to change it, you must
        first delete the old solution and then add the new one. All the orders
        made by Shoppittos of the old solution before it was deleted must still
        be fulfilled.
      </Description>

      <InputLabelLeft labelToUse="Solution Name" />

      <Description>
        Please make sure your videos are of good quality, and that they are in a
        1:1 ratio. Otherwise, they will be cut to fit the 1:1 ratio. You can
        make 1:1 videos by using one of the following options: Adobe Premiere,
        iMovie + Keynote, Clipchamp, InShot, Kapwing, and VEED.io. The accepted
        video file formats are MP4, AVI and MOV. Solution videos should not
        include sound because any sound will be removed.
      </Description>

      <section className="m-2 flex flex-wrap">
        <video
          controls
          className="m-2 flex size-36 flex-col justify-between rounded-xl border-4 bg-white text-center font-bold"
        />
        <label className="m-2 cursor-pointer font-bold" htmlFor="video1">
          Upload max 20 Second Video 1 of Solution
          <input type="file" id="video1" className="hidden" />
        </label>
      </section>
      <section className="m-2 flex flex-wrap">
        <video
          controls
          className="m-2 flex size-36 flex-col justify-between rounded-xl border-4 bg-white text-center font-bold"
        />
        <label className="m-2 cursor-pointer font-bold" htmlFor="video2">
          Upload max 20 Second Video 2 of Solution
          <input type="file" id="video2" className="hidden" />
        </label>
      </section>

      <Description>
        You can only sell up to 10 subscription plans at any one time. When you
        choose to change one of them, you must edit the plan name and save the
        new name. You can edit and save the plan names without needing to
        request approval for a new subscription. To edit the new plan features
        go to vendor dashboard, choose input offering features, then choose
        setup plan features. All the orders made by Shoppittos of the old
        subscription plan before it was deleted must still be fulfilled.
      </Description>

      {carouselPlans.map(plan => (
        <section key={plan.id}>
          <InputLabelLeft labelToUse={`${plan.title} name`} />
          <section className="-mt-5 inline-flex">
            <button className="m-5 flex w-36 items-center justify-around rounded-xl border-4 p-2">
              Edit
            </button>
            <CommonButton type="button" className="w-36 rounded-2xl">
              Save
            </CommonButton>
          </section>
        </section>
      ))}

      <Select
        labelToUse="Select which sub-category your offering applies to"
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
        <span className="m-2 p-2 text-xl font-bold">Cancel</span>
      </CommonLink>

      <Description>
        When you want to add a new solution, you need to go through the approval
        process. You don&apos;t need to request approval if you simply edited
        and saved the new plan names. Make sure to review all the data referring
        to your solution before requesting approval. You can change it now,
        although once you request approval, the only way to change it will be to
        delete it first.
      </Description>

      <CommonLinkNoBg
        className="mx-4 max-w-lg sm:mx-auto"
        href={
          routes.vendor.tenOfferings.generalSolutions.subscription
            .ApprovalOffering
        }
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
