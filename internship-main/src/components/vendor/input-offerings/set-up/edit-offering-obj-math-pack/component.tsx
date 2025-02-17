import { FC } from 'react';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import dynamic from 'next/dynamic';
import { routes } from '@/routes';
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

const Component: FC<ComponentProps> = ({ edit }) => {
  const router = useRouter();

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Set Up Price" />
      <h3 className="m-2 text-center text-xl font-bold">Offering {edit}</h3>

      <div className="mx-4 max-w-full overflow-x-auto text-wrap rounded-lg border-4">
        <table className="min-w-full table-auto border-collapse break-words text-[0.50rem] sm:text-xs md:text-sm xl:text-lg">
          <thead>
            <tr>
              <th className="border-2 px-1 py-2 text-center sm:w-20">
                Price Tech Chart
              </th>
              <th className="border-2 px-1 py-2 text-center sm:w-20">
                Basic Offering Price
              </th>
              <th className="border-2 px-1 py-2 text-center sm:w-20">
                Customization Tech 1 [name]
              </th>
              <th className="border-2 px-1 py-2 text-center sm:w-20">
                Customization Tech 2 [name]
              </th>
              <th className="border-2 px-1 py-2 text-center sm:w-20">
                Customization Tech 3 [name]
              </th>
              <th className="border-2 px-1 py-2 text-center sm:w-20">
                Customization Tech 4 [name]
              </th>
              <th className="border-2 px-1 py-2 text-center sm:w-20">
                Customization Tech 5 [name]
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 p-2">No Customization</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
            </tr>
            <tr>
              <td className="border-2 p-2">Customization Kind 1 [name]</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
            </tr>
            <tr>
              <td className="border-2 p-2">Customization Kind 2 [name]</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
            </tr>
            <tr>
              <td className="border-2 p-2">Customization Kind 3 [name]</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
            </tr>
            <tr>
              <td className="border-2 p-2">Customization Kind 4 [name]</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="$0" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Original Table Component */}
      {/* <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
        <table className="border-collapse border-4">
          <thead>
            <tr>
              <th className="border-4">Price Tech Chart</th>
              <th className="border-4">Basic Offering Price</th>
              <th className="border-4">Customization Tech 1 [name]</th>
              <th className="border-4">Customization Tech 2 [name]</th>
              <th className="border-4">Customization Tech 3 [name]</th>
              <th className="border-4">Customization Tech 4 [name]</th>
              <th className="border-4">Customization Tech 5 [name]</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-4">No Customization</td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4" />
              <td className="border-4" />
              <td className="border-4" />
              <td className="border-4" />
              <td className="border-4" />
            </tr>
            <tr>
              <td className="border-4">Customization Kind 1 [name]</td>
              <td className="border-4" />
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
            </tr>
            <tr>
              <td className="border-4">Customization Kind 2 [name]</td>
              <td className="border-4" />
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
            </tr>
            <tr>
              <td className="border-4">Customization Kind 3 [name]</td>
              <td className="border-4" />
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
            </tr>
          </tbody>
        </table>
      </section> */}
      {/* Original Table Component */}

      <h3 className="my-4 text-center text-xl font-bold">
        Additional Customization Fees
      </h3>
      <section className="mx-6 grid grid-cols-4">
        <section className="flex flex-col justify-end gap-2">
          <span />
          <span className="my-1 font-bold">Color</span>
          <span className="my-1 font-bold">Characters</span>
          <span className="my-1 font-bold">Images</span>
        </section>
        <section className="flex flex-col items-center">
          <span className="font-bold">Max</span>
          <input
            id="maxPrice_1"
            type="text"
            defaultValue="[0]"
            className="my-1 w-20 rounded-full border-2 text-center"
          />
          <input
            id="maxPrice_2"
            type="text"
            defaultValue="[0]"
            className="my-1 w-20 rounded-full border-2 text-center"
          />
          <input
            id="maxPrice_3"
            type="text"
            defaultValue="[0]"
            className="my-1 w-20 rounded-full border-2 text-center"
          />
        </section>
        <section className="flex flex-col items-center">
          <span className="font-bold">Free</span>
          <input
            id="free_1"
            type="text"
            defaultValue="[0]"
            className="my-1 w-20 rounded-full border-2 text-center"
          />
          <input
            id="free_2"
            type="text"
            defaultValue="[0]"
            className="my-1 w-20 rounded-full border-2 text-center"
          />
          <input
            id="free_3"
            type="text"
            defaultValue="[0]"
            className="my-1 w-20 rounded-full border-2 text-center"
          />
        </section>
        <section className="flex flex-col items-center">
          <span className="font-bold">+1 Fee</span>
          <input
            id="fee_1"
            type="text"
            defaultValue="+ $0"
            className="my-1 w-20 rounded-full border-2 text-center"
          />
          <input
            id="fee_2"
            type="text"
            defaultValue="+ $0"
            className="my-1 w-20 rounded-full border-2 text-center"
          />
          <input
            id="fee_3"
            type="text"
            defaultValue="+ $0"
            className="my-1 w-20 rounded-full border-2 text-center"
          />
        </section>
      </section>

      <TitleDescHr
        title="Vendor Boost Subscription"
        description="Vendor Price and Profit Calculator"
      />
      <TitleDescHr
        title="Vendor Boost Subscription"
        description="Vendor Compare Price With Competition"
      />

      <h3 className="m-2 text-center text-xl font-bold">
        Basic Offering Price Chart
      </h3>

      {/* Original Table Component */}
      {/* <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
        <table className="border-collapse border-4">
          <thead>
            <tr>
              <th className="border-4">Size</th>
              <th className="border-4">Size Prices</th>
              <th className="border-4">Color</th>
              <th className="border-4">Color Prices</th>
              <th className="border-4">Material</th>
              <th className="border-4">Material Prices</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-4 p-2">Size 1 [name]</td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4 p-2">Color 1 [name]</td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4 p-2">Material 1 [name]</td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
            </tr>
            <tr>
              <td className="border-4 p-2">Size 2 [name]</td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4 p-2">Color 2 [name]</td>
              <td className="border-4">
                <input type="text" defaultValue="+ $0" />
              </td>
              <td className="border-4 p-2">Material 2 [name]</td>
              <td className="border-4">
                <input type="text" defaultValue="+ $0" />
              </td>
            </tr>
            <tr>
              <td className="border-4 p-2">Size 3 [name]</td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4 p-2">Color 3 [name]</td>
              <td className="border-4">
                <input type="text" defaultValue="+ $0" />
              </td>
              <td className="border-4 p-2">Material 3 [name]</td>
              <td className="border-4">
                <input type="text" defaultValue="+ $0" />
              </td>
            </tr>
            <tr>
              <td className="border-4 p-2">Size 4 [name]</td>
              <td className="border-4">
                <input type="text" defaultValue="$0" />
              </td>
              <td className="border-4 p-2">Color 4 [name]</td>
              <td className="border-4">
                <input type="text" defaultValue="+ $0" />
              </td>
              <td className="border-4 p-2">Material 4 [name]</td>
              <td className="border-4">
                <input type="text" defaultValue="+ $0" />
              </td>
            </tr>
          </tbody>
        </table>
      </section> */}
      {/* Original Table Component */}

      <div className="mx-4 max-w-full overflow-x-auto text-wrap rounded-lg border-4">
        <table className="min-w-full table-auto border-collapse break-words text-[0.50rem] sm:text-xs md:text-sm xl:text-lg">
          <thead>
            <tr>
              <th className="s:w-20 w-12 border-2 px-0 py-2 text-center">
                Size
              </th>
              <th className="s:w-20 w-12 border-2 px-0 py-2 text-center">
                Size Prices
              </th>
              <th className="s:w-20 w-12 border-2 px-0 py-2 text-center">
                Color
              </th>
              <th className="s:w-20 w-12 border-2 px-0 py-2 text-center">
                Color Prices
              </th>
              <th className="s:w-20 w-12 border-2 px-0 py-2 text-center">
                Material
              </th>
              <th className="s:w-20 w-12 border-2 px-0 py-2 text-center">
                Material Prices
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 p-2">Size 1 [name]</td>
              <td className="border-2 p-2">
                <input
                  type="text"
                  className="w-full pl-2.5"
                  defaultValue="$0"
                />
              </td>
              <td className="border-2 p-2">Color 1 [name]</td>
              <td className="border-2 p-2">
                <input
                  type="text"
                  className="w-full pl-2.5"
                  defaultValue="$0"
                />
              </td>
              <td className="border-2 p-2">Material 1 [name]</td>
              <td className="border-2 p-2">
                <input
                  type="text"
                  className="w-full pl-2.5"
                  defaultValue="$0"
                />
              </td>
            </tr>
            <tr>
              <td className="border-2 p-2">Size 2 [name]</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="+ $0" />
              </td>
              <td className="border-2 p-2">Color 2 [name]</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="+ $0" />
              </td>
              <td className="border-2 p-2">Material 2 [name]</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="+ $0" />
              </td>
            </tr>
            <tr>
              <td className="border-2 p-2">Size 3 [name]</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="+ $0" />
              </td>
              <td className="border-2 p-2">Color 3 [name]</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="+ $0" />
              </td>
              <td className="border-2 p-2">Material 3 [name]</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="+ $0" />
              </td>
            </tr>
            <tr>
              <td className="border-2 p-2">Size 4 [name]</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="+ $0" />
              </td>
              <td className="border-2 p-2">Color 4 [name]</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="+ $0" />
              </td>
              <td className="border-2 p-2">Material 4 [name]</td>
              <td className="border-2 p-2">
                <input type="text" className="w-full" defaultValue="+ $0" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Description>
        Insert the price for every size of your offering. You can choose to
        increase that price for a particular color and material across every
        size using the “+” sign next to the amount you wish to increase the
        price for that specific color and material.
      </Description>

      <h4 className="m-2 text-center text-lg font-bold">
        Price Discount Chart
      </h4>
      <label
        htmlFor="popUpDiscount"
        className="m-2 ml-4 flex items-center font-bold"
      >
        <section className="size-10 overflow-hidden rounded-xl border-4">
          <input
            id="popUpDiscount"
            type="checkbox"
            className="size-8 checked:accent-white"
            defaultChecked
          />
        </section>
        <span className="ml-2">Pop-Up Discount</span>
      </label>
      <section className="mx-2 flex justify-around">
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
        className="m-2 ml-4 flex items-center font-bold"
      >
        <section className="size-10 overflow-hidden rounded-xl border-4">
          <input
            id="specialOccasionDiscount"
            type="checkbox"
            className="size-8 checked:accent-white"
            defaultChecked
          />
        </section>
        <span className="ml-2">Special Occasion Discount</span>
      </label>
      <section className="grid grid-cols-3 justify-around">
        <section className="mx-auto flex w-24 flex-col text-center text-deep-sapphire">
          <label htmlFor="howMuch" className="font-bold">
            How much
          </label>
          <input
            id="howMuch"
            type="text"
            defaultValue="10%"
            className="rounded-full border-4 text-center"
          />
        </section>
        <section className="mx-auto flex w-36 flex-col text-center text-deep-sapphire">
          <label htmlFor="specialOccasion" className="font-bold">
            Special Dates
          </label>

          <select
            name="specialOccasion"
            id="specialOccasion"
            className="rounded-2xl border-4 px-2"
          >
            <option value="Christmas">Christmas</option>
            <option value="Summer">Summer</option>
            <option value="Vacations">Vacations</option>
          </select>
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
            defaultChecked
          />
        </section>
        <span className="ml-2">Koach Special Bonus Discount</span>
      </label>

      <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
        <table className="mx-auto border-collapse rounded-lg border-4">
          <thead>
            <tr>
              <th className="border-2 p-2">Koach Discount Chart</th>
              <th className="border-2 p-2">Order Value</th>
              <th className="border-2 p-2">Koach Bonus</th>
              <th className="border-2 p-2">End Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 p-2">Bonus 1</td>
              <td className="border-2 p-2">$12.000 - $30.000</td>
              <td className="border-2 p-2">
                <input className="w-8 border" type="text" />%
              </td>
              <td className="border-2 p-2">
                {new Date().toISOString().split('T')[0]}
              </td>
            </tr>
            <tr>
              <td className="border-2 p-2">Bonus 2</td>
              <td className="border-2 p-2">&gt; $30.000</td>
              <td className="border-2 p-2">8%</td>
              <td className="border-2 p-2">
                {new Date().toISOString().split('T')[0]}
              </td>
            </tr>
            <tr>
              <td className="border-2 p-2">Bonus 3</td>
              <td className="border-2 p-2">&gt; #$120.000</td>
              <td className="border-2 p-2">10%</td>
              <td className="border-2 p-2">
                {new Date().toISOString().split('T')[0]}
              </td>
            </tr>
            <tr>
              <td className="border-2 p-2">Bonus 4</td>
              <td className="border-2 p-2">&gt; $300.000</td>
              <td className="border-2 p-2">12%</td>
              <td className="border-2 p-2">
                {new Date().toISOString().split('T')[0]}
              </td>
            </tr>
          </tbody>
        </table>
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
        description="Vendor Can integrate with AI to upload up to 10 offerings for Fabulous AI services offered to the UpUnikSelf Shoppittos"
      />
      <TitleDescHr
        title="Vendor Boost Subscription"
        description="Vendor Can integrate with AI to upload business data links for Fabulous AI news services so that the UpUnikSelf Shoppittos can find vendors business related news fast"
      />

      <CommonLink
        href={routes.vendor.inputOfferings.objMachPack.setUpPrice.default}
        onClick={goBack}
      >
        <span className="text-xl font-bold">Done</span>
      </CommonLink>
    </section>
  );
};

export default Component;
