import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { RenderIf } from '@/helpers/common/render-conditional';
import { categoryLogisticsAndApis } from '@/helpers/initial-values';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
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
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
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

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryLogisticsAndApis,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const ManualInputShippingRateEstimated: FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [rows, setRows] = useState<number[]>([1, 2, 3]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleAddRow = () => {
    setRows(prevRows => [...prevRows, prevRows.length + 1]); // Add a new row with incremented ID
  };

  return (
    <section className="mt-4 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <ShowWindowTitle smallTitle secondTitle="Logistics" />

      <h3 className="p-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        Manually Input Shipping Rate Estimates per Solution, per Weight, and per
        Destination Country
      </h3>

      <Description>
        The shipping rate estimate is what Shoppitto will pay. Any difference
        between the estimated and the real shipping rates has to be paid by the
        Vendor. UpUnikSelf will not retain any difference between the estimated
        and the real shipping rates. Please include all shipping fees, taxes on
        shipping, and all possible custom brokerage fees.
      </Description>

      {/* Responsive container with horizontal scrolling */}
      <section className="m-4 overflow-x-auto rounded-2xl border-4 border-deep-sapphire">
        <h3 className="rounded-t-2xl bg-deep-sapphire p-4 text-center text-2xl font-bold text-white">
          Shipping Prices
        </h3>

        {/* Table Header */}
        <section className="grid min-w-max grid-cols-5 gap-4 border-b border-deep-sapphire bg-corn-flower-blue p-2 text-center font-semibold">
          <span className="text-lg font-semibold sm:text-xl">Solutions</span>
          <span className="text-lg font-semibold sm:text-xl">
            Expected Delivery
          </span>
          <span className="text-lg font-semibold sm:text-xl">Price to US</span>
          <span className="text-lg font-semibold sm:text-xl">
            Price to Brazil
          </span>
          <span className="text-lg font-semibold sm:text-xl">
            Price to Colombia
          </span>
        </section>

        {/* Table Rows */}
        <section className="m-2">
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-5 items-center gap-4 border-b border-deep-sapphire py-2"
            >
              {/* First column: Solution name (non-editable) */}
              <p className="text-center text-base font-medium sm:text-lg">
                Solution {row}
              </p>

              {/* Editable fields with empty default values */}
              <input
                type="text"
                className="rounded-lg border border-deep-sapphire p-2 text-center text-base sm:text-lg"
                defaultValue=""
                placeholder="Expected Delivery"
              />
              <input
                type="text"
                className="rounded-lg border border-deep-sapphire p-2 text-center text-base sm:text-lg"
                defaultValue=""
                placeholder="Price to US"
              />
              <input
                type="text"
                className="rounded-lg border border-deep-sapphire p-2 text-center text-base sm:text-lg"
                defaultValue=""
                placeholder="Price to Brazil"
              />
              <input
                type="text"
                className="rounded-lg border border-deep-sapphire p-2 text-center text-base sm:text-lg"
                defaultValue=""
                placeholder="Price to Colombia"
              />
            </div>
          ))}
        </section>

        <button
          className="m-4 flex items-center justify-center rounded-lg border border-deep-sapphire px-4 py-2 font-bold text-deep-sapphire"
          onClick={handleAddRow}
        >
          + Add Another Shipping Plan
        </button>
      </section>

      <section className="mt-4 flex gap-4">
        <RenderIf
          condition={!isEditing}
          then={
            <button
              className="flex w-24 items-center justify-center rounded-lg border border-oxford-blue px-6 py-2 font-bold text-oxford-blue"
              onClick={handleEdit}
            >
              Edit
            </button>
          }
          otherwise={
            <>
              <CommonButton
                type="button"
                className="w-24 rounded-lg bg-deep-sapphire px-6 py-2 font-bold text-white"
                onClick={handleSave}
              >
                Save
              </CommonButton>
            </>
          }
        />
      </section>

      <section className="mt-4">
        <TitleDescHr
          title="Vendor Boost Subscription"
          description="Shipping Plan Fees Comparison per Shoppitto Location"
        />
        <TitleDescHr
          title="Vendor Boost Subscription"
          description="Shipping Plan Date Comparison per Shoppitto Location"
        />
      </section>

      <CommonLink
        href={
          routes.vendor.logisticsAndApis.generalSolutions.individualServices
            .setUpPhysicalDeliveryOfYourService.inputPreferredShippingPlan
            .default
        }
      >
        <section className="m-2 rounded-md bg-deep-sapphire p-4 text-center text-lg font-bold text-white sm:text-xl md:text-2xl">
          Done
        </section>
      </CommonLink>
    </section>
  );
};

export default ManualInputShippingRateEstimated;
export { getServerSideProps };
