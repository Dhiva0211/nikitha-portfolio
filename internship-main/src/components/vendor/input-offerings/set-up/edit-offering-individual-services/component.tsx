import { FC, useState } from 'react';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';

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
  readonly edit: string | Array<string> | undefined;
}

const today = new Date().toISOString().split('T')[0];
const Component: FC<ComponentProps> = ({ edit }) => {
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  return (
    <section className="mx-auto mt-4 w-full max-w-7xl">
      <ShowWindowTitle smallTitle secondTitle="Set Up Price" />
      <h3 className="m-2 text-center text-xl font-bold">Solution {edit}</h3>

      <InputLabelLeft labelToUse="Price" type="number" />

      <Description>
        You either offer a single solution or a 3 Tiers Solution. In case you
        are offering a solution with multiple tiers, you can upload the price
        for every tier below. The price shown to clients will be the economy
        price, also, the price shown on the previous set up price page will be
        the one corresponding to the economy tier.
      </Description>

      <section className="w-full max-w-7xl p-4">
        <h3 className="m-2 mt-4 text-xl font-bold">Optional</h3>
      </section>
      <InputLabelLeft labelToUse="Economy Price" />
      <InputLabelLeft labelToUse="Standard Price" />
      <InputLabelLeft labelToUse="Business Price" />

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
            defaultChecked={false}
          />
        </section>
        <span className="ml-2">Pop-Up Discount</span>
      </label>
      <section className="flex flex-wrap justify-evenly">
        <section className="flex w-28 flex-col text-center text-deep-sapphire sm:w-36">
          <label htmlFor="howMuch" className="text-sm font-bold sm:text-lg">
            How much
          </label>
          <input
            id="howMuch"
            type="text"
            defaultValue="5%"
            className="rounded-full border-4 text-center"
          />
        </section>
        <section className="flex w-28 flex-col text-center text-deep-sapphire sm:w-36">
          <label htmlFor="startDate" className="text-sm font-bold sm:text-lg">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            min={today}
            onChange={e => setStartDate(e.target.value)}
            className="rounded-full border-4 text-center"
          />
        </section>
        <section className="flex w-28 flex-col text-center text-deep-sapphire sm:w-36">
          <label htmlFor="endDate" className="text-sm font-bold sm:text-lg">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            min={startDate}
            onChange={e => setEndDate(e.target.value)}
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
            defaultChecked={false}
          />
        </section>
        <span className="ml-2">Special Occasion Discount</span>
      </label>
      <section className="flex flex-wrap items-center justify-evenly">
        <section className="flex w-36 flex-col text-center text-deep-sapphire">
          <label htmlFor="howMuch2" className="pt-1 font-bold">
            How much
          </label>
          <input
            id="howMuch2"
            type="text"
            defaultValue="5%"
            className="h-10 rounded-full border-4 text-center"
          />
        </section>
        <section className="flex w-36 flex-col text-center text-deep-sapphire">
          <label htmlFor="specialOccasion" className="pt-1 font-bold">
            Special Dates
          </label>

          <select
            name="specialOccasion"
            id="specialOccasion"
            className="h-10 rounded-full border-4 text-center"
          >
            <option value="Christmas">Christmas</option>
            <option value="Summer">Summer</option>
            <option value="Vacations">Vacations</option>
          </select>
        </section>
      </section>

      <TitleDescHr
        title="Vendor Boost Subscription"
        description="Vendor Compare Discount With Competition"
      />
      <TitleDescHr
        title="Vendor Boost Subscription"
        description="Vendor Set up Discounts According to Features and Customizations"
      />
      <TitleDescHr
        title="Vendor Boost Subscription"
        description="Vendor Can integrate with AI to upload business data links for Fabulous AI news services so that the UpUnikSelf Shoppittos can find vendors' business related news fast"
      />

      <CommonLink
        className="p-4"
        href={
          routes.vendor.inputOfferings.generalSolutions.individualServices
            .setUpPrice.default
        }
      >
        <span className="text-xl font-bold">Done</span>
      </CommonLink>
    </section>
  );
};

export default Component;
