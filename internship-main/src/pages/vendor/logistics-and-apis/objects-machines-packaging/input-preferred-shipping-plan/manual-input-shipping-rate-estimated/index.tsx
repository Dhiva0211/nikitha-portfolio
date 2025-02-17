import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
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

const ManualInputShippingRateEstimated: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Logistics" />

    <h3 className="p-2 text-3xl font-bold">
      Manually Input Shipping Rate Estimates per Offering, per Weight, and per
      Destination Country
    </h3>

    <Description>
      The shipping rate estimate is what the Shoppitto is going to pay, any
      difference between the estimated and the real shipping rates has to be
      paid by the Vendor. UpUnikSelf will not retain any difference between the
      estimated and the real shipping rates. Please include all shipping fees,
      taxes on shipping, and all possible custom brokerage fees.
    </Description>

    <section className="m-2 overflow-x-scroll rounded-2xl border-4">
      <h3 className="rounded-2xl border-b-4 p-2 text-3xl font-bold">
        Shipping prices
      </h3>

      <section className="m-2 flex justify-between gap-2">
        <span className="text-xl font-bold">Offerings</span>
        <span className="text-xl font-bold">Expected Delivery</span>
        <span className="text-xl font-bold">Price to US</span>
        <span className="text-xl font-bold">Price to Brazil</span>
        <span className="text-xl font-bold">Price to Colombia</span>
      </section>

      {Array.from({ length: 10 }).map((_, i) => (
        <section className="ml-2" key={i}>
          <p className="text-lg font-bold">Offering {i + 1}</p>
          <p className="ml-2">Size 1</p>
          <p className="ml-2">Size 2</p>
          <p className="ml-2">Size 3</p>
          <p className="ml-2">Size 4</p>
        </section>
      ))}
    </section>
    <section className="-mt-5 inline-flex">
      <button className="m-5 flex items-center justify-around rounded-2xl border-4 p-2">
        Edit
      </button>
      <CommonButton type="button" className="w-36 rounded-2xl">
        Save
      </CommonButton>
    </section>

    <TitleDescHr
      title="Vendor Boost subscription"
      description="Shipping Plan Fees Comparison per Shoppitto Location"
    />
    <TitleDescHr
      title="Vendor Boost subscription"
      description="Shipping Plan Date Comparison per Shoppitto Location"
    />

    <CommonLink
      href={
        routes.vendor.logisticsAndApis.objectsMachinesPackaging
          .inputPreferredShippingPlan.default
      }
    >
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default ManualInputShippingRateEstimated;
export { getServerSideProps };
