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
    <section className="mt-4 max-w-7xl sm:mt-4 md:mt-8 lg:mt-10">
      <ShowWindowTitle smallTitle secondTitle="Set Up License Price" />
      <h3 className="text-center text-xl font-bold md:text-2xl lg:text-3xl">
        NFT License {edit}
      </h3>

      <InputLabelLeft className="mx-4" labelToUse="Price" />

      <TitleDescHr
        title="Vendor Boost subscription"
        description="Vendor Price and Profit Calculator"
      />
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Vendor Compare Price With Competition"
      />

      <h4 className="m-2 text-center text-lg font-bold sm:text-xl md:text-2xl">
        Price Discount Chart
      </h4>
      <label
        htmlFor="popUpDiscount"
        className="m-4 flex items-center font-bold sm:text-sm md:text-lg"
      >
        <section className="size-10 overflow-hidden rounded-xl border-4 sm:size-8 md:size-12">
          <input
            id="popUpDiscount"
            type="checkbox"
            className="size-8 checked:accent-white sm:size-6 md:size-10"
            defaultChecked
          />
        </section>
        <span className="ml-2">Pop-Up Discount</span>
      </label>
      <section className="flex flex-wrap justify-evenly">
        <section className="flex w-24 flex-col text-center text-deep-sapphire sm:w-36">
          <label htmlFor="howMuch" className="text-sm font-bold sm:text-lg">
            How much
          </label>
          <input
            id="howMuch"
            type="text"
            defaultValue="5%"
            className="rounded-full border-4 py-1 text-center md:py-2"
          />
        </section>
        <section className="flex w-28 flex-col text-center text-deep-sapphire sm:w-36 md:w-48">
          <label htmlFor="startDate" className="text-sm font-bold sm:text-lg">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="rounded-full border-4 py-1 text-center md:py-2"
          />
        </section>
        <section className="flex w-28 flex-col text-center text-deep-sapphire sm:w-36 md:w-48">
          <label htmlFor="endDate" className="text-sm font-bold sm:text-lg">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="rounded-full border-4 py-1 text-center md:py-2"
          />
        </section>
      </section>

      <label
        htmlFor="specialOccasionDiscount"
        className="m-4 flex items-center font-bold sm:text-sm md:text-lg"
      >
        <section className="size-10 overflow-hidden rounded-xl border-4 sm:size-8 md:size-12">
          <input
            id="specialOccasionDiscount"
            type="checkbox"
            className="size-8 checked:accent-white sm:size-6 md:size-10"
            defaultChecked
          />
        </section>
        <span className="ml-2">Special Occasion Discount</span>
      </label>
      <section className="flex justify-around">
        <section className="flex w-24 flex-col text-center text-deep-sapphire sm:w-20 md:w-32">
          <label htmlFor="howMuch" className="font-bold">
            How much
          </label>
          <input
            id="howMuch"
            type="text"
            defaultValue="5%"
            className="rounded-full border-4 py-1 text-center md:py-2"
          />
        </section>
        <section className="flex w-36 flex-col text-center text-deep-sapphire sm:w-28 md:w-48">
          <label htmlFor="specialOccasion" className="font-bold">
            Special Dates
          </label>

          <select
            name="specialOccasion"
            id="specialOccasion"
            className="rounded-2xl border-4 py-1 md:py-2"
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
        description="Vendor Set up Discounts According to License Type and Dates"
      />
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Vendor Can integrate with AI to upload up to 10 offerings for Fabulous AI services offered to the UpUnikSelf Shoppittos"
      />
      <div className="mt-4 text-center sm:mt-6 md:mt-8 lg:mt-10">
        <CommonLink
          href={routes.vendor.inputOfferings.licenseNft.nft.setUpPrice.default}
          onClick={goBack}
        >
          <span className="py-2 text-xl font-bold sm:text-lg md:text-2xl">
            Done
          </span>
        </CommonLink>
      </div>
    </section>
  );
};

export default Component;
