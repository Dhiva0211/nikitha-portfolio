import { FC } from 'react';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
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
const InputLabelLeft = dynamic(
  () =>
    import('@/components/common/input').then(mod => ({
      default: mod.InputLabelLeft,
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
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

interface ComponentProps {
  readonly edit: string | Array<string> | undefined;
}

const Component: FC<ComponentProps> = ({ edit }) => {
  const router = useRouter();

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="mt-4 max-w-6xl">
      <ShowWindowTitle smallTitle secondTitle="Set Up Subscriptions Price" />
      <h3 className="m-2 text-center text-xl font-bold">Plan {edit}</h3>

      <InputLabelLeft className="mx-4" labelToUse="Price" />

      <TitleDescHr
        title="Vendor Boost subscription"
        description="Vendor Price and Profit Calculator"
      />
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Vendor Compare Price With Competition"
      />

      <h4 className="m-2 text-center text-lg font-bold">
        Price Discount Chart
      </h4>
      <label
        htmlFor="popUpDiscount"
        className="m-2 flex items-center font-bold"
      >
        <section className="size-10 overflow-hidden rounded-xl border-4">
          <input
            id="popUpDiscount"
            type="checkbox"
            className="size-8 checked:accent-white"
          />
        </section>
        <span className="ml-2">Pop-Up Discount</span>
      </label>
      <section className="flex justify-around">
        <section className="flex w-24 flex-col text-center text-deep-sapphire">
          <label htmlFor="howMuch" className="font-bold">
            How much
          </label>
          <input
            id="howMuch"
            type="text"
            defaultValue="5%"
            className="rounded-full border-4 text-center"
          />
        </section>
        <section className="flex w-36 flex-col text-center text-deep-sapphire">
          <label htmlFor="startDate" className="font-bold">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="rounded-full border-4 text-center"
          />
        </section>
        <section className="flex w-36 flex-col text-center text-deep-sapphire">
          <label htmlFor="endDate" className="font-bold">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="rounded-full border-4 text-center"
          />
        </section>
      </section>

      <label
        htmlFor="specialOccasionDiscount"
        className="m-2 flex items-center font-bold"
      >
        <section className="size-10 overflow-hidden rounded-xl border-4">
          <input
            id="specialOccasionDiscount"
            type="checkbox"
            className="size-8 checked:accent-white"
          />
        </section>
        <span className="ml-2">Special Occasion Discount</span>
      </label>
      <section className="flex justify-around">
        <section className="flex w-24 flex-col text-center text-deep-sapphire">
          <label htmlFor="howMuch" className="font-bold">
            How much
          </label>
          <input
            id="howMuch"
            type="text"
            defaultValue="5%"
            className="rounded-full border-4 text-center"
          />
        </section>
        <section className="flex w-36 flex-col text-center text-deep-sapphire">
          <label htmlFor="specialOccasion" className="font-bold">
            Special Dates
          </label>

          <select
            name="specialOccasion"
            id="specialOccasion"
            className="rounded-2xl border-4"
          >
            <option value="Christmas">Christmas</option>
            <option value="Summer">Summer</option>
            <option value="Vacations">Vacations</option>
          </select>
        </section>
      </section>

      <TitleDescHr
        title="Vendor Boost subscription"
        description="Vendor Compare Discount With Competition"
      />
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Vendor Set up Discounts According to Features and Customizations"
      />
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Vendor Can integrate with AI to upload business data links for Fabulous AI news services so that the UpUnikSelf Shoppittos can find vendors’ business related news fast"
      />

      <CommonLink
        href={
          routes.vendor.inputOfferings.generalSolutions.subscription.setUpPrice
            .default
        }
        onClick={goBack}
      >
        <span className="text-xl font-bold">Done</span>
      </CommonLink>
    </section>
  );
};

export default Component;
